const { sendResponse } = require('../utils/helper');
const userModel = require('./userModel');

class UserController {

// Redundant-Code
/**  static async attemptQuiz(req, res) {
    try {
      const userId = req.user.id;
      const quizId = req.params.quiz_id;
      const score = req.body.score;

      await userModel.attempt(userId, quizId, score);

      return sendResponse(res, 200, 'Quiz attempted successfully');
    } catch (error) {
      console.error('Error attempting quiz:', error);
      return sendResponse(res, 500, 'Internal Server Error');
    }
  }

  static async checkAttempt(req, res) {
    try {
      const userId = req.user.id;
      const quizId = req.params.quiz_id;

      const hasAttempted = await userModel.checkAttempt(userId, quizId);

      return sendResponse(res, 200, 'Check attempt status successfully', { hasAttempted });
    } catch (error) {
      console.error('Error checking attempt status:', error);
      return sendResponse(res, 500, 'Internal Server Error');
    }
  } **/

  static async getScoreCard(req, res) {
    try {
      const userId = req.user.id;
      const quizId = req.params.quiz_id;

      const score = await userModel.getScore(userId, quizId);

      return sendResponse(res, 200, 'Score retrieved successfully', { score });
    } catch (error) {
      console.error('Error retrieving score:', error);
      return sendResponse(res, 500, 'Internal Server Error');
    }
  }

  static async generateScoreCard(req, res) {
    try {
      const userId = req.user.id;

      const scoreCard = await userModel.genScoreCard(userId);

      return sendResponse(res, 200, 'Score card generated successfully', scoreCard);
    } catch (error) {
      console.error('Error generating score card:', error);
      return sendResponse(res, 500, 'Internal Server Error');
    }
  }
}

module.exports = UserController;
