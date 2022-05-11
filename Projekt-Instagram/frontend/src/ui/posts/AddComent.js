import { Field, Form, Formik } from "formik";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classes from "./AddComment.module.scss";

import { addComment } from "../../ducks/comments/operations";
import { updatePost } from "../../ducks/posts/operations";
const AddComent = ({ addComment, post, usersLogged }) => {
  const handleSubmit = (values) => {
    addComment(values);
  };

  return (
    <div>
      {post ? (
        <div>
          <Formik
            initialValues={{
              text: "",
              post: post._id,
              author: usersLogged.login,
            }}
            onSubmit={(values) => handleSubmit(values)}
            enableReinitialize={true}
          >
            <Form>
              <Field
                className={classes.input}
                name="text"
                type="text"
                placeholder="Skomentuj post.."
              ></Field>
            </Form>
          </Formik>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    post: state.posts.posts.find((x) => x._id === props.match.params.id),
    usersLogged: state.users.loggedUsers,
  };
};

const mapDispatchToProps = {
  addComment,
  updatePost,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddComent)
);
