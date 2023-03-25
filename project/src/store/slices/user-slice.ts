import { createSlice } from '@reduxjs/toolkit';
import {APIRoute, AppRoute, AuthorizationStatus} from '../../const';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState, api, AppDispatch} from '../store';
import {AxiosInstance} from 'axios';
import {dropToken, saveToken} from '../../services/token';
import {redirectToRoute} from '../action';


export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  login: string | null;
};

export type AuthData = {
  login: string;
  password: string;
};

export type UserData = {
  id: number;
  email: string;
  token: string;
};


const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  login: '',
};

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    await api.get(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Root));
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
  reducers: {
    setLogin(state, action) {
      state.login = action.payload;
    }
  },

  extraReducers(builder) {
    builder.addCase(checkAuthAction.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
    });
    builder.addCase(checkAuthAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
    });
    builder.addCase(loginAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
  }
})

export const getAuthorizationStatus = (state: RootState) => state.user;
export const { setLogin } = userSlice.actions;
export default userSlice.reducer;
