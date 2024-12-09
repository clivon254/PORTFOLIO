

import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    currentUser:null,
    error:null,
    loading:false
}


const userSlice = createSlice({
    name:'User',
    initialState,
    reducers:{

        signInStart:(state) => {

            state.loading = true

            state.error = null
        },

        signInSuccess:(state ,action) => {

            state.loading = false

            state.currentUser = action.payload

            state.error = null
        },

        signInFailure:(state,action) => {

            state.loading = false

            state.error = null

            state.currentUser = action.payload
        },

        updateUserStart:(state,action) => {

            state.loading = true

            state.error = false
        },

        updateUserSuccess:(state,action) => {

            state.loading = false

            state.currentUser = action.payload

            state.error = null
        },

        updateUserFailure:(state,action) => {

            state.error = action.payload

            state.loading = false

        },

        deleteUserSuccess:(state,action) => {

            state.currentUser = null

            state.error = null
        },

        deleteUserFailure:(state,action) => {

            state.error = action.payload

            state.loading = false
        },

        signOutSuccesss:(state,action) => {

            state.currentUser = null 

            state.loading = false
        },

    }
}) 


export  const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserSuccess,
    deleteUserFailure,
    signOutSuccesss
} 
= userSlice.actions


export default userSlice.reducer