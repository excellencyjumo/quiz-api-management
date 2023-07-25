const db = require('../config/db');

class User {
    static async attempt(userId, quizId, score) {
        try {
            const query = 'INSERT INTO participants (participant_id, quiz_id, score) VALUES ($1, $2, $3)';
            const values = [userId, quizId, score];
            await db.query(query, values);
        } catch (error) {
            throw new Error('Error recording user attempt');
        }
    }

    static async checkAttempt(userId, quizId) {
        try {
            const query = 'SELECT COUNT(*) FROM participants WHERE participant_id = $1 AND quiz_id = $2';
            const values = [userId, quizId];
            const result = await db.query(query, values);
            return result.rows[0].count > 0;
        } catch (error) {
            throw new Error('Error checking user attempt');
        }
    }

    static async getQuizParticipants(quizId) {
        try {
            const query = 'SELECT * FROM Participants WHERE quiz_id = $1';
            const values = [quizId];
            const result = await db.query(query, values);

            return result.rows;
        } catch (error) {
            throw new Error('Error fetching quiz participants from database');
        }
    }

    static async getScore(userId, quizId) {
        try {
            const query = 'SELECT score FROM participants WHERE participant_id = $1 AND quiz_id = $2';
            const values = [userId, quizId];
            const result = await db.query(query, values);
            return result.rows[0].score;
        } catch (error) {
            throw new Error('Error retrieving user score');
        }
    }
    static async genScoreCard(userId) {
        try {
            const query = `
            SELECT 
              AVG(score) AS average_score
            FROM participants
            WHERE participant_id = $1
            GROUP BY participant_id
          `;
            const values = [userId];
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error('Error generating user score card');
        }
    }
}

module.exports = User;