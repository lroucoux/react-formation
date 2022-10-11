import React, { useContext } from "react";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { gerErrorMessage } from "../Utils/utils";

import classes from "./AuthForm.module.css";

type ErrorResponse = {
  code: number;
  message: string;
};

type JSONResponse = {
  idToken: string;
  expiresIn: string;
  error?: ErrorResponse;
};

const AuthForm = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    setIsLoading(true);

    if (
      enteredEmail?.trim().length === 0 ||
      enteredPassword?.trim().length === 0
    ) {
      return;
    }
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";
    } else {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp";
    }

    try {
      const response = await fetch(
        `${url}?key=${process.env.REACT_APP_API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsLoading(false);

      const data: JSONResponse = await response.json();
      if (response.ok) {
        const expiresInInMs = +data.expiresIn * 1000;
        const expirationTime = new Date(new Date().getTime() + expiresInInMs);
        authCtx.login(data.idToken, expirationTime.toISOString());
        history.replace("/");
      } else {
        const errorMessage = data.error?.message || "Authentication failed!";
        throw new Error(errorMessage);
      }
    } catch (error) {
      alert(gerErrorMessage(error));
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
