from fastapi import APIRouter, HTTPException, Form
from pydantic import BaseModel
from typing import List, Optional
from app.supabase_client import get_supabase
import logging
import uuid
from datetime import datetime

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()


class Outfit(BaseModel):
    id: str
    user_id: str
    name: Optional[str] = None
    item_ids: List[str] = []
    thumbnail_path: Optional[str] = None
    created_at: str
    updated_at: str


class OutfitCreate(BaseModel):
    name: Optional[str] = None
    item_ids: List[str] = []


class OutfitUpdate(BaseModel):
    name: Optional[str] = None
    item_ids: Optional[List[str]] = None


@router.get("", response_model=List[Outfit])
async def get_outfits(user_id: str):
    """Get all outfits for a user."""
    logger.info(f"Fetching outfits for user: {user_id}")
    supabase = get_supabase()

    try:
        result = (
            supabase.table("outfits")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .execute()
        )

        outfits = []
        for item in result.data:
            outfits.append(Outfit(
                id=item["id"],
                user_id=item["user_id"],
                name=item.get("name"),
                item_ids=item.get("item_ids", []),
                thumbnail_path=item.get("thumbnail_path"),
                created_at=item["created_at"],
                updated_at=item["updated_at"]
            ))

        return outfits

    except Exception as e:
        logger.error(f"Error fetching outfits: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{outfit_id}", response_model=Outfit)
async def get_outfit(outfit_id: str, user_id: str):
    """Get a single outfit by ID."""
    logger.info(f"Fetching outfit: {outfit_id}")
    supabase = get_supabase()

    try:
        result = (
            supabase.table("outfits")
            .select("*")
            .eq("id", outfit_id)
            .eq("user_id", user_id)
            .single()
            .execute()
        )

        if not result.data:
            raise HTTPException(status_code=404, detail="Outfit not found")

        item = result.data
        return Outfit(
            id=item["id"],
            user_id=item["user_id"],
            name=item.get("name"),
            item_ids=item.get("item_ids", []),
            thumbnail_path=item.get("thumbnail_path"),
            created_at=item["created_at"],
            updated_at=item["updated_at"]
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching outfit: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("", response_model=Outfit)
async def create_outfit(
    user_id: str = Form(...),
    name: Optional[str] = Form(None),
    item_ids: Optional[str] = Form(None)
):
    """Create a new outfit."""
    logger.info(f"Creating outfit for user: {user_id}")
    supabase = get_supabase()

    try:
        outfit_id = str(uuid.uuid4())

        item_ids_list = []
        if item_ids:
            item_ids_list = [uid.strip() for uid in item_ids.split(",") if uid.strip()]

        result = supabase.table("outfits").insert({
            "id": outfit_id,
            "user_id": user_id,
            "name": name,
            "item_ids": item_ids_list,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }).execute()

        if not result.data:
            raise HTTPException(status_code=500, detail="Failed to create outfit")

        item = result.data[0]
        return Outfit(
            id=item["id"],
            user_id=item["user_id"],
            name=item.get("name"),
            item_ids=item.get("item_ids", []),
            thumbnail_path=item.get("thumbnail_path"),
            created_at=item["created_at"],
            updated_at=item["updated_at"]
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating outfit: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/{outfit_id}", response_model=Outfit)
async def update_outfit(outfit_id: str, user_id: str, updates: OutfitUpdate):
    """Update an outfit."""
    logger.info(f"Updating outfit: {outfit_id}")
    supabase = get_supabase()

    try:
        update_data = {"updated_at": datetime.utcnow().isoformat()}

        if updates.name is not None:
            update_data["name"] = updates.name
        if updates.item_ids is not None:
            update_data["item_ids"] = updates.item_ids

        result = (
            supabase.table("outfits")
            .update(update_data)
            .eq("id", outfit_id)
            .eq("user_id", user_id)
            .execute()
        )

        if not result.data:
            raise HTTPException(status_code=404, detail="Outfit not found")

        item = result.data[0]
        return Outfit(
            id=item["id"],
            user_id=item["user_id"],
            name=item.get("name"),
            item_ids=item.get("item_ids", []),
            thumbnail_path=item.get("thumbnail_path"),
            created_at=item["created_at"],
            updated_at=item["updated_at"]
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating outfit: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{outfit_id}")
async def delete_outfit(outfit_id: str, user_id: str):
    """Delete an outfit."""
    logger.info(f"Deleting outfit: {outfit_id}")
    supabase = get_supabase()

    try:
        result = (
            supabase.table("outfits")
            .delete()
            .eq("id", outfit_id)
            .eq("user_id", user_id)
            .execute()
        )

        if not result.data:
            raise HTTPException(status_code=404, detail="Outfit not found")

        return {"status": "success", "message": "Outfit deleted"}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting outfit: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
