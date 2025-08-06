from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class ClientBase(BaseModel):
    business_name: str
    industry: Optional[str] = None
    contact_email: EmailStr
    description: Optional[str] = None
    website: Optional[str] = None

class ClientCreate(ClientBase):
    pass

class ClientUpdate(BaseModel):
    business_name: Optional[str] = None
    industry: Optional[str] = None
    contact_email: Optional[EmailStr] = None
    description: Optional[str] = None
    website: Optional[str] = None

class Client(ClientBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
