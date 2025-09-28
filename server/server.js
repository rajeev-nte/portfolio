// import express from 'express';
// import cors from 'cors';
// import dotenv from "dotenv";
// dotenv.config();

// // import dotenv from 'dotenv';
// // import 'dotenv/config';
// import cookieParser from 'cookie-parser';
// import connectDB from './config/mongodb.js';
// import authRouter from './routes/authRoutes.js'
// import userRouter from './routes/userRoutes.js';


// const app = express();
// const PORT = process.env.PORT || 5000;
// connectDB();

// const allowedOrigins = ['http://localhost:5173']

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({origin:allowedOrigins,
//   credentials: true
// }));

// //API Endpoints
// app.get('/', (req, res) => res.send('api working fine'));
// app.use('/api/auth',authRouter);
// app.use('/api/user', userRouter);

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`)})
// console.log('rajeev kumar');

// import express from 'express';
// import cors from 'cors';
// import dotenv from "dotenv";
// import cookieParser from 'cookie-parser';
// import connectDB from './config/mongodb.js';
// import authRouter from './routes/authRoutes.js';
// import userRouter from './routes/userRoutes.js';

// // Load .env file from server/ folder
// dotenv.config({ path: "./server/.env" });

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Debugging: check if env is loading
// console.log("MONGODB_URL:", process.env.MONGODB_URL);

// connectDB();

// const allowedOrigins = ['http://localhost:5173'];

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true
// }));

// // API Endpoints
// app.get('/', (req, res) => res.send('API working fine'));
// app.use('/api/auth', authRouter);
// app.use('/api/user', userRouter);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows your frontend (on port 3000) to talk to your backend (on port 5000)
app.use(express.json()); // Allows the server to accept and parse JSON data in requests

// MongoDB Connection
const uri = process.env.MONGODB_URL; // Your connection string from MongoDB Atlas
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// API Routes
const portfoliosRouter = require('./routes/portfolios');
app.use('/api/portfolios', portfoliosRouter); // Any request to /api/portfolios will be handled by this router

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


