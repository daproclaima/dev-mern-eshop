import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const App = () => (
  <Router>
    <Header />
    <main className="py-3">
      <Container>
        <Route path={"/login"} exact component={LoginScreen} />
        <Route path={"/register"} exact component={RegisterScreen} />
        <Route path={"/product/:id"} component={ProductScreen} />
        <Route path={"/cart/:id?"} component={CartScreen} />
        <Route path={"/"} exact component={HomeScreen} />
      </Container>
    </main>
    <Footer />
  </Router>
);

export default App;
