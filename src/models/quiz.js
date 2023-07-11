const db = require('../db');

class Quiz {
  async create({ name, description, createdBy }) {
    const query = 'INSERT INTO quizzes (name, description, created_by) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, description, createdBy];

    try {
      const result = await db.query(query, values);
      const newQuiz = result.rows[0];
      return newQuiz;
    } catch (error) {
      throw new Error('Failed to create a new quiz');
    }
  }

  async find() {
    const query = 'SELECT * FROM quizzes';

    try {
      const result = await db.query(query);
      const quizzes = result.rows;
      return quizzes;
    } catch (error) {
      throw new Error('Failed to retrieve quizzes');
    }
  }

  async findById(quizId) {
    const query = 'SELECT * FROM quizzes WHERE id = $1';
    const values = [quizId];

    try {
      const result = await db.query(query, values);
      const quiz = result.rows[0];
      return quiz;
    } catch (error) {
      throw new Error('Failed to find the quiz');
    }
  }

  async findByIdAndUpdate(quizId, { name, description }) {
    const query = 'UPDATE quizzes SET name = $1, description = $2 WHERE id = $3 RETURNING *';
    const values = [name, description, quizId];

    try {
      const result = await db.query(query, values);
      const updatedQuiz = result.rows[0];
      return updatedQuiz;
    } catch (error) {
      throw new Error('Failed to update the quiz');
    }
  }

  async findByIdAndDelete(quizId) {
    const query = 'DELETE FROM quizzes WHERE id = $1 RETURNING *';
    const values = [quizId];

    try {
      const result = await db.query(query, values);
      const deletedQuiz = result.rows[0];
      return deletedQuiz;
    } catch (error) {
      throw new Error('Failed to delete the quiz');
    }
  }

  async closeQuiz(quizId) {
    const query = 'UPDATE quizzes SET closed = true WHERE id = $1 RETURNING *';
    const values = [quizId];

    try {
      const result = await db.query(query, values);
      const updatedQuiz = result.rows[0];
      return updatedQuiz;
    } catch (error) {
      throw new Error('Failed to close the quiz');
    }
  }
}

module.exports = new Quiz();
