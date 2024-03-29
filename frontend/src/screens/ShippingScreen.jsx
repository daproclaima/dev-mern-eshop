import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = ({ history }) => {
  const { shippingAddress } = useSelector((state) => state.cart);
  // TODO get those data from public map api and set them in suggestions + confirm the infos before final submit
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    //   TODO: check contacts are not empty in backend + no injections now
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId={"address"}>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type={"address"}
            placeholder={"Enter address"}
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId={"city"}>
          <Form.Label>City</Form.Label>
          <Form.Control
            type={"city"}
            placeholder={"Enter city"}
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId={"postalCode"}>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type={"postalCode"}
            placeholder={"Enter postal code"}
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId={"country"}>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type={"country"}
            placeholder={"Enter country"}
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>

        <Button type={"submit"} variant={"primary"}>
          Continue to payment
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
