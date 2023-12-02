import { createSlice } from "@reduxjs/toolkit"

interface IGlobalState {
    colorMode: "Dark" | "Light",
    isAppLoading: boolean,
    isAddingPin: boolean,
    isLoggedIn: boolean
}

const initialState: IGlobalState = {
    colorMode: "Dark",
    isAppLoading: true,
    isAddingPin: true,
    isLoggedIn: false,
}

const globalSettingSlice = createSlice({
    name: "GlobalSetting",
    initialState: initialState,
    reducers: {
        toggleColorMode: (state) => ({ ...state, colorMode: state.colorMode == "Light" ? "Dark" : "Light" }),
        toogleAppLoading: (state) => ({ ...state, isAppLoading: !state.isAppLoading }),
        stopAppLoading: (state) => ({ ...state, isAppLoading: false }),
        setAppLoading: (state) => ({ ...state, isAppLoading: true }),
        setIsAddingPin: (state) => ({ ...state, isAddingPin: true }),
        setIsNotAddingPin: (state) => ({ ...state, isAddingPin: false }),
        setLoggedIn: (state) => ({ ...state, isLoggedIn: true }),
        setLoggedOut: (state) => ({ ...state, isLoggedIn: false }),
    }
})

export const { toggleColorMode, setAppLoading, stopAppLoading, setIsAddingPin, setIsNotAddingPin } = globalSettingSlice.actions
export default globalSettingSlice.reducer