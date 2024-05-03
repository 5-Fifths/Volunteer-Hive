class User {
  // Size of fullName array
  FULL_NAME_SIZE = 3;

  // Number of skills per user
  MAX_SKILL_ARRAY_SIZE = 20;

  fullName = new Array(this.FULL_NAME_SIZE); // [First, Middle Initial, Last]
  bio;
  skills = new Set();

  constructor(fullName) {
    this.fullName = fullName.slice();
    this.bio = '';
    this.skills = new Set();
  }

  // Method for attempting login
  attemptLogin(username, hash) {
      // Placeholder for the actual database check
      const query = `SELECT password FROM login WHERE username = '${username}'`;
      let tableEntry = ''; // Simulated database response

      return tableEntry === hash;
  }

  // Method for registering a user
  register(username, hash, accType) {
      const query = `INSERT INTO login (username, password, accType) VALUES ('${username}', '${hash}', ${accType})`;
      // Simulate database query execution
      //console.log(query); // For demonstration
  }

  // Users can change their profile information
  editBio(s) {
    if (s.length <= 500) {
      this.bio = s;
    }
  }

  // Users can change their name
  editPreferredName(newName) {
    for (let i = 0; i < this.FULL_NAME_SIZE; i++) {
      if (newName[i] !== '') {
        this.fullName[i] = newName[i];
      }
    }
  }

  // Users can add skills on their public account
  addSkill(skill) {
    if (this.skills.size < this.MAX_SKILL_ARRAY_SIZE && skill) {
      this.skills.add(skill);
    }
  }

  // Users can edit the skills on their public account
  // A set is used to prevent duplicates
  editSkills(input) {
    for (const skill of input) {
      if (this.skills.size < this.MAX_SKILL_ARRAY_SIZE) {
        this.skills.add(skill);
      } else {
        return;
      }
    }
  }

  // Accessors
  getBio() {
    return this.bio;
  }

  getFullName() {
    return `${this.fullName[0]} ${this.fullName[1] || ''} ${this.fullName[2]}`;
  }

  getSkills() {
    return Array.from(this.skills);
  }
}
// module.exports = User;
export default User;

