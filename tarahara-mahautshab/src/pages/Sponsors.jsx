import React from 'react';

export default function Sponsors() {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Changed max-w-4xl to max-w-7xl to stretch content wider */}
      <div className="max-w-7xl mx-auto p-6 bg-white shadow rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">Our Valued Sponsors</h2>
        <p className="text-center text-gray-600 mb-10">
          We are immensely grateful to our partners whose generous support makes Tarahara Utsav possible. Their commitment to cultural preservation and community engagement is invaluable.
        </p>

        {/* Title Sponsors */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 flex items-center justify-center text-gray-800">
            <span className="mr-3 text-orange-500 text-3xl">🏅</span> Title Sponsors
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md w-48 h-28 flex flex-col justify-center items-center text-center">
              <p className="font-bold text-xl text-gray-800">City Cultural Foundation</p>
              <p className="text-sm text-gray-500">Leading cultural initiatives</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md w-48 h-28 flex flex-col justify-center items-center text-center">
              <p className="font-bold text-xl text-gray-800">Heritage Bank</p>
              <p className="text-sm text-gray-500">Supporting community arts</p>
            </div>
          </div>
        </div>

        {/* Gold Partners */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 flex items-center justify-center text-gray-800">
            <span className="mr-3 text-orange-500 text-3xl">✨</span> Gold Partners
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md w-36 h-20 flex justify-center items-center font-semibold text-gray-700">Lalit Arts</div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md w-36 h-20 flex justify-center items-center font-semibold text-gray-700">The Creative Hub</div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md w-36 h-20 flex justify-center items-center font-semibold text-gray-700">Global Connect</div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md w-36 h-20 flex justify-center items-center font-semibold text-gray-700">Artisan's Forge</div>
          </div>
        </div>

        {/* Supporting Partners */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 flex items-center justify-center text-gray-800">
            <span className="mr-3 text-orange-500 text-3xl">🤝</span> Supporting Partners
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm w-32 h-16 flex justify-center items-center text-sm font-medium text-gray-600">Community Gardens</div>
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm w-32 h-16 flex justify-center items-center text-sm font-medium text-gray-600">Local Eateries Guild</div>
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm w-32 h-16 flex justify-center items-center text-sm font-medium text-gray-600">Craftsmen's Collective</div>
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm w-32 h-16 flex justify-center items-center text-sm font-medium text-gray-600">Cultural Exchange Network</div>
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm w-32 h-16 flex justify-center items-center text-sm font-medium text-gray-600">Youth Arts Program</div>
          </div>
        </div>

        {/* Become a Partner Section */}
        <div className="bg-white p-8 rounded-lg shadow-md border border-orange-100">
          <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Become a Partner</h3>
          <p className="text-gray-600 mb-6 text-center">
            Align your brand with a vibrant cultural event and reach thousands of attendees. Partner with Tarahara Utsav to support arts, culture, and community development.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-orange-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-orange-700 transition-colors text-lg font-semibold">Explore Opportunities</button>
            <button className="border border-orange-600 text-orange-600 px-8 py-3 rounded-lg hover:bg-orange-50 transition-colors text-lg font-semibold">Download Brochure</button>
          </div>
        </div>
      </div>
    </div>
  );
}