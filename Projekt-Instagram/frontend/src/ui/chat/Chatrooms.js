import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import classes from "./Chatrooms.module.scss";
import mqtt from "mqtt/dist/mqtt";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const Chatrooms = ({ usersLogged }) => {
  const [rooms, setData] = useState([]);
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
      Client.subscribe("/rooms");
      fetchRooms();
    }
  }, [Client]);
  useEffect(() => {
    if (Client) {
      Client.on("message", function (topic, messag) {
        if (topic.toString() === "/rooms") {
          fetchRooms();
        }
      });
    }
  }, [Client]);

  // useEffect(() => {
  //   const reloadCount = sessionStorage.getItem("reloadCount");
  //   if (reloadCount < 2) {
  //     sessionStorage.setItem("reloadCount", String(reloadCount + 1));
  //     window.location.reload();
  //   } else {
  //     sessionStorage.removeItem("reloadCount");
  //   }
  // }, []);
  // const [rooms, setData] = useState([]);

  // useEffect(() => {
  //   client.on("connect", () => client.subscribe("/rooms"));
  //   console.log("connectd");

  //   fetchRooms();

  //   client.on("message", (topic, message) => {
  //     if (topic.toString() === "/rooms") {
  //       fetchRooms();
  //     }
  //   });
  // }, []);

  const fetchRooms = () => {
    axios
      .get(`http://localhost:5000/rooms`)
      .then((response) => setData(response.data.allRooms))
      .catch((error) => console.log(error));
  };

  const newRoom = () => {
    axios
      .post(`http://localhost:5000/rooms/add`)
      .catch((error) => console.log(error));
  };
  const deleteRoom = (id) => {
    axios
      .delete(`http://localhost:5000/rooms/${id}`)
      .catch((error) => console.log(error));
  };
  const updateRoom = (id) => {
    axios
      .put(`http://localhost:5000/rooms/${id}`)
      .catch((error) => console.log(error));
  };
  if (usersLogged.login === "") {
    return <Redirect push to="/login" />;
  }
  return (
    <div className={classes.container}>
      <h4 className={classes.container}>CHAT ROOMS</h4>
      <div className={classes.container}>
        <button className={classes.button} onClick={() => newRoom()}>
          Add room
        </button>
      </div>

      {rooms &&
        rooms.map((room) => (
          <div key={room._id} className={classes.rooms}>
            <Link to={`/room/${room._id}`}>
              Room: {room.id.substring(0, 8)}
            </Link>
            <i
              className="singlePostIcon far fa-trash-alt"
              onClick={() => deleteRoom(room._id)}
            ></i>
            <i
              className="singlePostIcon far fa-edit"
              onClick={() => updateRoom(room._id)}
            ></i>
          </div>
        ))}
    </div>
  );
};
const mapStateToProps = (state, props) => {
  return {
    usersLogged: state.users.loggedUsers,
  };
};

export default withRouter(connect(mapStateToProps, null)(Chatrooms));
