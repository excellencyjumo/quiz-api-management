const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');
const questionRoutes = require('./routes/question');

// Middleware
app.use(express.json());

// Routes
app.use('users/auth', authRoutes);
app.use('/quizzes', quizRoutes);
app.use('/quizzes', questionRoutes);

module.exports = app;
