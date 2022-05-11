import * as types from "./types";

export const GetUsersRequestAction = (users) => ({
  type: types.GET_USERS,
  payload: users,
});

export const GetUsersRequestStartAction = {
  type: types.GET_USERS_REQUEST,
};

export const GetUsersRequestFailAction = (error) => ({
  type: types.GET_USERS_REQUEST_FAIL,
  payload: error,
});

export const AddUserAction = (user) => ({
  type: types.USER_CREATE,
  payload: user,
});

export const UserDeleteAction = (user) => ({
  type: types.USER_DELETE,
  payload: user,
});

export const UserLoginAction = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});
export const UserLoginActionStart = (user) => ({
  type: types.LOGIN_START,
});
export const UserLoginActionFailure = (user) => ({
  type: types.LOGIN_FAILURE,
});
export const updateUserAction = () => ({
  type: types.UPDATE_USER,
});
