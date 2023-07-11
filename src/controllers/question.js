const { sendResponse } = require('../utils/jwtUtils');
const { QuestionRepository } = require('../repo/questionRepo');

// Add questions to a particular quiz
const addQuestionToQuiz = async (req, res) => {
  try {
    const quizId = req.params.quiz_id;
    const { question, options } = req.body;

    // Add the question to the quiz
    const newQuestion = await QuestionRepository.addQuestionToQuiz(quizId, question, options);

    // Send response
    return sendResponse(res, 201, 'Question added to quiz successfully', newQuestion);
  } catch (error) {
    console.error('Error adding question to quiz:', error);
    return sendResponse(res, 500, 'Internal Server Error');
  }
};

// Fetch all questions for a quiz
const getAllQuestionsForQuiz = async (req, res) => {
  try {
    const quizId = req.params.quiz_id;

    // Get all questions for the quiz
    const questions = await QuestionRepository.getAllQuestionsForQuiz(quizId);

    // Send response
    return sendResponse(res, 200, 'Questions fetched successfully', questions);
  } catch (error) {
    console.error('Error fetching questions for quiz:', error);
    return sendResponse(res, 500, 'Internal Server Error');
  }
};

// Edit a question
const editQuestion = async (req, res) => {
  try {
    const questionId = req.params.question_id;
    const { question, options } = req.body;

    // Edit the question
    const updatedQuestion = await QuestionRepository.editQuestion(questionId, question, options);

    // Send response
    return sendResponse(res, 200, 'Question edited successfully', updatedQuestion);
  } catch (error) {
    console.error('Error editing question:', error);
    return sendResponse(res, 500, 'Internal Server Error');
  }
};

// Remove a question from a quiz
const removeQuestion = async (req, res) => {
  try {
    const questionId = req.params.question_id;

    // Remove the question
    await QuestionRepository.removeQuestion(questionId);

    // Send response
    return sendResponse(res, 200, 'Question removed successfully');
  } catch (error) {
    console.error('Error removing question:', error);
    return sendResponse(res, 500, 'Internal Server Error');
  }
};

module.exports = {
  addQuestionToQuiz,
  getAllQuestionsForQuiz,
  editQuestion,
  removeQuestion,
};
