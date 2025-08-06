from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from database import get_db
from models.post import Post
from schemas.post import Post as PostSchema, PostCreate, PostUpdate, PostStatusUpdate

router = APIRouter()

@router.post("/", response_model=PostSchema, status_code=status.HTTP_201_CREATED)
def create_post(post: PostCreate, db: Session = Depends(get_db)):
    """Create a new post"""
    db_post = Post(
        user_id=post.user_id,
        content=post.content,
        scheduled_time=post.scheduled_time,
        platforms=post.platforms,
        hashtags=post.hashtags,
        media_urls=post.media_urls,
        status="draft"
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@router.get("/{post_id}", response_model=PostSchema)
def get_post(post_id: int, db: Session = Depends(get_db)):
    """Get post by ID"""
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if db_post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )
    return db_post

@router.get("/", response_model=List[PostSchema])
def get_posts(
    user_id: Optional[int] = Query(None, description="Filter posts by user ID"),
    status: Optional[str] = Query(None, description="Filter posts by status"),
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    """Get posts with optional filtering"""
    query = db.query(Post)
    
    if user_id:
        query = query.filter(Post.user_id == user_id)
    
    if status:
        query = query.filter(Post.status == status)
    
    posts = query.offset(skip).limit(limit).all()
    return posts

@router.put("/{post_id}", response_model=PostSchema)
def update_post(post_id: int, post: PostUpdate, db: Session = Depends(get_db)):
    """Update post information"""
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if db_post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )
    
    # Update fields if provided
    update_data = post.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_post, field, value)
    
    db.commit()
    db.refresh(db_post)
    return db_post

@router.patch("/{post_id}/status", response_model=PostSchema)
def update_post_status(post_id: int, status_update: PostStatusUpdate, db: Session = Depends(get_db)):
    """Update post status"""
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if db_post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )
    
    db_post.status = status_update.status
    db.commit()
    db.refresh(db_post)
    return db_post

@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(post_id: int, db: Session = Depends(get_db)):
    """Delete post"""
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if db_post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )
    
    db.delete(db_post)
    db.commit()
    return None
