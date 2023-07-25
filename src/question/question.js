const questionModel = require('./questionModel');
const { sendResponse } = require('../utils/helper');

class QuestionController {
  static async createQuestion(req, res) {
    try {
      const { question, options, duration, marks } = req.body;
      const { quizId } = req.params;

      const newQuestion = await questionModel.createQuestion(question, options, duration, quizId, marks);

      return sendResponse(res, 201, 'Question created successfully', newQuestion);
    } catch (error) {
      return sendResponse(res, 500, 'Error creating question', null);
    }
  }

  static async getAllQuestionsByQuiz(req, res) {
    try {
      const { quizId } = req.params;

      const questions = await questionModel.getAllQuestionsByQuiz(quizId);

      // verify questions are in the quiz 
      if(!questions){
        return sendResponse(res,400,"Questions not added yet")
      }

      return sendResponse(res, 200, 'Questions retrieved successfully', questions);
    } catch (error) {
      return sendResponse(res, 500, 'Error retrieving questions', null);
    }
  }

  static async getQuestionById(questionId) {
    try {
      const question = await questionModel.getQuestionById(questionId);
      if (!question) {
        return null;
      }
      return question;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateQuestion(req, res) {
    try {
      const { quizId,questionId } = req.params;
      const { question, duration, marks } = req.body;

      const response = await this.getQuestionById(questionId);
      if(!response || response.quizId !== quizId){
        return sendResponse(res, 400, 'Question not Available ', null);
      }
      
      const updatedQuestion = await questionModel.updateQuestion(questionId, question, duration, marks);

      return sendResponse(res, 200, 'Question updated successfully', updatedQuestion);
    } catch (error) {
      return sendResponse(res, 500, 'Error updating question', null);
    }
  }

  static async deleteQuestion(req, res) {
    try {
      const { quizId,questionId } = req.params;

      const response = await this.getQuestionById(questionId);
      if(!response || response.quizId !== quizId){
        return sendResponse(res, 400, 'Question not Available ', null);
      }

      // deleting question from {Questions}-table in database
      await questionModel.deleteQuestion(questionId);

      return sendResponse(res, 200, 'Question deleted successfully', null);
    } catch (error) {
      return sendResponse(res, 500, 'Error deleting question', null);
    }
  }
}

module.exports = QuestionController;
