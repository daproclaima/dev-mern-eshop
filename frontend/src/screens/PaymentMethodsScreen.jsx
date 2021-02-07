import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Form, Col } from "react-bootstrap";

const PaymentMethodsScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    //   TODO: check contacts are not empty in backend + no injections now
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group as={"legend"}>
          <Form.Label>Select method</Form.Label>
          <Col>
            <Form.Check
              type={"radio"}
              label={"PayPal or Credit Card"}
              id={"PayPal"}
              name={"paymentMethod"}
              value={"PayPal"}
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />

            {/*<Form.Check*/}
            {/*  type={"radio"}*/}
            {/*  label={"Stripe or Credit Card"}*/}
            {/*  id={"paypal"}*/}
            {/*  name={"paymentMethod"}*/}
            {/*  value={"Stripe"}*/}
            {/*  checked*/}
            {/*  onChange={(e) => setPaymentMethod(e.target.value)}*/}
            {/*/>*/}

            {/*<Form.Check*/}
            {/*  type={"radio"}*/}
            {/*  label={"Credit Card"}*/}
            {/*  id={"creditCard"}*/}
            {/*  name={"paymentMethod"}*/}
            {/*  value={"CreditCard"}*/}
            {/*  checked*/}
            {/*  onChange={(e) => setPaymentMethod(e.target.value)}*/}
            {/*/>*/}
          </Col>
        </Form.Group>

        <Button type={"submit"} variant={"primary"}>
          Continue to place order
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentMethodsScreen;
