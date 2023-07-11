const express = require('express');
const router = express.Router();
const { authenticateUser, checkAuthorization } = require('../middlewares/auth');
const { validateQuizCreationMiddleware } = require('../middlewares/validator');
const quizController = require('../controllers/quiz');

// Create a new quiz
router.post('/', authenticateUser, validateQuizCreationMiddleware, quizController.createQuiz);

// Fetch all quizzes for the user
router.get('/', authenticateUser, quizController.getAllQuizzes);

// Fetch all quiz details
router.get('/:quiz_id', authenticateUser, quizController.getQuizDetails);

// Edit quiz details
router.put('/:quiz_id', authenticateUser, checkAuthorization, quizController.editQuiz);

// Delete a quiz
router.delete('/:quiz_id', authenticateUser, checkAuthorization, quizController.deleteQuiz);

// Attempt the quiz
router.post('/:quiz_id/attempt', authenticateUser, quizController.attemptQuiz);

// Fetch all quiz participants
router.get('/:quiz_id/participants', authenticateUser, checkAuthorization, quizController.getQuizParticipants);

// Close a quiz
router.post('/:quiz_id/close', authenticateUser, checkAuthorization, quizController.closeQuiz);

module.exports = router;