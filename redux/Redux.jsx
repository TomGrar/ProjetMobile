import {configureStore, createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        userId: null,
    },
    reducers:{
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
        },
        logout: (state) => {
            state.token = null;
            state.userId = null
        }
    }
})

export const store = configureStore({
    reducer:{
        user: userSlice.reducer,
    }
});

export const {loginSuccess, logout} = userSlice.actions;
