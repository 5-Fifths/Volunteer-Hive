import java.util.ArrayList;

// Event class stores information about the event

public class Event {
    // Event information
    private String eventName;
    // Coordinator in charge
    private String coordinator;
    // Date, Time
    private int date;
    private int time;
    // Location
    private String location;
    // Volunteer list
    private ArrayList<Volunteer> volunteerList;
        // Size limit
    private int sizeLimit;
    // Open/closed/semi-closed status
    private String status;
        // Open: Anyone can join
        // Semi-closed: space-limited or by application only
        // Closed: Invitation only
    // Other details

public Event (String eventName, String coordinator, int date, int time, String location, String[] volunteerList, int sizeLimit, String status) {
    // Required information only
    this.eventName = eventName; 
    this.coordinator = coordinator;
    this.date = date;
    this.time = time;
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
    return this.coordinator;
}

public int getDate () {
    return this.date;
}
     
public int getTime() {
    return this.time;
}

public String getLoc() {
    return this.location;
}
    
}
