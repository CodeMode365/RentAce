import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "ModalSlice",
    initialState: {
        isLogoutOpen: false,
        isAuthModalOpen: false,
        isActivityModalOpen: false,
        isSettingsModalOpen: false,
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
        openSettingsModal: (state) => ({
            ...state, isSettingsModalOpen: true
        }),
        closeSettingsModal: (state) => ({
            ...state, isSettingsModalOpen: false
        }),

    }
})

export const { openLogoutModal, closeLogoutModal, closeAuthModal, openAuthModal, openActivityModal, closeActiviyModal, openSettingsModal, closeSettingsModal } = modalSlice.actions
export default modalSlice.reducer