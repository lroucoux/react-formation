import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  meals: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD_MEAL") {
    const newTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartMealIndex = state.meals.findIndex(
      (meal) => meal.id === action.item.id
    );
    const existingCartMeal = state.meals[existingCartMealIndex];

    let updateMeals;

    if (existingCartMeal) {
      const updateMeal = {
        ...existingCartMeal,
        amount: existingCartMeal.amount + action.item.amount,
      };
      updateMeals = [...state.meals];
      updateMeals[existingCartMealIndex] = updateMeal;
    } else {
      updateMeals = state.meals.concat(action.item);
    }

    return { meals: updateMeals, totalAmount: newTotalAmount };
  }

  if (action.type === "REMOVE_MEAL") {
    const existingCartMealIndex = state.meals.findIndex(
      (meal) => meal.id === action.id
    );
    const existingCartMeal = state.meals[existingCartMealIndex];

    let updateMeals;

    if (existingCartMeal && existingCartMeal.amount > 1) {
      const updateMeal = {
        ...existingCartMeal,
        amount: existingCartMeal.amount - 1,
      };
      updateMeals = [...state.meals];
      updateMeals[existingCartMealIndex] = updateMeal;
    } else {
      updateMeals = state.meals.filter((meal) => meal.id !== action.id);
    }

    const updatedTotalAmount = state.totalAmount - existingCartMeal.price;

    return { meals: updateMeals, totalAmount: updatedTotalAmount };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addMealToCartHandler = (meal) => {
    dispatchCartAction({ type: "ADD_MEAL", item: meal });
  };

  const removeMealToCartHandler = (mealId) => {
    dispatchCartAction({ type: "REMOVE_MEAL", id: mealId });
  };

  const context = {
    meals: cartState.meals,
    totalAmount: cartState.totalAmount,
    addMeal: addMealToCartHandler,
    removeMeal: removeMealToCartHandler,
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
