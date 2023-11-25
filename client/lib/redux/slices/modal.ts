import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "ModalSlice",
    initialState: {
        isLogoutOpen: false,
        isAuthModalOpen: false,
        isActivityModalOpen: false,
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
        openActivityModal: (state) => ({
            ...state, isActivityModalOpen: true
        }),
        closeActiviyModal: (state) => ({
            ...state, isActivityModalOpen: false
        }),

    }
})

export const { openLogoutModal, closeLogoutModal, closeAuthModal, openAuthModal, openActivityModal, closeActiviyModal } = modalSlice.actions
export default modalSlice.reducer