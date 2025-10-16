from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
import uvicorn
from typing import Dict, List

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for custom statuses
custom_statuses: Dict[str, Dict[str, bytes | str]] = {}


@app.post("/api/statuses")
async def create_status(
    status: str = Form(...),
    image: UploadFile = File(...)
):
    """Create a custom status cat image"""
    if not status or not image:
        raise HTTPException(status_code=400, detail="Missing status or image.")
    
    # Read the file buffer
    buffer = await image.read()
    
    custom_statuses[status] = {
        "buffer": buffer,
        "mimetype": image.content_type or "image/jpeg",
    }
    
    return Response(
        content='{"status": "' + status + '", "message": "Status cat created successfully."}',
        status_code=201,
        media_type="application/json",
        headers={"Cache-Control": "no-store"}
    )


@app.get("/api/statuses")
async def get_statuses() -> List[str]:
    """Get all custom status codes"""
    return Response(
        content=str(list(custom_statuses.keys())).replace("'", '"'),
        media_type="application/json",
        headers={"Cache-Control": "no-store"}
    )


@app.get("/api/images/{status}")
async def get_image(status: str):
    """Get image for a specific status code"""
    image = custom_statuses.get(status)
    
    if not image:
        raise HTTPException(status_code=404, detail="Not found.")
    
    return Response(
        content=image["buffer"],
        media_type=image["mimetype"],
        headers={"Cache-Control": "no-store"}
    )


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3001)
