import "./App.css";
import Header from "./Components/Header/Header";
import CarouselEffect from "./Components/Carousel/CarouselEffect";
import CatagoryCard from "./Components/Carousel/Category/CatagoryCard";
import Catagory from "./Components/Carousel/Category/Catagory";
import Routing from "./Router";
import React, { useContext } from "react";
import { useEffect } from "react";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { type } from "./Utility/action.type";
import { auth } from "./Utility/firebase";

function App() {
const[{user},dispatch]=useContext(DataContext)


  useEffect(()=>{
auth.onAuthStateChanged((authuser)=>{
  if(authuser){
    console.log(authuser)
    dispatch({
      type:type.SET_USER,
      user:authuser
    })
  }else{
    dispatch({
      type:type.SET_USER,
      user:null
    });
  }
})
  },[])
  return (
    <div>

      <Routing />
    </div>
  );
}

export default App;
