import { useState } from "react";
import { Redirect } from "react-router";

const ChangePassword = ({ username }) => {
  let [newPassword, setNewPassword] = useState("");
  async function changePassword(event) {
    event.preventDefault();

    let result = await fetch("http://localhost:3000/api/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: newPassword,
        token: localStorage.getItem("token"),
      }),
    }).then((res) => res.json());
    if (result.status === "ok") {
      alert("you changed password");
    } else {
      alert(result.message);
    }
  }

  if (!!username === false) {
    return <Redirect to="/" />;
  }

  return (
    <form className="block-panel" id="change-password">
      <h2 className="block-panel-heading">Change Password for {username}</h2>
      <input
        type="password"
        id="password"
        className="form-control credentials"
        placeholder="Password"
        required=""
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      ></input>
      <button
        className="btn btn-lg btn-primary btn-block"
        type="submit"
        onClick={changePassword}
      >
        Register
      </button>
    </form>
  );
};

export default ChangePassword;
