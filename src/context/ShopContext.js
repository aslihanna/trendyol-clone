import React, { createContext, useState, useContext, useMemo } from 'react';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(productId)) {
        return prevFavorites.filter((id) => id !== productId);
      } else {
        return [...prevFavorites, productId];
      }
    });
  };

  const isFavorite = (productId) => favorites.includes(productId);

  const addToCart = (productToAdd) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === productToAdd.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...productToAdd, quantity: 1 }];
    });
    // Buradaki alert'i daha sonra toast bildirimi ile değiştirebiliriz.
    alert(`${productToAdd.name} sepete eklendi!`);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };
  
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) => 
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  // Sepetin toplam tutarını hesaplar
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  }, [cart]);

  // --- YENİ EKLENEN KISIM ---
  // Sepetteki toplam ürün miktarını (quantity'leri toplayarak) hesaplar
  const totalCartItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);
  // --- YENİ EKLENEN KISIM SONU ---

  const value = {
    favorites, cart, searchTerm,
    toggleFavorite, isFavorite, addToCart, setSearchTerm,
    removeFromCart, updateQuantity, cartTotal,
    totalCartItems // <-- Yeni değeri context'e ekliyoruz
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => useContext(ShopContext);