const questionRepo = require('../repo/question');

class Question {
  constructor(id, question, options, duration, quizId, marks) {
    this.id = id;
    this.question = question;
    this.options = options;
    this.duration = duration;
    this.quizId = quizId;
    this.marks = marks;
  }

  static async createQuestion(question, options, duration, quizId, marks) {
    try {
      const newQuestion = await questionRepo.createQuestion(question, options, duration, quizId, marks);

      return new Question(
        newQuestion.id,
        newQuestion.question,
        newQuestion.options,
        newQuestion.duration,
        newQuestion.quizId,
        newQuestion.marks
      );
    } catch (error) {
      throw new Error('Error creating question');
    }
  }

  static async getAllQuestionsByQuiz(quizId) {
    try {
      const questions = await questionRepo.getQuestionsByQuiz(quizId);

      return questions.map((question) => new Question(
        question.id,
        question.question,
        question.options,
        question.duration,
        question.quizId,
        question.marks
      ));
    } catch (error) {
      throw new Error('Error retrieving questions');
    }
  }

  static async getQuestionById(questionId) {
    try {
      const question = await questionRepo.getQuestionById(questionId);

      if (!question) {
        return null;
      }

      return new Question(
        question.id,
        question.question,
        question.options,
        question.duration,
        question.quizId,
        question.marks
      );
    } catch (error) {
      throw new Error('Error retrieving question');
    }
  }

  static async updateQuestion(questionId, question, duration, marks) {
    try {
      const updatedQuestion = await questionRepo.updateQuestion(questionId, question, duration, marks);
      
      return new Question(
        updatedQuestion.id,
        updatedQuestion.question,
        updatedQuestion.options,
        updatedQuestion.duration,
        updatedQuestion.quizId,
        updatedQuestion.marks
      );
    } catch (error) {
      throw new Error('Error updating question');
    }
  }

  static async deleteQuestion(questionId) {
    try {
      await questionRepo.deleteQuestion(questionId);
    } catch (error) {
      throw new Error('Error deleting question');
    }
  }
}

module.exports = Question;
