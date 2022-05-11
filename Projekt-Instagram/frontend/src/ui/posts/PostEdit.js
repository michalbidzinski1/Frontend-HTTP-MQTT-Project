import { Field, Form, Formik } from "formik";
import { connect } from "react-redux";

import { updatePost } from "../../ducks/posts/operations";
import { withRouter } from "react-router";
import classes from "./EditPost.module.scss";
const PostEdit = ({ post, updatePost, history }, props) => {
  const handleSubmit = (values) => {
    updatePost(values);
    history.push("/");
  };

  return (
    <div className={classes.form}>
      <Formik
        initialValues={{
          _id: post._id,
          photoUrl: post.photoUrl,
          description: post.description,
          likes: post.likes,
          author: post.author,
        }}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize={true}
      >
        <Form>
          <Field
            className={classes.input}
            name="description"
            placeholder="Opis"
            type="text"
          ></Field>
          <button className={classes.button} type="submit">
            Zatwierdz
          </button>
        </Form>
      </Formik>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    post: state.posts.posts.find((el) => el._id === props.match.params.id),
  };
};

const mapDispatchToProps = {
  updatePost,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostEdit)
);
