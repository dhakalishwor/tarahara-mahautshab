import React from 'react';

export default function About() {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Changed max-w-3xl to max-w-7xl to stretch content wider */}
      <div className="max-w-7xl mx-auto p-6 bg-white shadow rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">About Tarahara Utsav</h2>
        
        <p className="text-gray-700 mb-4 leading-relaxed">
          Tarahara Utsav is more than just a festival; it's a vibrant celebration of our rich cultural heritage, a melting pot of traditions, arts, and community spirit. Held annually, our festival brings together people from all walks of life to experience the magic of our diverse culture.
        </p>
        <p className="text-gray-700 mb-6 leading-relaxed">
          From captivating music and dance performances to exquisite culinary delights, intricate arts and crafts, and engaging community events, Tarahara Utsav offers an immersive experience for everyone. We are dedicated to preserving and promoting our cultural identity, fostering creativity, and building a stronger, more connected community.
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">Our Mission</h3>
        <p className="text-gray-600 mb-8 text-center italic">
          "To celebrate, preserve, and promote the diverse cultural heritage of Tarahara through an annual festival that inspires, educates, and unites our community."
        </p>
        
        <div className="text-center">
          <span className="inline-block bg-orange-100 text-orange-600 px-6 py-3 rounded-full font-semibold text-lg shadow-sm">
            Discover. Celebrate. Connect.
          </span>
        </div>
      </div>
    </div>
  );
}