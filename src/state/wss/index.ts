import { io } from "socket.io-client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store  from "../store";


export enum Connection {
    CONNECTED,
    CONNECTING,
    DISCONNECTED
}
const initialState = {
    connected: Connection.CONNECTING
}
export const wssSlice = createSlice({
    name: 'wss',
    initialState,
    reducers: {
        setConnected: (state, action: PayloadAction<Connection>) => {
            state.connected = action.payload
        }
    }
})


const socket = io('ws://localhost:8080', {
    path: '/ws/',
    reconnection: false,
})
socket.on('connect_error', () => {
    store.dispatch(wssSlice.actions.setConnected(Connection.DISCONNECTED))
})
socket.on('disconnect', () => {
    store.dispatch(wssSlice.actions.setConnected(Connection.DISCONNECTED))
})
socket.on('connect', () => {
    store.dispatch(wssSlice.actions.setConnected(Connection.CONNECTED))
})
socket.on('room-update', msg => console.log(msg))


export const connect = () => {
    wssSlice.actions.setConnected(Connection.CONNECTING)
    socket.connect()
}


export default wssSlice.reducer
