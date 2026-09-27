"use client";

import { useState } from "react";
import CategoryBar from "./CategoryBar";

export default function FilterShell({ children }) {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <CategoryBar
        category={category}
        setCategory={setCategory}
      />

      {children}
    </div>
  );
}