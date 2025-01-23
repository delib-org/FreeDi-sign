import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { updateArray } from 'delib-npm'
import { DocTOC } from '../../model/docTOC'


export interface UserState {
    tocs: DocTOC[];
}

const initialState: UserState = {
    tocs: [],
}

export const tocSlice = createSlice({
    name: 'table-of-context',
    initialState,
    reducers: {
        setTOC: (state, action: PayloadAction<DocTOC>) => {
            state.tocs = updateArray(state.tocs, action.payload, "statementId");
        },
    }
})

// Action creators are generated for each case reducer function
export const { setTOC } = tocSlice.actions
export const selectTOC = (documentId:string)=> (state: { tocs: UserState; }) => state.tocs.tocs.find((toc)=>toc.statementId === documentId);

export default tocSlice.reducer