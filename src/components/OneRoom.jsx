import React, { useEffect, useRef, useState } from "react";
import { Redirect, useRouteMatch } from "react-router";
import "./messags.css";
import socket from "./socket";
import "./oneroom.css";
function OneRoom({ username }) {
  const router = useRouteMatch();
  let [messags, setMessages] = useState([]);
  let [message, setMessage] = useState("");
  let [file, setFile] = useState()
  //   let [triger, setTriger] = useState(true);
  let room = useRouteMatch().params.room;

  useEffect(() => {
    socket.emit("connection");
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
  }, [room]);

  useEffect(() => {
    // socket.emit("chatmessage", { author: username, msg: message, room: room }, ({status}) => {
    //     console.log(status)
    // });
    console.log(messags)
    socket.emit("chatmessage", { author: username, msg: "test", room: room });
    console.log("userefec");
    return () => {
      socket.emit("disconect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      // console.log(message)
      if (message.room != room) {
        console.log("wrong room");
      } else {
        //   let blob = new Blob([message])
        //   let url = URL.createObjectURL(blob)
          
        setMessages([...messags, message]);
      }
      // setMessages(message.text)
    });
  }, [messags]);



  async function sendMessage(event) {
    event.preventDefault();
 

    if (message) {
      console.log("send");
      socket.emit(
        "chatmessage",
        { author: username, msg: message, room: room },
        (error) => {
          if (error) {
            console.log(error);
          }
        }
      );
      setMessage("");
    }
    
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
  const handleFileSelected = (e) => {
    const files = e.target.files
    console.log("files:", files)
  }
  let refContainer = useRef(null)
  let sendFile = async (event) => {
    event.preventDefault();
    
    console.log(refContainer.current.files[0])
    let photo = new FormData();
     photo.append("author", username)
     photo.append("room", room)
    photo.append("photo", refContainer.current.files[0]);
    
    let result = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        
        body: photo
      
      }).then((res) => res.json());
      if (result.status === "ok") {
     
        alert(result.message);

      } else {
        alert(result.message);
      }
     
 
  }
  if (!!username === false) {
    return <Redirect to="/" />;
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
                autoComplete="off"
              ></input>
            </div>
            <div className="input-group">
              <span className="input-group-btn">
                <button
                  className="btn btn-default"
                  type="button"
                  onClick={sendFile}
                >
                  Send file
                </button>
              </span>
              <input
                type="file"
                id="text"
                className="form-control"
                // value={file}
                // onChange={(e) => setFile(e.target.value)}
                onChange={handleFileSelected}
                autoComplete="off"
                ref={refContainer}
              ></input>
            </div>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-body chat-body">
            
              {messags.length > 0 ? (
                messags.map((i, index) => (
                  <Message
                    key={index}
                    author={i.author}
                    text={i.text}
                    photo={i.photo}
                  ></Message>
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

let Message = ({ author, text, photo }) => {
  return (
    <div className="message">
      <span>{author}:  </span>
      <span>{text}</span>
      
      {photo ? <img src={"file:///"+photo}></img> : null}
    </div>
  );
};

export default OneRoom;
