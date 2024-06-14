import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from 'delib-npm'

export interface UserState {
    user: User | null
}

const initialState: UserState = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | undefined>) => {
            state.user = action.payload || null
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export const selectUser = (state: { user: UserState }) => state.user.user

export default userSlice.reducer