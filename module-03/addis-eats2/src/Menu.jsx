import React, { useContext, useMemo, useState } from "react";
import CategoryBar from "./CategoryBar";
import OrderForm from "./OrderForm";
import useFetch from "./hooks/useFetch";
import { CartContext } from "./cart/CartProvider";

function Header() {
  const { items } = useContext(CartContext);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header>
      <h1>Addis Eats</h1>
      <p>Delicious food from Addis Ababa</p>
      <div className="cart-badge">Cart: {count}</div>
    </header>
  );
}

function OrderPanel() {
  const { items, dispatch, total } = useContext(CartContext);

  return (
    <section className="order">
      <h2>Your Order</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <p>
                  {item.quantity} x {item.price} ETB
                </p>
              </div>
              <button
                type="button"
                onClick={() => dispatch({ type: "remove", item })}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="total">
        <strong>Total</strong>
        <strong>{total} ETB</strong>
      </div>

      <button
        className="clear-button"
        type="button"
        onClick={() => dispatch({ type: "clear" })}
        disabled={items.length === 0}
      >
        Clear Cart
      </button>

      <OrderForm />
    </section>
  );
}

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data: dishes, loading, error } = useFetch("/menu.json");
  const { items, dispatch } = useContext(CartContext);

  const filteredDishes = useMemo(() => {
    if (!dishes) {
      return [];
    }

    if (selectedCategory === "All") {
      return dishes;
    }

    return dishes.filter((dish) => dish.category === selectedCategory);
  }, [dishes, selectedCategory]);

  if (loading) {
    return <p className="status">Loading menu...</p>;
  }

  if (error) {
    return <p className="status error">{error}</p>;
  }

  return (
    <div className="page">
      <Header />

      <main>
        <section className="menu">
          <h2>Menu</h2>

          <CategoryBar
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <div className="dishes">
            {filteredDishes.map((dish) => {
              const cartItem = items.find((item) => item.id === dish.id);
              const quantity = cartItem ? cartItem.quantity : 0;

              return (
                <div className="dish" key={dish.id}>
                  <div className="dish-info">
                    <h3>{dish.name}</h3>
                    <p>{dish.price} ETB</p>
                    {dish.spicy && <span>Spicy</span>}
                  </div>

                  <div className="quantity">
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "remove", item: dish })}
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "add", item: dish })}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <OrderPanel />
      </main>

      <footer>Addis Eats</footer>
    </div>
  );
}

export default Menu;
