import * as types from "./types";

export const getPostsAction = (posts) => ({
  type: types.GET_POSTS,
  payload: posts,
});

export const getPostRequestAction = {
  type: types.GET_POST_REQUEST,
};

export const getPostRequestActionFail = (error) => ({
  type: types.GET_POST_REQUEST_FAIL,
  payload: error,
});

export const AddPostAction = (post) => ({
  type: types.POST_CREATE,
  payload: post,
});

export const DeletePostAction = (post) => ({
  type: types.POST_DELETE,
  payload: post,
});
export const updatePostAction = () => ({
  type: types.UPDATE_POST,
});
