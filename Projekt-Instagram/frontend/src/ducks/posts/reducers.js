import * as types from "./types";

const initState = {
  posts: [],
  loading: false,
  error: "",
};

const PostReducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_POST_REQUEST:
      return { ...state, loading: true };
    case types.GET_POST_REQUEST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case types.GET_POSTS:
      return { ...state, posts: [...action.payload], loading: false };
    case types.POST_CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case types.ADD_COMMENT_TO_POST:
      return {
        ...state,
        posts: state.posts.map(function (el) {
          return el._id === action.payload.post
            ? { ...el, comments: [...el.comments, action.payload._id] }
            : { ...el };
        }),
      };

    case types.UPDATE_POST:
      return {
        ...state,
        loading: false,
      };
    case types.POST_DELETE:
      return {
        ...state,
        posts: state.posts.filter((el) => el._id !== action.payload),
      };
    default:
      return state;
  }
};

export default PostReducer;
