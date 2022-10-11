import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import CheckoutWithInput from "./CheckoutWithInput";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isOrderButtonIsClicked, setIsOrderButtonIsClicked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

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

  const orderHandler = () => {
    setIsOrderButtonIsClicked(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-course-17-practice-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.meals,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasMeals && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      <ul className={classes["cart-items"]}>{cardItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isOrderButtonIsClicked && (
        <CheckoutWithInput
          onSubmit={submitOrderHandler}
          onCancel={props.onHideCart}
        />
      )}
      {!isOrderButtonIsClicked && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmittingModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmittingModalContent}
    </Modal>
  );
};

export default Cart;
