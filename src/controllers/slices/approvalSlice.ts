import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Approval, updateArray } from 'delib-npm'



export interface ApprovalState {
    approvals: Approval[];
}

const initialState: ApprovalState = {
    approvals: []
}

export const approvalSlice = createSlice({
    name: 'approvals',
    initialState,
    reducers: {
        setApproval: (state, action: PayloadAction<Approval>) => {
            state.approvals = updateArray(state.approvals, action.payload, "approvalId");
        },
        updateApproval: (state, action: PayloadAction<{approved:boolean, statementId:string}>) => {
            const approval = state.approvals.find(ap => ap.statementId === action.payload.statementId);
            if(approval){
                approval.approval = action.payload.approved;
            }
        }
            
    },
})

// Action creators are generated for each case reducer function
export const { setApproval,updateApproval } = approvalSlice.actions

export const selectApprovalById = (statementId: string) => (state: { approvals: ApprovalState }) => state.approvals.approvals.find(ap => ap.statementId === statementId);

export const selectApprovalsByDocId = (documentId: string) => (state: { approvals: ApprovalState }) => state.approvals.approvals.filter(ap => ap.documentId === documentId);

export default approvalSlice.reducer