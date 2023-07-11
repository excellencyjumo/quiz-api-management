const { sendResponse } = require('../utils/helpers');
const { QuizRepository } = require('../repo/quiz');
const { UserRepository } = require('../repo/auth');

// Create a new quiz
const createQuiz = async (req, res) => {
    try {
        const { name, description } = req.body;
        const userId = req.user.id; // Get the authenticated user's ID

        // Create the quiz
        const newQuiz = await QuizRepository.createQuiz(name, description, userId);

        // Send response
        return sendResponse(res, 201, 'Quiz created successfully', newQuiz);
    } catch (error) {
        console.error('Error creating quiz:', error);
        return sendResponse(res, 500, 'Internal Server Error');
    }
};

// Fetch all quizzes for the user
const getAllQuizzes = async (req, res) => {
    try {
        const userId = req.user.id; // Get the authenticated user's ID

        // Get all quizzes for the user
        const quizzes = await QuizRepository.getAllQuizzesByUser(userId);
        // Unavailable
        if (!quizzes) {
            return sendResponse(res, 404, 'Quizzes not Found');
        }
        // Send response
        return sendResponse(res, 200, 'Quizzes fetched successfully', quizzes);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        return sendResponse(res, 500, 'Internal Server Error');
    }
};

// Fetch all quiz details
const getQuizDetails = async (req, res) => {
    try {
        const quizId = req.params.quiz_id;

        // Get the quiz details
        const quiz = await QuizRepository.getQuizById(quizId);

        if (!quiz) {
            return sendResponse(res, 404, 'Quiz not found');
        }

        // Send response
        return sendResponse(res, 200, 'Quiz details fetched successfully', quiz);
    } catch (error) {
        console.error('Error fetching quiz details:', error);
        return sendResponse(res, 500, 'Internal Server Error');
    }
};

// Edit quiz details
const editQuiz = async (req, res) => {
    try {
        const quizId = req.params.quiz_id;
        const { name, description } = req.body;
        
        // Edit the quiz details
        const updatedQuiz = await QuizRepository.updateQuiz(quizId, name, description);

        // Send response
        return sendResponse(res, 200, 'Quiz details updated successfully', updatedQuiz);
    } catch (error) {
        console.error('Error editing quiz details:', error);
        return sendResponse(res, 500, 'Internal Server Error');
    }
};

// Delete a quiz
const deleteQuiz = async (req, res) => {
    try {
        const quizId = req.params.quiz_id;
        const userId = req.user.id; // Get the authenticated user's ID

        // Delete the quiz
        await QuizRepository.deleteQuiz(quizId);

        // Send response
        return sendResponse(res, 200, 'Quiz deleted successfully');
    } catch (error) {
        console.error('Error deleting quiz:', error);
        return sendResponse(res, 500, 'Internal Server Error');
    }
};

// Attempt the quiz
const attemptQuiz = async (req, res) => {
    try {
        const quizId = req.params.quiz_id;
        const userId = req.user.id; // Get the authenticated user's ID

        // Check if the user has already attempted the quiz
        const hasAttempted = await QuizRepository.checkUserAttempt(quizId, userId);

        if (hasAttempted) {
            return sendResponse(res, 400, 'User has already attempted the quiz');
        }

        // Perform the quiz attempt
        // ...

        // Send response
        return sendResponse(res, 200, 'Quiz attempted successfully');
    } catch (error) {
        console.error('Error attempting quiz:', error);
        return sendResponse(res, 500, 'Internal Server Error');
    }
};

// Fetch all quiz participants
const getQuizParticipants = async (req, res) => {
    try {
        const quizId = req.params.quiz_id;
        const userId = req.user.id; // Get the authenticated user's ID

        // Get all participants for the quiz
        const participants = await UserRepository.getQuizParticipants(quizId);

        // Send response
        return sendResponse(res, 200, 'Quiz participants fetched successfully', participants);
    } catch (error) {
        console.error('Error fetching quiz participants:', error);
        return sendResponse(res, 500, 'Internal Server Error');
    }
};

// Close a quiz
const closeQuiz = async (req, res) => {
    try {
        const quizId = req.params.quiz_id;
        
        // Close the quiz
        await QuizRepository.closeQuiz(quizId);

        // Send response
        return sendResponse(res, 200, 'Quiz closed successfully');
    } catch (error) {
        console.error('Error closing quiz:', error);
        return sendResponse(res, 500, 'Internal Server Error');
    }
};

module.exports = {
    createQuiz,
    getAllQuizzes,
    getQuizDetails,
    editQuiz,
    deleteQuiz,
    attemptQuiz,
    getQuizParticipants,
    closeQuiz,
};
