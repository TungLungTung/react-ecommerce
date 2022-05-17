import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categories/category.reducer';
import { cartReducer } from './cart/cart.reducer';

export const rootReducer = combineReducers({
  user: userReducer, // Take object of userReducer
  categories: categoriesReducer, // Take object of categoriesReducer
  cart: cartReducer // Take object of cartReducer
});
