import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { colors } from "@mui/material";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { AxiosInstance, axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { app } from "../../Utility/firebase";
// import { db } from '../../Utility/firebase';
import { useNavigate } from "react-router-dom";
import { type } from "../../Utility/action.type";

function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  // console.log(user);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [CardError, SetCardError] = useState(null);
  const [processing, SetProcessing] = useState(false);

  const HandleChange = (e) => {
    // console.log(e)
    e?.error?.message ? SetCardError(e?.error?.message) : SetCardError("");
  };

  const HandlePayment = async (e) => {
    const db = app.firestore();
    e.preventDefault();
    try {
      SetProcessing(true);
      // 1, // backend ||functions-----> to client secret key
      const response = await axiosInstance({
        method: "post",
        url: `/payment/create?total=${total * 100}`,
      });
      // console.log(response.data);
      const ClientSecret = response.data.client_secret;
      // 2// client-side(react-side) confirmation
      const { paymentIntent } = await stripe.confirmCardPayment(ClientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      // console.log({paymentIntent})

      //3// after confirmation ----> order fireStore Database, save, clear basket.

      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      //empty the basket
      dispatch({ type: type.EMPTY_BASKET });

      SetProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new order" } });
    } catch (error) {
      console.log(error);
      SetProcessing(false);
    }
  };

  return (
    <Layout>
      {/* header */}
      <div className={classes.Payment_header}>Checkout ({totalItem}) items</div>
      {/* payment method */}
      <section className={classes.Payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and Delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* cardform */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_Details}>
              <form onSubmit={HandlePayment}>
                {/* error */}
                {CardError && (
                  <small style={{ color: "red" }}>{CardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={HandleChange} />
                {/* price */}
                <div className={classes.payment__price}>
                  <div>
                    <span>
                      Total Order | <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.Loading}>
                        <ClipLoader color="gray" size={12}></ClipLoader>
                        <p>Please Wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;






