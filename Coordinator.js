import User from './User';

class Coordinator extends User {
  
  constructor(fullName) {
    super(fullName);
    this.eventsManaged = [];
  }

  // Coordinator can create an event
  createEvent(eventName, eventDate, eventDescription, additionalInfo, location, sizeLimit, status) {
    const newEvent = new Event(eventName, this.getFullName(), new Date(eventDate), eventDescription, additionalInfo, location, sizeLimit, status);
    this.manageAnEvent(newEvent);
  }

  // Coordinator can update event information
  updateEvent(event, eventName, eventDate, location, eventDescription, additionalInfo, sizeLimit, status) {
    if (this.eventsManaged.includes(event)) {
      event.editEvent(eventName, new Date(eventDate), location, eventDescription, additionalInfo, sizeLimit, status);
    }
  }

  // Coordinator can add an event to their list
  manageAnEvent(event) {
    if (!this.eventsManaged.includes(event)) {
      this.eventsManaged.push(event);
    }
  }

  // Coordinator can remove an event from their list
  removeManagedEvent(event) {
    const index = this.eventsManaged.indexOf(event);
    if (index !== -1) {
      this.eventsManaged.splice(index, 1);
    }
  }

  // Coordinator can invite a volunteer to an event they manage
  inviteVolunteer(event, volunteer) {
    if (this.eventsManaged.includes(event) && !event.getVolList().includes(volunteer)) {
      event.addVolunteer(volunteer);
    }
  }

  // Coordinator can remove a volunteer from an event they manage
  removeVolunteer(event, volunteer) {
    if (this.eventsManaged.includes(event) && event.getVolList().includes(volunteer)) {
      event.removeVolunteer(volunteer);
    }
  }

  // Volunteers will be able to get a rating from a coordinator
  rateVolunteer(event, volunteer, rating) {
    if (this.eventsManaged.includes(event) && event.getVolList().includes(volunteer) && rating >= 1 && rating <= 5) {
      volunteer.addRating(rating);
    }
  }

  // Coordinators can view volunteer ratings
  getAvgVolunteerRating(volunteer) {
    return volunteer.getAvgRating();
  }

  // Coordinators can leave a comment
  leaveComment(event, volunteer, comment) {
    if (this.eventsManaged.includes(event) && event.getVolList().includes(volunteer) && comment.length <= 300) {
      volunteer.addComment(comment);
    }
  }

  // Coordinators can view volunteer comments
  getVolunteerComment(volunteer) {
    return volunteer.getComments();
  }

  // Coordinator can invite a coordinator to an event they manage
  inviteCoordinator(event, coordinator) {
    if (this.eventsManaged.includes(event) && !event.getCoordList().includes(coordinator)) {
      event.addCoordinator(coordinator);
    }
  }

  // Coordinator can remove a coordinator from an event they manage
  removeCoordinator(event, coordinator) {
    if (this.eventsManaged.includes(event) && event.getCoordList().includes(coordinator)) {
      event.removeCoordinator(coordinator);
    }
  }

  // Returns a list of events managed by coordinators
  getEventsManaged() {
    return [...this.eventsManaged];
  }
}
//module.exports = Coordinator;
export default Coordinator;
