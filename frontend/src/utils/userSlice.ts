import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

interface User {
    id: string;
    username: string;
    email: string;
    name: string;
    bio: string;
    phone: string;
    github: string;
    image: string;
    skills: string[];
    team_count: number;
}

interface UserState {
    loggeduser: User | null;
    users: User[];
    user: User | null;
}

const storedUser = localStorage.getItem('user');
const initialState: UserState = {
    loggeduser: storedUser ? JSON.parse(storedUser) : null,
    users: [],
    user: null,
};

export const fetchUserById = createAsyncThunk<User, string>('/users/fetchUserById', async (id) => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
});

export const fetchUserByusername = createAsyncThunk<User, string>('/users/fetchUserByusername', async (username) => {
    const response = await axiosInstance.get(`/users/${username}`);
    return response.data;
});

export const fetchUsers = createAsyncThunk<User[]>('/users/fetchUsers', async () => {
    const response = await axiosInstance.get('/users');
    return response.data;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLogin: (state, action: PayloadAction<User>) => {
            const { id, username, email, name, bio, phone, github, image, skills, team_count } = action.payload;
            const userData = { id, username, email, name, skills, team_count, bio, phone, github, image };

            state.loggeduser = userData;
            localStorage.setItem('user', JSON.stringify(userData));
        },
        setSignOut: (state) => {
            state.loggeduser = null;
            localStorage.removeItem('user');
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
                state.users.push(action.payload);
            })
            .addCase(fetchUserByusername.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload;
            });
    },
});

export const { setUserLogin, setSignOut, setUser } = userSlice.actions;
export default userSlice.reducer;
