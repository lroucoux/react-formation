import useInput from "../../hooks/use-input";
import Input from "../UI/Input";
import classes from "./CheckoutWithInput.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;

const CheckoutWithInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: enteredPostal,
    isValid: enteredPostalIsValid,
    hasError: postalHasError,
    valueChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler,
  } = useInput(isFiveChars);

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredPostalIsValid &&
    enteredCityIsValid
  ) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      city: enteredPostal,
      postal: enteredCity,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <Input
        className={classes.control}
        input={{
          id: "name",
          type: "text",
          value: enteredName,
          onChange: nameChangeHandler,
          onBlur: nameBlurHandler,
        }}
        error={{
          hasError: nameHasError,
          errorMessage: "Please enter a valid name!",
        }}
      >
        Your Name
      </Input>
      <Input
        className={classes.control}
        input={{
          id: "street",
          type: "text",
          value: enteredStreet,
          onChange: streetChangeHandler,
          onBlur: streetBlurHandler,
        }}
        error={{
          hasError: streetHasError,
          errorMessage: "Please enter a valid street!",
        }}
      >
        Street
      </Input>
      <Input
        className={classes.control}
        input={{
          id: "postal",
          type: "text",
          value: enteredPostal,
          onChange: postalChangeHandler,
          onBlur: postalBlurHandler,
        }}
        error={{
          hasError: postalHasError,
          errorMessage: "Please enter a valid postal code (5 characters long)!",
        }}
      >
        Postal code
      </Input>
      <Input
        className={classes.control}
        input={{
          id: "city",
          type: "text",
          value: enteredCity,
          onChange: cityChangeHandler,
          onBlur: cityBlurHandler,
        }}
        error={{
          hasError: cityHasError,
          errorMessage: "Please enter a valid city!",
        }}
      >
        City
      </Input>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!formIsValid} className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default CheckoutWithInput;
