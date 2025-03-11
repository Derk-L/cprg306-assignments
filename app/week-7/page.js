"use client";

import { useState } from "react";
import ItemList from "./item-list.js";
import NewItem from "./new-item.js";
import itemsData from "./item.json";

export default function Page() {
    const [items, setItems] = useState(itemsData);

    const handleAddItem = (newItem) => {
        setItems([...items, newItem]);
    };

    return (
        <main className="bg-blue-100 p-4">
            <h1 className="text-3xl font-extrabold ml-2">Shopping 
                <span className="text-blue-600">List</span>
            </h1>
            <NewItem onAddItem={handleAddItem} />
            <ItemList items={items} />
        </main>
    );
}
