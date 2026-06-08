// src/utils/favoritePosts.js
const FAVORITE_POSTS_KEY = 'favorite_realestate_posts';
const FAVORITE_EXPIRY_KEY = 'favorite_realestate_expiry';
const EXPIRY_DAYS = 90;

export const getFavoritePosts = () => {
  try {
    const expiry = localStorage.getItem(FAVORITE_EXPIRY_KEY);
    if (expiry && new Date(expiry) < new Date()) {
      // Lejárt → töröljük
      localStorage.removeItem(FAVORITE_POSTS_KEY);
      localStorage.removeItem(FAVORITE_EXPIRY_KEY);
      return new Set();
    }

    const stored = localStorage.getItem(FAVORITE_POSTS_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch (e) {
    console.warn('Nem sikerült betölteni a kedvenceket');
    return new Set();
  }
};

export const addFavoritePost = (postId) => {
  try {
    const favorites = getFavoritePosts();
    favorites.add(postId);

    localStorage.setItem(FAVORITE_POSTS_KEY, JSON.stringify(Array.from(favorites)));

    // Ha még nincs expiry, állítsunk be egyet
    if (!localStorage.getItem(FAVORITE_EXPIRY_KEY)) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + EXPIRY_DAYS);
      localStorage.setItem(FAVORITE_EXPIRY_KEY, expiryDate.toISOString());
    }
  } catch (e) {
    console.warn('Nem sikerült menteni a kedvencet');
  }
};

export const removeFavoritePost = (postId) => {
  try {
    const favorites = getFavoritePosts();
    favorites.delete(postId);
    localStorage.setItem(FAVORITE_POSTS_KEY, JSON.stringify(Array.from(favorites)));

    // Ha üres lett → expiry is törölhető (opcionális)
    if (favorites.size === 0) {
      localStorage.removeItem(FAVORITE_EXPIRY_KEY);
    }
  } catch (e) {
    console.warn('Nem sikerült eltávolítani a kedvencet');
  }
};

export const isFavoritePost = (postId) => {
  return getFavoritePosts().has(postId);
};

export const clearExpiredFavorites = () => {
  const expiry = localStorage.getItem(FAVORITE_EXPIRY_KEY);
  if (expiry && new Date(expiry) < new Date()) {
    localStorage.removeItem(FAVORITE_POSTS_KEY);
    localStorage.removeItem(FAVORITE_EXPIRY_KEY);
  }
};