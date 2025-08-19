import React from 'react';

export default function Cart() {
  // This page will show cart items and checkout options
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {/* Render cart items and checkout button */}
      <p>Your cart is empty.</p>
    </div>
  );
}