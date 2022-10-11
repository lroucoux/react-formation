import React from "react";

const CartContext = React.createContext({
  meals: [],
  totalAmount: 0,
  addMeal: (meal) => {},
  removeMeal: (mealId) => {},
  clearCart: () => {},
});

export default CartContext;
