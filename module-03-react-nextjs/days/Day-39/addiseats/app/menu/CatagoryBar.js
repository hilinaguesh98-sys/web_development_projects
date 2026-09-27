"use client";

import { useState } from "react";

const categories = ["All", "Ethiopian", "Pizza", "Burger", "Drinks", "Sides"];

export default function CategoryBar() {
  const [active, setActive] = useState("All");

  return (
    <div className="categories">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActive(category)}
          className={active === category ? "category active" : "category"}
        >
          {category}
        </button>
      ))}
    </div>
  );
}