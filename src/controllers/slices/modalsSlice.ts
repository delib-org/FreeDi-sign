import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface ModalsState {
    accessability:{
        show:boolean;
    }
}


const initialState: ModalsState = {
    accessability:{
         show:false
   }
}

export const modalSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        setAccessability: (state, action: PayloadAction<boolean>) => {
            state.accessability.show = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAccessability } = modalSlice.actions

export const selectAccessability = (state: { modals: ModalsState }) => state.modals.accessability.show;


export default modalSlice.reducer