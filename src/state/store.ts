import { configureStore } from '@reduxjs/toolkit'
import playersReducer from './players'
import wssReducer from './wss'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'


export const store = configureStore({
    reducer: {
        players: playersReducer,
        wss: wssReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
export default store
