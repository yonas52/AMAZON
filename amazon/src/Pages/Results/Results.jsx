import React, { useEffect, useState } from "react";
import classes from "./Results.module.css";
import Layout from "../../Components/Layout/Layout";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";

function Results() {
  var currentUrl = window.location.href;
  var urlParts = currentUrl.split("/");
  var categoryName = urlParts[urlParts.length - 1];
  console.log(categoryName);

  const [Isloading, SetIsloading] = useState(true);

  const [Results, setresults] = useState([]);
  useEffect(() => {
    axios
      .get(`${productUrl}/products/category/${categoryName}`)

      .then((res) => {
        setresults(res.data);
        SetIsloading(false);
        console.log(res);
      })
      .catch((err) => {
        SetIsloading(false);
        console.log(err);
      });
  }, []);

  // console.log(Results);

  return (
    <Layout>
      {Isloading ? (
        <Loader />
      ) : (
        <section>
          <h1 style={{ padding: "30px" }}>Results</h1>
          <p style={{ padding: "30px" }}>Category/{categoryName}</p>
          <hr />

          <div className={classes.proucts_container}>
            {Results?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderAdd={true}
              />
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
}

export default Results;
