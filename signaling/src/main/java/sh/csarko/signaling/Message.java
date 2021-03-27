package sh.csarko.signaling;

public class Message {
    public final String wsid;
    public final String destination;
    public final String payload;

    public Message(String wsid, String destination, String payload) {
        this.wsid = wsid;
        this.destination = destination;
        this.payload = payload;
    }
}
