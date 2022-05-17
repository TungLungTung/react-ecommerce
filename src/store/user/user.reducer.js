import { USER_ACTION_TYPES } from './user.types';

const INITIAL_STATE = {
  currentUser: null
};

//// Reducers
//// Function to return object.
export const userReducer = (state = INITIAL_STATE, action) => {
  /// Object we want to store
  /// state is current User.
  // console.log(action);
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        /// Receive state obj from state and replace it
        ...state,
        currentUser: payload
      };
    default:
      return state; // Neu nhu khong co gi thay doi.
    // throw new Error(`Unhanled type ${type} in userReducer`);
  }
};
