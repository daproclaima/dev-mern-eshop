import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <FormContainer>
      <h1>Sign in</h1>
      {loading && <Loader />}
      {error && <Message variant={"danger"}>{error}</Message>}
      <Form onSubmit={submitHandler}>
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
        <Button type={"submit"} variant={"primary"}>
          Sign in
        </Button>
      </Form>
      <Row className={"py-3"}>
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

// check, login error when wrong email/password,
// when login redirect, local storage and store have user info
export default LoginScreen;
