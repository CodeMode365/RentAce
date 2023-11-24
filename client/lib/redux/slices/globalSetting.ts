import { createSlice } from "@reduxjs/toolkit"

interface IGlobalState {
    colorMode: "Dark" | "Light"
}

const initialState: IGlobalState = {
    colorMode: "Dark"
}

const globalSettingSlice = createSlice({
    name: "GlobalSetting",
    initialState: initialState,
    reducers: {
        toggleColorMode: (state) => ({ ...state, colorMode: state.colorMode == "Light" ? "Dark" : "Light" })
    }
})

export const { toggleColorMode } = globalSettingSlice.actions
export default globalSettingSlice.reducer