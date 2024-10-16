import { createSelector, createSlice } from '@reduxjs/toolkit'
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
    updateApproval: (state, action: PayloadAction<{ approved: boolean, statementId: string }>) => {
      try {
        const approval = state.approvals.find(ap => ap.statementId === action.payload.statementId);
        if(!approval) throw new Error("Approval not found");
        approval.approval = action.payload.approved;
      } catch (error) {
        console.error(error);
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setApproval, updateApproval } = approvalSlice.actions

// Helper selectors
const selectApprovalsState = (state: { approvals: ApprovalState }) => state.approvals;
const selectApprovals = createSelector(
  selectApprovalsState,
  (approvalsState) => approvalsState.approvals
);

// Memoized selectApprovalById
export const selectApprovalById = (statementId: string) =>
  createSelector(
    selectApprovals,
    (approvals) => approvals.find(ap => ap.statementId === statementId)
  );

// Memoized selectApprovalsByDocId
export const selectApprovalsByDocId = (documentId: string) =>
  createSelector(
    selectApprovals,
    (approvals) => approvals.filter(ap => ap.documentId === documentId)
  );

export default approvalSlice.reducer