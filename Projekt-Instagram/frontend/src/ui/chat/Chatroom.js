import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import mqtt from "mqtt/dist/mqtt";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { withRouter } from "react-router";
import classes from "./Chatroom.module.scss";
// mqtt.connect("ws://broker.emqx.io:8083/mqtt")
const Chatroom = ({ usersLogged }) => {
  const { id } = useParams();

  const user = usersLogged.login;

  const [connectionStatus, setConnectionStatus] = useState(false);
  const [messages, setMessages] = useState([]);
  const [recivedMessage, setRecivedMessage] = useState(
    `${user} dołączyłeś do czatu`
  );
  const [NewMessage, setNewMessage] = useState("");
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
      Client.subscribe(id);
    }
  }, [Client]);

  useEffect(() => {
    if (Client) {
      Client.on("message", function (topic, messag) {
        const wiadomosc = messag.toString();
        setRecivedMessage(wiadomosc);
      });
    }
  }, [Client]);
  useEffect(() => {
    setMessages((prevState) => [...prevState, recivedMessage]);
  }, [recivedMessage]);
  let view = messages.map((elem) => <div key={uuidv4()}> {elem} </div>);

  const ChangeHandler = (e) => {
    setNewMessage(e.target.value);
  };
  const sendMessage = (event) => {
    Client.publish(id.toString(), user + ": " + NewMessage);
    setNewMessage("");
    event.preventDefault();
  };

  return (
    <div className={classes.container}>
      <h1> Chat in room: {id.substring(0, 8)} </h1>
      <h3>{view}</h3>
      <h3>
        <form onSubmit={sendMessage}>
          <label>
            <input
              type="text"
              placeholder="Wyślij"
              value={NewMessage}
              onChange={ChangeHandler}
              className={classes.input}
            />
          </label>
        </form>
      </h3>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    usersLogged: state.users.loggedUsers,
  };
};

export default withRouter(connect(mapStateToProps, null)(Chatroom));
