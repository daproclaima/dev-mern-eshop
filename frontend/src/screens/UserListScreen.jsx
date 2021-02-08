import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { deleteUser, listUsers } from "../actions/userActions";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.userList);

  const { userInfo } = useSelector((state) => state.userLogin);

  const { success: successDelete, error: errorDelete } = useSelector(
    (state) => state.userDelete
  );

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : errorDelete ? (
        <Message variant={"danger"}>User not deleted: {errorDelete}</Message>
      ) : (
        <Table striped bordered hover responsive className={"table-sm"}>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i
                      className={"fas fa-check"}
                      aria-label={"is admin"}
                      style={{ color: "green" }}
                    />
                  ) : (
                    <i
                      className={"fas fa-times"}
                      aria-label={"is not admin"}
                      style={{ color: "red" }}
                    />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant={"light"}>
                      <i
                        className={"fas fa-edit"}
                        aria-label={"edit user"}
                        style={{ color: "darkblue" }}
                      ></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    className={"btn-danger"}
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className={"fas fa-trash"} aria-label={"delete user"} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
