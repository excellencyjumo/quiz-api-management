const db = require('../config/db');

class QuizRepository {
  static async createQuiz(quizId,name, description, createdBy) {
    try {
      const query = 'INSERT INTO quizzes (quiz_id,name, description, created_by) VALUES ($1, $2, $3, $4)';
      const values = [quizId, name, description, createdBy];
      await db.query(query, values);
      const result = await this.findById(quizId)
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAllQuizzesByUser(userId) {
    try {
      const query = 'SELECT * FROM quizzes WHERE created_by = $1';
      const values = [userId];
      const result = await db.query(query, values);

      return result.rows;
    } catch (error) {
      throw new Error('Error retrieving quizzes by user');
    }
  }

  static async findById(quizId) {
    try {
      const query = 'SELECT * FROM quizzes WHERE quiz_id = $1';
      const values = [quizId];
      const result = await db.query(query, values);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error('Error retrieving quiz by ID');
    }
  }

  static async updateQuiz(quizId, name, description) {
    try {
      const query = 'UPDATE quizzes SET name = $1, description = $2 WHERE quiz_id = $3 RETURNING *';
      const values = [name, description, quizId];
      const result = await db.query(query, values);

      return result.rows[0];
    } catch (error) {
      throw new Error('Error updating quiz');
    }
  }

  static async deleteQuiz(quizId) {
    try {
      const query = 'DELETE FROM quizzes WHERE quiz_id = $1';
      const values = [quizId];
      await db.query(query, values);
    } catch (error) {
      throw new Error('Error deleting quiz');
    }
  }

  static async checkUserAttempt(quizId, userId) {
    try {
      const query = 'SELECT COUNT(*) FROM participations WHERE quiz_id = $1 AND participant_id = $2';
      const values = [quizId, userId];
      const result = await db.query(query, values);

      return result.rows[0].count > 0;
    } catch (error) {
      throw new Error('Error checking user attempt');
    }
  }

  static async isQuizOpen(quizId) {
    try {
      const query = 'SELECT status FROM quizzes WHERE id = $1';
      const values = [quizId];
      const result = await db.query(query, values);

      return result.rows[0].status; // Return the status value (true/false)
    } catch (error) {
      throw new Error('Error checking quiz status');
    }
  }

  static async closeQuiz(quizId) {
    try {
      const query = 'UPDATE quizzes SET closed_at = NOW() WHERE id = $1';
      const values = [quizId];
      await db.query(query, values);
    } catch (error) {
      throw new Error('Error closing quiz');
    }
  }
}

module.exports = QuizRepository
