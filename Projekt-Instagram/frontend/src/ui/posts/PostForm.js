import { Field, Form, Formik } from "formik";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { addPost } from "../../ducks/posts/operations";
import { withRouter } from "react-router";
import classes from "./PostForm.module.scss";
const PostForm = ({ usersLogged, posts, addPost, history }, props) => {
  if (usersLogged.login === "") {
    return <Redirect push to="/login" />;
  }
  const handleSubmit = (values) => {
    addPost(values);
    history.push("/");
    // window.location.reload();
  };

  return (
    <div className={classes.form}>
      <Formik
        initialValues={{
          photoUrl: "",
          description: "",
          likes: 0,
          author: usersLogged.login,
        }}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize={true}
      >
        <Form>
          <Field
            className={classes.input}
            name="photoUrl"
            placeholder="photo"
            type="url"
          ></Field>
          <Field
            className={classes.input}
            name="description"
            placeholder="Opis"
            type="text"
          ></Field>
          <button className={classes.button} type="submit">
            Dodaj
          </button>
        </Form>
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    usersLogged: state.users.loggedUsers,
  };
};

const mapDispatchToProps = {
  addPost,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostForm)
);
