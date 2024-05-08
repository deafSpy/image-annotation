import React, { useState, useEffect } from "react"
import "../styles/categoryDisplay.css"
import { useRef } from "react";

function CategoryDisplay({selectedCategory, setSelectedCategory}) {

  const categories = [
    "airplane", "car", "bird", "cat", "deer", "dog", "frog", "horse", "ship", "truck"
  ];

  return (
    <div className="category-display">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="category-select"
      >
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryDisplay;
