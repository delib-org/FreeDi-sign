import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Evaluation, updateArray } from 'delib-npm';

interface EvaluationSettings {
    statementId: string;
    approve: boolean;
    comment: boolean;
    importance: boolean;
    likes: boolean;
}

export interface evaluationSliceState {
    evaluationsSettings: EvaluationSettings[];
    likes: Evaluation[];
}

const initialState: evaluationSliceState = {
    evaluationsSettings: [],
    likes: []
}

export const evaluationSlice = createSlice({
    name: 'evaluations',
    initialState,
    reducers: {
        setEvaluationSettings: (state, action: PayloadAction<EvaluationSettings>) => {
            state.evaluationsSettings = updateArray(state.evaluationsSettings, action.payload, 'statementId')
        },
        setLike: (state, action: PayloadAction<Evaluation>) => {
            state.likes = updateArray(state.likes, action.payload, 'statementId')
        }
    },
})

// Action creators are generated for each case reducer function
export const { setEvaluationSettings,setLike } = evaluationSlice.actions

export const selectEvaluationSettings = (statementId: string | undefined) => (state: { evaluations: evaluationSliceState }) => state.evaluations.evaluationsSettings.find(e => e.statementId === statementId)
export const selectLike = (statementId:string|undefined) => (state: { evaluations: evaluationSliceState }) => state.evaluations.likes.find(e => e.statementId === statementId);

export default evaluationSlice.reducer