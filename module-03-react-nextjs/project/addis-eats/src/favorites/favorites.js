export const FAVORITES_KEY = 'addisEatsFavorites';

export function getFavoriteIds() {
  try {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(dishId) {
  const currentFavorites = getFavoriteIds();
  const isAlreadyFavorite = currentFavorites.includes(dishId);
  const nextFavorites = isAlreadyFavorite
    ? currentFavorites.filter((id) => id !== dishId)
    : [...currentFavorites, dishId];

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
  window.dispatchEvent(new CustomEvent('addisEatsFavoritesUpdated', { detail: nextFavorites }));

  return !isAlreadyFavorite;
}

export function isFavorite(dishId) {
  return getFavoriteIds().includes(dishId);
}
