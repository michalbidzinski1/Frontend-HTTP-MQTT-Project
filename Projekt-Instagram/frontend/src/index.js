import React from "react";
import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import CommentsReducer from "./ducks/comments/reducers";
import PostReducer from "./ducks/posts/reducers";
import UserReducer from "./ducks/users/reducers";
import "./index.scss";
const store = createStore(
  combineReducers({
    posts: PostReducer,
    users: UserReducer,
    comments: CommentsReducer,
  }),
  applyMiddleware(thunk)
);

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
