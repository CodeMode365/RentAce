import { createSlice } from "@reduxjs/toolkit";

const SidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        isOpen: false,
    },
    reducers: {
        closeSidebar: ((state) => {
            return { isOpen: false }
        }),
        openSidebar: ((state) => {
            return { isOpen: true }
        }),
        toggleSidebar: ((state) => {
            return { isOpen: !state.isOpen }
        })
    }
})

export const { toggleSidebar, openSidebar, closeSidebar } = SidebarSlice.actions
export default SidebarSlice.reducer