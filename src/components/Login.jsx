import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import ApiHandler from "../helpers/ApiHandler";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handelOnsubmit = async (e) => {
    e.preventDefault();
    const response = await ApiHandler(
      "login/",
      "post",
      { username: username, password: password },
      "token"
    );
    if (response && response.status === 200) {
      sessionStorage.setItem("token", response.data["token"]);
      setUsername("");
      setpassword("");
      props.setDashboadActive(true);
    } else {
      const error = (
        <li className="alert alert-danger" style={{ color: "red" }}>
          Invalid Username or password
        </li>
      );
      setLoginError(error);
    }
  };
  return (
    <div
      style={{
        marginLeft: "25%",
        marginRight: " 25%",
        width: "50%",
        marginTop: "12.5%",
      }}
    >
      {loginError}
      <Form className="col-12" onSubmit={handelOnsubmit}>
        <Form.Label>Login</Form.Label>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Username"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox"></Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
