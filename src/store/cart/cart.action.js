import { CART_ACTION_TYPES } from './cart.types';
import { createAction } from '../../utils/reducer/reducer.utils';

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

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const setIsCartOpen = (boolean) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
