import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { getAllPosts, deletePost } from "../../ducks/posts/operations";
import { deleteUser } from "../../ducks/users/operations";
import { useCookies } from "react-cookie";
import "./PostList.css";

import mqtt from "mqtt/dist/mqtt";

const PostList = (
  {
    history,
    deleteUser,
    getAllPosts,
    deletePost,
    posts,
    loading,
    users,
    usersLogged,
  },
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
      Client.subscribe("/posts");
    }
  }, [Client]);
  useEffect(() => {
    if (Client) {
      Client.on("message", function (topic, messag) {
        if (topic.toString() === "/posts") {
          getAllPosts();
        }
      });
    }
  }, [Client]);
  // useEffect(() => {
  //   client.on("connect", () => client.subscribe("/posts"));
  //   console.log("connectd");
  //   getAllPosts();

  //   client.on("message", (topic, message) => {
  //     if (topic.toString() === "/posts") {
  //       getAllPosts();
  //     }
  //   });
  // }, []);

  const [cookies, setCookie] = useCookies(["user"]);

  if (usersLogged.login === "") {
    return <Redirect push to="/login" />;
  }

  console.log("zalogowny uzytkownik", usersLogged);

  console.log("posts", posts);
  const handleClick = (values) => {
    if (window.confirm("Are you sure wanted to delete the post ?")) {
      deletePost(values);
    }
    getAllPosts();
  };

  return (
    <div className="center">
      {loading ? (
        <div>Ładowanie..</div>
      ) : (
        posts.map((post) => {
          return (
            <div key={post._id} className="post">
              <div className="author"> {post.author} </div>
              <Link to={`/posts/${post._id}`}>
                <img className="postImg" src={post.photoUrl} alt={post._id} />
              </Link>

              <div className="postInfo">
                {/* <div>{post.likes}</div> */}
                <div className="postDesc">
                  {post.author} {post.description}{" "}
                </div>

                <span className="postDate">
                  {new Date(post.creationDate).toDateString()}
                </span>
              </div>

              {post.author === usersLogged.login && (
                <div>
                  <i
                    className="singlePostIcon far fa-trash-alt"
                    onClick={() => handleClick(post._id)}
                  ></i>
                  <i
                    className="singlePostIcon far fa-edit"
                    onClick={() => history.push(`/post/edit/${post._id}`)}
                  ></i>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    loading: state.posts.loading,
    users: state.users.users,
    usersLogged: state.users.loggedUsers,
  };
};
const mapDispatchToProps = {
  getAllPosts,
  deletePost,
  deleteUser,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostList)
);
