import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loader from "../Loader/Loader";

function Product() {
  const [products, setProducts] = useState([]);
  const [Isloading, SetIsloading] = useState(true);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        SetIsloading(false);
      })
      .catch((err) => {
        console.log(err);
        SetIsloading(false);
      });
  }, []);
  console.log(products);
  return (
    <>
      {Isloading ? (
        <Loader />
      ) : (
        <section className={classes.Products_container}>
          {products.map((singleProduct, index) => (
            <ProductCard product={singleProduct} key={index} renderAdd={true} />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;
