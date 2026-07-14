

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const signup = createAsyncThunk(
    "auth/signup",
    async (userData, thunkAPI) => {
        try {
            const response = await api.post("/auth/signup", userData);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Signup Failed"
            );
        }
    }
);  




export const signin = createAsyncThunk(
    "auth/signin",
    async (userData, thunkAPI) => {
        try {
            const response = await api.post("/auth/signin", userData);

            localStorage.setItem("token", response.data.token);

            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Login Failed"
            );
        }
    }
);

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
    name: "auth",

    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    },

    extraReducers: (builder) => {
        builder

        
            .addCase(signup.pending, (state) => {
                state.loading = true;
            })

            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })

            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        
            .addCase(signin.pending, (state) => {
                state.loading = true;
            })

            .addCase(signin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })

            .addCase(signin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;