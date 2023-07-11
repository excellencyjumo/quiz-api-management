const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const questionRoutes = require('./routes/questionRoutes');

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/quizzes', quizRoutes);
app.use('/questions', questionRoutes);

module.exports = app;
