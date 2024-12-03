import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { updateArray } from 'delib-npm';

interface EvaluationSettings {
    statementId: string;
    approve: boolean;
    comment: boolean;
    importance: boolean;
}

export interface evaluationSliceState {
    evaluations: EvaluationSettings[];
}

const initialState: evaluationSliceState = {
    evaluations: []
}

export const evaluationSlice = createSlice({
    name: 'evaluations',
    initialState,
    reducers: {
        setEvaluation: (state, action: PayloadAction<EvaluationSettings>) => {
            state.evaluations = updateArray(state.evaluations, action.payload, 'statementId')
        }
    },
})

// Action creators are generated for each case reducer function
export const { setEvaluation } = evaluationSlice.actions

export const selectEvaluation = (statementId: string | undefined) => (state: { evaluations: evaluationSliceState }) => state.evaluations.evaluations.find(e => e.statementId === statementId)

export default evaluationSlice.reducer