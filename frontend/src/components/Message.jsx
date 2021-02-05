import React from "react";
import { Alert } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const Message = ({ variant, children }) => (
  <Alert variant={variant}>{children}</Alert>
);

Message.defaultProps = {
  variant: "infos",
};
export default Message;
