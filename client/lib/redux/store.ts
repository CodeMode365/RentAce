import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { SidebarReducer } from "./slices";

const rootReducer = combineReducers({
    sidebar: SidebarReducer
})

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store