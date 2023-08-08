const express = require('express');
const app = express();
const authRoutes = require('./auth/authRoute');
const userRoutes = require('./participant/userRoute')
const quizRoutes = require('./quiz/quizRoute');
const questionRoutes = require('./question/questionRoute');

// JSON BODY
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/users',userRoutes)
app.use('/quizzes', quizRoutes);
app.use('/quizzes', questionRoutes);

module.exports = app;
