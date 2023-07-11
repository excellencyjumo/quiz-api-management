const {verifyToken} = require("../utils/helper")
require('dotenv').config();
const db = require('../config/db');

// Middleware to authenticate the user
const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return sendResponse(res, 401,'Unauthorized');
  }

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return sendResponse(res, 401,'Unauthorized');
  }
};

// Middleware to check if the user is authorized to access the quiz or question
const checkAuthorization = async (req, res, next) => {
  const userId = req.userId;
  const quizId = req.params.quiz_id; // Change as per your route parameters

  try {
    // Query the database to check ownership
    const query = `
      SELECT *
      FROM quizzes
      WHERE quiz_id = $1 AND created_by = $2
    `;
    const values = [quizId, userId];

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return sendResponse(res, 403,'Forbidden');
    }

    next();
  } catch (error) {
    console.error('Error checking authorization:', error);
    return sendResponse(res, 500,'Internal Server Error');
  }
};

module.exports = {
  authenticateUser,
  checkAuthorization,
};
