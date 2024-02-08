import React, { useContext } from "react";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import classes from "../Header/Header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";

function Header() {
  const [{ basket }, dispatch] = useContext(DataContext);
  console.log(basket.length);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  console.log(totalItem);

  return (
    <section className={classes.fixed}>
      <div className={classes.header_container}>
        <div className={classes.logo_container}>
          {/* {logo} */}
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="amazon log"
            />
          </Link>

          {/* delivery */}
          <div className={classes.delivary}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p>Deliverd to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>
        <div className={classes.search}>
          {/* search */}
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" />
          <BsSearch />
        </div>
        {/* right side link*/}
        <div className={classes.order_container}>
          <Link to="" className={classes.language}>
            <img
              src="https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg"
              alt=""
            />
            <select name="" id="">
              <option value="">EN</option>
            </select>
          </Link>
          {/* three components */}
          <Link to="">
            <p>Sign In</p>
            <span>Account & Lists</span>
          </Link>
          {/* orders */}
          <Link to="/orders">
            <p>Returns</p>
            <span>& orders</span>
          </Link>
          {/* cart */}
          <Link to="/cart" className={classes.cart}>
            <BiCart size={50} />
            <span>{totalItem}</span>
          </Link>
        </div>
      </div>
      <LowerHeader />
    </section>
  );
}

export default Header;
