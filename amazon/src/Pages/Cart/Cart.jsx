import React from "react";
import classes from "./Cart.module.css";
import Layout from "../../Components/Layout/Layout";
import { useContext } from "react";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { type } from "../../Utility/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  console.log(basket);

  const Increment = (item) => {
    dispatch({
      type: type.ADD_TO_BASKET,
      item,
    });
  };

  const Decrement = (id) => {
    dispatch({
      type: type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>your shoping basket</h3>
          <hr />
          {basket?.length == 0 ? (
            <p>opps! No item in your cart</p>
          ) : (
            basket?.map((item) => {
              return (
                <section className={classes.cart_product}>
                  <ProductCard
                    product={item}
                    renderDesc={true}
                    flex={true}
                    renderAdd={false}
                  />
                  <div className={classes.btn_container}>
                    <button
                      className={classes.btn}
                      onClick={() => Increment(item)}
                    >
                      <IoIosArrowUp size={20} />
                    </button>
                    <div>{item.amount}</div>
                    <button
                      className={classes.btn}
                      onClick={() => Decrement(item.id)}
                    >
                      <IoIosArrowDown size={20} />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>subtotal({basket?.length}items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>this order contains a gift</small>
            </span>

            <Link to="/Payments">continue to checkout</Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
