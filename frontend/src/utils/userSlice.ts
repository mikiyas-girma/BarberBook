import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

interface Customer {
  _id: string;
  email: string;
  name: string;
  phoneNumber: string;
  bookings: string[];
}

interface Barber {
  _id: string;
  email: string;
  name: string;
  phoneNumber: string;
  portfolio?: string[];
  availableSlots?: string[];
  bookings?: string[];
  businessName?: string;
}

type User = Customer | Barber;

interface UserState {
  loggedUser: User | null;
  users: (Customer | Barber)[];
  user: User | null;
}

const storedUser = localStorage.getItem("user");
const initialState: UserState = {
  loggedUser: storedUser ? JSON.parse(storedUser) : null,
  users: [],
  user: null,
};

// Fetch user by ID
export const fetchUserById = createAsyncThunk<User, string>(
  "/users/fetchUserById",
  async (id) => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  }
);

// Fetch user by username
export const fetchUserByUsername = createAsyncThunk<User, string>(
  "/users/fetchUserByUsername",
  async (username) => {
    const response = await axiosInstance.get(`/users/${username}`);
    return response.data;
  }
);

// Fetch all users
export const fetchUsers = createAsyncThunk<(Customer | Barber)[], void>(
  "/users/fetchUsers",
  async () => {
    const response = await axiosInstance.get("/users");
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set login for the user (either Barber or Customer)
    setUserLogin: (state, action: PayloadAction<User>) => {
      console.log("Login successful", action.payload);
      state.loggedUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    // Sign out user
    setSignOut: (state) => {
      state.loggedUser = null;
      localStorage.removeItem("user");
    },

    // Set a specific user (could be from fetched data)
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle fetching user by ID
    builder.addCase(
      fetchUserById.fulfilled,
      (state, action: PayloadAction<User>) => {
        const user = action.payload;

        // Check if the user is a Barber or a Customer based on available fields
        if ("portfolio" in user || "availableSlots" in user) {
          // It's a Barber
          state.users.push(user as Barber);
        } else {
          // It's a Customer
          state.users.push(user as Customer);
        }
      }
    );

    // Handle fetching user by username
    builder.addCase(
      fetchUserByUsername.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      }
    );

    // Handle fetching all users
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<(Customer | Barber)[]>) => {
        state.users = action.payload;
      }
    );
  },
});

export const { setUserLogin, setSignOut, setUser } = userSlice.actions;
export default userSlice.reducer;
