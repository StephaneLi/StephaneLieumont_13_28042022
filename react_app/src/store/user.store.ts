import { createSlice, PayloadAction, Slice, createAsyncThunk } from '@reduxjs/toolkit'
import Api, { SigniInPayload } from '../services/Api';

interface IErrorSigninMessages {
  [key: string]: string | undefined
}

interface IUserInfos {
  email?: string,
  firstname?: string,
  lastname?: string,
  createdAt?: Date,
  updatedAt?: Date,
  id?: string
}

interface IUserInitialState {
  user?: IUserInfos,
  isAuthenticated: boolean,
  token?: string,
  loading?: boolean,
  errorMessage?: string
}

export const ErrorSigninMessages: IErrorSigninMessages = {
  ERR_BAD_REQUEST: "You don't have a user account",
  ERR_NETWORK: "An error occurred on the server, please contact the administrator"
}

const userInitialState: IUserInitialState = {
  token: undefined,
  isAuthenticated: false
}

// Slice
const userSlice:Slice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setToken: (state: IUserInitialState, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    deleteToken: (state: IUserInitialState) =>  {
      state.token = undefined;
    },
    isAuthenticated: (state: IUserInitialState) => {
      state.isAuthenticated = !state.isAuthenticated
    }
  },
  extraReducers: (builder) => {
    // Login authentication
    builder.addCase( login.pending, (state) => {
      state.loading = true;
    })
    builder.addCase( login.fulfilled, (state, action) => {      
      state.loading = false;
      state.token = action.payload.body!.token
      state.errorMessage = undefined
    })
    builder.addCase( login.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = action.error.code ? ErrorSigninMessages[action.error.code] : undefined
    })

    // GetUserInfos
    builder.addCase( getUserInfos.pending, (state) => {
      state.loading = true;
    })
    builder.addCase( getUserInfos.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload
      state.isAuthenticated = true
      state.errorMessage = undefined
    })
    builder.addCase( getUserInfos.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = action.error.code ? ErrorSigninMessages[action.error.code] : undefined
    })
  },
});

// ACTIONS
const login = createAsyncThunk(
  "auth/login",
  async (payload: SigniInPayload) => {
    const response = await Api.postSignIn({email: payload.email, password: payload.password})
    return response;
  }
);

const getUserInfos = createAsyncThunk(
  "auth/getUser",
  async (token: string) => {
    const response = await Api.getUserInfos(token)
    return response;
  }
);

const { setToken, deleteToken, isAuthenticated } = userSlice.actions

export const UserActions = {
  setToken,
  deleteToken,
  isAuthenticated,
  login,
  getUserInfos
}

export default userSlice

