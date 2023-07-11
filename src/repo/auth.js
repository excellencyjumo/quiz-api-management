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
      const query = 'SELECT * FROM users WHERE id = $1';
      const values = [userId];
      const result = await db.query(query, values);

      return result.rows[0] || null;
    } catch (error) {
      throw new Error('Error retrieving user by ID');
    }
  }

  static async createUser(email, password, firstName, lastName) {
    try {
      const query = 'INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *';
      const values = [email, password, firstName, lastName];
      const result = await db.query(query, values);

      return result.rows[0];
    } catch (error) {
      throw new Error('Error creating user');
    }
  }
}

module.exports = { UserRepository };
