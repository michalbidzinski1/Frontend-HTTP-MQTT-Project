import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { getAllPosts } from "./ducks/posts/operations";
import Postlist from "./ui/posts/PostList";
import { loginUser } from "./ducks/users/operations";
import { connect } from "react-redux";
import LoginForm from "./ui/users/login";
import { getUsers } from "./ducks/users/operations";
import RegisterForm from "./ui/users/register";
import PostEdit from "./ui/posts/PostEdit";
import PostForm from "./ui/posts/PostForm";
import { useCookies } from "react-cookie";
import Chatroom from "./ui/chat/Chatroom";
import Chatrooms from "./ui/chat/Chatrooms";
import UsersList from "./ui/users/usersList";
import UserEditForm from "./ui/users/UserEdit";
import PostDetail from "./ui/posts/PostDetail";
import { getAllComments } from "./ducks/comments/operations";
import PostStats from "./ui/posts/PostStats";
import EditComment from "./ui/posts/EditComment";
import TopBar from "./ui/Topbar/TopBar";
function App({ getAllPosts, getUsers, loginUser, getAllComments }) {
  const [cookies, setCookie] = useCookies(["user"]);
  const values = {
    login: cookies.login,
    password: cookies.password,
  };

  useEffect(() => {
    getAllPosts();
    getUsers();
    getAllComments();
    if (cookies.login && cookies.password) {
      loginUser(values);
    }
  }, []);

  return (
    <div>
      <Router>
        <TopBar />
        <div>
          {/* <nav>
            <ul>
              <li>
                <Link to="/">Posts</Link>
              </li>
              <li>
                <Link to="/posts/stats">Posts stats</Link>
              </li>
              <li onClick={logout}>LOGOUT</li>
            </ul>
          </nav> */}

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/posts/comment/:id">
              <EditComment />
            </Route>
            <Route path="/posts/stats">
              <PostStats />
            </Route>
            <Route path="/posts/add">
              <PostForm />
            </Route>
            <Route path="/posts/:id">
              <PostDetail />
            </Route>
            <Route path="/post/edit/:id">
              <PostEdit />
            </Route>

            <Route path="/chat">
              <Chatrooms />
            </Route>
            <Route path="/room/:id">
              <Chatroom />
            </Route>
            <Route path="/users/edit/:id">
              <UserEditForm />
            </Route>
            <Route path="/register">
              <RegisterForm />
            </Route>
            <Route path="/users/:id">
              <UsersList />
            </Route>

            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/">
              <Postlist />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

const mapDispatchToProps = {
  getAllPosts,
  getUsers,
  loginUser,
  getAllComments,
};

export default connect(null, mapDispatchToProps)(App);
