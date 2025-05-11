'use client'

import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai';
import  Cart  from './Cart';
import { useStateContext } from '@/context/StateContext';
// AiOutlineShopping is a React component that renders a shopping cart outline icon.

// 🔧 Usage Example:
// You can use it just like any React component:
// <AiOutlineShopping size={24} color="black" />
// This will render the shopping icon at 24px size in black.


const Navbar = () => {
  const {showCart , setShowCart , totalQuantities} = useStateContext();
  const categories = [
    { name: 'Gym Equipment', slug: 'gym-equipment' },
    { name: 'Protein', slug: 'protein' },
    { name: 'Groceries', slug: 'groceries' },
    { name: 'Accessories', slug: 'accessories' }
  ];
  return (
    <div className='navbar-container'>
      <p className='logo'>
      {/* In Next.js, you use the <Link> component instead of a regular <a> tag for navigation between pages  */}
        <Link href="/" >Dream Fit</Link>
      </p>
      <div className="category-nav">
        {categories.map(category => (
          <Link key={category.slug} href={`/#${category.slug}`}>
            {category.name}
          </Link>
        ))}
      </div>
      <button type='button' className='cart-icon' onClick={ ()=> setShowCart(true)} >
      <AiOutlineShopping/>
      <span className='cart-item-qty'>{totalQuantities}</span> 
      </button>
      {showCart && <Cart/>}
      </div>
  )
}

export default Navbar