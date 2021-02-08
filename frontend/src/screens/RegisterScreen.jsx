import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

const RegisterScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    //   TODO send email (add email confirmed) + password reset + strong password + name 2 char min 100 max
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <FormContainer>
      <h1>Sign up</h1>
      {loading && <Loader />}
      {message && <Message variant={"danger"}>{message}</Message>}
      {error && <Message variant={"danger"}>{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId={"name"}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type={"name"}
            placeholder={"Enter name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId={"email"}>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type={"email"}
            placeholder={"Enter email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId={"password"}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={"password"}
            placeholder={"Enter password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId={"confirmPassword"}>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type={"password"}
            placeholder={"Confirm password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button type={"submit"} variant={"primary"}>
          Sign up
        </Button>
      </Form>
      <Row className={"py-3"}>
        <Col>
          Already customer ?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Sign in
          </Link>
        </Col>
        {/*
        TODO Forgot password ?
      <Col>
          Already customer ? <Link to={"/login"}>Sign in</Link>
        </Col>
      */}
      </Row>
    </FormContainer>
  );
};

// check, login error when wrong email/password,
// when login redirect, local storage and store have user info
export default RegisterScreen;
