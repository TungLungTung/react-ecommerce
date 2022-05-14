import { Routes, Route } from 'react-router-dom';
import CategoryPreview from '../../routes/categories-preview/categories-preview.component';
import Category from '../../routes/category/category.component';

import { CategoriesProvider } from '../../contexts/categories.context';

import './shop.styles.scss';
const Shop = () => {
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
