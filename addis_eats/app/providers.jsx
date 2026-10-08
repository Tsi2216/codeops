"use client";

import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function Providers({ children }) {
  const [cart, setCart] = useState({});

  function addToCart(dish) {
    setCart((current) => ({
      ...current,
      [dish.id]: {
        dish,
        quantity: (current[dish.id]?.quantity || 0) + 1
      }
    }));
  }

  function removeFromCart(dish) {
    setCart((current) => {
      const item = current[dish.id];
      if (!item) return current;
      if (item.quantity === 1) {
        const next = { ...current };
        delete next[dish.id];
        return next;
      }
      return {
        ...current,
        [dish.id]: { ...item, quantity: item.quantity - 1 }
      };
    });
  }

  const value = useMemo(() => ({ cart, addToCart, removeFromCart }), [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
