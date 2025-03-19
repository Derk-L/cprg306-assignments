"use client";

import { useState } from "react";
import ItemList from "./item-list.js";
import NewItem from "./new-item.js";
import MealIdeas from "./meal-ideas.js";
import itemsData from "./item.json";

export default function Page() {
    const [items, setItems] = useState(itemsData);
    const [selectedItemName, setSelectedItemName] = useState(null);

    const cleanItemName = (itemName) => {
        return itemName
            .split(",")[0]
            .trim()
            .replace(/[\u{1F300}-\u{1FAD6}]/gu, "");
    };

    const handleItemSelect = (item) => {
        const cleanedName = cleanItemName(item.name);
        setSelectedItemName(cleanedName);
    };

    const handleAddItem = (newItem) => {
        setItems([...items, newItem]);
    };

    return (
        <main className="bg-blue-100 p-4">
            <h1 className="text-3xl font-extrabold ml-2">
                Shopping <span className="text-blue-600">List</span>
            </h1>

            <div className="flex gap-4">
                <div className="w-1/5">
                    <NewItem onAddItem={handleAddItem} />
                    <ItemList items={items} onItemSelect={handleItemSelect} />
                </div>
                <div>
                    <MealIdeas ingredient={selectedItemName} />
                </div>
            </div>
        </main>
    );
}
