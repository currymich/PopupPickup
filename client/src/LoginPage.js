import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import LoginForm from "./LoginForm";

const defaultValues = {
  username: "",
  userType: "",
};

const LoginPage = () => {
  const [users, setUsers] = useState([]);
  const [inputs, setInputs] = useState(defaultValues);

  const AppUser = ({ username, userType }) => (
    <div className="item">
      <p>{username}</p>
      <p>{userType}</p>
    </div>
  );

  const getUsers = async () => {
    const res = await axios.get("/api/users");
    setUsers(res.data);
  };

  const handleSubmit = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    const res = await axios.post("/api/users", inputs);
    setUsers(res.data);
    setInputs(defaultValues);

    console.log(users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", textDecoration: "underline" }}>
        Users
      </h1>

      <div className="container">
        {users.map((p) => (
          <AppUser username={p.username} userType={p.userType} />
        ))}
      </div>

      <h1 style={{ textAlign: "center", textDecoration: "underline" }}>
        Create Account
      </h1>

      <div
        className="w3-theme-d3 w3-container"
        style={{
          padding: "25px",
          borderRadius: "25px",
          width: "80%",
          marginLeft: "10%",
        }}
      >
        <h4>Click here to Login</h4>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="User Name"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            className="w3-input"
            style={{ borderRadius: "25px" }}
          />

          <br />

          <input
            type="text"
            placeholder="User Type"
            value={inputs.userType}
            onChange={(e) => setInputs({ ...inputs, userType: e.target.value })}
            className="w3-input"
            style={{ borderRadius: "25px" }}
          />

          <br />

          <input
            type="submit"
            value="Submit"
            className="w3-theme-d1 w3-btn"
            style={{ borderRadius: "25px", width: "100%" }}
          />
        </form>
      </div>

      <LoginForm />
    </div>
  );
};

export default LoginPage;
