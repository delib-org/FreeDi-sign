import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Evaluation, updateArray } from 'delib-npm';

interface EvaluationSettings {
    statementId: string;
    approve: boolean;
    comment: boolean;
    importance: boolean;
    evaluations: boolean;
}

export interface evaluationSliceState {
    evaluationsSettings: EvaluationSettings[];
    evaluations: Evaluation[];
}

const initialState: evaluationSliceState = {
    evaluationsSettings: [],
    evaluations: []
}

export const evaluationSlice = createSlice({
    name: 'evaluations',
    initialState,
    reducers: {
        setEvaluationSettings: (state, action: PayloadAction<EvaluationSettings>) => {
            state.evaluationsSettings = updateArray(state.evaluationsSettings, action.payload, 'statementId')
        },
        setEvaluation: (state, action: PayloadAction<Evaluation>) => {
            state.evaluations = updateArray(state.evaluations, action.payload, 'statementId')
        }
    },
})

// Action creators are generated for each case reducer function
export const { setEvaluationSettings } = evaluationSlice.actions

export const selectEvaluationSettings = (statementId: string | undefined) => (state: { evaluations: evaluationSliceState }) => state.evaluations.evaluationsSettings.find(e => e.statementId === statementId)
export const selectEvaluation = (statementId:string|undefined) => (state: { evaluations: evaluationSliceState }) => state.evaluations.evaluations.find(e => e.statementId === statementId);

export default evaluationSlice.reducer