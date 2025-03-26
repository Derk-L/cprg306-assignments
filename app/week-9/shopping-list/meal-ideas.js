"use client";

import { useEffect, useState } from "react";

const fetchMealIdeas = async (ingredient) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    if (!response.ok) throw new Error("Failed to fetch meal ideas.");
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];
  }
};

const fetchMealDetails = async (mealId) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    if (!response.ok) throw new Error("Failed to fetch meal details.");
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error("Error fetching meal details:", error);
    return null;
  }
};

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedMeal, setExpandedMeal] = useState(null);
  const [mealDetails, setMealDetails] = useState({});

  useEffect(() => {
    if (!ingredient) return;

    setLoading(true);
    setError(null);

    fetchMealIdeas(ingredient).then((fetchedMeals) => {
      setMeals(fetchedMeals);
      setLoading(false);
    });
  }, [ingredient]);

  const handleMealClick = async (mealId) => {
    if (mealDetails[mealId]) {
      setExpandedMeal(expandedMeal === mealId ? null : mealId);
      return;
    }

    const details = await fetchMealDetails(mealId);
    if (details) {
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = details[`strIngredient${i}`];
        const measure = details[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
          ingredients.push(`${measure} ${ingredient}`);
        }
      }

      setMealDetails((prev) => ({ ...prev, [mealId]: ingredients }));
      setExpandedMeal(mealId);
    }
  };

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md w-full">
      <h2 className="text-lg font-extrabold text-black mb-2">Meal Ideas</h2>
      {loading && <p className="text-black">Loading meal ideas...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && meals.length === 0 && (
        <p className="text-gray-700">No meal ideas found for {ingredient}</p>
      )}
      <ul className="mt-2">
        {meals.map((meal) => (
          <li
            key={meal.idMeal}
            className="bg-white p-3 rounded-lg mb-2 flex flex-col shadow-md cursor-pointer"
            onClick={() => handleMealClick(meal.idMeal)}
          >
            <div className="flex items-center">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-12 h-12 rounded-md mr-3"
              />
              <span className="font-semibold text-black">{meal.strMeal}</span>
            </div>
            {expandedMeal === meal.idMeal && (
              <ul className="mt-2 text-sm text-gray-700">
                <li className="font-bold">Ingredients:</li>
                {mealDetails[meal.idMeal]?.map((ingredient, index) => (
                  <li key={index} className="ml-4">• {ingredient}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}