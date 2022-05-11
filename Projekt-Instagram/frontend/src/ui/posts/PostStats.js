import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import classes from "./PostStats.module.scss";
const PostStats = ({ usersLogged, post, history, comments }, props) => {
  const [data, setData] = useState([]);

  const getPostsStats = () => {
    axios
      .get(`http://localhost:5000/posts/authors`)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getPostsStats();
  }, []);
  console.log(data);
  if (usersLogged.login === "") {
    return <Redirect push to="/login" />;
  }
  return (
    <div>
      {data ? (
        <div>
          <div>
            {data.map((comment) => {
              return (
                <div key={comment.user} className={classes.center}>
                  <h3>
                    {comment.user} napisał {comment.count} posty
                  </h3>
                  <div></div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>Ładowanie strony</div>
      )}
    </div>
  );
};
const mapStateToProps = (state, props) => {
  return {
    usersLogged: state.users.loggedUsers,
  };
};

export default withRouter(connect(mapStateToProps, null)(PostStats));
