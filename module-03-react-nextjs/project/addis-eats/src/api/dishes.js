const assetUrls = import.meta.glob('../assets/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

export async function getDishes() {
  const response = await fetch('/menu-data.json');
  if (!response.ok) {
    throw new Error('Failed to fetch dishes');
  }

  const dishes = await response.json();

  const savedDishes = JSON.parse(localStorage.getItem('addisEatsDishes') || 'null');
  const sourceDishes = Array.isArray(savedDishes) ? savedDishes : dishes;

  return sourceDishes.map((dish) => {
    const assetKey = `../assets/${dish.image.split('/').pop()}`;
    return {
      ...dish,
      image: assetUrls[assetKey] || dish.image,
    };
  });
}
