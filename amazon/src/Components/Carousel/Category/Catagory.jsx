import React, { useState } from "react";
import CatagoryIfos from "./CatagoryIfos.js";
import CatagoryCard from "./CatagoryCard";
import classes from "../Category/Catagory.module.css";
import Loader from "../../Loader/Loader.jsx";

function Catagory(data) {
  const [Isloading, SetIsloading] = useState(data ? false : true);

  return (
    <div className={classes.Catagory_container}>
      {CatagoryIfos.map((category, index) => (
        <CatagoryCard key={index} data={category} />
      ))}
    </div>
  );
}

export default Catagory;
