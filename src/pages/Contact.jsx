import React from 'react';

export default function Contact() {
  return (
    <div className="w-full min-h-screen bg-brown-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full p-8 bg-white shadow-2xl rounded-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 border-2 border-brown-200">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Send Us a Message</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Your Name</label>
              <input type="text" id="name" className="w-full p-3 border-2 border-brown-200 rounded-lg focus:outline-none focus:border-brown-600" />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Your Email</label>
              <input type="email" id="email"  className="w-full p-3 border-2 border-brown-200 rounded-lg focus:outline-none focus:border-brown-600" />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Your Message</label>
              <textarea id="message"  className="w-full p-3 border-2 border-brown-200 rounded-lg h-32 focus:outline-none focus:border-brown-600" />
            </div>
            <button type="submit" className="w-full bg-brown-700 text-white p-3 rounded-lg shadow-lg hover:bg-brown-800 transition font-semibold text-lg">Send Message</button>
          </form>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Contact Information</h2>
          <div className="space-y-4 text-gray-700">
            <p className="flex items-start">
              <span className="font-semibold mr-2">📍 Address:</span>
              <span>Food Delivery HQ, Kathmandu, Nepal</span>
            </p>
            <p className="flex items-start">
              <span className="font-semibold mr-2">📞 Phone:</span>
              <span>+977 9767115286</span>
            </p>
            <p className="flex items-start">
              <span className="font-semibold mr-2">✉️ Email:</span>
              <span>support@fooddelivery.com</span>
            </p>
            <p className="flex items-start">
              <span className="font-semibold mr-2">🕒 Hours:</span>
              <span>Mon - Sun: 8:00 AM - 10:00 PM</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}