import { useState } from "react";
import dishes from "./data";
import CategoryBar from "./CategoryBar";
import OrderForm from "./OrderForm";

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [orderTotal, setOrderTotal] = useState(0);
  const [counts, setCounts] = useState({});

  function addDish(dish) {
    const oldCount = counts[dish.id] || 0;

    setCounts({
      ...counts,
      [dish.id]: oldCount + 1
    });

    setOrderTotal(orderTotal + dish.price);
  }

  function removeDish(dish) {
    const oldCount = counts[dish.id] || 0;

    if (oldCount === 0) {
      return;
    }

    setCounts({
      ...counts,
      [dish.id]: oldCount - 1
    });

    setOrderTotal(orderTotal - dish.price);
  }

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter(
          (dish) => dish.category === selectedCategory
        );

  return (
    <div className="page">
      <header>
        <h1>Addis Eats</h1>
      </header>

      <main>
        <section className="menu">
          <h2>Menu</h2>

          <CategoryBar
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <div className="dishes">
            {filteredDishes.map((dish) => (
              <div className="dish" key={dish.id}>
                <div className="dish-info">
                  <h3>{dish.name}</h3>
                  <p>{dish.price} ETB</p>
                  {dish.spicy && <span>Spicy</span>}
                </div>

                <div className="quantity">
                  <button onClick={() => removeDish(dish)}>-</button>
                  <span>{counts[dish.id] || 0}</span>
                  <button onClick={() => addDish(dish)}>+</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="order">
          <h2>Your Order</h2>
          <div className="total">
            <strong>Total</strong>
            <strong>{orderTotal} ETB</strong>
          </div>

          <OrderForm />
        </section>
      </main>

      <footer>Addis Eats</footer>
    </div>
  );
}

export default Menu;