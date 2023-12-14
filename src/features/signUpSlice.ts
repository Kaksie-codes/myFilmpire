import { createSlice } from "@reduxjs/toolkit";

// Define the types for your state
interface SignUpState {
    email: string | null;    
}

const initialState: SignUpState = {
    email: null  
}

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers:{
        setEmail:(state, action) =>{
            state.email = action.payload;
        }
    }
})

export const { setEmail } = signupSlice.actions;
export default signupSlice.reducer;