'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import toast from 'react-hot-toast'
import { useStateContext } from '@/context/StateContext'
import { urlFor } from '@/lib/client'
import getStripe from '@/lib/getStripe'

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, ToggleCartItemQuantity , onRemove } = useStateContext();
   
const handleCheckout = async()=> {
  try {
  const stripe = await getStripe();
  const response = await fetch('/api/stripe',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartItems),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create checkout session');
  }
  if(response.statusCode === 500) return;
  const { id } = await response.json();
  toast.loading('Redirecting...');

  const { error } = await stripe.redirectToCheckout({ sessionId: id });
  if (error) {
    toast.error(error.message);
    console.error('Stripe redirect error:', error);
  }
} catch (error) {
  toast.error(error.message);
  console.error('Checkout error:', error);
}
}

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button type='button' className='cart-heading' onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>
        
          {cartItems.length < 1 ? (
            <div className='empty-cart'>
              <AiOutlineShopping size={150} />
              <h3>Your cart is empty</h3>
              <Link href="/">
                <button className='btn' type='button' onClick={() => setShowCart(false)}>
                  Continue Shopping
                </button>
              </Link>
            </div>
          ) : (
            <>
            <div className='cart-content'>
            <div className='product-container'>
              {cartItems.map((item) => (
                <div className='product' key={item._id}>
                  {item.image?.[0] ? (
                    <img
                      src={urlFor(item.image[0]).url()}
                      className='cart-product-image'
                      alt={item.name}
                    />
                  ) : (
                    <div className='cart-product-image fallback-image'>
                      No Image
                    </div>
                  )}

                  <div className='item-desc'>
                    <div className='flex top'>
                      <h5>{item.name}</h5>
                      <h4>${item.price}</h4>
                    </div>
                    <div className='flex bottom'>
                      <div>
                        <p className='quantity-desc'>
                          <span className='minus' onClick={() => ToggleCartItemQuantity(item._id, 'desc')}>
                            <AiOutlineMinus />
                          </span>
                          <span className='num'>{item.quantity}</span>
                          <span className='plus' onClick={() => ToggleCartItemQuantity(item._id, 'inc')}>
                            <AiOutlinePlus />
                          </span>
                        </p>
                      </div>
                      <button type='button' className='remove-item' onClick={()=> onRemove(item)}>
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              </div>

          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button type="button" className='btn' onClick={handleCheckout}>
                Pay With Stripe
              </button>
            </div>
          </div>
          </div>
        </>
        )}
      </div>
    </div>
  )
}

export default Cart