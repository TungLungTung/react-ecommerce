import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getCurrentUser
} from './utils/firebase/firebase.utils';

import React from 'react';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import CheckOut from './routes/checkout/checkout.component';
import Shop from './routes/shop/shop.component';

import { checkUserSession } from './store/user/user.action';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());

    /// Wait to using observer in firebase
    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   // console.log(user);
    //   /// Only create user document if user come through
    //   if (user) {
    //     createUserDocumentFromAuth(user);
    //   }
    //   dispatch(setCurrentUser(user));
    // });
    // /// Protect return
    // /// Run unsubscribe when unmount - cai nay quan trong day
    // return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<CheckOut />} />
      </Route>
    </Routes>
  );
};

export default App;
