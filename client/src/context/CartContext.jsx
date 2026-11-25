import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'gramiyam_cart_v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage quota errors
    }
  }, [items]);

  const addItem = (product, quantity = 1, variant = null) => {
    const selectedVariant = variant || product.variants?.[0]?.label || 'Standard';
    const unitPrice =
      product.variants?.find((v) => v.label === selectedVariant)?.price ?? product.price;
    const itemKey = `${product._id || product.slug}__${selectedVariant}`;

    setItems((current) => {
      const existing = current.find((item) => item.itemKey === itemKey);
      if (existing) {
        return current.map((item) =>
          item.itemKey === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...current,
        {
          itemKey,
          _id: product._id || product.slug,
          slug: product.slug || product._id,
          name: product.name,
          category: product.category,
          image: product.image || product.images?.[0] || '',
          variant: selectedVariant,
          price: unitPrice,
          originalPrice: product.originalPrice || null,
          quantity,
        },
      ];
    });
  };

  const updateQuantity = (itemKey, quantity) => {
    setItems((current) =>
      quantity < 1
        ? current.filter((item) => item.itemKey !== itemKey)
        : current.map((item) =>
            item.itemKey === itemKey ? { ...item, quantity } : item
          )
    );
  };

  const removeItem = (itemKey) => {
    setItems((current) => current.filter((item) => item.itemKey !== itemKey));
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      count,
      subtotal,
      isDrawerOpen,
      openDrawer: () => setIsDrawerOpen(true),
      closeDrawer: () => setIsDrawerOpen(false),
    }),
    [items, count, subtotal, isDrawerOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
