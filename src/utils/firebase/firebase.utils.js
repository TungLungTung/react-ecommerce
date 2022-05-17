import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBOJ-FR4qFhrq-cUQVFY9IePbdN2ynVoxE',
  authDomain: 'ecommerce-db-3c471.firebaseapp.com',
  projectId: 'ecommerce-db-3c471',
  storageBucket: 'ecommerce-db-3c471.appspot.com',
  messagingSenderId: '953065707493',
  appId: '1:953065707493:web:baacf981910088f8e1c10c'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

/// Create provider configuration
// Give back google instance
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  propmt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => {
  return signInWithPopup(auth, googleProvider);
};

export const signInWithGoogleRedirect = () => {
  return signInWithRedirect(auth, googleProvider);
};

/// Create db. (db instance)
export const db = getFirestore();

/// Upload document to firestore
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field // Opption field, if want to add using object[field]
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  /// Loop data from shop_data.js
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('Done');
};

//// Get Categoies from firestore
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');

  /// Hoi phuc tap, ghi chu ne.
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

  /// Truoc day xu ly phuc tap o Firebase, tuy nhien gio chi can return data về cho selector xử lý
  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //   const { title, items } = docSnapshot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});

  // return categoryMap;
};

/// Take data from auth, store that in firestore collection
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  /// Create Snapshot
  const userSnapshot = await getDoc(userDocRef);
  /// Check if user data exists
  /// If user data does not exists
  // Create / set the document with data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('Error creating the user', error.message);
    }
  }

  return userDocRef;
};

/// Craete Auth user with email and Password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  /// Other way to create User document in firebase database
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  /// Other way to create User document in firebase database
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
