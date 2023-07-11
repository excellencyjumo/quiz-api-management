//JOI VALIDATOR 
const Joi = require('joi');

//  validation function for user sign-up
const validateSignUp = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
  });

  try {
    const validatedData = schema.validate(data);
    return validatedData;
  } catch (error) {
    throw new Error('Validation error');
  }
};

// Validation function for user login
const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  try{
    return schema.validate(data);
  } catch(error){
    throw new Error("Validation error: ",error.toString())
  }
};

// Validation function for quiz creation
const validateQuizCreation = (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
    });
  
    try {
      const validatedData = schema.validate(data);
      return validatedData;
    } catch (error) {
      throw new Error('Validation error');
    }
  };
  
  // Validation function for question creation
  const validateQuestionCreation = (data) => {
    const schema = Joi.object({
      question: Joi.string().required(),
      options: Joi.array().items(Joi.string()).min(2).max(4).required(),
      duration: Joi.date().required(),
      marks: Joi.number().integer().min(1).required(),
    });
  
    try {
      const validatedData = schema.validate(data);
      return validatedData;
    } catch (error) {
      throw new Error('Validation error');
    }
  };
  
  module.exports = {
    validateSignUp,
    validateLogin,
    validateQuizCreation,
    validateQuestionCreation,
  };