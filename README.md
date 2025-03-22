# Florida Driver's License App 🚗
A comprehensive web application designed to help users prepare for the Florida driver's license test through interactive practice exams.

## Overview 🔍
This application provides a realistic simulation of the Florida driver's license test, allowing users to:

- Take practice tests with timed sessions ⏱️
- Receive immediate feedback on answers with explanations
- Track progress and view final results
- Navigate through questions with an intuitive interface
## Project Structure 📁
The project follows a client-server architecture:

### Frontend 🖥️
- Built with React and TypeScript
- Styled with styled-components for a modern, responsive UI
- Key components:
  - TestPage: Main testing interface with timer and question navigation
  - Results page: Displays test performance and pass/fail status
  - Home page: Entry point with test instructions
### Backend 🔧
- API endpoints for:
  - Retrieving test questions
  - Validating user answers
  - Storing and retrieving test results
## Features ✨
### Test Interface
- Timer : 60-minute countdown for test completion
- Question Navigation : Easily move between questions
- Answer Validation : Immediate feedback with explanations
- Progress Tracking : Shows completed questions
### User Experience
- Responsive Design : Works on desktop and mobile devices
- Intuitive UI : Clear visual indicators for correct/incorrect answers
- Confirmation Dialogs : Prevents accidental test exits
## Getting Started 🚀
### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/florida-drivers-license-app.git
cd florida-drivers-license-app
 ```
```

2. Install dependencies for frontend and backend
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
 ```

3. Start the development servers
```bash
# Backend (from backend directory)
npm start

# Frontend (from frontend directory)
npm start
 ```

4. Open your browser and navigate to http://localhost:3000
## Usage 📋
1. From the home page, read the instructions and click "Start Test"
2. Answer each question by selecting one of the provided options
3. Submit your answer to receive immediate feedback
4. Navigate through questions using the Previous/Next buttons
5. Complete all questions within the 60-minute time limit
6. View your results to see if you passed (requires 40 or more correct answers)
## Development 👨‍💻
### Adding Questions
Questions can be added to the backend database. Each question should include:

- Question text
- Multiple choice options
- Correct answer
- Explanation for the answer
### Customizing Pass Criteria
The passing threshold can be adjusted in the TestPage component:

```typescript
isPassed: correctAnswers >= 40 // Modify this number to change passing criteria
 ```

## License 📄
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments 🙏
- Florida Department of Highway Safety and Motor Vehicles for reference materials
- React and TypeScript communities for excellent documentation
- This application is for educational purposes only and is not affiliated with the Florida Department of Highway Safety and Motor Vehicles.
