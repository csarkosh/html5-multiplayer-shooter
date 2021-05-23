import { createGlobalState } from 'react-hooks-global-state'


export enum Screen {
    MAIN,
    OPTIONS,
    CREDITS,
    GAME,
    LOBBY,
}

const initialState = {
    screen: Screen.MAIN
}

export default createGlobalState(initialState).useGlobalState


