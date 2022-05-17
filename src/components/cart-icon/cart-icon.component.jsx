import { useDispatch, useSelector } from 'react-redux';
// import { useContext } from 'react';
// import './cart-icon.styles.scss';

import {
  selectCartCount,
  selectIsCartOpen
} from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

import {
  ShoppingIcon,
  CartIconContainer,
  ItemCount
} from './cart-icon.styles.jsx';

// import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
  // const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const dispatch = useDispatch();

  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  const toggleCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
  return (
    <CartIconContainer onClick={toggleCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
