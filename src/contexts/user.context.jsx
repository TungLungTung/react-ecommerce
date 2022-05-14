import { createContext, useEffect, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth
} from '../utils/firebase/firebase.utils';

/// As the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
};

//// Reducers
//// Function to return object.
const userReducer = (state, action) => {
  /// Object we want to store
  /// state is current User.
  console.log(action);
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        /// Receive state obj from state and replace it
        ...state,
        currentUser: payload
      };
    default:
      throw new Error(`Unhanled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null
};

export const UserProvider = ({ children }) => {
  /// Reducers
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  console.log(currentUser);

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  // const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  // signOutUser();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      // console.log(user);

      /// Only create user document if user come through
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    /// Protect return
    /// Run unsubscribe when unmount - cai nay quan trong day
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
