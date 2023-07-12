const { sendResponse } = require('../utils/helpers');
const quizModel = require('../models/quiz');
const questionModel = require('../models/question');
const userModel = require("../models/user")

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

            // Send response IF Quiz found
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
            //userAnswers are in index form 
            const userAnswers = req.body.answers; // Get the array of answers from body

            // confirm If quiz Is available
            const quizStatus = await this.checkQuizStatus(quizId);
            if (!quizStatus) {
                return sendResponse(res, 400, "Quiz Is Currently closed")
            }

            //Quiz has at least a question to answer for
            const Questions = questionModel.getAllQuestionsByQuiz(quizId);
            // Check if the quiz has any questions
            if (!Questions.length) {
                return sendResponse(res, 400, 'No questions found for the quiz');
            }

            // Check if the user has already attempted the quiz
            const hasAttempted = await userModel.checkAttempt(userId, quizId);
            if (hasAttempted) {
                return sendResponse(res, 400, 'User has already attempted the quiz');
            }

            // Perform the quiz attempt
            // Calculate the total marks for the quiz
            const totalMarks = Questions.reduce((total, question) => total + question.marks, 0);

            // Calculate the score for the user's attempt
            let score = 0;
            for (let i = 0; i < Questions.length; i++) {
                const question = Questions[i];
                const userAnswer = userAnswers[i];
                // Check if the user's answer is correct
                if (question.options[userAnswer] === question.answer) {
                    score += question.marks;
                }
            }
            // Calculate the percentage score
            const percentageScore = (score / totalMarks) * 100;

            // Record the user's attempt with the score
            await userModel.attempt(quizId, userId, percentageScore);

            // Send response
            return sendResponse(res, 200, 'Quiz attempted successfully', { score: percentageScore });
        } catch (error) {
            console.error('Error attempting quiz:', error);
            return sendResponse(res, 500, 'Internal Server Error');
        }
    }

    static async getQuizParticipants(req, res) {
        try {
            const quizId = req.params.quiz_id;

            // Get all participants for the quiz
            // userRepo {participants table repo}
            const participants = await userModel.getQuizParticipants(quizId);

            // Send response
            return sendResponse(res, 200, 'Quiz participants fetched successfully', participants);
        } catch (error) {
            console.error('Error fetching quiz participants:', error);
            return sendResponse(res, 500, 'Internal Server Error');
        }
    }

    //quizStatus is closed or Open
    static async checkQuizStatus(quizId) {
        try {
            // Check if the quiz is closed
            const quizStatus = await quizModel.quizStatus(quizId);
            // closed(false) Open(true)  
            if (quizStatus) {
                // Quiz is open, send response{true} indicating quiz is open
                return true;
            }
            // Quiz status is closed 
            return false;
        } catch (error) {
            console.error('Error checking quiz status:', error);
            throw new Error(error);
        }
    }

    static async closeQuiz(req, res) {
        try {
            const quizId = req.params.quiz_id;
            // confirm quiz Is not closed initially 
            const quizStatus = await this.checkQuizStatus(quizId);
            if (!quizStatus) {
                return sendResponse(res, 400, "Quiz closed initially")
            }

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