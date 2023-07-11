const { sendResponse } = require('../utils/helpers');
const quizModel = require('../models/quiz');

class QuizController {
    static async createQuiz(req, res) {
        try {
            const { name, description } = req.body;
            const userId = req.user.id; // Get the authenticated user's ID

            // Create the quiz
            const newQuiz = await quizModel.create(name, description, userId);

            // Send response
            return sendResponse(res, 201, 'Quiz created successfully', newQuiz);
        } catch (error) {
            console.error('Error creating quiz:', error);
            return sendResponse(res, 500, 'Internal Server Error');
        }
    }

    static async getAllQuizzes(req, res) {
        try {
            const userId = req.user.id; // Get the authenticated user's ID

            // Get all quizzes for the user
            const quizzes = await quizModel.find(userId);

            // Unavailable quiz created by User
            if (!quizzes) {
                return sendResponse(res, 404, 'Quizzes not Found');
            }

            // Send response
            return sendResponse(res, 200, 'Quizzes fetched successfully', quizzes);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
            return sendResponse(res, 500, 'Internal Server Error');
        }
    }

    static async getQuizDetails(req, res) {
        try {
            const quizId = req.params.quiz_id;

            // Get the quiz details
            const quiz = await quizModel.findById(quizId);

            if (!quiz) {
                return sendResponse(res, 404, 'Quiz not found');
            }

            // Send response
            return sendResponse(res, 200, 'Quiz details fetched successfully', quiz);
        } catch (error) {
            console.error('Error fetching quiz details:', error);
            return sendResponse(res, 500, 'Internal Server Error');
        }
    }

    static async editQuiz(req, res) {
        try {
            const quizId = req.params.quiz_id;
            const { name, description } = req.body;

            // Edit the quiz details
            const updatedQuiz = await quizModel.findByIdAndUpdate(quizId, name, description);

            // Send response
            return sendResponse(res, 200, 'Quiz details updated successfully', updatedQuiz);
        } catch (error) {
            console.error('Error editing quiz details:', error);
            return sendResponse(res, 500, 'Internal Server Error');
        }
    }

    static async deleteQuiz(req, res) {
        try {
            const quizId = req.params.quiz_id;

            // Delete the quiz
            await quizModel.findByIdAndDelete(quizId);

            // Send response
            return sendResponse(res, 200, 'Quiz deleted successfully');
        } catch (error) {
            console.error('Error deleting quiz:', error);
            return sendResponse(res, 500, 'Internal Server Error');
        }
    }

    static async attemptQuiz(req, res) {
        try {
            const quizId = req.params.quiz_id;
            const userId = req.user.id; // Get the authenticated user's ID

            // Check if the user has already attempted the quiz
            const hasAttempted = await quizModel.(quizId, userId);

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
    }

    static async getQuizParticipants(req, res) {
        try {
            const quizId = req.params.quiz_id;
            // Get all participants for the quiz
            const participants = await UserRepository.getQuizParticipants(quizId);

            // Send response
            return sendResponse(res, 200, 'Quiz participants fetched successfully', participants);
        } catch (error) {
            console.error('Error fetching quiz participants:', error);
            return sendResponse(res, 500, 'Internal Server Error');
        }
    }

    static async checkQuizStatus(req, res) {
        try {
          const quizId = req.params.quiz_id;
      
          // Check if the quiz is closed
          const isClosed = await quizModel.isQuizClosed(quizId);
      
          if (isClosed) {
            // Quiz is closed, send response indicating quiz closed
            return sendResponse(res, 200, 'Quiz is closed');
          }
      
          // Continue with further operations in method used
          //...

        } catch (error) {
          console.error('Error checking quiz status:', error);
          return sendResponse(res, 500, 'Internal Server Error');
        }
      }

    static async closeQuiz(req, res) {
        try {
            const quizId = req.params.quiz_id;

            await this.checkQuizStatus(req,res);

            // Close the quiz
            await quizModel.closeQuiz(quizId);

            // Send response
            return sendResponse(res, 200, 'Quiz closed successfully');
        } catch (error) {
            console.error('Error closing quiz:', error);
            return sendResponse(res, 500, 'Internal Server Error');
        }
    }
}

module.exports = QuizController;