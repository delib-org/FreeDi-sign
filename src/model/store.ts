import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from '../controllers/slices/userSlice'
import statementsSliceReducer from '../controllers/slices/statementsSlice'
import isEditSliceReducer from '../controllers/slices/editSlice';
import subscriptionsSliceReducer from '../controllers/slices/subscriptionsSlice';
import agreesSliceReducer from '../controllers/slices/agreeSlice';
import approvalsSliceReducer from '../controllers/slices/approvalSlice';
import commentsSliceReducer from '../controllers/slices/commentsSlice';
import evaluationsSliceReducer from '../controllers/slices/evaluationSlice';
import modeSliceReducer from '../controllers/slices/modesSlice';
import tocSliceReducer from '../controllers/slices/tocSlice';
import modalSliceReducer from '../controllers/slices/modalsSlice';

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    agrees: agreesSliceReducer  ,
    statements: statementsSliceReducer,
    isEdit: isEditSliceReducer,
    subscriptions: subscriptionsSliceReducer,
    approvals: approvalsSliceReducer,
    comments: commentsSliceReducer,
    evaluations: evaluationsSliceReducer,
    modes: modeSliceReducer,
    tocs: tocSliceReducer,
    modals: modalSliceReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch