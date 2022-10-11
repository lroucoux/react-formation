import { useState } from "react";

const SimpleInput = (props) => {
  // 2 façons de récupérer un input : via state ou via ref
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);
  const [enteredEmail, setEnteredEMail] = useState("");
  const [enteredEmailIsTouched, setEnteredEmailIsTouched] = useState(false);
  // const nameInputRef = useRef();

  const enteredNameIsValid = enteredName.trim().length > 0;
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameIsTouched;

  const enteredEmailIsValid =
    enteredEmail.trim().length > 0 && enteredEmail.trim().includes("@");
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailIsTouched;

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  // avec useState, permet de récupérer la valeur de l'input à chaque changement
  // => peut etre bien pour de la validation instantanée mais trop si on veut juste la valeur à la soumission du formulaire
  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameIsTouched(true);
  };

  const emailInputChangeHandler = (event) => {
    setEnteredEMail(event.target.value);
  };

  const emailInputBlurHandler = (event) => {
    setEnteredEmailIsTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnteredNameIsTouched(true);
    setEnteredEmailIsTouched(true);

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    console.log(enteredName);
    console.log(enteredEmail);
    // Avec le useRef, on récupère la valeur de l'input uniquement à la soumission du form
    // => pas possible de faire de la validation instantanée
    // const enteredValue = nameInputRef.current.value;
    // console.log(enteredValue);

    // nameInputRef.current.value = ""; // NOT IDEAL, DON'T MANIPULATE DOM DIRECTLY
    setEnteredName("");
    setEnteredNameIsTouched(false);
    setEnteredEMail("");
    setEnteredEmailIsTouched(false);
  };

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          // ref={nameInputRef}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          // ref={nameInputRef}
          value={enteredEmail}
        />
        {emailInputIsInvalid && (
          <p className="error-text">Email must be valid</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
