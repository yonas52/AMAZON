import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtextedRoute from "./Components/ProtectedRoute/ProtextedRoute";

const stripePromise = loadStripe(
  "pk_test_51Oj2jUCsjgf1J1AxvWeVZy0GWR2LBhYgcnEaK9LlrDVgBIftEylcgL8nI6VDjnSocaZm8SGdmjBRLR2x4lX6Ox3S0033k0ZFLw"
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Auth" element={<Auth />} />
        <Route
          path="/Payments"
          element={
            <ProtextedRoute
              msg={"you must log in to pay"}
              redirect={"/Payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtextedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtextedRoute
              msg={"you must log in to your orders"}
              redirect={"/orders"}
            >
              <Orders />
            </ProtextedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
