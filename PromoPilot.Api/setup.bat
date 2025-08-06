@echo off
echo Setting up PromoPilot API...

echo.
echo 1. Creating virtual environment...
python -m venv venv

echo.
echo 2. Activating virtual environment...
call venv\Scripts\activate

echo.
echo 3. Installing dependencies...
pip install -r requirements.txt

echo.
echo 4. Starting PostgreSQL with Docker...
docker-compose up -d postgres

echo.
echo 5. Waiting for PostgreSQL to be ready...
timeout /t 10

echo.
echo 6. Setting up environment variables...
if not exist .env (
    copy .env.example .env
    echo Created .env file. Please update the DATABASE_URL if needed.
)

echo.
echo 7. Running database migrations...
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head

echo.
echo Setup complete! You can now run the API with:
echo uvicorn main:app --reload
echo.
echo API will be available at: http://localhost:8000
echo Interactive docs at: http://localhost:8000/docs

pause
