import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role, Statement } from 'delib-npm';



interface CommentsState {
    role: Role | undefined;
    statement: Statement | undefined;
    comments: Statement[];
    showComments: boolean;
    showNewComment: boolean;
}

const initialState: CommentsState = {
    role: Role.unsubscribed,
    statement: undefined,
    comments: [],
    showComments: false,
    showNewComment: false,
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setComments: (state, action: PayloadAction<CommentsState>) => {
            state.role = action.payload.role;
            state.statement = action.payload.statement;
            state.comments = action.payload.comments;
            state.showComments = action.payload.showComments;
            state.showNewComment = action.payload.showNewComment;
        },
        updateRole: (state, action: PayloadAction<Role>) => {
            state.role = action.payload;
        },
        updateStatement: (state, action: PayloadAction<Statement>) => {
            state.statement = action.payload;
        },
        updateComments: (state, action: PayloadAction<Statement[]>) => {
            state.comments = action.payload;
        },
        updateShowComments: (state, action: PayloadAction<boolean>) => {
            state.showComments = action.payload;
        },
        updateShowNewComment: (state, action: PayloadAction<boolean>) => {
            state.showNewComment = action.payload;
        },
    },
});

export const { setComments, updateRole, updateComments, updateShowComments, updateShowNewComment } = commentsSlice.actions;

export const commentsSelector = (state: { comments: CommentsState }) => state.comments;

export default commentsSlice.reducer;