import React, { useEffect, useState } from "react";
// import classes from './Product.module.css';
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setproduct] = useState({});
  const [Isloading, SetIsloading] = useState(true);
  
  useEffect(() => {
    SetIsloading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setproduct(res.data);
        SetIsloading(false);
      })
      .catch((err) => {
        console.log(err);
        SetIsloading(false);
      });
  }, [productId]);
  console.log(product);
  console.log(productId);
  return (
    <Layout>
      {Isloading ? (
        <Loader />
      ) : (
        <ProductCard
          product={product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
    </Layout>
  );
}

export default ProductDetail;
