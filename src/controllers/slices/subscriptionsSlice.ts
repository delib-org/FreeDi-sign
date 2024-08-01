import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { StatementSubscription, updateArray } from 'delib-npm'

export interface SubscriptionsState {
    subscriptions: StatementSubscription[]
}

const initialState: SubscriptionsState = {
    subscriptions: [],
}

export const subscriptionsSlice = createSlice({
    name: 'subscriptions',
    initialState,
    reducers: {
        setSubscription: (state, action: PayloadAction<StatementSubscription>) => {
            state.subscriptions = updateArray(state.subscriptions, action.payload, "statementsSubscribeId");
        },
    },
})

// Action creators are generated for each case reducer function
export const { setSubscription } = subscriptionsSlice.actions

export const selectSubscriptionById = (subscriptionId:string) => (state: { subscriptions: SubscriptionsState }) => state.subscriptions.subscriptions.find((subscription) => subscription.statementsSubscribeId === subscriptionId);

export default subscriptionsSlice.reducer