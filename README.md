# Fitness
Enter into the project folder.

Install backend dependencies using 
```
cd Backend
npm i
```
Run the backend 
```
npm run start
```

After this open new terminal and run these commands
```
cd frontend
npm i
npm start
```

## Features

- User Authentication:
    - Login: Users can securely log in to their accounts to access their personalized fitness plans.
    - Logout: Users can safely log out to ensure their data remains protected.
    - Register: New users can create an account to start using the FitnessPlanner.
- Workout Management:
    - Add Workout: Users can add new workout routines to their plan, specifying details such as exercise type, Load (in kg), Number of Reps
    - Edit Workout: Users can modify existing workout details to keep their fitness plans up-to-date.
    - View Workout: Users can view a detailed list of their workouts
    - Delete Workout: Users can remove workouts that are no longer relevant to their fitness goals.

## Built with

- Frontend (React)
    - React
    - React Router DOM
    - Redux
    - Redux Toolkit
    - Tailwind CSS
- Backend (Node.js and Express.js)
    - Node
    - Express
    - Cookie Parser
- Database (MongoDB)
    - MongoDB
    - MongoDB Atlas
    - Mongoose
- Security and Utilities
    - Validator
    - Bcrypt
    - JSON Web Token (jsonwebtoken)
