import React from 'react';

const restaurants = [
  { name: "Pizza Palace", cuisine: "Italian", address: "Kathmandu, Nepal" },
  { name: "Sushi World", cuisine: "Japanese", address: "Lalitpur, Nepal" },
  { name: "Burger Hub", cuisine: "American", address: "Bhaktapur, Nepal" },
];

export default function Restaurant() {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-orange-600">Restaurants</h2>
        <ul className="space-y-6">
          {restaurants.map((r, idx) => (
            <li key={idx} className="bg-white p-6 rounded shadow flex flex-col">
              <span className="text-xl font-semibold">{r.name}</span>
              <span className="text-gray-600">{r.cuisine}</span>
              <span className="text-gray-500">{r.address}</span>
              <a href={`/restaurant/${idx}`} className="mt-2 text-orange-600 hover:underline">View Menu</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}