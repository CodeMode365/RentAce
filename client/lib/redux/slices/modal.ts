import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "ModalSlice",
    initialState: {
        isLogoutOpen: false,
        isSpacesModalOpen: false,
        isSettingsModalOpen: false,
    },
    reducers: {
        openLogoutModal: (state) => ({
            ...state, isLogoutOpen: true
        }),
        closeLogoutModal: (state) => ({
            ...state, isLogoutOpen: false
        }),
        openSpacesModal: (state) => ({
            ...state, isSpacesModalOpen: true
        }),
        closeSpacesModal: (state) => ({
            ...state, isSpacesModalOpen: false
        }),
        openSettingsModal: (state) => ({
            ...state, isSettingsModalOpen: true
        }),
        closeSettingsModal: (state) => ({
            ...state, isSettingsModalOpen: false
        }),

    }
})

export const { openLogoutModal, closeLogoutModal, openSpacesModal, closeSpacesModal, openSettingsModal, closeSettingsModal } = modalSlice.actions
export default modalSlice.reducer