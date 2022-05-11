import * as types from "./types";

export const getCommentsAction = (comments) => ({
  type: types.GET_COMMENTS,
  payload: comments,
});

export const getCommentsRequestAction = {
  type: types.GET_COMMENS_REQUEST,
};

export const getCommentsRequestFail = (error) => ({
  type: types.GET_COMMENTS_REQUEST_FAIL,
  payload: error,
});

export const AddCommentAction = (comment) => ({
  type: types.COMMENT_CREATE,
  payload: comment,
});

export const DeleteCommentAction = (comment) => ({
  type: types.COMMENT_DELETE,
  payload: comment,
});
export const updateCommentAction = () => ({
  type: types.UPDATE_COMMENT,
});
export const addCommentToPostAction = (comment) => ({
  type: types.ADD_COMMENT_TO_POST,
  payload: comment,
});
