import { createSlice } from "@reduxjs/toolkit";

// Load cart from sessionStorage
const loadCartFromStorage = () => {
    try {
        const serializedCart = sessionStorage.getItem("cart");
        if (serializedCart === null) {
            return [];
        }
        return JSON.parse(serializedCart);
    } catch (err) {
        console.error("Could not load cart", err);
        return [];
    }
};

// Save cart to sessionStorage
const saveCartToStorage = (cart) => {
    try {
        const serializedCart = JSON.stringify(cart);
        sessionStorage.setItem('cart', serializedCart);
    } catch (err) {
        console.error("Could not save cart to sessionStorage", err);
    }
};

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: loadCartFromStorage(),
    },
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state.items[itemIndex].quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            saveCartToStorage(state.items);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
            saveCartToStorage(state.items);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === id);
            if (itemIndex >= 0 && quantity > 0) {
                state.items[itemIndex].quantity = quantity;
            }
            saveCartToStorage(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            saveCartToStorage(state.items);
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => 
    state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
export const selectCartItemCount = (state) => 
    state.cart.items.reduce((count, item) => count + item.quantity, 0);
export default cartSlice.reducer;