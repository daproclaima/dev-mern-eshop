import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => (
  <footer>
    <Container>
      <Row>
        <Col className="text-center py-3">Copyright &copy; Mern E-shop</Col>
        {/*   TODO privacy, legals, GCU, contacts */}
      </Row>
    </Container>
  </footer>
);

export default Footer;
