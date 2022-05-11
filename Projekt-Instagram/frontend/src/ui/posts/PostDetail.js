import React from "react";
import { getAllComments } from "../../ducks/comments/operations";
import { connect } from "react-redux";
import { useEffect } from "react";

import { withRouter } from "react-router-dom";
import AddComent from "./AddComent";
import { useState } from "react";
import { deleteComment } from "../../ducks/comments/operations";
import "./PostDetail.scss";
import mqtt from "mqtt/dist/mqtt";

const PostDetail = (
  { getAllComments, post, history, comments, deleteComment, usersLogged },
  props
) => {
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [Client, setClient] = useState(null);
  useEffect(() => {
    mqttConnect("ws://broker.emqx.io:8083/mqtt");
  }, []);

  const mqttConnect = (host) => {
    setClient(mqtt.connect(host));
  };
  useEffect(() => {
    if (!connectionStatus) {
      setClient(mqtt.connect("ws://broker.emqx.io:8083/mqtt"));
      setConnectionStatus(true);
    }
  }, []);
  useEffect(() => {
    if (Client) {
      Client.subscribe("/comments");
    }
  }, [Client]);
  useEffect(() => {
    if (Client) {
      Client.on("message", function (topic, messag) {
        if (topic.toString() === "/comments") {
          getAllComments();
        }
      });
    }
  }, [Client]);
  // useEffect(() => {
  //   client.on("connect", () => client.subscribe("/comments"));
  //   console.log("connectd");
  //   getAllComments();

  //   client.on("message", (topic, message) => {
  //     if (topic.toString() === "/comments") {
  //       getAllComments();
  //     }
  //   });
  // }, []);
  const Comments = [];

  if (post) {
    for (const comms of comments) {
      if (comms.post === post._id) {
        Comments.push(comms);
      }
    }
  }
  const handleClick = (values) => {
    deleteComment(values);

    history.push(`/posts/${post._id}`);
  };

  return (
    <div className="center1">
      {post ? (
        <div className="post1">
          <div className="author1"> {post.author} </div>
          <div className>
            <img className="postImg1" src={post.photoUrl} alt={post._id} />
          </div>

          <div className="postInfo1">
            {/* <div>{post.likes}</div> */}
            <div className="postDesc1">
              {post.author} {post.description}{" "}
            </div>

            <span className="postDate1">
              {new Date(post.creationDate).toDateString()}
            </span>
          </div>
          <div>
            <h4 className="comments"> Comments: </h4>
            {Comments.map((comment) => {
              return (
                <div key={comment._id} className="comments">
                  <div>
                    {comment.author}: {comment.text}
                  </div>
                  {comment.author === usersLogged.login && (
                    <div>
                      <i
                        className="singlePostIcon1 far fa-trash-alt"
                        onClick={() => handleClick(comment._id)}
                      ></i>
                      <i
                        className="singlePostIcon1 far fa-edit"
                        onClick={() => history.push(`comment/${comment._id}`)}
                      ></i>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="comments">
            <AddComent />
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
    post: state.posts.posts
      ? state.posts.posts.find((x) => x._id === props.match.params.id)
      : null,
    comments: state.comments.comments,
    usersLogged: state.users.loggedUsers,
  };
};
const mapDispatchToProps = {
  deleteComment,
  getAllComments,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostDetail)
);
