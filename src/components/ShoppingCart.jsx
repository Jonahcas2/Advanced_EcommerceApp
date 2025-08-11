import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal, selectCartItemCount,
  removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';

const ShoppingCart = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const cartItemCount = useSelector(selectCartItemCount);
    const dispatch = useDispatch();

    const handleRemoveItem = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity > 0) {
            dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
        }
    };

    const handleCheckout = () => {
        if (cartItems.length > 0) {
            dispatch(clearCart());
            alert('Thank you for your purchase! Your order has been placed.');
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className='cart-container'>
                <h2>Your Shopping Cart</h2>
                <p>Your cart is empty. <a href="/">Continue shopping</a></p>
            </div>
        );
    }

    return (
        <div className='cart-container'>
            <h2>Your Shopping Cart</h2>
            <div className='cart-summary'>
                <p>Total Items: {cartItemCount}</p>
                <p>Total Price: ${cartTotal.toFixed(2)}</p>
            </div>

            <div className='cart-items'>
                {cartItems.map(item => (
                    <div key={item.id} className='cart-item'>
                        <img src={item.image} alt={item.title}
                        className='cart-item-image' />
                        <div className='cart-item-details'>
                            <h3>{item.title}</h3>
                            <p>Price: ${item.price}</p>
                            <div className='quantity-controls'>
                                <button 
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}>-</button>
                                <span>Quantity: {item.quantity}</span>
                                <button 
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                            </div>
                            <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                            <button onClick={() => handleRemoveItem(item.id)}
                                className='remove-btn'>Remove from Cart</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className='checkout-section'>
                <button onClick={handleCheckout} className='checkout-btn'>
                    Checkout - ${cartTotal.toFixed(2)}
                </button>
            </div>
        </div>
    );
};

export default ShoppingCart;