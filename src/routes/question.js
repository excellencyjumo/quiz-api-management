const express = require('express');
const router = express.Router();
const { authenticateUser, checkAuthorization } = require('../middlewares/auth');
const { validateQuestionCreationMiddleware } = require('../middlewares/validator');
const questionController = require('../controllers/question');

// Add questions to a particular quiz
router.post('/:quiz_id/questions', authenticateUser, checkAuthorization, validateQuestionCreationMiddleware, questionController.createQuestion);

// Fetch all questions for a quiz
router.get('/:quiz_id/questions', authenticateUser, questionController.getAllQuestionsByQuiz);

// Edit a question
router.put('/:quiz_id/questions/:question_id', authenticateUser, checkAuthorization, questionController.updateQuestion);

// Remove a question in a quiz
router.delete('/:quiz_id/questions/:question_id', authenticateUser, checkAuthorization, questionController.deleteQuestion);

module.exports = router;
