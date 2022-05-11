import { createContext, useState, useEffect } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

// import { SHOP_DATA } from '../shop-data.js';

export const CategoriesContext = createContext({
  categoriesMap: {}
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  /// This code to update data to firestore 1 times,
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // });

  useEffect(() => {
    /// Khuc nay async nên khong dung truc tiep ben tren, phai viet ham
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);
      setCategoriesMap(categoryMap);
    };

    getCategoriesMap();
  }, []);

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
