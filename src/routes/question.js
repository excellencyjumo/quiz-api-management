const express = require('express');
const router = express.Router();
const { authenticateUser, checkAuthorization } = require('../middlewares/auth');
const { validateQuestionCreationMiddleware } = require('../middlewares/validator');
const Auth = require('../controllers/questionController');

// Add questions to a particular quiz
router.post('/quizzes/:quiz_id/questions', authenticateUser, checkAuthorization, validateQuestionCreationMiddleware, Auth.addQuestionToQuiz);

// Fetch all questions for a quiz
router.get('/quizzes/:quiz_id/questions', authenticateUser, Auth.getAllQuestionsForQuiz);

// Edit a question
router.put('/quizzes/:quiz_id/questions/:question_id', authenticateUser, checkAuthorization, Auth.editQuestion);

// Remove a question in a quiz
router.delete('/quizzes/:quiz_id/questions/:question_id', authenticateUser, checkAuthorization, Auth.removeQuestion);

module.exports = router;
