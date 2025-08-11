import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    return (
        <div className='product-card'>
            <img src={product.image} 
            alt={product.title} 
            className='product-image' />
            <div className='product-info'>
                <h3 className='product-title'>{product.title}</h3>
                <p className='product-category'>{product.category}</p>
                <p className='product-description'>
                    {product.description.length > 100 
                        ? `${product.description.substring(0, 100)}...` 
                        : product.description}
                </p>
                <div className='product-rating'>
                    Rating: {product.rating.rate} ({product.rating.count} reviews)
                </div>
                <div className='product-footer'>
                    <span className='product-price'>${product.price}</span>
                    <button
                    onClick={handleAddToCart}
                    className='add-to-cart-btn'>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;