


import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    currentUser:null,
    error:null,
    loading:false
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{

        signInStart:(state) => {

            state.loading = true 

            state.error = null
        },

        signInSuccess:(state,action) => {

            state.loading = false

            state.currentUser = action.payload

            state.error = null
        },

        signInFailure:(state,action) => {

            state.loading = false 

            state.currentUser = null 

            state.error = action.payload
        },

        updateUserStart:(state) => {

            state.loading = true 

            state.error = null
        },

        updateUserSuccess:(state,action) => {

            state.loading = false

            state.currentUser = action.payload

            state.error = null

        },

        updateUserFailure:(state,action) => {

            state.loading = false

            state.error = action.payload
        },

        deleteUserSuccess:(state) => {

            state.error = null

            state.currentUser = null
        },

        deleteUserFailure:(state,action) => {

            state.error = action.payload

            state.loading = false
        },

        signOutUserSuccess:(state) => {

            state.currentUser = null

            state.loading = false 

            state.error = null
        }

    }
})


export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserSuccess,
    deleteUserFailure,
    signOutUserSuccess
}
 = userSlice.actions


export default userSlice.reducer 