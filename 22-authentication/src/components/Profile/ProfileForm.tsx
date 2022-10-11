import classes from "./ProfileForm.module.css";
import React, { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
import { gerErrorMessage } from "../Utils/utils";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const enteredPassword = passwordInputRef.current!.value;

    if (enteredPassword.trim().length === 0) {
      return;
    }

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
            password: enteredPassword,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        history.replace("/");
      } else {
        const errorMessage = data.error?.message || "Update password failed!";
        throw new Error(errorMessage);
      }
    } catch (error) {
      alert(gerErrorMessage(error));
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength={7}
          ref={passwordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
