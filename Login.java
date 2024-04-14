class login {
    //Users Variable
    private String email;
    private String password;
    private String classification; //e.g. admins cordinators or volunteer
    private int status;

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public String getClassification(){
        return classification;
    }

    public void setClassification(String classification){
        this.classification = classification;
    }

    public int getStatus(){
        return status;
    }

    public void setStatus(int status){
        this.status = status;
    }
}