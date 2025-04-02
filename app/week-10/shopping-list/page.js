"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../_utils/auth-context";
import ItemList from "./item-list.js";
import NewItem from "./new-item.js";
import MealIdeas from "./meal-ideas.js";
import { getItems, addItem } from "../_services/shopping-list-service";

export default function Page() {
  const { user } = useUserAuth();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push("/week-10");
    }
  }, [user, router]);

  useEffect(() => {
    const loadItems = async () => {
      if (user) {
        const fetchedItems = await getItems(user.uid);
        setItems(fetchedItems);
      }
    };

    loadItems();
  }, [user]);

  if (!user) {
    return null;
  }

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

  const handleAddItem = async (newItem) => {
    const id = await addItem(user.uid, newItem);
    const itemWithId = { id, ...newItem };
    setItems([...items, itemWithId]);
  };

  return (
    <main className="min-h-screen bg-blue-100 p-4">
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
