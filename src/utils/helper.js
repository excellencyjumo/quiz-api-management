const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// function to generate a JWT
const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWTSECRET, { expiresIn: process.env.expiresIn });
  return token;
};

// function to verify a JWT
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    console.log(decoded);
    return decoded.userId;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// Function to hash a password
const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Function to compare a password with its hash
const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};


const generateUniqueID = () => {
  const uuid = uuidv4();
  const id = uuid.replace(/-/g, '').slice(0, 8);
  return parseInt(id);
}

const sendResponse = async (res, status, message, data) => {
  res.status(status).json({
    status,
    message,
    data,
  })
}

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
  generateUniqueID,
  sendResponse
};
