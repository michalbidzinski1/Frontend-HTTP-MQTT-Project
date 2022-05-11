import axios from "axios";
import * as actions from "./actions";

export const getUsers = () => {
  return async (dispatch) => {
    dispatch(actions.GetUsersRequestStartAction);
    console.log("GET USERS");
    setTimeout(async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");

        dispatch(actions.GetUsersRequestAction(response.data.users));
      } catch (error) {
        dispatch(actions.GetUsersRequestFailAction(error));
      }
    }, 0);
  };
};

export const loginUser = (user) => {
  return async (dispatch) => {
    dispatch(actions.UserLoginActionStart);
    try {
      const response = await axios.post(
        "http://localhost:5000/users/login",
        user
      );

      dispatch(actions.UserLoginAction(response.data));
    } catch (err) {
      console.log("ERRORRR");
      dispatch(actions.UserLoginActionFailure);
    }
  };
};

export const addUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/users/register",
        user
      );

      dispatch(actions.AddUserAction(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};
export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`http://localhost:5000/users/${id}`);

      dispatch(actions.UserDeleteAction(id));
    } catch (err) {
      console.log(err);
    }
  };
};
// export const loginUser = (data) => {
//   return async (dispatch) => {
//     dispatch(actions.UserLoginAction(data));
//   };
// };
export const updateUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/users/${user._id}`,
        user
      );

      dispatch(deleteUser(response.data._id));
      dispatch(addUser(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};
