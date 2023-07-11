const express = require('express');
const router = express.Router();
const { authenticateUser, checkAuthorization } = require('../middlewares/auth');
const { validateQuizCreationMiddleware } = require('../middlewares/validator');
const Auth = require('../controllers/quizController');

// Create a new quiz
router.post('/quizzes/', authenticateUser, validateQuizCreationMiddleware, Auth.createQuiz);

// Fetch all quizzes for the user
router.get('/quizzes/', authenticateUser, Auth.getAllQuizzes);

// Fetch all quiz details
router.get('/quizzes/:quiz_id', authenticateUser, Auth.getQuizDetails);

// Edit quiz details
router.put('/quizzes/:quiz_id', authenticateUser, checkAuthorization, Auth.editQuiz);

// Delete a quiz
router.delete('/quizzes/:quiz_id', authenticateUser, checkAuthorization, Auth.deleteQuiz);

// Attempt the quiz
router.post('/quizzes/:quiz_id/attempt', authenticateUser, Auth.attemptQuiz);

// Fetch all quiz participants
router.get('/quizzes/:quiz_id/participants', authenticateUser, checkAuthorization, Auth.getQuizParticipants);

// Close a quiz
router.post('/quizzes/:quiz_id/close', authenticateUser, checkAuthorization, Auth.closeQuiz);

module.exports = router;