import React from 'react';

export default function Login() {
  return (
    <div className="max-w-3xl w-full p-6 bg-white shadow rounded mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form className="space-y-4">
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-orange-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
    
  );
}
