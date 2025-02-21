// Copyright (c) Microsoft. All rights reserved.

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertType } from '../../../libs/models/AlertType';
import { Alert, Alerts, AppState } from './AppState';

const initialState: AppState = {
    alerts: {
        '0': {
            message:
                'By using this chat bot, you agree to not to share confidential, client or matter information in chat history.',
            type: AlertType.Info,
        },
    },
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAlerts: (state: AppState, action: PayloadAction<Alerts>) => {
            state.alerts = action.payload;
        },
        addAlert: (state: AppState, action: PayloadAction<Alert>) => {
            const keys = Object.keys(state.alerts ?? []);
            let newIndex = keys.length.toString();
            if (keys.length >= 3) {
                newIndex = keys[0];
                delete state.alerts![newIndex];
            }
            state.alerts = { ...state.alerts, [newIndex]: action.payload };
        },
        removeAlert: (state: AppState, action: PayloadAction<string>) => {
            if (state.alerts) delete state.alerts[action.payload];
        },
    },
});

export const { addAlert, removeAlert, setAlerts } = appSlice.actions;

export default appSlice.reducer;
