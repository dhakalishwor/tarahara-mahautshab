import React from 'react';

export default function Home() {
  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl font-bold text-orange-600 mb-4">Tarahara Utsav</h1>
            <p className="text-lg text-gray-700 mb-6">
              Experience the vibrant colors, rich traditions, and cultural heritage of our community at the most spectacular cultural event of the year.
            </p>
            <div className="space-y-2 md:space-y-0 md:space-x-4 mb-6">
              <p className="flex items-center justify-center md:justify-start text-gray-600"><span className="mr-2 text-orange-500">🗓️</span> December 10-15, 2024</p>
              <p className="flex items-center justify-center md:justify-start text-gray-600"><span className="mr-2 text-orange-500">📍</span> Central City Park, Downtown</p>
              <p className="flex items-center justify-center md:justify-start text-gray-600"><span className="mr-2 text-orange-500">⏰</span> 10:00 AM - 10:00 PM Daily</p>
            </div>
            <div className="flex justify-center md:justify-start space-x-4">
              <button className="bg-orange-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-700 transition-colors">Get Tickets</button>
              <button className="border border-orange-600 text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors">View Program</button>
            </div>
          </div>
          {/* Right Image/Graphic */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            {/* Placeholder for the cultural celebrations graphic */}
            <div className="bg-gradient-to-br from-blue-400 to-purple-600 p-8 rounded-xl shadow-lg text-white text-center transform rotate-3">
              <h3 className="text-2xl font-bold mb-4">Cultural Celebrations</h3>
              <p className="mb-6">Join us for three days of music, dance, food, and traditions.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <p className="text-3xl font-bold">50+</p>
                  <p className="text-sm">Cultural Groups</p>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <p className="text-3xl font-bold">100+</p>
                  <p className="text-sm">Food Stalls</p>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <p className="text-3xl font-bold">25+</p>
                  <p className="text-sm">Workshops</p>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <p className="text-3xl font-bold">15+</p>
                  <p className="text-sm">Live Performances</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Festival Categories Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Festival Categories</h2>
          <p className="text-center text-gray-600 mb-10">
            Explore diverse multicultural experiences across multiple categories, each offering unique traditions and celebrations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Music & Dance */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <span className="text-purple-500 text-2xl">🎶</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Music & Dance</h3>
                <p className="text-gray-600 text-sm mb-2">Traditional and contemporary performances from local artists and cultural groups.</p>
                <a href="#" className="text-orange-600 text-sm font-medium hover:underline">Learn More →</a>
              </div>
            </div>
            {/* Food Festival */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <span className="text-orange-500 text-2xl">🍔</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Food Festival</h3>
                <p className="text-gray-600 text-sm mb-2">Authentic cuisines from different regions and traditional cooking demonstrations.</p>
                <a href="#" className="text-orange-600 text-sm font-medium hover:underline">Learn More →</a>
              </div>
            </div>
            {/* Arts & Crafts */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-blue-500 text-2xl">🎨</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Arts & Crafts</h3>
                <p className="text-gray-600 text-sm mb-2">Handmade crafts, paintings, sculptures, and interactive art workshops.</p>
                <a href="#" className="text-orange-600 text-sm font-medium hover:underline">Learn More →</a>
              </div>
            </div>
            {/* Fashion & Textiles */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <span className="text-green-500 text-2xl">👗</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Fashion & Textiles</h3>
                <p className="text-gray-600 text-sm mb-2">Traditional and contemporary fashion shows and textile arts.</p>
                <a href="#" className="text-orange-600 text-sm font-medium hover:underline">Learn More →</a>
              </div>
            </div>
            {/* Competitions */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <span className="text-yellow-500 text-2xl">🏆</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Competitions</h3>
                <p className="text-gray-600 text-sm mb-2">Cultural competitions, talent shows, and traditional games.</p>
                <a href="#" className="text-orange-600 text-sm font-medium hover:underline">Learn More →</a>
              </div>
            </div>
            {/* Community Events */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <span className="text-indigo-500 text-2xl">🤝</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Community Events</h3>
                <p className="text-gray-600 text-sm mb-2">Family activities, cultural workshops, and community gatherings.</p>
                <a href="#" className="text-orange-600 text-sm font-medium hover:underline">Learn More →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Highlights Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Event Highlights</h2>
          <p className="text-center text-gray-600 mb-10">
            Don't miss these spectacular performances and exhibitions that showcase the best of our cultural heritage.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Grand Opening Ceremony */}
            <div className="bg-gradient-to-br from-orange-400 to-red-500 p-6 rounded-lg shadow-md text-white">
              <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full mb-4">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Grand Opening Ceremony</h3>
              <p className="text-sm mb-4">Join us for a spectacular opening ceremony featuring traditional dances, music performances, and cultural presentations from esteemed artists.</p>
              <p className="flex items-center text-sm"><span className="mr-2">🗓️</span> November 10, 10:00 AM</p>
            </div>
            {/* Cultural Parade */}
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-6 rounded-lg shadow-md text-white">
              <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full mb-4">
                <span className="text-3xl">🏳️</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Cultural Parade</h3>
              <p className="text-sm mb-4">Experience a charismatic showcasing traditional costumes, folk dances, and cultural floats, representing different regions and communities.</p>
              <p className="flex items-center text-sm"><span className="mr-2">🗓️</span> November 12, 3:00 PM</p>
            </div>
            {/* Master Chef Competition */}
            <div className="bg-gradient-to-br from-green-400 to-teal-500 p-6 rounded-lg shadow-md text-white">
              <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full mb-4">
                <span className="text-3xl">👨‍🍳</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Master Chef Competition</h3>
              <p className="text-sm mb-4">Watch renowned chefs compete in preparing traditional delicacies, judged by a panel of culinary experts for visitors.</p>
              <p className="flex items-center text-sm"><span className="mr-2">🗓️</span> November 13, 1:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Sponsors</h2>
          <p className="text-gray-600 mb-10">
            We are grateful to our partners who make Tarahara Utsav possible through their generous support and commitment to cultural preservation.
          </p>

          {/* Title Sponsors */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-6 flex items-center justify-center text-gray-700">
              <span className="mr-2 text-orange-500">🏅</span> Title Sponsors
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-white p-4 rounded-lg shadow-md w-40 h-20 flex flex-col justify-center items-center">
                <p className="font-bold text-lg">CCF</p>
                <p className="text-xs text-gray-500">City Cultural Foundation</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md w-40 h-20 flex flex-col justify-center items-center">
                <p className="font-bold text-lg">HB</p>
                <p className="text-xs text-gray-500">Heritage Bank</p>
              </div>
            </div>
          </div>

          {/* Gold Partners */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-6 flex items-center justify-center text-gray-700">
              <span className="mr-2 text-orange-500">✨</span> Gold Partners
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-white p-4 rounded-lg shadow-md w-32 h-16 flex justify-center items-center">LAC</div>
              <div className="bg-white p-4 rounded-lg shadow-md w-32 h-16 flex justify-center items-center">TCE</div>
              <div className="bg-white p-4 rounded-lg shadow-md w-32 h-16 flex justify-center items-center">CR</div>
              <div className="bg-white p-4 rounded-lg shadow-md w-32 h-16 flex justify-center items-center">AF</div>
            </div>
          </div>

          {/* Supporting Partners */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-6 flex items-center justify-center text-gray-700">
              <span className="mr-2 text-orange-500">🤝</span> Supporting Partners
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-white p-4 rounded-lg shadow-md w-28 h-14 flex justify-center items-center">GCM</div>
              <div className="bg-white p-4 rounded-lg shadow-md w-28 h-14 flex justify-center items-center">TN</div>
              <div className="bg-white p-4 rounded-lg shadow-md w-28 h-14 flex justify-center items-center">LM</div>
              <div className="bg-white p-4 rounded-lg shadow-md w-28 h-14 flex justify-center items-center">SS</div>
              <div className="bg-white p-4 rounded-lg shadow-md w-28 h-14 flex justify-center items-center">DC</div>
            </div>
          </div>

          {/* Become a Partner */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Become a Partner</h3>
            <p className="text-gray-600 mb-6">
              Join us in celebrating cultural heritage and community spirit. Partner with Tarahara Utsav to reach thousands of visitors and support local culture.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-orange-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-700 transition-colors">Partnership Opportunities</button>
              <button className="border border-orange-600 text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors">Download Brochure</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
