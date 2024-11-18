import { createContext, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { calculatePricing } from '../utils/cartUtils';

const CartContext = createContext();

const initialState = {
  items: [],
  pricing: {
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  },
};

export const CartProvider = ({ children }) => {
  const [state, setState] = useLocalStorageState(initialState, 'shopping-cart');

  const dispatch = (action) => {
    switch (action.type) {
      case 'ADD_TO_CART': {
        const existingItem = state.items.find(
          (item) => item._id === action.payload._id
        );

        if (existingItem) {
          const updatedItems = state.items.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          );
          toast.success('Added one more to cart', {
            id: `add-to-cart-${action.payload._id}`,
          });
          setState({
            items: updatedItems,
            pricing: calculatePricing(updatedItems),
          });
          return;
        }

        const updatedItems = [
          ...state.items,
          { ...action.payload, quantity: action.payload.quantity },
        ];
        toast.success('Added to cart', {
          id: `add-to-cart-${action.payload._id}`,
        });
        setState({
          items: updatedItems,
          pricing: calculatePricing(updatedItems),
        });
        return;
      }

      case 'REMOVE_FROM_CART': {
        const updatedItems = state.items.filter(
          (item) => item._id !== action.payload.id
        );
        toast.success('Removed from cart', {
          id: `remove-from-cart-${action.payload.id}`,
        });
        setState({
          items: updatedItems,
          pricing: calculatePricing(updatedItems),
        });
        return;
      }

      case 'UPDATE_QUANTITY': {
        // if quantity is less than or equal to 0, remove the item
        if (action.payload.quantity <= 0) {
          const updatedItems = state.items.filter(
            (item) => item._id !== action.payload._id
          );
          setState({
            items: updatedItems,
            pricing: calculatePricing(updatedItems),
          });
          return;
        }

        const updatedItems = state.items.map((item) =>
          item._id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        );

        setState({
          items: updatedItems,
          pricing: calculatePricing(updatedItems),
        });

        return;
      }

      case 'CLEAR_CART': {
        setState(initialState);
        toast.success('Cart cleared');
        return;
      }
    }
  };

  return (
    <CartContext.Provider value={{ cart: state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
