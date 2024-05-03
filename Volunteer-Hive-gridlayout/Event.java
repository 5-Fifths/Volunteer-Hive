import java.util.ArrayList;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

// Event class stores information about the event
public class Event {
    // Event information
    private String eventName;
    private LocalDateTime eventDate;
    private String eventDescription;
    private String location;
    private int sizeLimit;
    private String status; // Open/closed/semi-closed
        
    private String author;
    private ArrayList<Volunteer> volunteerList;
    private ArrayList<Coordinator> coordinatorList;

    public Event (String eventName, String author, LocalDateTime eventDate) {
        // Required information only
        this.eventName = eventName; 
        this.author = author;
        this.eventDate = eventDate;
        this.location = location;
        this.volunteerList = new ArrayList<Volunteer>();
        this.sizeLimit = sizeLimit;
        this.status = status;
    }

    public ArrayList<Volunteer> getVolList() {
        return this.volunteerList;
    }

    public int getSizeL() {
        return this.sizeLimit;
    }
        
    public String getStatus (){
        return this.status;
    }

    public void addVolunteer(Volunteer volunteer) {
        if (volunteerList.size() < sizeLimit)
            volunteerList.add(volunteer);
    }

    public void removeVolunteer(Volunteer volunteer) {
        volunteerList.remove(volunteer);
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
        return (volunteerList.size() == sizeLimit);
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
