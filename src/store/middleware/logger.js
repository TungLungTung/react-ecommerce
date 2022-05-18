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
