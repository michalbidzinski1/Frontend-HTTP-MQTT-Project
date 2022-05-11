import { Field, Form, Formik } from "formik";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classes from "./EditComment.module.scss";
import { updateComment } from "../../ducks/comments/operations";
const EditComment = ({ history, comment, updateComment }, props) => {
  const handleSubmit = (values) => {
    console.log("VALUES", values);
    updateComment(values);
    history.goBack();
  };
  console.log(comment);
  return (
    <div>
      {comment ? (
        <div className={classes.form}>
          <Formik
            initialValues={{
              _id: comment._id,
              text: comment.text,
              post: comment.post,
              author: comment.author,
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

              <button className={classes.button} type="submit">
                Confirm
              </button>
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
    comment: state.comments.comments.find(
      (x) => x._id === props.match.params.id
    ),
  };
};

const mapDispatchToProps = {
  updateComment,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditComment)
);
