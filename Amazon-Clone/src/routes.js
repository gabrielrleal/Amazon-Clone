import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Header from "./components/Header";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51HmPRPFEuB0UzRV0oVCXPZrKQ4eGIKPRRkRFukCGhcOJJiFeETPRYUvh4NiRHINGR6Hj6Yfxx0k5rXoKBErY9lmJ00hX3NKLbS"
);

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />

        <Route path="/checkout">
          <Header />
          <Checkout />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/payment">
          <Header />
          <Elements stripe={promise}>
            <Payment />
          </Elements>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
