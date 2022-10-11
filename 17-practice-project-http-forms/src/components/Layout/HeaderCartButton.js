import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

function HeaderCartButton(props) {
  const cartCtx = useContext(CartContext);
  const [isBump, setIsBump] = useState(false);

  const { meals } = cartCtx;

  const numberOfCartItems = meals.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${isBump ? classes.bump : ""}`;

  useEffect(() => {
    if (meals.length === 0) {
      return;
    }
    setIsBump(true);

    const timer = setTimeout(() => {
      setIsBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [meals]);

  return (
    <button className={btnClasses} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderCartButton;
