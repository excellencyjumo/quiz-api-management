const db = require('../db');

class Question {
  async create({ quizId, question }) {
    const query = 'INSERT INTO questions (quiz_id, question) VALUES ($1, $2) RETURNING *';
    const values = [quizId, question];

    try {
      const result = await db.query(query, values);
      const newQuestion = result.rows[0];
      return newQuestion;
    } catch (error) {
      throw new Error('Failed to add a new question to the quiz');
    }
  }

  async find({ quizId }) {
    const query = 'SELECT * FROM questions WHERE quiz_id = $1';
    const values = [quizId];

    try {
      const result = await db.query(query, values);
      const questions = result.rows;
      return questions;
    } catch (error) {
      throw new Error('Failed to retrieve questions for the quiz');
    }
  }

  async findById(questionId) {
    const query = 'SELECT * FROM questions WHERE id = $1';
    const values = [questionId];

    try {
      const result = await db.query(query, values);
      const question = result.rows[0];
      return question;
    } catch (error) {
      throw new Error('Failed to find the question');
    }
  }

  async findByIdAndUpdate(questionId, { question, duration, marks }) {
    const query = 'UPDATE questions SET question = $1, duration = $2, marks = $3 WHERE id = $4 RETURNING *';
    const values = [question, duration, marks, questionId];

    try {
      const result = await db.query(query, values);
      const updatedQuestion = result.rows[0];
      return updatedQuestion;
    } catch (error) {
      throw new Error('Failed to update the question');
    }
  }

  async findByIdAndDelete(questionId) {
    const query = 'DELETE FROM questions WHERE id = $1 RETURNING *';
    const values = [questionId];

    try {
      const result = await db.query(query, values);
      const deletedQuestion = result.rows[0];
      return deletedQuestion;
    } catch (error) {
      throw new Error('Failed to delete the question');
    }
  }

  async addOptionsToQuestion(questionId, options) {
    const query = 'UPDATE questions SET options = $1 WHERE id = $2 RETURNING *';
    const values = [options, questionId];

    try {
      const result = await db.query(query, values);
      const question = result.rows[0];
      return question;
    } catch (error) {
      throw new Error('Failed to add options to the question');
    }
  }
}

module.exports = new Question();
