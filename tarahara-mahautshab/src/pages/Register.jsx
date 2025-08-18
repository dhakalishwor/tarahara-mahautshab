import React from 'react';
export default function Register() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      {/* Change max-w-md to w-full to stretch full width */}
      <div className="w-full p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
          <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
          <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Register</button>
        </form>
      </div>
    </div>
  );
}