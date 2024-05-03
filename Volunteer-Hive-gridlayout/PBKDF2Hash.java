import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.SecureRandom;
import java.security.spec.KeySpec;
import java.security.spec.InvalidKeySpecException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

// Password hashing algorithm
public class PBKDF2Hash {
    //  Constants for hashing algorithm
    private static final String HASHING_ALGORIHTM = "PBKDF2WithHmacSHA256";
    private static final int HASHING_ITERATIONS = 600000;
    private static final int KEY_SIZE = 128;

    // Create only 1 instance
    private static PBKDF2Hash instance;

    public static void main(String[] args) throws
        NoSuchAlgorithmException, InvalidKeySpecException {
        System.out.println(generateRandomHash());
    }

    // Prevent creation of new instances by other objects
    private PBKDF2Hash() {

    }

    // Pull from a global instance if one is already initialized
    public PBKDF2Hash getInstance() {
        if (PBKDF2Hash.instance == null) {
            instance = new PBKDF2Hash();
        }

        return instance;
    }

    public static String generateRandomHash() throws
        NoSuchAlgorithmException, InvalidKeySpecException {
        return hash("password123");
    }

    public static String hash(String password) throws
            NoSuchAlgorithmException, InvalidKeySpecException {
        // Generate 128-bit salt
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[128];
        random.nextBytes(salt);

        // Process plaintext password
        char[] plaintext = password.toCharArray();
        KeySpec processedPlaintext = new PBEKeySpec(plaintext, salt, HASHING_ITERATIONS, KEY_SIZE);

        // Generate hash
        SecretKeyFactory keyGenerator = SecretKeyFactory.getInstance(HASHING_ALGORIHTM);
        byte[] hash = keyGenerator.generateSecret(processedPlaintext).getEncoded();
        
        return Base64.getEncoder().encodeToString(hash);
    }
}
