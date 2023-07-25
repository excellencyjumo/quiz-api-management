const userRepo = require('./userRepo');

class User {
  static async attempt(userId, quizId, score) {
    try {
      // Record the user's attempt with the score
      await userRepo.attempt(userId, quizId, score);
      return;
    } catch (error) {
      throw new Error('Error recording user attempt');
    }
  }

  static async checkAttempt(userId, quizId) {
    try {
      return await userRepo.checkAttempt(userId, quizId);
    } catch (error) {
      throw new Error('Error checking user attempt');
    }
  }

  static async getQuizParticipants(quizId) {
    try {
      return await userRepo.getQuizParticipants(quizId);
    } catch (error) {
      throw new Error('Error fetching quiz participants');
    }
  }

  static async getScore(userId, quizId) {
    try {
      return await userRepo.getScore(userId, quizId);
    } catch (error) {
      throw new Error('Error retrieving user score');
    }
  }

  static async genScoreCard(userId) {
    try {
      return await userRepo.genScoreCard(userId);
    } catch (error) {
      throw new Error('Error generating user score card');
    }
  }
}

module.exports = User;
