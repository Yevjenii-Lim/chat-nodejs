import { useState } from "react";
import { NavLink } from "react-router-dom";

const Login = ({ setLogin, login, setUser }) => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();
    let result = await fetch("http://localhost:3000/api/login", {
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
      console.log("got token", result.data);
      localStorage.setItem("token", result.data);
      setUser(username)
      alert("you log in");
    } else {
      alert(result.message);
    }
  }
  let links = login ? <NavLink to="change-password"> Change password for {username} </NavLink> : null
  return (
      <div>

      
    <form className="block-panel" id="login">
      <h2 className="block-panel-heading">Sign in</h2>
      <input
        type="text"
        className="form-control credentials"
        placeholder="Email address"
        required=""
        autoFocus="off"
        autoComplete="off"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        type="password"
        className="form-control credentials"
        placeholder="Password"
        required=""
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      {/* <label className="checkbox">
        <input type="checkbox" value="remember-me">
          {" "}
          Remember me
        </input>
      </label> */}
      <button
        className="btn btn-lg btn-primary btn-block"
        type="submit"
        onClick={loginUser}
      >
        Login
      </button>
    </form>
    {links}
    {login ? <NavLink to="/rooms">To chat rooms</NavLink> : null}
    </div>

  );
};

export default Login;
