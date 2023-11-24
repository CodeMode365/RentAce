import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { GlobalSettingReducer, ModalReducer, SidebarReducer } from "./slices";

const rootReducer = combineReducers({
    sidebar: SidebarReducer,
    model: ModalReducer,
    globalSetting: GlobalSettingReducer
})

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store