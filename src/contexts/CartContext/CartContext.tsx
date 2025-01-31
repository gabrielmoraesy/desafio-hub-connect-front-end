/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    totalPrice: number;
    totalQuantity: number;
}

interface CartContextType {
    items: CartItem[];
    totalPrice: number;
    totalQuantity: number;
    addItem: (item: CartItem) => void;
    removeItem: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialState: CartState = {
    items: [],
    totalPrice: 0,
    totalQuantity: 0
};

const calculateTotal = (items: CartItem[]) => {
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    return { totalPrice, totalQuantity };
};

const cartReducer = (state: CartState, action: any): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            let updatedItems;

            if (existingItemIndex >= 0) {
                updatedItems = state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + action.payload.quantity }
                        : item
                );
            } else {
                updatedItems = [...state.items, action.payload];
            }

            const { totalPrice, totalQuantity } = calculateTotal(updatedItems);
            return { ...state, items: updatedItems, totalPrice, totalQuantity };
        }
        case 'REMOVE_ITEM': {
            const updatedItems = state.items.filter(item => item.id !== action.payload);
            const { totalPrice, totalQuantity } = calculateTotal(updatedItems);
            return { ...state, items: updatedItems, totalPrice, totalQuantity };
        }
        case 'UPDATE_QUANTITY': {
            const updatedItems = state.items.map(item =>
                item.id === action.payload.id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
            const { totalPrice, totalQuantity } = calculateTotal(updatedItems);
            return { ...state, items: updatedItems, totalPrice, totalQuantity };
        }
        case 'CLEAR_CART':
            return initialState;
        default:
            return state;
    }
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
        const persistedCart = localStorage.getItem('cart');
        return persistedCart ? JSON.parse(persistedCart) : initial;
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state));
    }, [state]);

    const addItem = (item: CartItem) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
    };

    const removeItem = (itemId: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: itemId });
    };

    const updateQuantity = (itemId: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    console.log("items", state.items)

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                totalPrice: state.totalPrice,
                totalQuantity: state.totalQuantity,
                addItem,
                removeItem,
                updateQuantity,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
