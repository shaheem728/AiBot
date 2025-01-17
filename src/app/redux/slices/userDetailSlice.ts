import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {API_URL} from '@/components/config'
    let userToken: string | null = null;
    if (typeof window !== "undefined") {
    userToken = localStorage.getItem("token");
    }
    if(userToken) {
      const parsedUserToken = JSON.parse(userToken);
      var refreshtoken = parsedUserToken.refresh ;
    }
export const refreshToken = async () => {
    const response = await fetch(`${API_URL}/api/token/refresh/`, {
        method: "POST",
        body: JSON.stringify({ refresh: refreshtoken }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json(); 
      if (response.ok) {
        localStorage.setItem("token", JSON.stringify(data));
        return ;
      }
      if(!response.ok){
        logout()
      }
    }
export const logout = async () => {
    const response = await fetch(`${API_URL}/api/logout/`, {
        method: 'POST',
        body: JSON.stringify({ refresh_token: refreshtoken }),
        headers: {
            'Content-Type': 'application/json', // Include access token here
        },
    });
    if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        location.href="/user/login"
    } else {
        alert("Authentication failed");
    }
    }
export interface UserDetail {
    username: string;
    email: string;
    first_name:string;
    last_name:string;
    profile: { 
        mobile?: string;
        address: string;
    };
}
interface userDetailState {
    userInfo : UserDetail | null;
    status: 'idle' | 'loading' |'succeeded' | 'failed';
    error: string | null;
}
const initialState: userDetailState = {
    userInfo: null,
    status: 'idle',
    error:null,
}
export const fetchuserDetail = createAsyncThunk('userDetail/fetchuserDetail', async (id:number) => {
    const response = await fetch(`${API_URL}/api/user/`+id);
    if (!response.ok) {
        throw new Error('Failed to fetch user details');
    }
    const data: UserDetail = await response.json(); // Ensure the data is of type User
    return data; // Return the fetched user data
});
const userDetailSlice = createSlice({
    name: 'userDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchuserDetail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchuserDetail.fulfilled, (state, action: PayloadAction<UserDetail>) => {
                state.status = "succeeded";
                state.userInfo = action.payload;
            })
            .addCase(fetchuserDetail.rejected, (state, action) => {
                state.status = "failed";
                if (action.error && typeof action.error.message === 'string') {
                    state.error = action.error.message;
                } else {
                    state.error = 'something went wrong';
                }
            });
    }
});
export const userDetailReducer = userDetailSlice.reducer;
