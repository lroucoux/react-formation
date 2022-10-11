import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  //   const cartContext = useContext(CartContext);
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    setAmountIsValid(true);

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountRef}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      >
        Amount
      </Input>
      <button type="submit">+ Add</button>
      {!amountIsValid && <p>Please enter a valid amonunt (1-5)</p>}
    </form>
  );
};
export default MealItemForm;
