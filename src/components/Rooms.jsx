import React, { useEffect, useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import socket from './socket';
import './rooms-style.css'
import Delete from "./Delete";
import { conditionalExpression } from "@babel/types";

const Rooms = ({username}) => {
  let [rooms, setRooms] = useState([]);
  let [triger, setTriger] = useState(true)
  let [roomTitle, setRoomTitle] = useState("");

 

  useEffect(() => {
      
    async function getRooms() {

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

    console.log('get reques')
    getRooms();
  }, [triger]);

  async function postRoom(event) {
    event.preventDefault();
    if(roomTitle.length === 0) {
        alert("fill the title")
        return
    } 

    socket.emit("addRoom", {title: roomTitle}, (error) => {
        if (error) {
          console.log(error);
        }
    })
    
    setRoomTitle("")
    // let result = await fetch("http://localhost:3000/api/rooms", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     title: roomTitle
    //   }),
    // }).then((res) => res.json());
    // if (result.status === "ok") {
    //     console.log(result.status)
    //     setTriger(!triger)
    //     setRoomTitle("")
    // } else {
    //   alert(result.message);
    // }
  }
  useEffect(() => {
    socket.emit("addRoom", {title: "test"})
    socket.on("RoomAded", (room) => {
        console.log('on socket')
        setTriger(room)
        // setRooms([...rooms, room]);
    })
    socket.on("roomDeleted", (room) => {
        setTriger(room)
    })
    socket.on("roomExist", message => {
        console.log(message.message)
    })
  
  }, [])


  let deleteRoom = async (title) => {
    // event.preventDefault();


    socket.emit("deleteRoom", {title: title})
    // if(!window.confirm(`are you sure you want to delete ${title} room?`)) {
    //     return
    // }
    // let result = await fetch("http://localhost:3000/api/rooms", {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     title: title
    //   }),
    // }).then((res) => res.json());
    // if (result.status === "ok") {
    //     console.log(result.status)
    //     setTriger(!triger)
    // } else {
    //   alert(result.message);
    // }
  }
  if (!!username === false) {
    return <Redirect to="/" />;
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
              autoComplete="off"
              onChange={(e) => setRoomTitle(e.target.value)}
            ></input>
          </div>
        </div>
      </div>
      <h1>Available rooms</h1>
      <div className="list-group">
          <div>
          {rooms.map((i, index) => (
          <span className='list-group-item' key={index}>
            <NavLink  className="link-room" exact to={`rooms/${i}`}>
              {i}
            </NavLink>
            <button className="delete-btn" onClick={() => deleteRoom(i)}><Delete></Delete></button>
          </span>
        ))}
          </div>
      
      </div>
    </div>
  );
};

export default Rooms;
