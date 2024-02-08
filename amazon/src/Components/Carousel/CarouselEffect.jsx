import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./img/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function CarouselEffect() {
  const heroImgStyle = {
    position: "relative",
  };
  const beforeStyle = {
    content: '""',
    position: "absolute",
    bottom: "0px",
    top: "50px",
    width: "100%",
    height: "300px",

    backgroundImage:
      "linear-gradient(to bottom, rgba(225,225,225,0), rgba(255,255,255))",
  };
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItemLink) => {
          return <img src={imageItemLink} />;
        })}
      </Carousel>

      <div style={heroImgStyle}>
        <div style={beforeStyle}></div>
      </div>
    </div>
  );
}

export default CarouselEffect;
