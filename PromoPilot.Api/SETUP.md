# PromoPilot API Setup Guide

This guide will help you set up the PromoPilot FastAPI backend on any computer.

## 🚀 Quick Setup (5 minutes)

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Required)
- [Python 3.12+](https://www.python.org/downloads/)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/danharap/PromoPilot.git
cd PromoPilot/PromoPilot.Api
```

### 2. Start the Database
```bash
docker-compose up -d postgres
```

### 3. Set Up Python Environment

**Windows:**
```bash
python -m venv .venv
.venv\Scripts\activate
```

**macOS/Linux:**
```bash
python -m venv .venv
source .venv/bin/activate
```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

### 5. Run Database Migrations
```bash
alembic upgrade head
```

### 6. Start the API Server
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## 🎯 Access Points

- **API Documentation:** http://localhost:8000/docs
- **API Health Check:** http://localhost:8000
- **Database Access:** Use VS Code PostgreSQL extension

## 🔐 Database Connection Details

Use these credentials with VS Code PostgreSQL extension or any SQL client:

```
Host: localhost
Port: 5432
Database: promopilot
Username: postgres
Password: password
```

## 🧪 Test the Authentication

1. Go to http://localhost:8000/docs
2. Try the `/users/register` endpoint:
   ```json
   {
     "email": "test@example.com",
     "name": "Test User",
     "password": "securepassword123"
   }
   ```
3. Use the returned token to access protected endpoints

## 🛠️ Troubleshooting

### Docker Issues
```bash
# If containers won't start
docker-compose down -v
docker-compose up -d postgres

# Check container status
docker-compose ps
```

### Database Issues
```bash
# Reset database completely
docker-compose down -v
docker-compose up -d postgres
alembic upgrade head
```

### Python Environment Issues
```bash
# Recreate virtual environment
rmdir /s .venv  # Windows
rm -rf .venv    # macOS/Linux

python -m venv .venv
# Activate and install again
```

## 📁 Project Structure

```
PromoPilot.Api/
├── models/              # Database models
├── schemas/             # API schemas
├── routers/             # API endpoints
├── alembic/             # Database migrations
├── auth.py              # Authentication utilities
├── database.py          # Database connection
├── main.py              # FastAPI application
├── docker-compose.yml   # Database services
└── requirements.txt     # Python dependencies
```

## 🔄 Development Workflow

### Making Changes
1. Make your code changes
2. If you changed models, create a migration:
   ```bash
   alembic revision --autogenerate -m "Description"
   alembic upgrade head
   ```
3. Test your changes at http://localhost:8000/docs

### Sharing Changes
```bash
git add .
git commit -m "Your change description"
git push origin develop
```

## 🌐 Running on Another Computer

1. **Pull latest changes:**
   ```bash
   git pull origin develop
   ```

2. **Follow steps 2-6 from Quick Setup**

That's it! The same setup works on any computer with Docker and Python installed.
