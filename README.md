# Exam Express 🚀

Exam Express is a comprehensive web application designed to help students prepare for exams efficiently. It provides access to a wide range of study resources, including previous exam papers, subject notes, unit-wise questions, and video lectures. The platform is built with a focus on user-friendly navigation and seamless access to study materials.

## Features ✨

### For Students:
- **📚 Study Resources:**
  - Access to previous exam papers for practice.
  - Detailed subject notes and unit-wise questions.
  - Video lectures for better understanding.

- **🔐 Secure Authentication:**
  - User registration and login with email verification.
  - Password reset functionality.

- **📊 Progress Tracking:**
  - Track your progress and performance.

### For Admins:
- **🛠️ Admin Dashboard:**
  - Manage users, subjects, and study materials.
  - Add, update, or delete subjects and units.

## Tech Stack 💻
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Email Service:** Nodemailer
- **Deployment:** Render (Backend), Vercel (Frontend)

## Screenshots 📸
- **Home Page**  
  ![Home Page](screenshots/home-page.png)

- **Dashboard**  
  ![Dashboard](screenshots/dashboard.png)

- **Subject Page**  
  ![Subject Page](screenshots/subject-page.png)

## Installation 🛠️

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (for database)
- NPM or Yarn (for package management)

### Steps to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/exam-express.git
   cd exam-express
2. Install dependencies:
    ```bash
   cd client
   npm install
   cd ../server
   npm install
3  Set up environment variables:
   - Create a .env file in the server directory and add the following:
  ```plaintext
      PORT=3000
      MONGODB_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret_key
      SENDER_EMAIL=your_email
      EMAIL_PASSWORD=your_email_password
```
4  Run the application:
 - Start the backend server:
```bash
    cd server
    npm start
```
 - Start the frontend development server:
```bash
    cd client
    npm start
```
5  Access the application:
  - Open your browser and go to http://localhost:5173.
--
## Live Demo 🌐
Check out the live demo of Exam Express:
 - Frontend: https://examexpress.vercel.app
 - Backend: https://newexamexpress.onrender.com

## Contributing 🤝
We welcome contributions! If you'd like to contribute to Exam Express, please follow these steps:

    1 Fork the repository.

    2 Create a new branch (git checkout -b feature/YourFeatureName).

    3 Commit your changes (git commit -m 'Add some feature').

    4 Push to the branch (git push origin feature/YourFeatureName).

    5 Open a pull request.

## License 📜
This project is licensed under the MIT License. See the [LICENSE]() file for details.

## Contact 📧
For any questions or feedback, feel free to reach out:

[`Email`](mailto:riteshkumar04294@gmail.com): riteshkumar04294@gmail.com

[`LinkedIn`](https://www.linkedin.com/in/ritesh-kumar-69a50a25b?): Ritesh Kumar

### Key Changes:
1. All code blocks are now complete and not split into half.
2. Proper indentation and syntax are maintained for readability.
3. Placeholders like `your-username`, `your_mongodb_connection_string`, etc., are left as-is for you to replace with actual values.

This version is ready to be used in your repository!
