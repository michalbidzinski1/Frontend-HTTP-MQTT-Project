import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classes from "./users.module.scss";
import { updateUser } from "../../ducks/users/operations";
import { useCookies } from "react-cookie";
const UserEditForm = ({ updateUser, history, usersLogged, users }, props) => {
  const [cookies, setCookie] = useCookies(["user"]);
  function logout() {
    setCookie("login", "", { path: "/" });
    setCookie("password", "", { path: "/" });
    window.location.href = "/login";
    // return false;
  }
  const handleSubmit = (values) => {
    alert("Zmieniono haslo, wylogowywuje");

    updateUser(values);
    logout();
  };
  const isLogged = users.find((x) => x.login === usersLogged.login);

  console.log(isLogged);
  return (
    <div className={classes.form}>
      <h3>Change password</h3>
      <Formik
        initialValues={{
          _id: isLogged._id,
          login: isLogged.login,
          password: "",
        }}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize={true}
      >
        <Form>
          <Field
            className={classes.input}
            name="password"
            placeholder="password"
          />

          <button className={classes.button} type="submit">
            Change password
          </button>
        </Form>
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    usersLogged: state.users.loggedUsers,
  };
};

const mapDispatchToProps = {
  updateUser,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserEditForm)
);
