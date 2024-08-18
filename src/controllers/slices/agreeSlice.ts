import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AgreeDisagree, AgreeDisagreeEnum, Statement, updateArray } from 'delib-npm'
import { UserState } from './userSlice';


export interface AgreeState {
    agrees: AgreeDisagree[];
}

const initialState: AgreeState = {
    agrees: []
}

export const agreesSlice = createSlice({
    name: 'agrees',
    initialState,
    reducers: {
        setAgree: (state, action: PayloadAction<AgreeDisagree>) => {
            state.agrees = updateArray(state.agrees, action.payload, "agreeId");
        },
        updateAgree: (state, action: PayloadAction<({agree:AgreeDisagreeEnum, statementId:string})>) => {
            const agree = state.agrees.find(agree => agree.agreeId === action.payload.statementId);
            if (agree) {
                agree.agree = action.payload.agree;
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { setAgree,updateAgree } = agreesSlice.actions



export const selectAgree = (statementId: string) => (state: { agrees: AgreeState, user:UserState }) => state.agrees.agrees.find(agree => agree.statementId === statementId && agree.userId === state.user.user?.uid);

export default agreesSlice.reducer