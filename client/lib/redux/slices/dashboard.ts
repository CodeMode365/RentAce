import { createSlice } from "@reduxjs/toolkit";

const dahboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        isDashboardOpen: false,
    },
    reducers: {
        openDashboard: (state) => ({
            ...state, isDashboardOpen: true
        }),
        closeDashboard: (state) => ({
            ...state, isDashboardOpen: false
        }),

    }
})

export const { openDashboard, closeDashboard } = dahboardSlice.actions
export default dahboardSlice.reducer