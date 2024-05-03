// Event class stores information about the event
class Event {
    // Event information
    constructor(eventName, author, eventDate, eventDescription, additionalInfo, location, sizeLimit, status) {
        // Required information only
        this.eventName = eventName;
        this.author = author;
        this.eventDate = new Date(eventDate);
        this.eventDescription = eventDescription;
        this.additionalInfo = additionalInfo;
        this.location = location;
        this.sizeLimit = sizeLimit;
        this.status = status;
        this.volunteerList = [];
        this.coordinatorList = [];
    }

    editEvent(eventName, eventDate, location, eventDescription, additionalInfo, sizeLimit, status) {
        this.eventName = eventName;
        this.eventDate = new Date(eventDate);
        this.eventDescription = eventDescription;
        this.additionalInfo = additionalInfo;
        this.location = location;
        this.sizeLimit = sizeLimit;
        this.status = status;
    }

    addVolunteer(volunteer) {
        if (this.volunteerList.length < this.sizeLimit)
            this.volunteerList.push(volunteer);
    }

    removeVolunteer(volunteer) {
      const index = this.volunteerList.indexOf(volunteer);
      if (index !== -1) {
          this.volunteerList.splice(index, 1);
      }
    }

    addCoordinator(coordinator) {
        if (this.coordinatorList.length < this.sizeLimit)
            this.coordinatorList.push(coordinator);
    }

    removeCoordinator(coordinator) {
        const index = this.coordinatorList.indexOf(coordinator);
        if (index !== -1) {
          this.coordinatorList.splice(index, 1);
        }
    }

    // Output names in a list format
    volunteerListOut() {
        let n = this.volunteerList.length;

        // Pull all names except last one
        for (let i = 0; i < n - 1; i++) {
            let v = this.volunteerList[i];
            process.stdout.write(`${v.getFullName()}, `);
        }

        // Get leftover name
        console.log(this.volunteerList[n - 1].getFullName());
    }

    isFull() {
        // Too many volunteers for capacity
            // This should be already be guarded against in the add volunteer
        if (this.volunteerList.length > this.sizeLimit) {

        }
        return (this.volunteerList.length >= this.sizeLimit);
    }

    getVolList() {
        return this.volunteerList.slice();
    }

    getCoordList() {
        return this.coordinatorList.slice();
    }

    getSizeL() {
        return this.sizeLimit;
    }

    getEvent() {
        return this.eventName;
    } 

    getCoord() {
        return this.author;
    }

    getDate() {
        return this.eventDate;
    }

    getLoc() {
        return this.location;
    }
  
    getStatus() {
        return this.status;
    }
}
//module.exports = Event;
export default Event;
