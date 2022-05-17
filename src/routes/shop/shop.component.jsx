import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CategoryPreview from '../../routes/categories-preview/categories-preview.component';
import Category from '../../routes/category/category.component';
import { CategoriesProvider } from '../../contexts/categories.context';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategories } from '../../store/categories/category.action';

import './shop.styles.scss';
const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    /// Khuc nay async nên khong dung truc tiep ben tren, phai viet ham
    const getCategoriesMap = async () => {
      const categoryArray = await getCategoriesAndDocuments();
      // console.log(categoryArray);
      dispatch(setCategories(categoryArray));
    };

    getCategoriesMap();
  }, []);

  return (
    <CategoriesProvider>
      <Routes>
        <Route index element={<CategoryPreview />} />
        <Route path=":category" element={<Category />} />
      </Routes>
    </CategoriesProvider>
  );
};

export default Shop;
