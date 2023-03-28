import { createSlice } from '@reduxjs/toolkit';
import {APIRoute, AppRoute, AuthorizationStatus} from '../../const';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState, AppDispatch} from '../store';
import {AxiosInstance} from 'axios';
import {dropToken, saveToken} from '../../services/token';
import {redirectToRoute} from '../action';


export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  login: string | null;
  avatar: string;
};

export type AuthData = {
  login: string;
  password: string;
};

export type UserData = {
  id: number;
  email: string;
  token: string;
  avatarUrl: string;
};


const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  login: '',
  avatar: '',
};

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Root));
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(checkAuthAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.login = action.payload.email;
      state.avatar = action.payload.avatarUrl;
    });
    builder.addCase(checkAuthAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.login = action.payload.email;
      state.avatar = action.payload.avatarUrl;
    });
    builder.addCase(loginAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
  }
});

export const getAuthorizationStatus = (state: RootState) => state.user;
export default userSlice.reducer;
