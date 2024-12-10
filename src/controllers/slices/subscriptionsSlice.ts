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
export const selectSubscriptionByStatementId = (statementId:string | undefined) => (state: { subscriptions: SubscriptionsState }) => state.subscriptions.subscriptions.find((subscription) => subscription.statementId === statementId);
export const selectSubscriptionByDocumentId = (documentId:string | undefined, userId:string) => (state: { subscriptions: SubscriptionsState }) => state.subscriptions.subscriptions.find((subscription) => subscription.statement.statementId === documentId && subscription.userId === userId);

export default subscriptionsSlice.reducer