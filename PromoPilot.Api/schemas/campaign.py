from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CampaignBase(BaseModel):
    user_id: int
    name: str
    goal: Optional[str] = None
    description: Optional[str] = None
    target_audience: Optional[str] = None
    budget: Optional[str] = None

class CampaignCreate(CampaignBase):
    pass

class CampaignUpdate(BaseModel):
    name: Optional[str] = None
    goal: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    target_audience: Optional[str] = None
    budget: Optional[str] = None

class Campaign(CampaignBase):
    id: int
    status: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
