from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users, clients, posts, campaigns
from database import engine
from models import user, client, post, campaign

# Create database tables
user.Base.metadata.create_all(bind=engine)
client.Base.metadata.create_all(bind=engine)
post.Base.metadata.create_all(bind=engine)
campaign.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="PromoPilot API",
    description="Backend API for PromoPilot - AI-Powered Social Media Management Platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(clients.router, prefix="/api/v1/clients", tags=["clients"])
app.include_router(posts.router, prefix="/api/v1/posts", tags=["posts"])
app.include_router(campaigns.router, prefix="/api/v1/campaigns", tags=["campaigns"])

@app.get("/")
def read_root():
    return {"message": "Welcome to PromoPilot API", "version": "1.0.0"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
