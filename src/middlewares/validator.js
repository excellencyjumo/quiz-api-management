const { validateSignUp,validateLogin, validateQuizCreation, validateQuestionCreation } = require('../utils/validator');
const { sendResponse } = require('../utils/helper');

// Middleware for validating user sign-up data
const validateSignUpMiddleware = (req, res, next) => {
  const { error } = validateSignUp(req.body);
  if (error) {
    return sendResponse(res, 400,error.details[0].message);
  }
  next();
};

// Middleware for validating user login data
const validateLoginMiddleware = (req, res, next) => {
  const { error } = validateLogin(req.body);
  if (error) {
    return sendResponse(res, 400,error.details[0].message);
  }
  next();
};

// Middleware for validating quiz creation data
const validateQuizCreationMiddleware = (req, res, next) => {
  const { error } = validateQuizCreation(req.body);
  if (error) {
    return sendResponse(res, 400,error.details[0].message);
  }
  next();
};

// Middleware for validating question creation data
const validateQuestionCreationMiddleware = (req, res, next) => {
  const { error } = validateQuestionCreation(req.body);
  if (error) {
    return sendResponse(res, 400,error.details[0].message);
  }
  next();
};

module.exports = {
  validateSignUpMiddleware,
  validateLoginMiddleware,
  validateQuizCreationMiddleware,
  validateQuestionCreationMiddleware,
};
