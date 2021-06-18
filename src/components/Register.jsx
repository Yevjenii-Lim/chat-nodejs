import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./register.css";

const Register = ({ setLogin, setUser, login }) => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  async function registerUser(event) {
    event.preventDefault();
    if(username.length === 0 && password.length === 0) {
        alert("please fill the fields")
        return
    }
    let result = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((res) => res.json());
    if (result.status === "ok") {
      setLogin(true);
      alert(result.message);
      setUser(username);
    } else {
      alert(result.message);
    }
  }

  return (
    <div>
      <form className="block-panel" id="regForm">
        <h2 className="block-panel-heading">Register new account</h2>
        <input
          type="text"
          id="name"
          className="form-control credentials"
          placeholder="Email address"
          required=""
          autoFocus=""
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          type="password"
          id="password"
          className="form-control credentials"
          placeholder="Password"
          required=""
          value={password}
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button
          className="btn-blue "
          type="submit"
          onClick={registerUser}
        >
          Register account
        </button>
        <p className="separate">or</p>
        <NavLink className="btn-blue" to="/login">Login</NavLink>{" "}
        <p>{login ? <NavLink className="btn-blue" to="/rooms">To chat rooms</NavLink> : null}</p>
      </form>
    </div>
  );
};

export default Register;
