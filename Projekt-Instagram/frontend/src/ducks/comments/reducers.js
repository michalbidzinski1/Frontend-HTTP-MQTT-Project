import * as types from "./types";

const initState = {
  comments: [],
  loading: false,
  error: "",
};

const CommentsReducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_COMMENS_REQUEST:
      return { ...state, loading: true };
    case types.GET_COMMENTS_REQUEST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case types.GET_COMMENTS:
      return { ...state, comments: [...action.payload], loading: false };
    case types.COMMENT_CREATE:
      return { ...state, comments: [...state.comments, action.payload] };
    case types.UPDATE_COMMENT:
      return {
        ...state,
        loading: false,
      };
    case types.COMMENT_DELETE:
      return {
        ...state,
        comments: state.comments.filter((el) => el._id !== action.payload),
      };
    default:
      return state;
  }
};

export default CommentsReducer;
