import React, { createContext, useMemo, useReducer } from "react";
import cartReducer from "./cartReducer";

export const CartContext = createContext(null);

function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  const total = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [items]);

  const value = useMemo(() => {
    return { items, dispatch, total };
  }, [items, total]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
