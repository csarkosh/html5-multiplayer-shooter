import {Client as StompClient} from "@stomp/stompjs";

export interface WebRTCConfig {

}

export const createWebRTC = (options: WebRTCConfig): WebRTC => {
    const wsid = Math.floor(Math.random() * 1e9)
    const stomp = new StompClient({
        brokerURL: 'ws://localhost:8080/ws',
        connectHeaders: { wsid: wsid.toString() },
        reconnectDelay: 5000,
    })
    const peerConnection = new RTCPeerConnection()
    const dataChannel = peerConnection.createDataChannel('chan', {
        maxRetransmits: 0,
        ordered: false,
    })
    return new WebRTC(wsid, stomp, peerConnection, dataChannel)
}

/**
 * @todo Implement idempotent state machine for WebRTC connection state, signaling state, and Websocket connection state
 */
export class WebRTC {
    stomp: StompClient;
    peerConnection: RTCPeerConnection;
    dataChannel: RTCDataChannel;
    wsid: number;

    constructor(wsid: number, stomp: StompClient, peerConnection: RTCPeerConnection, dataChannel: RTCDataChannel) {
        this.dataChannel = dataChannel
        this.peerConnection = peerConnection
        this.stomp = stomp
        this.wsid = wsid
    }

    onJoin = () => {
        this.dataChannel.onmessage = e => console.log(e.data)
        this.peerConnection.ondatachannel = e => {
            this.dataChannel = e.channel
        }

        this.stomp.onConnect = () => {
            this.stomp.subscribe('/signaling', (msg) => {
                const body = JSON.parse(msg.body)
                if (Number(body.wsid) === this.wsid) {
                    return
                }
                if (body.payload) {
                    body.payload = JSON.parse(body.payload)
                }
                if (body.destination === '/candidate') {
                    this.peerConnection.addIceCandidate(new RTCIceCandidate(body.payload))
                } else if (body.destination === '/offer') {
                    this.peerConnection.setRemoteDescription(new RTCSessionDescription(body.payload))
                    this.peerConnection
                        .createAnswer()
                        .then((sdi: RTCSessionDescriptionInit) => {
                            this.peerConnection.setLocalDescription(sdi)
                            this.stomp.publish({
                                destination: '/answer',
                                body: JSON.stringify(sdi),
                                headers: { wsid: this.wsid.toString() }
                            })
                        })
                        .catch((err: any) => console.error(err))
                } else if (body.destination === '/answer') {
                    this.peerConnection.setRemoteDescription(new RTCSessionDescription(body.payload))
                }
            })
            this.peerConnection.onicecandidate = e => {
                if (!e.candidate) {
                    return
                }
                this.stomp.publish({
                    destination: '/candidate',
                    body: JSON.stringify(e.candidate),
                    headers: { wsid: this.wsid.toString() },
                })
            }
            this.peerConnection
                .createOffer()
                .then((sdi: RTCSessionDescriptionInit) => {
                    this.stomp.publish({
                        destination: '/offer',
                        body: JSON.stringify(sdi),
                        headers: { wsid: this.wsid.toString() },
                    })
                    this.peerConnection.setLocalDescription(sdi)
                })
                .catch((err: any) => console.error(err))
        }

        this.stomp.activate()
    }

}