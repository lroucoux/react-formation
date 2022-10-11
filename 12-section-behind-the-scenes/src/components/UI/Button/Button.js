import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  console.log("Button RUNNING");
  return (
    <button
      type={props.type || "button"}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

// React.memo : permet de dire à React qu'on veut seulement re-render ce composant si une de ces props change
// ce qui sera rarement le case pour ce composant Button
// Avec cette méthode, on évite ainsi de rerendre ce composant inutilement
export default React.memo(Button);
