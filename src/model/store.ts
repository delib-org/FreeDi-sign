import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from '../controllers/slices/userSlice'
import statementsSliceReducer from '../controllers/slices/statementsSlice'
import isEditSliceReducer from '../controllers/slices/editSlice';
import subscriptionsSliceReducer from '../controllers/slices/subscriptionsSlice';
import agreesSliceReducer from '../controllers/slices/agreeSlice';

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    agrees: agreesSliceReducer  ,
    statements: statementsSliceReducer,
    isEdit: isEditSliceReducer,
    subscriptions: subscriptionsSliceReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch