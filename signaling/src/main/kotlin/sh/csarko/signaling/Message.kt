package sh.csarko.signaling

data class Message<T> (
        val action: String,
        val payload: T
)

data class SubscribeSelfPayload(
        val selfId: String,
        val ids: List<String>
)
