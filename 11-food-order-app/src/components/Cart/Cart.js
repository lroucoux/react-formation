import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `${cartCtx.totalAmount.toFixed(2)} €`;
  const hasMeals = cartCtx.meals.length > 0;

  const cartMealRemoveHandler = (id) => {
    cartCtx.removeMeal(id);
  };

  const cartMealAddHandler = (meal) => {
    const addedMeal = {
      ...meal,
      amount: 1,
    };
    cartCtx.addMeal(addedMeal);
  };

  const cardItems = cartCtx.meals.map((meal) => (
    <CartItem
      key={meal.id}
      price={meal.price}
      name={meal.name}
      amount={meal.amount}
      onRemove={cartMealRemoveHandler.bind(null, meal.id)}
      onAdd={cartMealAddHandler.bind(null, meal)}
    />
  ));

  return (
    <Modal onClose={props.onHideCart}>
      <ul className={classes["cart-items"]}>{cardItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {hasMeals && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
