// app/product/[slug]/page.js
import { client, urlFor } from '@/lib/client';
import ProductDetailsClient from './ProductDetailsClient';

async function getProductData(slug) {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productQuery);

  return { product, products };
}

export default async function ProductDetailsPage({ params }) {
  const { slug } = params;
  const { product, products } = await getProductData(slug);

  return <ProductDetailsClient product={product} products={products} />;
}