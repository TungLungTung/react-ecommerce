import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => {
  return state.categories;
};

export const selectCategories = createSelector(
  /// 2 arr, cai dau la input, cai sau la output
  [selectCategoryReducer],
  (categoriesSlice) => {
    /// Day la memorized
    return categoriesSlice.categories;
  }
);

//// Memorized for this, just re render if categories is changed
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    console.log('Selector Fired');

    return categories.reduce((acc, category) => {
      /// Category luc nay la data roi
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => {
    return categoriesSlice.isLoading;
  }
);
