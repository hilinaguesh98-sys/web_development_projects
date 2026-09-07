export async function loadDishes(category = "all", options = {}) {
  const { signal } = options;
  const url = "/dishes.json";

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(
      `Failed to load dishes: ${response.status} ${response.statusText}`
    );
  }

  const dishes = await response.json();

  if (category === "all") {
    return dishes;
  }

  return dishes.filter((dish) => dish.category === category);
}
