package sh.csarko.signaling;

import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class SDPController {
    @MessageMapping("/offer")
    @SendTo("/signaling")
    public Message offer(@Header(name = "wsid") String wsid, String sessionProfile) {
        return new Message(wsid, "/offer", sessionProfile);
    }

    @MessageMapping("/candidate")
    @SendTo("/signaling")
    public Message candidate(@Header(name = "wsid") String wsid, String candidate) {
        return new Message(wsid, "/candidate", candidate);
    }

    @MessageMapping("/answer")
    @SendTo("/signaling")
    public Message answer(@Header(name = "wsid") String wsid, String answer) {
        return new Message(wsid, "/answer", answer);
    }
}
