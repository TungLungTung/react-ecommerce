import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  /// find if cartItems contains productToAdd
  const existingCartItem = cartItems.find((cartItem) => {
    /// Return ture
    return cartItem.id === productToAdd.id;
  });

  // If found, increment quantity
  if (existingCartItem) {
    /// REturn new array object, DO NOT mutate original object
    return cartItems.map((cartItem) => {
      return cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  }

  // return new array with modified cartItems/ new cart items
  /// Ben duoi la du cho ban dau chua co gio hang hay gi cung khong bi loi
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  /// Find the cart item to remove (if exist)
  const existingCartItem = cartItems.find((cartItem) => {
    /// Return ture
    return cartItem.id === cartItemToRemove.id;
  });
  /// Check if quantity is equal to 1, remove this item from the cart.
  if (existingCartItem.quantity === 1) {
    /// Keep item in callback function
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  /// return back cart items with matching cart items with reduced quantity
  return cartItems.map((cartItem) => {
    return cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem;
  });
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    /// Update cart count.
    const newCartCount = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    cartItems,
    cartCount
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
