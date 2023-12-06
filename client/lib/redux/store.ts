import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { GlobalSettingReducer, ModalReducer, Dashboard } from "./slices";

const rootReducer = combineReducers({
    model: ModalReducer,
    globalSetting: GlobalSettingReducer,
    dashoard: Dashboard
})

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store