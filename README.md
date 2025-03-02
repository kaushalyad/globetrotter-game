# Globetrotter Game

Globetrotter is a fun and interactive web-based game where players guess cities based on cryptic clues, fun facts, and trivia. The game is built using **React** for the frontend, **Node.js** and **Express** for the backend, and **MongoDB** for the database.

---

## Features

- **City Guessing Game**: Players guess cities based on clues, fun facts, and trivia.
- **Dynamic Data**: Cities and their details are fetched from a database or generated using OpenAI's GPT API.
- **Responsive Design**: The game is fully responsive and works on all devices.
- **Confetti Animation**: Celebrate correct answers with a confetti animation.
- **Password Reset**: Users can reset their password securely via email.

---

## Technologies Used

### **Frontend**:
- React
- Tailwind CSS (for styling)
- React Router (for routing)
- Lottie (for animations)
- React Confetti (for celebrations)

### **Backend**:
- Node.js
- Express
- MongoDB (for database)
- OpenAI API (for generating clues and trivia)

### **Other Tools**:
- Axios (for API requests)
- Bcrypt (for password hashing)
- JSON Web Tokens (JWT) (for authentication)

---

## Getting Started

Follow these steps to set up and run the project locally.

### **Prerequisites**

Make sure you have the following installed on your system:
- **Node.js**: Download and install from [here](https://nodejs.org/).
- **MongoDB**: Set up a MongoDB database. You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a free cloud database.
- **OpenAI API Key**: Sign up for an API key from [OpenAI](https://platform.openai.com/).

---

## **Installation and Setup**

### **1. Clone the Repository**
```bash
  git clone https://github.com/your-username/globetrotter-game.git
  cd globetrotter-game
```

### **2. Backend Setup**

#### Navigate to the backend folder:
```bash
  cd backend
```

#### Install dependencies:
```bash
  npm install
```

#### Create a `.env` file in the `backend` directory and add the following environment variables:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

#### Start the backend server:
```bash
  npm start
```

The backend should now be running on `http://localhost:5000`.

---

### **3. Frontend Setup**

#### Navigate to the frontend folder:
```bash
  cd ../frontend
```

#### Install dependencies:
```bash
  npm install
```

#### Create a `.env` file in the `frontend` directory and add the following:
```
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_OPENAI_API_KEY=your_openai_api_key
```

#### Start the frontend application:
```bash
  npm start
```

The frontend should now be running on `http://localhost:3000`.

---

## **Running the Application**

1. **Start MongoDB** (if using local MongoDB, ensure it’s running):
```bash
  mongod
```

2. **Run the backend server:**
```bash
  cd backend
  npm start
```

3. **Run the frontend application:**
```bash
  cd frontend
  npm start
```

4. Open `http://localhost:3000` in your browser and start playing!

---

## **Deployment**

### **Backend Deployment**
1. Deploy the backend to platforms like **Heroku, Render, or AWS**.
2. Update the `MONGO_URI` to a cloud database like MongoDB Atlas.
3. Set the environment variables in your hosting platform.

### **Frontend Deployment**
1. Deploy the frontend using **Vercel, Netlify, or Firebase Hosting**.
2. Update the `REACT_APP_BACKEND_URL` in the `.env` file to point to the deployed backend.
3. Build the project:
```bash
  npm run build
```
4. Deploy the `build` folder to your hosting platform.

---

## **Contributing**

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch:
```bash
  git checkout -b feature-name
```
3. Make your changes and commit:
```bash
  git commit -m "Added new feature"
```
4. Push the changes:
```bash
  git push origin feature-name
```
5. Open a pull request.

---

## **License**

This project is licensed under the MIT License.
