import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { StatementSubscription, updateArray, User, UserData } from 'delib-npm'

export interface UserState {
    user: User | null;
    usersData:UserData[]; //data of other users
    subscription: StatementSubscription | null;
}

const initialState: UserState = {
    user: null,
    usersData: [],
    subscription: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | undefined>) => {
            state.user = action.payload || null
        },
        setUserData: (state, action: PayloadAction<UserData | undefined>) => {
            if(!action.payload) return;
            state.usersData = updateArray(state.usersData, action.payload, "userId");
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUser,setUserData } = userSlice.actions

export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectUserData = (state: { user: UserState }) => state.user.usersData.find(ud=> ud.userId === state.user.user?.uid);
export const selectUserDataByUserId = (userId:string) => (state: { user: UserState }) => state.user.usersData.find(ud=> ud.userId === userId);


export default userSlice.reducer