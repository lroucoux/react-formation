import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const cartContext = useContext(CartContext);

  const onAddToCartHandler = (enteredAmount) => {
    const addedMeal = {
      id: props.id,
      name: props.name,
      price: props.price,
      amount: enteredAmount,
    };
    cartContext.addMeal(addedMeal);
  };

  const price = `${props.price.toFixed(2)} €`;
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={onAddToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
