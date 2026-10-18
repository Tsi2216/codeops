"use client";

import { useState } from "react";

export default function MenuCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Visits: {count}</p>
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        Count
      </button>
    </div>
  );
}
