import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.api.routes import (
    avatar,
    wardrobe,
    image_processing,
    ai,
    outfits,
    try_on,
    generated_images,
)

app = FastAPI(title="Seamless API")

CORS_ORIGINS = os.getenv(
    "CORS_ORIGINS", "http://localhost:5173,http://localhost:3000"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc)},
        headers={"Access-Control-Allow-Origin": "*"},
    )


app.include_router(avatar.router, prefix="/api/avatar", tags=["avatar"])
app.include_router(wardrobe.router, prefix="/api/wardrobe", tags=["wardrobe"])
app.include_router(
    image_processing.router, prefix="/api/image", tags=["image-processing"]
)
app.include_router(ai.router, prefix="/api/ai", tags=["ai"])
app.include_router(outfits.router, prefix="/api/outfits", tags=["outfits"])
app.include_router(try_on.router, prefix="/api/try-on", tags=["try-on"])
app.include_router(
    generated_images.router, prefix="/api/generated-images", tags=["generated-images"]
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/test-cors")
def test_cors():
    return {"message": "CORS test"}
