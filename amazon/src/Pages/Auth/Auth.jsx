import React, { useContext, useState } from "react";
import classes from "../Auth/Signup.module.css";
import Layout from "../../Components/Layout/Layout";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { type } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";

function Auth() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const [loading, setloading] = useState({
    signIn: false,
    signUp: false,
  });
  // console.log(Email,Password)
  const [{ user }, dispatch] = useContext(DataContext);
  // console.log(user)
  const navigate = useNavigate();
  const navStateData = useLocation();
  // console.log(navStateData)

  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name == "sign_in") {
      setloading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, Email, Password)
        .then((userInfo) => {
          dispatch({
            type: type.SET_USER,
            user: userInfo.user,
          });
          setloading({ ...loading, signIn: false });
          console.log(userInfo);
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          console.log(err.message);
          setError(err.message);
          setloading({ ...loading, signIn: false });
        });
    } else {
      setloading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, Email, Password)
        .then((userInfo) => {
          console.log(userInfo);
          dispatch({
            type: type.SET_USER,
            user: userInfo.user,
          });
          setloading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          console.log(err);
          setError(err.message);
          setloading({ ...loading, signup: false });
        });
    }
  };
  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to={"/"}>
        <img
          src="https://imagenes.heraldo.es/files/image_990_v3/uploads/imagenes/2016/09/14/_amazonlogo_cb6ff359.jpg"
          alt="amazon logo"
        />
      </Link>
      {/* form */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="Email">Email</label>
            <input
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              type="Email"
              id="Email"
            />
          </div>
          <div>
            <label htmlFor="Password">Password</label>
            <input
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              type="Password"
              id="Password"
            />
          </div>
          <button
            type="submit"
            name="sign_in"
            onClick={authHandler}
            className={classes.Login_SignInbutton}
          >
            {loading.signIn ? (
              <ClipLoader color="#000" size={15}></ClipLoader>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        {/* agreement */}
        <p>
          By continuing, you agree to Amazon's fake clone Conditions of Use and
          Privacy Notice.
        </p>
        {/* create account button */}
        <button
          type="submit"
          name="sign_up"
          onClick={authHandler}
          className={classes.login_registerbutton}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15}></ClipLoader>
          ) : (
            "Create Your Amazon Account"
          )}
        </button>
        {Error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{Error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
