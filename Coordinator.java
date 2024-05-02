import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Coordinator extends User {
    // Array of events managed by the coordinator
    private ArrayList<Event> eventsManaged;

    // Constructor
    public Coordinator(String[] fullName) {
        super(fullName);
        this.eventsManaged = new ArrayList<>();
    }

    // Coordinator can create an event
    public void createEvent(String eventName, LocalDateTime eventDate, String eventDescription, String additionalInfo, String location, int sizeLimit, String status) {
        Event newEvent = new Event(eventName, this.getFullName(), eventDate, eventDescription, additionalInfo, location, sizeLimit, status);
        manageAnEvent(newEvent);
    }

    // Coordinator can update event information
    public void updateEvent(Event event, String eventName, LocalDateTime eventDate, String location, String eventDescription, String additionalInfo, int sizeLimit, String status) {
        if (eventsManaged.contains(event)) {
            event.editEvent(eventName, eventDate, location, eventDescription, additionalInfo, sizeLimit, status);
        }
    }

    // Coordinator can add an event to their list
    public void manageAnEvent(Event event) {
        if (!eventsManaged.contains(event)) {
            this.eventsManaged.add(event);
        }
    }

    // Coordinator can remove an event from their list
    public void removeManagedEvent(Event event) {
        if (eventsManaged.contains(event)) {
            this.eventsManaged.remove(event);
        }
    }

    // Coordinator can invite a volunteer to an event they manage
    public void inviteVolunteer(Event event, Volunteer volunteer) {
        if (eventsManaged.contains(event) && !event.getVolList().contains(volunteer)) {
            event.addVolunteer(volunteer);
        }
    }

    // Coordinator can remove a volunteer from an event they manage
    public void removeVolunteer(Event event, Volunteer volunteer) {
        if (eventsManaged.contains(event) && event.getVolList().contains(volunteer)) {
            event.removeVolunteer(volunteer);
        }
    }

    // Volunteers will be able to get a rating from a coordinator
    public void rateVolunteer(Event event, Volunteer volunteer, int rating) {
        if (eventsManaged.contains(event) && event.getVolList().contains(volunteer) && rating > 0 && rating <= 5) {
            volunteer.addRating(rating);
        }
    }

    // Only coordinators can view volunteer ratings
    public double getAvgVolunteerRating(Volunteer volunteer) {
        return volunteer.getAvgRating();
    }

    // Only coordinators can leave a comment
    public void leaveComment(Event event, Volunteer volunteer, String comment) {
        if (eventsManaged.contains(event) && event.getVolList().contains(volunteer) && comment.length() <= 300) {
            volunteer.addComment(comment);
        }
    }

    // Only coordinators can view volunteer comments
    public List<String> getVolunteerComment(Volunteer volunteer) {
      return volunteer.getComments();
    }

    // Coordinator can invite a coordinator to an event they manage
    public void inviteCoordinator(Event event, Coordinator coordinator) {
        if (eventsManaged.contains(event) && !event.getCoordList().contains(coordinator)) {
            event.addCoordinator(coordinator);
        }
    }

    // Coordinator can remove a coordinator from an event they manage
    public void removeCoordinator(Event event, Coordinator coordinator) {
        if (eventsManaged.contains(event) && event.getCoordList().contains(coordinator)) {
            event.removeCoordinator(coordinator);
        }
    }

    // Returns a list of events managed by coordinators
    public ArrayList<Event> getEventsManaged() {
        return new ArrayList<>(eventsManaged);
    }
}
