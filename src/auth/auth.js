const { generateToken, hashPassword, comparePassword, generateUniqueID, sendResponse } = require('../utils/helper');
const Auth = require('./authModel');

// Sign up a user
const signUp = async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body;

    // Check if user already exists
    console.log(email.toLowerCase())
    const existingUser = await Auth.getUserByEmail(email.toLowerCase());
    if (existingUser) {
      return sendResponse(res, 400, 'User already exists');
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    //generate uniqueId for user
    const userId=generateUniqueID();
    console.log(userId)
    // Create the user
    const newUser = await Auth.createUser(userId,email, hashedPassword, firstname, lastname);

    // Generate JWT token
    const token = generateToken(newUser.user_id);
    console.log(newUser)
    // Set the token in the cookies
    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
      sameSite: 'strict' // Set the desired SameSite attribute
    });
    // Send response
    return sendResponse(res, 201, 'User created successfully', { token, newUser });
  } catch (error) {
    console.error('Error signing up:', error);
    return sendResponse(res, 500, 'Internal Server Error');
  }
};

// Log in a user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await Auth.getUserByEmail(email);

    if (!user) {
      return sendResponse(res, 401, 'Invalid Email');
    }

    // Compare passwords
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return sendResponse(res, 401, 'Invalid password');
    }

    // Generate JWT token
    const token = generateToken(user.user_id);
    // Set the token in the cookies
    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
      sameSite: 'strict' // Set the desired SameSite attribute
      });
    // Send response
    return sendResponse(res, 200, 'Login successful', { token });
  } catch (error) {
    console.error('Error logging in:', error);
    return sendResponse(res, 500, 'Internal Server Error');
  }
};

module.exports = {
  signUp,
  login,
};
