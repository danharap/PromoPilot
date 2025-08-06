from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from database import get_db
from models.campaign import Campaign
from schemas.campaign import Campaign as CampaignSchema, CampaignCreate, CampaignUpdate

router = APIRouter()

@router.post("/", response_model=CampaignSchema, status_code=status.HTTP_201_CREATED)
def create_campaign(campaign: CampaignCreate, db: Session = Depends(get_db)):
    """Create a new campaign"""
    db_campaign = Campaign(
        user_id=campaign.user_id,
        name=campaign.name,
        goal=campaign.goal,
        description=campaign.description,
        target_audience=campaign.target_audience,
        budget=campaign.budget,
        status="active"
    )
    db.add(db_campaign)
    db.commit()
    db.refresh(db_campaign)
    return db_campaign

@router.get("/{campaign_id}", response_model=CampaignSchema)
def get_campaign(campaign_id: int, db: Session = Depends(get_db)):
    """Get campaign by ID"""
    db_campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()
    if db_campaign is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Campaign not found"
        )
    return db_campaign

@router.get("/", response_model=List[CampaignSchema])
def get_campaigns(
    user_id: Optional[int] = Query(None, description="Filter campaigns by user ID"),
    status: Optional[str] = Query(None, description="Filter campaigns by status"),
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    """Get campaigns with optional filtering"""
    query = db.query(Campaign)
    
    if user_id:
        query = query.filter(Campaign.user_id == user_id)
    
    if status:
        query = query.filter(Campaign.status == status)
    
    campaigns = query.offset(skip).limit(limit).all()
    return campaigns

@router.put("/{campaign_id}", response_model=CampaignSchema)
def update_campaign(campaign_id: int, campaign: CampaignUpdate, db: Session = Depends(get_db)):
    """Update campaign information"""
    db_campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()
    if db_campaign is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Campaign not found"
        )
    
    # Update fields if provided
    update_data = campaign.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_campaign, field, value)
    
    db.commit()
    db.refresh(db_campaign)
    return db_campaign

@router.delete("/{campaign_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_campaign(campaign_id: int, db: Session = Depends(get_db)):
    """Delete campaign"""
    db_campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()
    if db_campaign is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Campaign not found"
        )
    
    db.delete(db_campaign)
    db.commit()
    return None
