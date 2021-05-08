package sh.csarko.signaling

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.context.event.EventListener
import org.springframework.messaging.handler.annotation.DestinationVariable
import org.springframework.messaging.simp.SimpAttributesContextHolder
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.messaging.simp.annotation.SubscribeMapping
import org.springframework.stereotype.Controller
import org.springframework.web.socket.messaging.SessionDisconnectEvent
import java.util.concurrent.atomic.AtomicReference
import javax.inject.Inject

@Controller
class SignalingController @Inject constructor(
        private val template: SimpMessagingTemplate
) {
    private val logger: Logger = LoggerFactory.getLogger(SignalingController::class.java)
    private val lobby2ids: AtomicReference<MutableMap<String, MutableList<String>>> = AtomicReference(HashMap())

    @SubscribeMapping("/lobby/{name}")
    fun subscribe(@DestinationVariable name: String): Message<SubscribeSelfPayload> {
        val attrs = SimpAttributesContextHolder.currentAttributes()
        val sessionId = attrs.sessionId
        attrs.setAttribute("lobby-name", name)
        template.convertAndSend("/lobby/$name", Message("SUBSCRIBE_OTHER", sessionId))
        val ids = lobby2ids.get().getOrPut(name, { mutableListOf() })
        ids.add(sessionId)
        return Message("SUBSCRIBE_SELF", SubscribeSelfPayload(sessionId, ids))
    }


    @EventListener
    fun disconnect(e: SessionDisconnectEvent) {
        val rawLobbyName = SimpAttributesContextHolder
                .currentAttributes()
                .getAttribute("lobby-name")
        val lobbyName = if (rawLobbyName is String) {
            rawLobbyName
        } else {
            return
        }
        val ids = lobby2ids.get()[lobbyName]
        ids!!.remove(e.sessionId)
        if (ids.isEmpty()) {
            lobby2ids.get().remove(lobbyName)
        }
        template.convertAndSend("/lobby/$lobbyName", Message("DISCONNECT", e.sessionId))
    }
}