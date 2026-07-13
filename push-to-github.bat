@echo off
echo ========================================
echo Pushing Chaoslab Frontend to GitHub
echo ========================================
echo.

REM Initialize git if not already initialized
if not exist .git (
    echo Initializing Git repository...
    git init
    echo.
)

REM Check if remote exists
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo Adding remote origin...
    git remote add origin https://github.com/Chaoslab1/chaoslab-frontend.git
    echo.
) else (
    echo Updating remote URL...
    git remote set-url origin https://github.com/Chaoslab1/chaoslab-frontend.git
    echo.
)

echo Staging all files...
git add .
echo.

echo Current status:
git status
echo.

set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=feat: production-ready documentation portal with full testing and CI/CD

echo.
echo Committing changes...
git commit -m "%commit_msg%"
echo.

REM Check if main branch exists, if not create it
git rev-parse --verify main >nul 2>&1
if %errorlevel% neq 0 (
    echo Creating main branch...
    git branch -M main
    echo.
)

echo Pushing to GitHub...
git push -u origin main
echo.

if %errorlevel% equ 0 (
    echo ========================================
    echo SUCCESS! Project pushed to GitHub
    echo ========================================
    echo.
    echo Repository: https://github.com/Chaoslab1/chaoslab-frontend
    echo.
    echo Next steps:
    echo 1. Go to https://github.com/Chaoslab1/chaoslab-frontend/settings/pages
    echo 2. Enable GitHub Pages from the 'gh-pages' branch
    echo 3. Configure GitHub Secrets for CI/CD
    echo.
) else (
    echo ========================================
    echo ERROR: Failed to push to GitHub
    echo ========================================
    echo.
    echo Please check:
    echo 1. You have write access to the repository
    echo 2. The repository exists: https://github.com/Chaoslab1/chaoslab-frontend
    echo 3. Your Git credentials are configured
    echo.
)

pause
