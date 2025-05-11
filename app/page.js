// app/page.js
import React from 'react'
import { Product,HeroBanner,FooterBanner } from '@/components';
import { client } from '@/lib/client';


export default async function Home() {
  const query = '*[_type == "product"]';
// '*[_type = "product"]'; ,  “Fetch all documents from Sanity where the _type is 'product'.”
const products = await client.fetch(query);

const bannerQuery = '*[_type == "banner"]';
  const bannerdata = await client.fetch(bannerQuery);

  const productsByCategory = {
    'gym-equipment': products.filter(product => product.category === 'gym-equipment'),
    'protein': products.filter(product => product.category === 'protein'),
    'groceries': products.filter(product => product.category === 'groceries'),
    'accessories': products.filter(product => product.category === 'accessories')
  };

  return (
    <>
      <HeroBanner heroBanner={bannerdata[0]}/>
      {console.log(bannerdata)}
      <div className="products-heading">
        <h2>Featured Products</h2>
      </div>
      <div className='products-container'>
      {products.slice(0,4).map((product) => 
  <Product key={product._id} product={product} />
)}
      </div>
      {Object.entries(productsByCategory).map(([category, products]) => (
        products.length > 0 && (
          <div key={category} className="category-section">
            <div className="products-heading">
              <h2>{category.replace('-', ' ').toUpperCase()}</h2>
            </div>
            <div className='products-container'>
              {products.map((product) => 
                <Product key={product._id} product={product} />
              )}
            </div>
          </div>
        )
      ))}
      <FooterBanner footerBanner={bannerdata[0]}/>
    </>
  )
}


