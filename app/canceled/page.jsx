'use client';

import Link from 'next/link';

export default function Canceled() {
  return (
    <div className="canceled-wrapper">
      <div className="canceled">
        <h2>Payment Cancelled</h2>
        <p>Your payment was not completed.</p>
        <Link href="/">
          <button type="button" className="btn">Return Home</button>
        </Link>
      </div>
    </div>
  );
}
