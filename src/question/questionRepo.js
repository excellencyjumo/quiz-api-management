const db = require('../config/db');

class QuestionRepository {
  static async createQuestion(question, options, duration, quizId, marks) {
    try {
      const query = 'INSERT INTO questions (question, options, duration, quiz_id, marks) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const values = [question, options, duration, quizId, marks];
      const result = await db.query(query, values);

      return result.rows[0];
    } catch (error) {
      throw new Error('Error creating question');
    }
  }

  static async getQuestionsByQuiz(quizId) {
    try {
      const query = 'SELECT * FROM questions WHERE quiz_id = $1';
      const values = [quizId];
      const result = await db.query(query, values);

      return result.rows;
    } catch (error) {
      throw new Error('Error retrieving questions by quiz');
    }
  }

  static async getQuestionById(questionId) {
    try {
      const query = 'SELECT * FROM questions WHERE id = $1';
      const values = [questionId];
      const result = await db.query(query, values);

      return result.rows[0] || null;
    } catch (error) {
      throw new Error('Error retrieving question by ID');
    }
  }

  static async updateQuestion(questionId, question, duration, marks) {
    try {
      // Extract the question text and options from the question parameter
      const { questionText, options } = question;
  
      const query = 'UPDATE questions SET question = $1, options = $2, duration = $3, marks = $4 WHERE id = $5 RETURNING *';
      const values = [questionText, options, duration, marks, questionId];
      const result = await db.query(query, values);
  
      return result.rows[0];
    } catch (error) {
      throw new Error('Error updating question');
    }
  }


  static async deleteQuestion(questionId) {
    try {
      const query = 'DELETE FROM questions WHERE id = $1';
      const values = [questionId];
      await db.query(query, values);
    } catch (error) {
      throw new Error('Error deleting question');
    }
  }
}

module.exports = QuestionRepository;
