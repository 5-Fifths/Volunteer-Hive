import java.util.ArrayList;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

// Event class stores information about the event
public class Event {
    // Event information
    private String eventName;
    private LocalDateTime eventDate;
    private String eventDescription;
    private String additionalInfo;
    private String location;
    private int sizeLimit;
    private String status; // Open/closed/semi-closed
        
    private String author;
    private ArrayList<Volunteer> volunteerList;
    private ArrayList<Coordinator> coordinatorList;

    // Constructor
    public Event (String eventName, String author, LocalDateTime eventDate, String eventDescription, String additionalInfo, String location, int sizeLimit, String status) {
        // Required information only
        this.eventName = eventName;
        this.author = author;
        this.eventDate = eventDate;
        this.eventDescription = eventDescription;
        this.additionalInfo = additionalInfo;
        this.location = location;
        this.sizeLimit = sizeLimit;
        this.status = status;
        this.volunteerList = new ArrayList<Volunteer>();
        this.coordinatorList = new ArrayList<Coordinator>();
    }

    public void editEvent(String eventName, LocalDateTime eventDate, String location, String eventDescription, String additionalInfo, int sizeLimit, String status) {
        this.eventName = eventName;
        this.eventDate = eventDate;
        this.eventDescription = eventDescription;
        this.additionalInfo = additionalInfo;
        this.location = location;
        this.sizeLimit = sizeLimit;
        this.status = status;
    }

    public ArrayList<Volunteer> getVolList() {
        return this.volunteerList;
    }

    public ArrayList<Coordinator> getCoordList() {
        return this.coordinatorList;
    }

    public int getSizeL() {
        return this.sizeLimit;
    }
        
    public String getStatus (){
        return this.status;
    }

    public void addVolunteer(Volunteer volunteer) {
        if (volunteerList.size() < sizeLimit)
            this.volunteerList.add(volunteer);
    }

    public void removeVolunteer(Volunteer volunteer) {
        this.volunteerList.remove(volunteer);
    }

    public void addCoordinator(Coordinator coordinator) {
        if (coordinatorList.size() < sizeLimit)
            this.coordinatorList.add(coordinator);
    }

    public void removeCoordinator(Coordinator coordinator) {
        this.coordinatorList.remove(coordinator);
    }

    // Output names in a list format
    public void volunteerListOut() {
        int n = volunteerList.size();

        // Pull all names except last one
        for (int i = 0; i < n - 1; i++) {
            Volunteer v = volunteerList.get(i);

            System.out.print(v.getFullName() + ", ");
        }

        // Get leftover name
        System.out.println(volunteerList.get(n - 1).getFullName());
    }

    public boolean isFull() {
        // Too many volunteers for capacity
            // This should be already be guarded against in the add volunteer
        if (volunteerList.size() > sizeLimit) {
            
        }
        return (this.volunteerList.size() >= this.sizeLimit);
    }

    public String getEvent() {
        return this.eventName;
    } 

    public String getCoord() {
        return this.author;
    }

    public LocalDateTime getDate () {
        return this.eventDate;
    }

    public String getLoc() {
        return this.location;
    }
    
}
