import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface IPlayer {
    id: string,
    name: string
}

export interface IPlayersState {
    playerIds: string[],
    players: Record<string, IPlayer>
}

const initialState: IPlayersState = {
    playerIds: [],
    players: {}
}

export const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<IPlayer>) => {
            state.players[action.payload.id] = action.payload
            state.playerIds.push(action.payload.id)
        },
        remove: (state, action: PayloadAction<string>) => {
            state.playerIds.splice(state.playerIds.indexOf(action.payload), 1)
        }
    }
})

export const { add, remove } = playersSlice.actions
export default playersSlice.reducer
