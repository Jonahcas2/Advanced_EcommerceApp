import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '../store/cartSlice';

const Navbar = () => {
    const cartItemCount = useSelector(selectCartItemCount);

    return(
        <nav className='navbar'>
            <div className='nav-container'>
                <Link to='/' className='nav-logo'>
                    E-Commerce Store
                </Link>
                <div className='nav-menu'>
                    <Link to='/cart' className='nav-link'>
                        Cart ({cartItemCount})
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;