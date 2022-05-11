import { Field, Form, Formik } from "formik";

import { connect } from "react-redux";
import { Redirect, Link, withRouter } from "react-router-dom";
import bcrypt from "bcryptjs";
import { loginUser } from "../../ducks/users/operations";
import { useCookies } from "react-cookie";
import "./login.css";
const LoginForm = ({ loginUser, users, usersLogged }, props) => {
  const [cookies, setCookie] = useCookies(["user"]);

  if (usersLogged.login !== "") {
    return <Redirect push to="/" />;
  }
  console.log("uzytkownicy", users);

  const handleSubmit = (values) => {
    const isLogged = users.find((x) => x.login === values.login);
    if (isLogged) {
      async function checkUser(password) {
        //... fetch user from a db etc.

        const match = await bcrypt.compare(password, isLogged.password);

        if (match) {
          setCookie("login", values.login, { path: "/" });
          setCookie("password", values.password, { path: "/" });

          loginUser(values);
          return <Redirect push to="/" />;
        }
        alert("Wrong password");

        //...
      }
      checkUser(values.password);
    } else alert("Wrong login");
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <Formik
        initialValues={{
          login: "",
          password: "",
        }}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize={true}
      >
        <Form className="loginForm">
          <label>Login</label>
          <Field name="login" placeholder="login" />
          <label>Password</label>
          <Field name="password" placeholder="password" />

          <button className="loginButton" type="submit">
            Login
          </button>
        </Form>
      </Formik>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
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
  loginUser,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);
