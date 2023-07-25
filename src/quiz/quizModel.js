const quizRepo = require("./quizRepo.js");

class Quiz {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  static async create(quizId,name, description, createdBy) {
    try {
      const newQuiz = await quizRepo.createQuiz(quizId, name, description, createdBy);
      console.log(newQuiz)
      return new Quiz(
        newQuiz.id,
        newQuiz.name,
        newQuiz.description,
      );

    } catch (error) {
      throw new Error(error);
    }
  }

  static async find(userId) {
    try {
      const quizzes = await quizRepo.getAllQuizzesByUser(userId);

      return quizzes.map((quiz) => new Quiz(
        quiz.id,
        quiz.name,
        quiz.description
      ));
    } catch (error) {
      throw new Error('Error retrieving quizzes by user');
    }
  }

  static async findById(quizId) {
    try {
      const quiz = await quizRepo.findById(quizId);

      if (!quiz) {
        return null;
      }

      return new Quiz(
        quiz.id,
        quiz.name,
        quiz.description
      );
    } 
    catch (error) {
      throw new Error('Error retrieving quiz by ID');
    }
  }

  static async updateQuiz(quizId, name, description) {
    try {
      const updatedQuiz = await quizRepo.updateQuiz(quizId, name, description);

      return new Quiz(
        updatedQuiz.id,
        updatedQuiz.name,
        updatedQuiz.description
      );
    } catch (error) {
      throw new Error('Error updating quiz');
    }
  }

  static async deleteQuiz(quizId) {
    try {
      await quizRepo.deleteQuiz(quizId);
    } catch (error) {
      throw new Error('Error deleting quiz');
    }
  }

  static async quizStatus(quizId) {
    try {
      return await quizRepo.quizStatus(quizId);
    } catch (error) {
      throw new Error('Error checking quiz STATUS');
    }
  }

  static async closeQuiz(quizId) {
    try {
      await quizRepo.closeQuiz(quizId);
    } catch (error) {
      throw new Error('Error closing quiz');
    }
  }
}

module.exports = Quiz;
