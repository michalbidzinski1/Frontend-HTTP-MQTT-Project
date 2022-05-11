import axios from "axios";
import * as actions from "./actions";

export const getAllPosts = () => {
  return async (dispatch) => {
    dispatch(actions.getPostRequestAction);

    setTimeout(async () => {
      try {
        const response = await axios.get("http://localhost:5000/posts");

        dispatch(actions.getPostsAction(response.data.allPosts));
      } catch (error) {
        dispatch(actions.getPostRequestActionFail(error));
      }
    }, 0);
  };
};
export const addPost = (post) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:5000/posts", post);

      dispatch(actions.AddPostAction(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};
export const deletePost = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`http://localhost:5000/posts/${id}`);
      console.log(response);
      dispatch(actions.DeletePostAction(id));
    } catch (err) {
      console.log(err);
    }
  };
};
export const updatePost = (post) => {
  return function (dispatch) {
    axios
      .put(`http://localhost:5000/posts/${post._id}`, post)
      .then((resp) => {
        dispatch(actions.updatePostAction(resp));
        dispatch(getAllPosts());
      })
      .catch((error) => console.log(error));
  };
};
// export const addCommentToPost = (post) => {
//   console.log("AHHA", post);
//   return function (dispatch) {
//     axios
//       .post(`http://localhost:5000/posts/${post.post}/comment`, post)
//       .then((resp) => {
//         console.log("resp", resp);
//         dispatch(actions.updatePostAction(resp));
//         dispatch(getAllPosts());
//       })
//       .catch((error) => console.log(error));
//   };
// };
