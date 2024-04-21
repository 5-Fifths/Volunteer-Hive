import java.sql.*;

public class MySQLDatabase {
	public static void main(String[] args) throws Exception{
		
		try {

			// Connection to MySQL Database (Have to download JBDC from MySQL website)
			Class.forName("com.mysql.cj.jdbc.Driver");
			
			Connection con = DriverManager.getConnection(
														      //Message for password
			"jdbc:mysql://localhost:3306/volunteer_hive", "root", "password");
			
			// System.out.println("===================================");
			// System.out.println("CONNECTION TO DATABASE ESTABLISHED");
			// System.out.println("===================================");
			
			Statement st = con.createStatement();
			
			// Sample Info Insertion
			// st.executeUpdate("INSERT INTO login (username, password, acc_type) values ('test_user', 'bFE7qigZkf0=', -1)");
			
			// Returning password
			ResultSet rs = st.executeQuery("SELECT password FROM login WHERE username = 'test_user'");

			while(rs.next()){
				System.out.println("Password: " + rs.getString(1));
			}
			

		} catch (SQLException e) {System.out.println(e);}
	}
}
