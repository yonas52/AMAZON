import React from "react";
import CarouselEffect from "../../Components/Carousel/CarouselEffect";
import Catagory from "../../Components/Carousel/Category/Catagory";
import Product from "../../Components/Product/Product";
import Layout from "../../Components/Layout/Layout";
import Loader from "../../Components/Loader/Loader";

function Landing() {
  return (
    <Layout>
      <CarouselEffect />
      <Catagory />

      <Product />
    </Layout>
  );
}

export default Landing;
