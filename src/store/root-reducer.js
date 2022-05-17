import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categories/category.reducer';

export const rootReducer = combineReducers({
  user: userReducer, // Take object of userReducer
  categories: categoriesReducer // Take object of categoriesReducer
});
