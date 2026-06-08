// utils/viewedPosts.js vagy közvetlenül a HomePage-ben

const VIEWED_POSTS_KEY = 'viewed_realestate_posts';

export const getViewedPosts = () => {
  try {
    const stored = localStorage.getItem(VIEWED_POSTS_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch (e) {
    return new Set();
  }
};

export const addViewedPost = (postId) => {
  try {
    const viewed = getViewedPosts();
    viewed.add(postId);
    localStorage.setItem(VIEWED_POSTS_KEY, JSON.stringify(Array.from(viewed)));
  } catch (e) {
    console.warn('Nem sikerült menteni a megnézett hirdetést');
  }
};