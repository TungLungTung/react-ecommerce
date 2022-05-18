import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CategoryPreview from '../../routes/categories-preview/categories-preview.component';
import Category from '../../routes/category/category.component';
import { CategoriesProvider } from '../../contexts/categories.context';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesAsync } from '../../store/categories/category.action';

import './shop.styles.scss';
const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
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
