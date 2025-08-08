@echo off
setlocal enableextensions

REM ============================================
REM  PromoPilot - Start Full Stack (API + Web)
REM ============================================

echo [INIT] Starting PromoPilot dev environment...

call :ensureDocker || goto :end

pushd PromoPilot.Api >nul 2>&1

REM --- Start PostgreSQL via Docker Compose ---
echo [DB] Starting PostgreSQL container...
for /f "tokens=*" %%A in ('docker compose up -d postgres 2^>^&1') do (
  echo [DB] %%A
)
if %errorlevel% neq 0 (
  echo [DB] ERROR: Failed to start PostgreSQL. Please ensure Docker Desktop is running.
  popd >nul 2>&1
  goto :end
)

REM --- Start Backend (FastAPI) in a new window ---
set "VENV_PY=.venv\Scripts\python.exe"
if exist "%VENV_PY%" (
  echo [API] Starting FastAPI with venv on http://localhost:8000 ...
  start "PromoPilot API" cmd /k "%VENV_PY% -m uvicorn main:app --reload --host 0.0.0.0 --port 8000"
) else (
  echo [API] .venv not found. Running setup.bat first...
  call setup.bat
  if exist "%VENV_PY%" (
    echo [API] Setup complete. Starting FastAPI with venv on http://localhost:8000 ...
    start "PromoPilot API" cmd /k "%VENV_PY% -m uvicorn main:app --reload --host 0.0.0.0 --port 8000"
  ) else (
    echo [API] ERROR: Setup failed. Cannot start API server.
    popd >nul 2>&1
    goto :end
  )
)

popd >nul 2>&1

REM --- Start Frontend (React) in a new window ---
pushd PromoPilot.App >nul 2>&1
if not exist node_modules (
  echo [WEB] node_modules not found. Running npm install (first run)...
  call npm install
)

echo [WEB] Starting React app on http://localhost:3000 ...
start "PromoPilot Web" cmd /k "npm start"

popd >nul 2>&1

REM --- Open browser tabs ---
start "" http://localhost:3000/
start "" http://localhost:8000/docs

echo [OK] All services launched. Close the API/Web windows to stop them.

goto :end

:ensureDocker
where docker >nul 2>&1
if errorlevel 1 (
  echo [DOCKER] ERROR: Docker CLI not found. Please install Docker Desktop.
  exit /b 1
)

REM If Docker engine is already running, return success
docker info >nul 2>&1 && (
  echo [DOCKER] Docker engine is running.
  exit /b 0
)

echo [DOCKER] Docker engine not running. Attempting to start Docker Desktop...
set "DOCKER_EXE=%ProgramFiles%\Docker\Docker\Docker Desktop.exe"
if not exist "%DOCKER_EXE%" set "DOCKER_EXE=%ProgramFiles(x86)%\Docker\Docker\Docker Desktop.exe"
if exist "%DOCKER_EXE%" (
  start "" "%DOCKER_EXE%"
  echo [DOCKER] Waiting up to 90s for Docker to become ready...
  for /l %%i in (1,1,45) do (
    docker info >nul 2>&1 && (
      echo [DOCKER] Docker is ready.
      exit /b 0
    )
    timeout /t 2 >nul
  )
  echo [DOCKER] ERROR: Docker did not become ready. Please open Docker Desktop and try again.
  exit /b 1
) else (
  echo [DOCKER] ERROR: Docker Desktop not found at the default path.
  echo          Please install Docker Desktop or start it manually.
  exit /b 1
)

:end
endlocal
exit /b 0
