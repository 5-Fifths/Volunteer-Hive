import java.util.ArrayList;

public class Volunteer {
    // Member variables
    private String firstName;
    private String lastName;
    private String educationLevel;
    private String major;
    private String contactInfo;
    private String aboutMe;
    private ArrayList<String> skills;

    // Constructor
    public Volunteer(String fName, String lName) {
        firstName = fName;
        lastName = lName;
        skills = new ArrayList<>();
    }
    
    // Volunteers can sign up for events
    public void signUp(Event event) {
        event.addVolunteer(this);
    }

    // Volunteers can cancel their event sign up
    public void cancelSignUp(Event event){
        event.removeVolunteer(this);
    }

    // Accessors
    public void setFullName(String fName, String lName) {
        firstName = fName;
        lastName = lName;
    }
    
    public String getFullName() {
        return firstName + " " + lastName;
    }

    public void setEducationalLvl(String educationalLvl) {
        educationalLevel = educationalLvl;
    }

    public String getEducationalLvl() {
        return educationalLevel;
    }

    public void setMajor(String studentMajor) {
        major = studentMajor;
    }

    public String getMajor() {
        return major;
    }

    public void setContactInfo(Stirng contact) {
        contactInfo = contact;
    }

    public String getContactInfo() {
        return contactInfo;
    }

    public void setAboutMe(String about) {
        aboutMe = about;
    }

    public String getAboutMe() {
        return aboutMe;
    }

    public void setSkills(ArrayList<String> skillArray) {
        skills = new ArrayList<>(skillArray);
    }

    public ArrayList<String> getSkills() {
        return skills;
    }
}
