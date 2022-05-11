import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { deleteUser } from "../../ducks/users/operations";
import { useCookies } from "react-cookie";
import classes from "./users.module.scss";
const UsersList = ({ history, deleteUser, loading, users, usersLogged }) => {
  const [cookies, setCookie] = useCookies(["user"]);
  function logout() {
    setCookie("login", "", { path: "/" });
    setCookie("password", "", { path: "/" });
    window.location.href = "/";
    // return false;
  }
  const isLogged = users.find((x) => x.login === usersLogged.login);
  const handleClick1 = (values) => {
    const isLogged = users.find((x) => x.login === values);
    if (window.confirm("Are you sure wanted to delete the account ?")) {
      if (isLogged) {
        deleteUser(isLogged._id);
        logout();
      }
    }
  };
  return (
    <div>
      {isLogged ? (
        <div key={isLogged._id}>
          <div>{isLogged.login}</div>
          <div>{isLogged.registrationDate}</div>
          <button
            className={classes.button}
            onClick={() => history.push(`/users/edit/${isLogged._id}`)}
          >
            Edytuj dane logowania
          </button>
          <button
            className={classes.button}
            onClick={() => handleClick1(usersLogged.login)}
          >
            Usun konto
          </button>
        </div>
      ) : (
        <div> Ładowanie </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    usersLogged: state.users.loggedUsers,
  };
};
const mapDispatchToProps = { deleteUser };

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UsersList)
);
