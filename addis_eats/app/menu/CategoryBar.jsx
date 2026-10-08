"use client";

import { useState } from "react";

const categories = ["All", "Main Dishes", "Beverages", "Sides"];

export default function CategoryBar() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  function handleSelect(category) {
    setSelectedCategory(category);
    window.dispatchEvent(new CustomEvent("addis-eats-category", { detail: category }));
  }

  return (
    <div className="category-bar" aria-label="Dish categories">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => handleSelect(category)}
          className={selectedCategory === category ? "selected" : ""}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
