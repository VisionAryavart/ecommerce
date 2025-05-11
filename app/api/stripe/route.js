import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { urlFor } from '@/lib/client'; // Make sure this is imported

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Cart Items:', body);
    
    if (!body?.length) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    const origin = req.headers.get('origin') || 'http://localhost:3000';

    const params = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [
        { shipping_rate: 'shr_1RM18hCMVihLOSQvDh6kmNjP' },
        { shipping_rate: 'shr_1RM1AqCMVihLOSQv0aQ4Eah2' }
      ],
      line_items: body.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: item.image ? [urlFor(item.image[0]).url()] : [],
          },
          unit_amount: Math.round(item.price * 100), // Ensure it's an integer
        },
        quantity: item.quantity,
      })),
      success_url: `${origin}/success`,
      cancel_url: `${origin}/canceled`,
      
    };

    const session = await stripe.checkout.sessions.create(params);
    return NextResponse.json({ id: session.id });
    
  } catch (err) {
    console.error('Stripe error:', err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}