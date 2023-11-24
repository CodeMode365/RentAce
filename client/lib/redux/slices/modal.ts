import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "ModalSlice",
    initialState: {
        isLogoutOpen: false,
        isAuthModalOpen: false
    },
    reducers: {
        openLogoutModal: (state) => ({
            ...state, isLogoutOpen: true
        }),
        closeLogoutModal: (state) => ({
            ...state, isLogoutOpen: false
        }),
        openAuthModal: (state) => ({
            ...state, isAuthModalOpen: true
        }),
        closeAuthModal: (state) => ({
            ...state, isAuthModalOpen: false
        }),
    }
})

export const { openLogoutModal, closeLogoutModal, closeAuthModal, openAuthModal } = modalSlice.actions
export default modalSlice.reducer