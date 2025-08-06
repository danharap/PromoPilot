from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List, Dict, Any

class PostBase(BaseModel):
    user_id: int
    content: str
    scheduled_time: Optional[datetime] = None
    platforms: List[str]  # ["instagram", "twitter", "tiktok"]
    hashtags: Optional[str] = None
    media_urls: Optional[List[str]] = None

class PostCreate(PostBase):
    pass

class PostUpdate(BaseModel):
    content: Optional[str] = None
    scheduled_time: Optional[datetime] = None
    platforms: Optional[List[str]] = None
    status: Optional[str] = None
    hashtags: Optional[str] = None
    media_urls: Optional[List[str]] = None
    engagement_stats: Optional[Dict[str, Any]] = None

class PostStatusUpdate(BaseModel):
    status: str  # draft, scheduled, published, failed

class Post(PostBase):
    id: int
    status: str
    engagement_stats: Optional[Dict[str, Any]] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
