import React from 'react';
import ProductList from './ProductList';

const Home = () => {
    return (
        <div className='home'>
            <header className='home-header'>
                <h1>Welcome to Our Store</h1>
                <p>Discover amazing products at great prices!</p>
            </header>
            <ProductList />
        </div>
    );
};

export default Home;