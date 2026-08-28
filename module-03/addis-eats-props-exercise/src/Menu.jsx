import React, { useState } from "react";
import PropTypes from "prop-types";
import Dish from "./Dish";
import Card from "./Card";
import { menu } from "./data";

function Menu({ items = menu }) {
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(items.map((dish) => dish.category))
  ];

  const filteredMenu =
    category === "All"
      ? items
      : items.filter((dish) => dish.category === category);

  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">ADDIS EATS</p>
        <h1>Our Menu</h1>
        <p className="subtitle">Traditional Ethiopian favourites, served with a modern touch.</p>
      </header>

      <section className="filters">
        <label htmlFor="category">Filter by category</label>
        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </section>

      <Card>
        {filteredMenu.length === 0 ? (
          <p className="empty-state">No dishes found in this category.</p>
        ) : (
          <div className="dish-list">
            {filteredMenu.map((dish) => (
              <Dish
                key={dish.id}
                name={dish.name}
                price={dish.price}
                spicy={dish.spicy}
              />
            ))}
          </div>
        )}
      </Card>
    </main>
  );
}

Menu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      spicy: PropTypes.bool
    })
  )
};

export default Menu;
