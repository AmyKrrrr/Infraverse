@echo off
echo.
echo ================================================
echo   DIGITAL CLASSROOM - PUSH TO GITHUB
echo ================================================
echo.

echo Checking git status...
git status

echo.
echo Adding all files...
git add .

echo.
echo Committing changes...
git commit -m "🎓 Complete AI Quiz Generator Integration

✨ Features Added:
- Beautiful AI quiz generation with modern gradient UI
- Fixed login validation (username/email flexibility)  
- Removed image enhancer from student navigation
- Responsive design with animations and hover effects
- Simple API service layer for hackathon demo
- Mock backend responses work offline

🎯 Demo Ready:
- Generate quizzes for any subject (Math, Science, etc.)
- Select difficulty levels with emoji indicators
- Beautiful question display with multiple choice options
- Works on mobile, tablet, desktop

🔧 Technical:
- React 19.1.1 + Vite frontend
- Spring Boot 3.2.0 + PostgreSQL backend
- Clean, hackathon-appropriate code structure
- Full integration documentation included

🚀 Ready for demo and deployment!"

echo.
echo Pushing to GitHub...
git push origin main

echo.
echo ================================================
echo   SUCCESS! Your project is now on GitHub!
echo ================================================
echo.
echo Next steps:
echo 1. Visit your GitHub repository to see the changes
echo 2. Deploy to Netlify for public access
echo 3. Share the URL with others!
echo.
pause