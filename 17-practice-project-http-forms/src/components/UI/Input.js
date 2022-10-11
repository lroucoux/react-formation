import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const defaultClassName = `${
    props.className ? props.className : classes.input
  }`;
  const hasError = props.error && props.error.hasError;
  const divClassName = `${hasError ? classes.invalid : ""} ${defaultClassName}`;
  return (
    <div className={divClassName}>
      <label htmlFor={props.input.id}>{props.children}</label>
      <input ref={ref} {...props.input} />
      {hasError && <p>{props.error.errorMessage}</p>}
    </div>
  );
});

export default Input;
