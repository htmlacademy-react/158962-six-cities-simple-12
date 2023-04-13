import {userSlice, UserProcess, checkAuthAction, loginAction, logoutAction} from './user-slice';
import {AuthorizationStatus} from '../../../const';
import {makeFakeUserData} from '../../../utils/mocks';

const fakeUserData = makeFakeUserData();

describe('Reducer: user', () => {
  let state: UserProcess;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      login: '',
      avatar: '',
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userSlice.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        login: '',
        avatar: '',
      });
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" and return user params if checkAuthAction fulfilled', () => {
      expect(userSlice.reducer(state, {
        type: checkAuthAction.fulfilled.type,
        payload: fakeUserData,
      }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.Auth,
          login: fakeUserData.email,
          avatar: fakeUserData.avatarUrl,
        });
    });
    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userSlice.reducer(state, { type: checkAuthAction.rejected.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          login: '',
          avatar: '',
        });
    });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH" and return user params if loginAction fulfilled', () => {
      expect(userSlice.reducer(state, {
        type: loginAction.fulfilled.type,
        payload: fakeUserData,
      }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.Auth,
          login: fakeUserData.email,
          avatar: fakeUserData.avatarUrl,
        });
    });
    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(userSlice.reducer(state, { type: loginAction.rejected.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          login: '',
          avatar: '',
        });
    });
  });

  describe('logoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(userSlice.reducer(state, { type: logoutAction.fulfilled.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          login: '',
          avatar: '',
        });
    });
  });
});
