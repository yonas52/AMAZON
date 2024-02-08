import React from "react";
import { useState } from "react";
import Catagory from "./Catagory";
import classes from "../Category/Catagory.module.css";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";

const CatagoryCard = ({ data }) => {
  console.log(data);
  const [Isloading, SetIsloading] = useState(data ? false : true);

  return (
    <>
      {Isloading ? (
        <Loader />
      ) : (
        <div className={classes.Catagory}>
          <Link to={`/category/${data.name}`}>
            <span>
              <h2>{data.title}</h2>
            </span>
            <img src={data.imglink} alt="" />
            <p>show now</p>
          </Link>
        </div>
      )}
    </>
  );
};

export default CatagoryCard;
