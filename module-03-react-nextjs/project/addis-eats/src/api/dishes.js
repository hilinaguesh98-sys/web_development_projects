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

  return dishes.map((dish) => {
    const assetKey = `../assets/${dish.image.split('/').pop()}`;
    return {
      ...dish,
      image: assetUrls[assetKey] || dish.image,
    };
  });
}
