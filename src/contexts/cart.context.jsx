import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFormCart: () => {},
  cartCount: 0,
  cartTotal: 0
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      };
    default:
      throw new Error(`unhandled type of ${type} in CartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);

  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { cartItems, cartCount, cartTotal, isCartOpen } = state;

  // useEffect(() => {
  //   /// Update cart count.
  //   const newCartCount = cartItems.reduce((total, cartItem) => {
  //     return total + cartItem.quantity;
  //   }, 0);
  //   setCartCount(newCartCount);
  // }, [cartItems]);

  // useEffect(() => {
  //   /// Update cart count.
  //   const newCartTotal = cartItems.reduce((cartTotal, cartItem) => {
  //     return cartTotal + cartItem.quantity * cartItem.price;
  //   }, 0);
  //   setCartTotal(newCartTotal);
  // }, [cartItems]);

  const updateCartItemsReducer = (newCartItems) => {
    /// Update cart count.
    /// Generate newCartTotal
    const newCartCount = newCartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);

    /// generate newCartCount
    const newCartTotal = newCartItems.reduce((cartTotal, cartItem) => {
      return cartTotal + cartItem.quantity * cartItem.price;
    }, 0);

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount
      })
      // type: CART_ACTION_TYPES.SET_CART_ITEMS,
      // payload: {
      //   cartItems: newCartItems,
      //   cartTotal: newCartTotal,
      //   cartCount: newCartCount
      // }
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFormCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (status) => {
    dispatch(
      createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, {
        status
      })
    );
    // dispatch({
    //   type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
    //   payload: status
    // });
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFormCart,
    cartItems,
    cartCount,
    cartTotal
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
