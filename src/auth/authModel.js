const Auth = require('./authRepo');

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

  static async createUser(userId, email, password, firstName, lastName) {
    try {
      // Create the user in the repository
      const newUser = await Auth.createUser(userId, email, password, firstName, lastName);
  
      return new User(newUser.user_id, newUser.email, newUser.firstname, newUser.lastname);
    } catch (error) {
      throw error;
    }
  }
  

}

module.exports = User;
