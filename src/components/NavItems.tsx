"use client"

import { PRODUCT_CATEGORIES } from "@/config";
import { useState } from "react";
import NavItem from "./NavItem";

/**
 * Renders the navigation items component.
 * @returns The JSX element representing the navigation items.
 */

const NavItems = () => {
  // State to keep track of the active index
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  const isAnyOpen = activeIndex !== null;

  return (
    <div className="flex gap-4 h-full">
      {PRODUCT_CATEGORIES.map((category, i) => {
        // Function to handle opening/closing of the category
        const handleOpen = () => {
          if (activeIndex === i) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };

        // Check if the category is currently open
        const isOpen = i === activeIndex;

        // Render the category item
        return <NavItem 
            category = {category} 
            handleOpen = {handleOpen} 
            isOpen = {isOpen} 
            key = {category.value} 
            isAnyOpen = {isAnyOpen}
          />;
      })}
    </div>
  );
};

export default NavItems;