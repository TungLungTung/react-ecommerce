import { Link } from 'react-router-dom';
import './category-preview.styles.scss';

import { useSelector } from 'react-redux';

import {
  selectCategoriesMap,
  selectCategoriesIsLoading
} from '../../store/categories/category.selector';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

const CategoryPreview = ({ title, products }) => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <div className="category-preview-container">
      <h2>
        <Link className="title" to={title}>
          {title.toUpperCase()}
        </Link>
      </h2>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="preview">
          {products
            .filter((_, idx) => {
              return idx < 4;
            })
            .map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </div>
      )}
    </div>
  );
};

export default CategoryPreview;
