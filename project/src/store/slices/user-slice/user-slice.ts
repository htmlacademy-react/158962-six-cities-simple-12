import { createSlice } from '@reduxjs/toolkit';
import {APIRoute, AppRoute, AuthorizationStatus, NameSpace} from '../../../const';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {dropToken, saveToken} from '../../../services/token';
import {redirectToRoute} from '../../action';
import {toast} from 'react-toastify';
import {ThunkOptions} from '../../../types/state';
import {pushNotification} from '../notification-slice/notification-slice';
import {fetchFavorites} from '../favorites-slice/favorites-slice';


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

// dont need status here
export const checkAuthAction = createAsyncThunk<UserData, undefined, ThunkOptions>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(fetchFavorites());
      return data;
    } catch (e) {
      dispatch(pushNotification({type: 'info', message: 'Get more features after authorization'}));
      throw e;
    }
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, ThunkOptions>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(data.token);
      dispatch(redirectToRoute(AppRoute.Root));
      dispatch(fetchFavorites());
      return data;
    } catch (e) {
      dispatch(pushNotification({type: 'error', message: 'Failed login'}));
      throw e;
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
    } catch (e) {
      toast.error('Failed logout');
      throw e;
    }
  },
);

export const userSlice = createSlice({
  name: NameSpace.User,
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
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
    });
  }
});

export const selectAuthorizationStatus = (state: RootState) => state[NameSpace.User].authorizationStatus;
export const selectLogin = (state: RootState) => state[NameSpace.User].login;
export const selectAvatar = (state: RootState) => state[NameSpace.User].avatar;
export const getIsAuth = (state: RootState) => state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth;
export default userSlice.reducer;
