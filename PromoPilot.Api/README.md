# PromoPilot API

FastAPI backend for PromoPilot - AI-Powered Social Media Management Platform.

## Project Structure

```
PromoPilot.Api/
├── main.py                 # FastAPI application entry point
├── database.py             # Database configuration and session management
├── requirements.txt        # Python dependencies
├── docker-compose.yml      # Local PostgreSQL and Redis setup
├── alembic.ini            # Alembic configuration
├── .env.example           # Environment variables template
├── models/                # SQLAlchemy database models
│   ├── __init__.py
│   ├── user.py
│   ├── client.py
│   ├── post.py
│   └── campaign.py
├── schemas/               # Pydantic request/response models
│   ├── __init__.py
│   ├── user.py
│   ├── client.py
│   ├── post.py
│   └── campaign.py
├── routers/               # FastAPI route handlers
│   ├── __init__.py
│   ├── users.py
│   ├── clients.py
│   ├── posts.py
│   └── campaigns.py
└── alembic/               # Database migrations
    ├── env.py
    ├── script.py.mako
    └── versions/
```

## Quick Start

### 1. Install Dependencies

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Setup Database

```bash
# Start PostgreSQL with Docker
docker-compose up -d postgres

# Copy environment variables
cp .env.example .env

# Initialize Alembic (first time only)
alembic init alembic

# Create initial migration
alembic revision --autogenerate -m "Initial migration"

# Run migrations
alembic upgrade head
```

### 3. Run the API

```bash
# Development server with auto-reload
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Or using Python directly
python main.py
```

The API will be available at:
- **API**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc

## API Endpoints

### Users
- `POST /api/v1/users` - Create user
- `GET /api/v1/users/{id}` - Get user by ID
- `GET /api/v1/users` - List users with pagination
- `PUT /api/v1/users/{id}` - Update user
- `DELETE /api/v1/users/{id}` - Delete user

### Clients
- `POST /api/v1/clients` - Create client
- `GET /api/v1/clients/{id}` - Get client by ID
- `GET /api/v1/clients` - List clients with pagination
- `PUT /api/v1/clients/{id}` - Update client
- `DELETE /api/v1/clients/{id}` - Delete client

### Posts
- `POST /api/v1/posts` - Create post
- `GET /api/v1/posts/{id}` - Get post by ID
- `GET /api/v1/posts?user_id=1` - List posts with filtering
- `PUT /api/v1/posts/{id}` - Update post
- `PATCH /api/v1/posts/{id}/status` - Update post status
- `DELETE /api/v1/posts/{id}` - Delete post

### Campaigns
- `POST /api/v1/campaigns` - Create campaign
- `GET /api/v1/campaigns/{id}` - Get campaign by ID
- `GET /api/v1/campaigns?user_id=1` - List campaigns with filtering
- `PUT /api/v1/campaigns/{id}` - Update campaign
- `DELETE /api/v1/campaigns/{id}` - Delete campaign

## Database Models

### User
- `id` (Primary Key)
- `email` (Unique)
- `name`
- `password_hash` (for future auth)
- `created_at`, `updated_at`

### Client
- `id` (Primary Key)
- `business_name`
- `industry`
- `contact_email`
- `description`
- `website`
- `created_at`, `updated_at`

### Post
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `content`
- `scheduled_time`
- `platforms` (JSON array)
- `status` (draft, scheduled, published, failed)
- `hashtags`
- `media_urls` (JSON array)
- `engagement_stats` (JSON)
- `created_at`, `updated_at`

### Campaign
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `name`
- `goal`
- `description`
- `status` (active, paused, completed)
- `target_audience`
- `budget`
- `created_at`, `updated_at`

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/promopilot
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ENVIRONMENT=development
```

## Development Tools

### Database Migrations

```bash
# Create new migration
alembic revision --autogenerate -m "Description of changes"

# Apply migrations
alembic upgrade head

# Rollback last migration
alembic downgrade -1

# View migration history
alembic history
```

### API Testing

Visit http://localhost:8000/docs for interactive API documentation.

Example requests:

```bash
# Create a user
curl -X POST "http://localhost:8000/api/v1/users" \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "name": "John Doe"}'

# Create a post
curl -X POST "http://localhost:8000/api/v1/posts" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "content": "Hello world!",
    "platforms": ["instagram", "twitter"],
    "hashtags": "#hello #world"
  }'
```

## CORS Configuration

The API is configured to allow requests from:
- `http://localhost:3000` (React development server)

Update the CORS settings in `main.py` for production deployment.

## Next Steps

1. **Authentication**: Add JWT-based authentication
2. **File Upload**: Add media file upload endpoints
3. **Social Media Integration**: Connect to platform APIs
4. **Background Tasks**: Add Celery for scheduled posting
5. **Caching**: Implement Redis caching
6. **Monitoring**: Add logging and health checks
7. **Testing**: Add unit and integration tests
8. **Deployment**: Containerize and deploy to cloud

## License

MIT License
