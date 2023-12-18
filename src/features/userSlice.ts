import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchedMovie } from "../components/searchedmovies/SearchedMoviesContainer";
import { Draft } from "@reduxjs/toolkit";

// Define the types for your state
interface UserState {
    user: string | null;
    userName: string;
    searchedMovies: Draft<SearchedMovie>[] | null;
}

const initialState: UserState = {
    user: null,
    userName: '',
    searchedMovies: null
};

// Define the types for your actions and payloads
interface SetUserNameAction extends PayloadAction<string> {}
interface SetSearchedMoviesAction extends PayloadAction<string[] | null> {}
interface LoginAction extends PayloadAction<string | null> {}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserName: (state, action: SetUserNameAction) => {
            state.userName = action.payload;
        },
        setSearchedMovies: (state, action: SetSearchedMoviesAction) => {
            state.searchedMovies = action.payload;
        },
        login: (state, action: LoginAction) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        }
    }
});

export const { login, logout, setUserName, setSearchedMovies } = userSlice.actions;
export default userSlice.reducer;