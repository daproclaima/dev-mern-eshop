import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { LinkContainer } from "react-router-bootstrap";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
const ProfileScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.userUpdateProfile);

  const { loading: loadingOrders, error: errorOrders, orders } = useSelector(
    (state) => state.orderListMy
  );

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [success, dispatch, userInfo, history, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    //   TODO send email (add email confirmed) + password reset + strong password + name 2 char min 100 max
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {loading && <Loader />}
        {message && <Message variant={"danger"}>{message}</Message>}
        {error && <Message variant={"danger"}>{error}</Message>}
        {success && <Message variant={"success"}>Profile updated</Message>}
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
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant={"danger"}>{errorOrders}</Message>
        ) : orders.length === 0 ? (
          <Message variant={"info"}>No orders yet</Message>
        ) : (
          <Table stripped bordered hover responsive className={"table-sm"}>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL PRICE</th>
                <th>PAID</th>
                <th>DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i
                        className={"fas fa-times"}
                        style={{ color: "red" }}
                        aria-label={"NOT PAID"}
                      />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i
                        className={"fas fa-times"}
                        style={{ color: "red" }}
                        aria-label={"NOT DELIVERED"}
                      />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant={"light"} className={"btn-sm"}>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

// check, login error when wrong email/password,
// when login redirect, local storage and store have user info
export default ProfileScreen;
