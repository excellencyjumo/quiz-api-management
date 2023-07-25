const db = require('../config/db');

class UserRepository {
  static async getUserByEmail(email) {
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const values = [email];
      const result = await db.query(query, values);

      return result.rows[0] || null;
    } catch (error) {
      throw new Error('Error retrieving user by email');
    }
  }

  static async getUserById(userId) {
    try {
      const query = 'SELECT * FROM users WHERE user_id = $1';
      const values = [userId];
      const result = await db.query(query, values);

      return result.rows[0] || null;
    } catch (error) {
      throw new Error('Error retrieving user by ID');
    }
  }

  static async createUser(userId,email, password, firstName, lastName) {
    try {
      const query = 'INSERT INTO users (user_id,email, password, firstname, lastname) VALUES ($1, $2, $3, $4, $5)';
      const values = [userId,email, password, firstName, lastName];
      await db.query(query, values);
      return this.getUserById(userId);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = UserRepository;
