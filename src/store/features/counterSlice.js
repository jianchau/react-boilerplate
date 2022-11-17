/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '@/utils';

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(someRequest.fulfilled, (state, action) => {})
    //         .addCase(someRequest.pending, (state, action) => {})
    //         .addCase(someRequest.rejected, (state, action) => {});
    // },
});

// if we do not need to access state to handle remote response
export const asyncIncrement = (payload) => (dispatch) => {
    setTimeout(() => {
        dispatch(increment());
    }, 2000);
};

// some times,we need to access state to handle remote response
// recomment use createAsyncThunk
// for more info,visit https://redux-toolkit.js.org/api/createAsyncThunk

// export const someRequest =
//     ('counter/someRequest',
//     async (payload, thunkAPI) => {
//         const res = await request.get('htttps://www.baidu.com');
//         return new Promise((resolve, reject) => {
//             if (res.code === 0) {
//                 resolve(res.data);
//             } else {
//                 reject();
//             }
//         });
//     });

// in react compoents
// dispatch(someRequest())

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
