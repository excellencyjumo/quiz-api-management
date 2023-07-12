# Quiz Management API

This API provides endpoints for managing quizzes, questions, and user authentication.

## Features

- User registration and login
- User authentication using JWT stored in cookies
- Quiz creation, retrieval, update, and deletion
- Question creation, retrieval, update, and deletion
- Participant management for quizzes
- Quiz attempt and scoring


## Installation

1. Clone the repository: git clone https://github.com/excellencyjumo/quiz-management-api.git
2. Install the dependencies:
cd quiz-management-api
npm install

3. Configure the environment variables:

- Create the `.env` file in your root folder.
- Update the database connection details and other configuration settings in the `.env` file.

4. Start the server:

- npm start 

## API Documentation

The API documentation is available on Postman. You can access it [here](link-to-postman-documentation).

- Please refer to the documentation for comprehensive information on each route, 
- Including detailed descriptions and examples of the request and response.  

## Usage

- Register a new user using the `/users/auth` endpoint.
- Log in with the registered user using the `/users/auth/login` endpoint.
- Use the provided JWT token for authentication in subsequent requests.(stored in cookie header)
- Create quizzes using the `/quizzes` endpoint.
- Add questions to quizzes using the `/quizzes/:quiz_id/questions` endpoint.
- Manage participants, quiz attempts, and scoring using the respective endpoints.
- Refer to the API documentation for more details on each endpoint.

## Testing

To run the tests, use the following command:

- npm test

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- JOI Validator
- JSON Web Tokens (JWT)
- Jest (for testing)

## License

This project is licensed under the [MIT License](link-to-license-file).