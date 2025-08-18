import React from 'react';

export default function Contact() {
  return (
    <div className="h-full w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-8"> {/* Added horizontal padding back */}
      <div className="w-full p-8 bg-white shadow rounded grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-orange-600">Send Us a Message</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Your Email</label>
              <input
                type="email"
                id="email"
                placeholder="john.doe@example.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                placeholder="Subject"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Your Message</label>
              <textarea
                id="message"
                placeholder="How can we help you?"
                className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-600 text-white p-3 rounded-lg shadow-md hover:bg-orange-700 transition-colors font-semibold text-lg"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-orange-600">Contact Information</h2>
          <div className="space-y-6 text-gray-700">
            <p className="flex items-center text-lg">
              <span className="mr-3 text-orange-500 text-2xl">📍</span>
              <strong>Address:</strong> 123 Cultural Lane, Tarahara City, Nepal
            </p>
            <p className="flex items-center text-lg">
              <span className="mr-3 text-orange-500 text-2xl">📞</span>
              <strong>Phone:</strong> +977 123 456 7890
            </p>
            <p className="flex items-center text-lg">
              <span className="mr-3 text-orange-500 text-2xl">📧</span>
              <strong>Email:</strong> <a href="mailto:info@taraharautsav.com" className="text-orange-600 hover:underline">info@taraharautsav.com</a>
            </p>
            <p className="flex items-center text-lg">
              <span className="mr-3 text-orange-500 text-2xl">⏰</span>
              <strong>Hours:</strong> Mon - Fri: 9:00 AM - 5:00 PM
            </p>
            <p className="flex items-center text-lg">
              <span className="mr-3 text-orange-500 text-2xl">🌐</span>
              <strong>Website:</strong> <a href="https://www.taraharautsav.com" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">www.taraharautsav.com</a>
            </p>
            <p className="flex items-center text-lg">
              <span className="mr-3 text-orange-500 text-2xl">📱</span>
              <strong>Social Media:</strong> 
              <a href="https://facebook.com/taraharautsav" target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline">Facebook</a>,
              <a href="https://twitter.com/taraharautsav" target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-400 hover:underline">Twitter</a>,
              <a href="https://instagram.com/taraharautsav" target="_blank" rel="noopener noreferrer" className="ml-2 text-pink-600 hover:underline">Instagram</a>
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Find Us on the Map</h3>
            <div className="bg-gray-200 h-64 w-full rounded-lg flex items-center justify-center text-gray-500 text-center">
              [Google Maps Embed Placeholder]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}