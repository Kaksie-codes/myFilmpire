import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice';
import signUpReducer from './features/signUpSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        
    },
});

export default store
// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;

