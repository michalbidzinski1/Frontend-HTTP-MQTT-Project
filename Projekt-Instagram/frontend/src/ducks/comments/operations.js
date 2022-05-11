import axios from "axios";
import * as actions from "./actions";
export const getAllComments = () => {
  return async (dispatch) => {
    dispatch(actions.getCommentsRequestAction);

    setTimeout(async () => {
      try {
        const response = await axios.get("http://localhost:5000/comments");

        dispatch(actions.getCommentsAction(response.data.comments));
      } catch (error) {
        dispatch(actions.getCommentsRequestFail(error));
      }
    }, 0);
  };
};
export const addComment = (comment) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/comments",
        comment
      );
      console.log("RESPONSE", response);
      dispatch(actions.AddCommentAction(response.data));
      dispatch(actions.addCommentToPostAction(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteComment = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/comments/${id}`
      );

      dispatch(actions.DeleteCommentAction(id));
    } catch (err) {
      console.log(err);
    }
  };
};
// export const deleteComment = (id) => {
//   console.log("id", id);
//   return async (dispatch) => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:5000/comments/${id}/`
//       );
//       console.log("response", response._id);
//       dispatch(actions.DeleteCommentAction(id));
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };
export const updateComment = (comment) => {
  return function (dispatch) {
    axios
      .put(`http://localhost:5000/comments/${comment._id}`, comment)
      .then((resp) => {
        dispatch(actions.updateCommentAction(resp));
        dispatch(getAllComments());
      })
      .catch((error) => console.log(error));
  };
};
