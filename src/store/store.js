import { compose, createStore, applyMiddleware } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import logger from 'redux-logger';
// Redux-Thunk
// import thunk from 'redux-thunk';

/// Redux-Saga
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';

// Root reducer
import { rootReducer } from './root-reducer';

/// Config persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
  // blacklist: ['user']
};

/// Saga middleware
const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

/// Middle ware, a kind of little library , run before an action hit the reducer
const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware
].filter(Boolean);

/// Config to use Redux Devtool in chrome
const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composeEnhancers);

/// Tell Saga middleware to run.
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
