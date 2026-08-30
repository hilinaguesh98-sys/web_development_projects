export async function loadDishes(category = "all") {
  const controller = new AbortController();
  
  try {
    const url = category === "all" 
      ? "/dishes.json"
      : `/dishes.json?category=${category}`;
    
    const response = await fetch(url, { signal: controller.signal });
    
    if (!response.ok) {
      throw new Error(`Failed to load dishes: ${response.status} ${response.statusText}`);
    }
    
    let dishes = await response.json();
    
    // Filter by category if needed (client-side filtering)
    if (category !== "all") {
      dishes = dishes.filter(dish => dish.category === category);
    }
    
    return dishes;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch cancelled");
      return [];
    }
    throw error;
  }
}
