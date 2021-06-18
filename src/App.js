import { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import ChangePassword from "./components/ChangePassword";
import Login from "./components/Login";
import OneRoom from "./components/OneRoom";
import Register from "./components/Register";
import Rooms from "./components/Rooms";
import socket from './components/socket'

function App() {
  let [login, setLogin] = useState(false);
  let [username, setUser] = useState("");

  useEffect(() => {
    console.log(localStorage.getItem("token"))
  })

  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/">
          {" "}
          <Register
            setLogin={setLogin}
            setUser={setUser}
            login={login}
          ></Register>{" "}
        </Route>
        <Route exact path="/login">
          <Login setLogin={setLogin} login={login} setUser={setUser}></Login>
        </Route>
        <Route exact path="/change-password">
            <ChangePassword username={username}></ChangePassword>
        </Route>
        <Route exact path="/rooms">
          <Rooms username={username}></Rooms>
        </Route>
        <Route exact path="/rooms/:room">
            <OneRoom username={username}></OneRoom>
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
