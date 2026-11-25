import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const WishlistContext = createContext(null);
const WISHLIST_STORAGE_KEY = 'gramiyam_wishlist_v1';

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage errors
    }
  }, [items]);

  const isWishlisted = (idOrSlug) =>
    items.some((item) => item._id === idOrSlug || item.slug === idOrSlug);

  const toggleWishlist = (product) => {
    const id = product._id || product.slug;
    setItems((current) => {
      const exists = current.some((item) => item._id === id || item.slug === id);
      if (exists) {
        return current.filter((item) => item._id !== id && item.slug !== id);
      }
      return [...current, product];
    });
  };

  const removeFromWishlist = (idOrSlug) => {
    setItems((current) =>
      current.filter((item) => item._id !== idOrSlug && item.slug !== idOrSlug)
    );
  };

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      isWishlisted,
      toggleWishlist,
      removeFromWishlist,
    }),
    [items]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
