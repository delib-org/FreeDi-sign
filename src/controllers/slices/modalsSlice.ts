import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Statement } from 'delib-npm';



interface ModalsState {
    accessability:{
        show:boolean;
    }
    comments:{
        currentParagraph:Statement|null;
        show:boolean;
    }
}


const initialState: ModalsState = {
    accessability:{
         show:false
   },
    comments:{
         currentParagraph:null,
         show:false
    }
}

export const modalSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        setAccessability: (state, action: PayloadAction<boolean>) => {
            state.accessability.show = action.payload;
        },
        setComments: (state, action: PayloadAction<Statement>) => {
            state.comments.currentParagraph = action.payload;            
        },
        setShowComments: (state, action: PayloadAction<boolean>) => {
            state.comments.show = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAccessability, setComments, setShowComments } = modalSlice.actions

export const selectAccessability = (state: { modals: ModalsState }) => state.modals.accessability.show;
export const selectComments = (state: { modals: ModalsState }) => state.modals.comments.currentParagraph;
export const selectShowComments = (state: { modals: ModalsState }) => state.modals.comments.show;


export default modalSlice.reducer