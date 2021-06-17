import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import socket from './socket'


const Rooms = ({username}) => {
  let [rooms, setRooms] = useState([]);
  let [triger, setTriger] = useState(true)
  let [roomTitle, setRoomTitle] = useState("");

  useEffect(() => {
      socket.emit("ROOMS", {test: username})
    async function getRooms(event) {
      let result = await fetch("http://localhost:3000/api/rooms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      if (result.status === "ok") {
        setRooms(result.rooms);
      } else {
        console.log(result.message);
      }
    }
    getRooms();
  }, [triger]);

  async function postRoom(event) {
    event.preventDefault();
    let result = await fetch("http://localhost:3000/api/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: roomTitle
      }),
    }).then((res) => res.json());
    if (result.status === "ok") {
        console.log(result.status)
        setTriger(!triger)
        setRoomTitle("")
    } else {
      alert(result.message);
    }
  }

  return (
    <div className="block-panel">
      <div className="row">
        <div className="col-lg-12">
          <div className="input-group">
            <span className="input-group-btn">
              <button className="btn btn-default" type="button" onClick={postRoom}>
                Create room
              </button>
            </span>
            <input
              type="text"
              className="form-control"
              value={roomTitle}
              onChange={(e) => setRoomTitle(e.target.value)}
            ></input>
          </div>
        </div>
      </div>
      <h1>Available rooms</h1>
      <div className="list-group">
        {rooms.map((i, index) => (
          <p key={index}>
            <NavLink exact to={`rooms/${i}`}>
              {i}
            </NavLink>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
