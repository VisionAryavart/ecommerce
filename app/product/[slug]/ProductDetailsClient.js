"use client";

import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { urlFor } from '@/lib/client';
import { Product } from '@/components';
import { useStateContext } from '@/context/StateContext';

export default function ProductDetailsClient({ product, products }) {
  const [index, setIndex] = useState(0);
  const { image, name, details, price } = product;
  const {incQty, decQty, qty, onAdd, setShowCart} = useStateContext();

 const handleBuyNow = () => {
  onAdd(product,qty)
  setShowCart(true);
 }
  return (
      <div>
        <div className='product-detail-container'>
          <div>
            <div >
              <img src={urlFor(image && image[index]).url()} className='product-detail-image'/>
            </div>
            <div className='small-images-container'>
                   {image.map((item,i) => (
                   <img 
                   key={item._id || i}  // Prefer a unique ID if available
                   src={urlFor(item).url()} 
                   className={i === index ? 'small-image selected-image' : 'small-image'} 
                   onMouseEnter={() => setIndex(i)} 
                 />
                   ))}
                  </div>
          </div>
          <div className='product-detail-desc'>
            <h1>{name}</h1>
            <div className='reviews'>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
              <p>
                (20)
              </p>
            </div>
            <h4>Details</h4>
            <p>
              {details}
            </p>
            <p className='price'>
              ${price}
            </p>
            <div className='quantity'>
              <h3>Quantity</h3>
              <p className='quantity-desc'>
                <span className='minus' onClick={decQty}>
                  <AiOutlineMinus />
                </span>
                <span className='num'>
                  {qty}
                </span>
                <span className='plus' onClick={incQty}>
                  <AiOutlinePlus />
                </span>
              </p>
            </div>
            <div className='buttons'>
              <button type='button' className='add-to-cart' onClick = { ()=> onAdd(product,qty)} >
                Add to Cart
              </button>
              <button type='button' className='buy-now' onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
  
        </div>
        <div className='maylike-products-wrapper'>
          <h2> You may also like</h2>
          <div className='marquee'>
            <div className='maylike-products-container track'>
                {products.map((item) => (<Product key = {item._id} product = {item}
                />
                 ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  
  
  
  