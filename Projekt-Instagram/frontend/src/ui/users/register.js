import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { addUser } from "../../ducks/users/operations";
import "./register.css";
const RegisterForm = ({ addUser, history, users }, props) => {
  const handleSubmit = (values) => {
    const createdUsers = users.find((el) => el.login === values.login);
    if (createdUsers) {
      alert("Użytkownik o takim loginie już istnieje");
    } else {
      addUser(values);

      history.push("/login");
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <Formik
        initialValues={{
          login: "",
          password: "",
        }}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize={true}
      >
        <Form className="registerForm">
          <Field className="registerInput" name="login" placeholder="login" />

          <Field
            className="registerInput"
            name="password"
            placeholder="password"
          />

          <button className="registerButton" type="submit">
            Register
          </button>
        </Form>
      </Formik>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
  };
};

const mapDispatchToProps = {
  addUser,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
);
