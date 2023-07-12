const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user')
const quizRoutes = require('./routes/quiz');
const questionRoutes = require('./routes/question');

// Middleware
app.use(express.json());

// Routes
app.use('users/auth', authRoutes);
app.use('/users',userRoutes)
app.use('/quizzes', quizRoutes);
app.use('/quizzes', questionRoutes);

module.exports = app;
