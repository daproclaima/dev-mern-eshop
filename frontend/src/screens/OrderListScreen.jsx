import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";
import { convertDate } from "../utils/dateConverter";

const OrderListScreen = ({ history }) => {
  // TODO: RESET orderdetails state when arriving that page
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.orderList);

  const { userInfo } = useSelector((state) => state.userLogin);

  // const { success: successDelete, error: errorDelete } = useSelector(
  //   (state) => state.userDelete
  // );

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo /*successDelete*/]);

  // const deleteHandler = (id) => {
  //   if (window.confirm("Are you sure ?")) {
  //     dispatch(deleteUser(id));
  //   }
  // };

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className={"table-sm"}>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>CREATION DATE</th>
              <th>DELIVERY STATUS</th>
              <th>PAYMENT STATUS</th>
              <th>TOTAL PRICE</th>
              {/*<th>DELIVERY COMPANY</th>*/}
              {/*<th>DELIVERY DATE</th>*/}
              {/*<th>DELIVERY ID</th>*/}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={`${order._id}-client-delivery`}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{convertDate(order.createdAt)}</td>
                <td>
                  {order.isDelivered ? (
                    <i
                      className={"fas fa-check"}
                      aria-label={"is delivered"}
                      style={{ color: "green" }}
                    />
                  ) : (
                    <i
                      className={"fas fa-times"}
                      aria-label={"is not delivered"}
                      style={{ color: "red" }}
                    />
                  )}
                </td>
                <td>
                  {order.paidAt ? (
                    convertDate(order.paidAt)
                  ) : (
                    <i
                      className={"fas fa-times"}
                      aria-label={"is not paid"}
                      style={{ color: "red" }}
                    />
                  )}
                </td>
                <td>${order.totalPrice}</td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant={"light"} aria-label={"edit order"}>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
