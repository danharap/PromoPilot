from sqlalchemy import Column, Integer, String, DateTime, Text, JSON, ForeignKey
from sqlalchemy.sql import func
from database import Base

class Post(Base):
    __tablename__ = "posts"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    content = Column(Text, nullable=False)
    scheduled_time = Column(DateTime(timezone=True), nullable=True)
    platforms = Column(JSON, nullable=False)  # ["instagram", "twitter", "tiktok"]
    status = Column(String(50), default="draft")  # draft, scheduled, published, failed
    hashtags = Column(Text, nullable=True)
    media_urls = Column(JSON, nullable=True)  # Array of media file URLs
    engagement_stats = Column(JSON, nullable=True)  # likes, shares, comments, etc.
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
