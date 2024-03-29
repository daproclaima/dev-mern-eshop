import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentMethodsScreen from "./screens/PaymentMethodsScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

const App = () => (
  <Router>
    <Header />
    <main className="py-3">
      <Container>
        <Route path={"/order/:id"} component={OrderScreen} />
        <Route path={"/login"} component={LoginScreen} />
        <Route path={"/shipping"} component={ShippingScreen} />
        <Route path={"/payment"} component={PaymentMethodsScreen} />
        <Route path={"/placeorder"} component={PlaceOrderScreen} />
        <Route path={"/register"} component={RegisterScreen} />
        <Route path={"/admin/orderlist"} component={OrderListScreen} />
        <Route path={"/admin/userlist"} component={UserListScreen} />
        <Route
          path={"/admin/productlist"}
          component={ProductListScreen}
          exact
        />
        <Route
          path={"/admin/productlist/:pageNumber"}
          component={ProductListScreen}
          exact
        />
        <Route path={"/admin/product/:id/edit"} component={ProductEditScreen} />
        <Route path={"/admin/user/:id/edit"} component={UserEditScreen} />
        <Route path={"/product/:id"} component={ProductScreen} />
        <Route path={"/profile"} component={ProfileScreen} />
        <Route path={"/cart/:id?"} component={CartScreen} />
        <Route path={"/search/:keyword"} component={HomeScreen} exact />
        <Route path={"/page/:pageNumber"} component={HomeScreen} exact />
        <Route
          path={"/search/:keyword/page/:pageNumber"}
          component={HomeScreen}
          exact
        />
        <Route path={"/"} component={HomeScreen} exact />
      </Container>
    </main>
    <Footer />
  </Router>
);

export default App;
