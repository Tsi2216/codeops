"use client";

import { useEffect, useState } from "react";

export default function FilterShell({ children }) {
  const [category, setCategory] = useState("All");

  useEffect(() => {
    function handleCategory(event) {
      setCategory(event.detail);
    }
    window.addEventListener("addis-eats-category", handleCategory);
    return () => window.removeEventListener("addis-eats-category", handleCategory);
  }, []);

  return (
    <div className={`filter-shell filter-${category.replaceAll(" ", "-")}`}>
      {children}
    </div>
  );
}
