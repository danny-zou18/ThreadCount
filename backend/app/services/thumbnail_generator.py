from __future__ import annotations

import io
import logging
from typing import Any

import httpx
from PIL import Image

from app.supabase_client import get_supabase

logger = logging.getLogger(__name__)

CANVAS_WIDTH = 400
CANVAS_HEIGHT = 600
CENTER_COLUMN_X = int(CANVAS_WIDTH * 0.15)
CENTER_COLUMN_WIDTH = int(CANVAS_WIDTH * 0.7)
TOP_REGION_Y = 0
TOP_REGION_HEIGHT = int(CANVAS_HEIGHT * 0.3)
BOTTOM_REGION_Y = int(CANVAS_HEIGHT * 0.25)
BOTTOM_REGION_HEIGHT = int(CANVAS_HEIGHT * 0.55)
SHOES_REGION_Y = int(CANVAS_HEIGHT * 0.78)
SHOES_REGION_HEIGHT = int(CANVAS_HEIGHT * 0.22)
ACCESSORY_WIDTH = int(CANVAS_WIDTH * 0.2)
ACCESSORY_HEIGHT = int(CANVAS_HEIGHT * 0.12)


class ThumbnailGenerator:
    def __init__(self) -> None:
        self.supabase = get_supabase()

    async def _load_image(
        self, client: httpx.AsyncClient, url: str
    ) -> Image.Image | None:
        try:
            response = await client.get(url)
            response.raise_for_status()
            return Image.open(io.BytesIO(response.content)).convert("RGBA")
        except Exception as e:
            logger.warning(f"Failed to load image: {e}")
            return None

    def _categorize_items(
        self, items: list[dict[str, Any]]
    ) -> dict[str, list[dict[str, Any]]]:
        tops: list[dict[str, Any]] = []
        bottoms: list[dict[str, Any]] = []
        shoes: list[dict[str, Any]] = []
        accessories_left: list[dict[str, Any]] = []
        accessories_right: list[dict[str, Any]] = []

        for item in items:
            category = item.get("category", "")
            if category in ["tops", "dresses", "outerwear"]:
                tops.append(item)
            elif category == "bottoms":
                bottoms.append(item)
            elif category == "shoes":
                shoes.append(item)
            elif category == "accessories":
                if len(accessories_left) <= len(accessories_right):
                    accessories_left.append(item)
                else:
                    accessories_right.append(item)

        return {
            "tops": tops,
            "bottoms": bottoms,
            "shoes": shoes,
            "accessories_left": accessories_left,
            "accessories_right": accessories_right,
        }

    async def _paste_item(
        self,
        client: httpx.AsyncClient,
        canvas: Image.Image,
        item: dict[str, Any],
        x: int,
        y: int,
        max_w: int,
        max_h: int,
    ) -> None:
        image_path = item.get("image_path")
        if not image_path:
            return
        try:
            item_url = self.supabase.storage.from_("wardrobe").get_public_url(
                image_path
            )
            image_url = item_url if isinstance(item_url, str) else str(item_url)
            img = await self._load_image(client, image_url)
            if not img:
                return
            img.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
            paste_x = x + (max_w - img.width) // 2
            paste_y = y + (max_h - img.height) // 2
            canvas.paste(img, (paste_x, paste_y), img)
        except Exception as e:
            logger.warning(f"Failed to paste item {item.get('id')}: {e}")

    async def _compose_thumbnail(
        self,
        canvas: Image.Image,
        client: httpx.AsyncClient,
        categorized: dict[str, list[dict[str, Any]]],
    ) -> None:
        for item in categorized["tops"]:
            await self._paste_item(
                client,
                canvas,
                item,
                CENTER_COLUMN_X,
                TOP_REGION_Y,
                CENTER_COLUMN_WIDTH,
                TOP_REGION_HEIGHT,
            )

        for item in categorized["bottoms"]:
            await self._paste_item(
                client,
                canvas,
                item,
                CENTER_COLUMN_X,
                BOTTOM_REGION_Y,
                CENTER_COLUMN_WIDTH,
                BOTTOM_REGION_HEIGHT,
            )

        for item in categorized["shoes"]:
            await self._paste_item(
                client,
                canvas,
                item,
                CENTER_COLUMN_X,
                SHOES_REGION_Y,
                CENTER_COLUMN_WIDTH,
                SHOES_REGION_HEIGHT,
            )

        for idx, item in enumerate(categorized["accessories_left"]):
            y_pos = int(CANVAS_HEIGHT * (0.1 + idx * 0.18))
            await self._paste_item(
                client, canvas, item, 10, y_pos, ACCESSORY_WIDTH, ACCESSORY_HEIGHT
            )

        for idx, item in enumerate(categorized["accessories_right"]):
            y_pos = int(CANVAS_HEIGHT * (0.1 + idx * 0.18))
            await self._paste_item(
                client,
                canvas,
                item,
                CANVAS_WIDTH - ACCESSORY_WIDTH - 10,
                y_pos,
                ACCESSORY_WIDTH,
                ACCESSORY_HEIGHT,
            )

    def _upload_thumbnail(
        self, user_id: str, output: io.BytesIO, thumbnail_id: str
    ) -> str:
        file_path = f"{user_id}/thumbnails/{thumbnail_id}.png"
        logger.info(f"Uploading thumbnail to: {file_path}")
        try:
            self.supabase.storage.from_("generated").upload(
                path=file_path,
                file=output.getvalue(),
                file_options={"content-type": "image/png", "upsert": "true"},
            )
        except Exception as e:
            logger.warning(f"Upload with options failed, trying fallback: {e}")
            output.seek(0)
            self.supabase.storage.from_("generated").upload(
                file_path, output.getvalue()
            )

        return file_path

    async def generate(self, user_id: str, item_ids: list[str]) -> dict[str, str]:
        if not item_ids:
            raise ValueError("No item_ids provided")

        items_result = (
            self.supabase.table("wardrobe_items")
            .select("id, name, category, image_path")
            .in_("id", item_ids)
            .execute()
        )

        if not items_result.data:
            raise ValueError("No valid clothing items found")

        items = items_result.data
        logger.info(f"Found {len(items)} items for thumbnail")

        canvas = Image.new("RGBA", (CANVAS_WIDTH, CANVAS_HEIGHT), (255, 255, 255, 255))
        categorized = self._categorize_items(items)

        async with httpx.AsyncClient(timeout=30.0) as client:
            await self._compose_thumbnail(canvas, client, categorized)

        output = io.BytesIO()
        canvas.save(output, format="PNG")
        output.seek(0)

        import uuid

        thumbnail_id = str(uuid.uuid4())
        file_path = self._upload_thumbnail(user_id, output, thumbnail_id)

        thumbnail_url = self.supabase.storage.from_("generated").get_public_url(
            file_path
        )
        thumbnail_url_str = (
            thumbnail_url if isinstance(thumbnail_url, str) else str(thumbnail_url)
        )

        logger.info(f"Thumbnail generated: {file_path}")
        return {"thumbnail_path": file_path, "thumbnail_url": thumbnail_url_str}
