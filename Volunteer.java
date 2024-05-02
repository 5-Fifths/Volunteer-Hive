import java.util.ArrayList;
import java.util.List;
import java.util.HashSet;
import java.util.Set;

public class Volunteer extends User {
    private String educationLevel;
    private String major;
    private String contactInfo;
    private int totalRating;
    private int numOfRatings;
    private Set<Event> eventsJoined;
    private List<String> comments;

    // Constructor
    public Volunteer(String[] fullName, String educationLevel, String major, String contactInfo) {
        super(fullName);
        this.educationLevel = educationLevel;
        this.major = major;
        this.contactInfo = contactInfo;
        this.totalRating = 0;
        this.numOfRatings = 0;
        this.eventsJoined = new HashSet<>();
        this.comments = new ArrayList<>();
    }
    
    // Volunteers can sign up for events
    public void signUp(Event event) {
        if (!event.isFull()) {
            this.eventsJoined.add(event);
            event.addVolunteer(this);
        }
    }

    // Volunteers can cancel their event sign up
    public void cancelSignUp(Event event){
        event.removeVolunteer(this);
    }

    // Package-private visibility
    // Coordinators can only add ratings
    void addRating(int rating) {
        this.totalRating += rating;
        this.numOfRatings++;
    }

    // Coordinators can receive a volunteers avg rating
    double getAvgRating() {
        if (numOfRatings > 0) {
            return (double) totalRating / numOfRatings;
        }
        else {
            return 0;
        }
    }

    // Coordinators can only add comments
    void addComment(String comment) {
        if (comments.size() == 10) {
            comments.remove(0);
        }
        comments.add(comment);
    }

    // Coordinators can view comments
    List<String> getComments() {
        return new ArrayList<>(comments);
    }

    // Accessors
    public void setEducationalLvl(String educationLevel) {
        this.educationLevel = educationLevel;
    }

    public String getEducationalLvl() {
        return this.educationLevel;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getMajor() {
        return this.major;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }

    public String getContactInfo() {
        return this.contactInfo;
    }

    public void setBio(String bio) {
        super.editBio(bio);
    }

    public String getBio() {
        return super.getBio();
    }
}
