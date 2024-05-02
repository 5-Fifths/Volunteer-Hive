import java.util.AbstractSet;
import java.util.HashSet;
import java.util.Set;

abstract class User {
    // Size of fullName array
    private final int FULL_NAME_SIZE = 3;

    // Number of skills per user
    private final int MAX_SKILL_ARRAY_SIZE = 20;

    private String[] fullName = new String[FULL_NAME_SIZE]; // [First, Middle Initial, Last]
    private String bio;
    private Set<String> skills;

    public User(String[] fullName) {
        System.arraycopy(fullName, 0, this.fullName, 0, fullName.length);
        this.skills = new HashSet<>();
    }

    // TODO: Figure out how to actually log in on the frontend
        // This is only the username-password verification
    public boolean attemptLogin(String username, String hash) {
        // True if authenticated (table entry matches hash)
        // False otherwise
        String query = String.format("SELECT password FROM login WHERE username = '%s'", username);
        String tableEntry = ""; // = table.execute(query)

        return tableEntry.equals(hash);
    }

    // TODO: If we have time, attempt to log them in right after registering
        // If not, just send them back to the login screen and have them retype it
    public void register(String username, String hash, int accType) {
        String query = String.format("INSERT INTO login (username, password, accType) values (%s, %s, %d)", username, hash, accType);

        // table.executeQuery(query);
    }

    // Users can change their profile information
    public void editBio(String s) {
        if (s.length() <= 500) {
          this.bio = s;
        }
    }

    // Users can change their name
    public void editPreferredName(String[] newName) {
        for (int i = 0; i < FULL_NAME_SIZE; i++) {
            if (!newName[i].isEmpty()) {
                fullName[i] = newName[i];
            }
        }
    }

    // Users can add skills on their public account
    public void addSkill(String skill) {
        if (this.skills.size() < MAX_SKILL_ARRAY_SIZE) {
            this.skills.add(skill);
        }
    }

    // Users can edit the skills on their public account
        // A set is used to prevent duplicates
    public void editSkills(String[] input) {
        for (String skill : input) {
            if (skills.size() < MAX_SKILL_ARRAY_SIZE) {
                skills.add(skill);  
            } else {
                return;
            }
        }
    }

    // Accessors
    public String getBio() {
        return bio;
    }

    public String getFullName() {
        return String.format("%s %s %s", fullName[0], fullName[1] != null ? fullName[1] : "", fullName[2]);
    }

    public String[] getSkills() {
        String[] arr = new String[50];

        return skills.toArray(arr);
    }
}
