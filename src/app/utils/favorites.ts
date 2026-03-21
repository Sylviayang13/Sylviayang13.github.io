// Bookmark management using localStorage (favorites + review later)

const FAVORITES_KEY = 'lyrichan_favorites';
const REVIEW_LATER_KEY = 'lyrichan_review_later';

const safeGet = (key: string) => {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
};

const safeSet = (key: string, value: string[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFavorites = (): string[] => safeGet(FAVORITES_KEY);
export const getReviewLater = (): string[] => safeGet(REVIEW_LATER_KEY);

export const isFavorite = (poemId: string): boolean => {
  const favorites = getFavorites();
  return favorites.includes(poemId);
};

export const isReviewLater = (poemId: string): boolean => {
  const reviewLater = getReviewLater();
  return reviewLater.includes(poemId);
};

export const toggleFavorite = (poemId: string): boolean => {
  const favorites = getFavorites();
  const index = favorites.indexOf(poemId);

  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(poemId);
  }

  safeSet(FAVORITES_KEY, favorites);
  return index === -1; // Returns true if now favorited, false if unfavorited
};

export const toggleReviewLater = (poemId: string): boolean => {
  const reviewLater = getReviewLater();
  const index = reviewLater.indexOf(poemId);

  if (index > -1) {
    reviewLater.splice(index, 1);
  } else {
    reviewLater.push(poemId);
  }

  safeSet(REVIEW_LATER_KEY, reviewLater);
  return index === -1;
};
