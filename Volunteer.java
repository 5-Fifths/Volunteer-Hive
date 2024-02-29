public class Volunteer {
    private String firstName;
    private String lastName;

    // Volunteers can sign up for events
    public void signUp(Event event) {
        
    }

    public void cancelSignUp(Event event){

    }

    // Accessors
    public String getFullName() {
        return firstName + " " + lastName;
    }
}
