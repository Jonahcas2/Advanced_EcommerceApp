import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts, fetchProductsByCategory } from '../services/api';
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';

const ProductList = () => {
    const [selectedCategory, setSelectedCategory] = useState('');

    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products', selectedCategory],
        queryFn: () => selectedCategory
            ? fetchProductsByCategory(selectedCategory)
            : fetchAllProducts(),
    });

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    if (isLoading) return <div className="loading">Loading products...</div>;
    if (error) return <div className="error">Error loading products</div>;

    return (
        <div className='product-list-container'>
            <CategoryFilter
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategoryChange} />
            <div className='products-grid'>
                {products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;