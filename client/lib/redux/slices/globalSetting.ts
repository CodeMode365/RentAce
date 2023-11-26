import { createSlice } from "@reduxjs/toolkit"

interface IGlobalState {
    colorMode: "Dark" | "Light",
    isAppLoading: boolean
}

const initialState: IGlobalState = {
    colorMode: "Dark",
    isAppLoading: true
}

const globalSettingSlice = createSlice({
    name: "GlobalSetting",
    initialState: initialState,
    reducers: {
        toggleColorMode: (state) => ({ ...state, colorMode: state.colorMode == "Light" ? "Dark" : "Light" }),
        toogleAppLoading: (state) => ({ ...state, isAppLoading: !state.isAppLoading }),
        stopAppLoading: (state) => ({ ...state, isAppLoading: false }),
        setAppLoading: (state) => ({ ...state, isAppLoading: true }),
    }
})

export const { toggleColorMode, setAppLoading, stopAppLoading } = globalSettingSlice.actions
export default globalSettingSlice.reducer