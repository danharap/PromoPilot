@echo off
echo.
echo ===========================================
echo  PromoPilot API Setup Script
echo ===========================================
echo.

echo [1/5] Starting PostgreSQL database...
docker-compose up -d postgres
if %errorlevel% neq 0 (
    echo ERROR: Failed to start database. Make sure Docker Desktop is running.
    pause
    exit /b 1
)

echo [2/5] Creating Python virtual environment...
python -m venv .venv
if %errorlevel% neq 0 (
    echo ERROR: Failed to create virtual environment. Make sure Python 3.12+ is installed.
    pause
    exit /b 1
)

echo [3/5] Activating virtual environment...
call .venv\Scripts\activate.bat

echo [4/5] Installing Python dependencies...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies.
    pause
    exit /b 1
)

echo [5/5] Running database migrations...
alembic upgrade head
if %errorlevel% neq 0 (
    echo ERROR: Failed to run migrations.
    pause
    exit /b 1
)

echo.
echo ===========================================
echo  Setup Complete! 🎉
echo ===========================================
echo.
echo To start the API server, run:
echo   .venv\Scripts\activate
echo   uvicorn main:app --reload --host 0.0.0.0 --port 8000
echo.
echo Then visit: http://localhost:8000/docs
echo.
pause
