"use client";

import Item from "./item.js";
import { useState } from "react";

export default function ItemList({ items }) {
    const [sortBy, setSortBy] = useState("name");

    const sortedItems = [...items].sort((a, b) => {
        if (sortBy === "name") {
            return a.name.localeCompare(b.name);
        }
        return a.category.localeCompare(b.category);
    });

    return (
        <div className="ml-2.5 mt-3">
            <span className="text-black font-semibold">Sort By: </span>
            <button
                onClick={() => setSortBy("name")}
                className={`px-2 py-1 mr-2 text-black border border-gray-400 rounded transition ${
                    sortBy === "name" ? "bg-blue-500 text-white" : "bg-white text-black"
                }`}
            >
                Name
            </button>

            <button
                onClick={() => setSortBy("category")}
                className={`px-2 py-1 text-black border border-gray-400 rounded transition ${
                    sortBy === "category" ? "bg-blue-500 text-white" : "bg-white text-black"
                }`}
            >
                Category
            </button>

            <ul>
                {sortedItems.map((item) => (
                    <Item key={item.id} {...item} />
                ))}
            </ul>
        </div>
    );
}