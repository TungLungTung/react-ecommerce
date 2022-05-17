import { compose, createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';

// Root reducer
import { rootReducer } from './root-reducer';

/// Using curry function
const loggerMiddleware = (store) => (next) => (action) => {
  /// Code we want to middleware
  if (!action.type) {
    return next(action);
  }
  console.log('type: ', action.type);
  console.log('payload: ', action.payload);
  console.log('currentState: ', store.getState());

  // Pass to another middleware
  next(action);

  /// Synchornus
  console.log('next state: ', store.getState());
};
/// Middle ware, a kind of little library , run before an action hit the reducer
const middleWares = [loggerMiddleware];

const composeEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composeEnhancers);
