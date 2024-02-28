
// Event class stores information about the event

public class Event {
    // Event information
    private String eventName;
    // Coordinator in charge
    private String coordinator;
    // Date, Time
    private Int date;
    private Int time;
    // Location
    private String location
    // Volunteer list
    private String[] volunteerList
        // Size limit
    private Int sizeLimit
    // Open/closed/semi-closed status
    private String status
        // Open: Anyone can join
        // Semi-closed: space-limited or by appilication only
        // Closed: Invitation only
    // Other details

public Event (String eventName, String coordinator, Int date, Int time, String location, String[] volunteerList, Int sizeLimit, String status) {

    this.eventName = eventName; 
    this.coordinator = coordinator;
    this.date = date;
    this.time = time;
    this.location = location;
    this.volunteerList = new String[sizeLimit];
    this.sizeLimit = sizeLimit;
    this.status = status;
    }
    
public String getEvent{
    return this.eventName;
} 

public String getCoord{
    return this.coordinator;
}

public int getDate{
    return this.date;
}
    
public int getTime{
    return this.time;
}

public String getLoc{
    return this.location;
}

public String getVolList{
    return this.volunteerList;
}

public int getSizeL{
    return this.sizeLimit;
}
    
public String getStatus{
    return this.status;
}

public void addVolunteer(String volunteer) {
    for (int i = 0; i < volunteerList.length; i++){
        if (volunteerList[i] == null){
            volunteerList[i] = volunteer;
            return;
        }
    }
}

public void volunteerListOut(){
    for (int j = 0; j < volunteerList.length; j++){
        String volunteers = volunteerList[j];
        if (volunteers != null){
            System.out.println(volunteers);
        }
    }
}

public boolean isFull() {
    for (int k = 0; k < volunteerList.length; k++) {
        if (volunteerList[k] == null){
            status = "OPEN";
            return false;
    }
        status = "CLOSED";
        return true;
}
    
}
