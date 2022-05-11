import * as types from "./types";

const initState = {
  users: [],
  loggedUsers: { login: "", password: "" },
  loading: false,
  error: "",
};

const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case types.LOGIN_START:
      return { ...state, loading: true };
    case types.LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case types.GET_USERS_REQUEST:
      return { ...state, loading: true };
    case types.GET_USERS_REQUEST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case types.GET_USERS:
      return { ...state, users: [...action.payload], loading: false };
    case types.USER_CREATE:
      return { ...state, users: [...state.users, action.payload] };
    case types.UPDATE_USER:
      return {
        ...state,
        loading: false,
      };
    case types.USER_DELETE:
      return {
        ...state,
        users: state.users.filter((el) => el._id !== action.payload),
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedUsers: {
          login: action.payload.login,
          password: action.payload.password,
        },
      };
    default:
      return state;
  }
};

export default UserReducer;
