import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface isEditState {
    isEdit: boolean;
}

const initialState: isEditState = {
    isEdit: false
}

export const editSlice = createSlice({
    name: 'is-edit',
    initialState,
    reducers: {
        setIsEdit: (state, action: PayloadAction<boolean>) => {
            state.isEdit = action.payload
        },
        toggleIsEdit: (state) => {
            state.isEdit = !state.isEdit

        },
    },
})

// Action creators are generated for each case reducer function
export const { setIsEdit, toggleIsEdit } = editSlice.actions

export const isEditSelector = (state: { isEdit: isEditState }) => state.isEdit.isEdit

export default editSlice.reducer