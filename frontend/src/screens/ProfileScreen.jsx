import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails } from "../actions/userActions";

const ProfilerScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, history, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    //   TODO send email (add email confirmed) + password reset + strong password + name 2 char min 100 max
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
    } else {
      // dispatch(register(name, email, password));
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {loading && <Loader />}
        {message && <Message variant={"danger"}>{message}</Message>}
        {error && <Message variant={"danger"}>{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId={"name"}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type={"name"}
              placeHolder={"Enter name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId={"email"}>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type={"email"}
              placeHolder={"Enter email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId={"password"}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={"password"}
              placeHolder={"Enter password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId={"confirmPassword"}>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type={"password"}
              placeHolder={"Confirm password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button type={"submit"} variant={"primary"}>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
      </Col>
    </Row>
  );
};

// check, login error when wrong email/password,
// when login redirect, local storage and store have user info
export default ProfilerScreen;
