import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import "./messags.css";
import socket from "./socket";

function OneRoom({ username }) {
  const router = useRouteMatch();
  let [messags, setMessages] = useState([]);
  let [message, setMessage] = useState("");
  let [triger, setTriger] = useState(true);
  let room = useRouteMatch().params.room;

  useEffect(() => {
    // socket.emit("chatmessage", {author: username, msg:  message, room: room})
    async function getMessages() {
      let result = await fetch("http://localhost:3000/api/rooms/" + room, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      if (result.status === "ok") {
        // console.log(result.data);
        setMessages(result.data);
      } else {
        console.log(result.message);
      }
    }
    getMessages();
  }, [room, triger]);

//   useEffect(() => {
//     socket.on("output-messages", function (data) {
//      //   let refres = [...messags];
//        // refres.push(data)
//         setMessages(data)

//     });
//   }, []);
  socket.on("message", function (data) {
      console.log(data)
    // setMessages(data.data)

});
  async function sendMessage(event) {
    event.preventDefault();
    socket.emit("chatmessage", { author: username, msg: message, room: room });
    // if(username.length === 0) {
    //     console.log("no user")
    //     return
    // }
    // let result = await fetch("http://localhost:3000/api/rooms/" + room, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     author: username,
    //     text: message
    //   }),
    // }).then((res) => res.json());
    // if (result.status === "ok") {
    //     console.log(result.status)
    //     setTriger(!triger)
    //     setMessage("")
    // } else {
    //   alert(result.message);
    // }
  }
  return (
    <div>
      <div className="block-panel">
        <h2 className="block-panel-heading">Room {room}</h2>
        <div className="row message-input">
          <div className="col-lg-12">
            <div className="input-group">
              <span className="input-group-btn">
                <button
                  className="btn btn-default"
                  type="button"
                  onClick={sendMessage}
                >
                  Send
                </button>
              </span>
              <input
                type="text"
                id="text"
                className="form-control"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-body chat-body">
            {messags.length > 0 ? (
              messags.map((i, index) => (
                <Message key={index} author={i.author} text={i.text}></Message>
              ))
            ) : (
              <p>No messages</p>
            )}

            {/* <span className="message"><span className="user" style="color: #0A6">User#1</span>: Hello.</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}

let Message = ({ author, text }) => {
  return (
    <div className="message">
      <p>Author: {author}</p>
      <p>Message: {text}</p>
    </div>
  );
};

export default OneRoom;
