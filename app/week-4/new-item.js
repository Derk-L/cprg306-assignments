"use client";

import { useState } from "react";

export default function NewItem() {
    const [quantity, setQuantity] = useState(1);

    const increment = () => {
        if (quantity < 20) {
          setQuantity(quantity + 1);
        }
      };

      const decrement = () => {
        if (quantity > 1) {
          setQuantity(quantity - 1);
        }
      };

      return (
        <div className="flex items-center justify-center space-x-10 p-3 bg-white text-black rounded-lg shadow-md max-w-sm mx-auto">
          <p className="text-xl font-semibold">{quantity}</p>
    
          <div className="flex space-x-2">
            <button
              onClick={decrement}
              className="px-4 py-2 text-lg bg-blue-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              -
            </button>
    
            <button
              onClick={increment}
              className="px-4 py-2 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              +
            </button>
          </div>
        </div>
      );
}