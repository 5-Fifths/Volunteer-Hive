interface Staff {
    // Staff can invite and remove users from events
    public void userInvitation(User user, Event event);
    public void userRemoval(User user, Event event);

    // Staff can create, remove, and edit events
    public Event createEvent(); // Add the minimum required information to create a basic Event
    public void removeEvent(Event event);
    public void editEvent(); // Parameters currently unclear
}