import User from './User';

class Volunteer extends User {
  
  constructor(fullName, educationLevel, major, contactInfo) {
    super(fullName);
    this.educationLevel = educationLevel;
    this.major = major;
    this.contactInfo = contactInfo;
    this.totalRating = 0;
    this.numOfRatings = 0;
    this.eventsJoined = new Set();
    this.comments = [];
  }

  // Volunteers can sign up for events
  signUp(event) {
    if (!event.isFull()) {
      this.eventsJoined.add(event);
      event.addVolunteer(this);
    }
  }

  // Volunteers can cancel their event sign up
  cancelSignUp(event) {
    event.removeVolunteer(this);
    this.eventsJoined.delete(event);
  }

  // Package-private visibility
  // Coordinators can only add ratings
  addRating(rating) {
    if (typeof rating === 'number' && rating > 0) {
      this.totalRating += rating;
      this.numOfRatings++;
    }
  }

  // Coordinators can receive a volunteers avg rating
  getAvgRating() {
    if (this.numOfRatings > 0) {
      return this.totalRating / this.numOfRatings;
    } else {
      return 0;
    }
  }

  // Coordinators can only add comments
  addComment(comment) {
    if (typeof comment === 'string' && comment.length <= 300) {
      if (this.comments.length >= 10) {
        this.comments.shift();
      }
      this.comments.push(comment);
    }
  }

  // Coordinators can view comments
  getComments() {
    return [...this.comments];
  }

  // Accessors
  setEducationalLvl(educationLevel) {
    this.educationLevel = educationLevel;
  }

  getEducationalLvl() {
    return this.educationLevel;
  }

  setMajor(major) {
    this.major = major;
  }

  getMajor() {
    return this.major;
  }

  setContactInfo(contactInfo) {
    this.contactInfo = contactInfo;
  }

  getContactInfo() {
    return this.contactInfo;
  }

  setBio(bio) {
    super.editBio(bio);
  }

  getBio() {
    return super.getBio();
  }
}
// module.exports = Volunteer;
export default Volunteer;
