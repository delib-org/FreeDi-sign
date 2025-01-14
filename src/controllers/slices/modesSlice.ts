import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export enum Mode {
    viewsMode = "views",
    resistanceMode = "resistance",
    regularMode = "regular"
}


export interface modesState {
    mode:Mode;
}

const initialState: modesState = {
    mode: Mode.regularMode
}

export const agreesSlice = createSlice({
    name: 'modes',
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<Mode>) => {
            state.mode = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setMode } = agreesSlice.actions

export const selectMode = (state: { modes: modesState }) => state.modes.mode;


export default agreesSlice.reducer