const Auth = require('../repo/auth');

class User {
  constructor(id, email, firstName, lastName) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static async getUserByEmail(email) {
    try {
      const user = await Auth.getUserByEmail(email);
      return user;
    } catch (error) {
      throw new Error('Error retrieving user');
    }
  }

  static async createUser(email, password, firstName, lastName) {
    try {
      // Create the user in the repository
      const newUser = await Auth.createUser(email, password, firstName, lastName);

      return new User(newUser.id, newUser.email, newUser.firstName, newUser.lastName);
    } catch (error) {
      throw new Error('Error creating user');
    }
  }

}

module.exports = User;
