import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "./topbar.css";
function TopBar({ usersLogged, users }) {
  const [cookies, setCookie] = useCookies(["user"]);
  function logout() {
    setCookie("login", "", { path: "/" });
    setCookie("password", "", { path: "/" });
    window.location.href = "/";
    // return false;
  }
  const isLogged = users.find((x) => x.login === usersLogged.login);
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              POSTS
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/chat">
              CHAT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/posts/stats">
              STATS
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/posts/add">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={logout}>
            {usersLogged.login !== "" && "LOGOUT"}
          </li>
        </ul>
      </div>

      <div className="topRight">
        {isLogged ? (
          <Link to={`users/${isLogged._id}`}> {isLogged.login} </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    usersLogged: state.users.loggedUsers,
  };
};
export default withRouter(connect(mapStateToProps, null)(TopBar));
