import React from 'react';

export default function Contact() {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full p-8 bg-white shadow rounded mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-orange-600">Send Us a Message</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Your Name</label>
              <input type="text" id="name" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Your Email</label>
              <input type="email" id="email"  className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Your Message</label>
              <textarea id="message"  className="w-full p-3 border border-gray-300 rounded-lg h-32" />
            </div>
            <button type="submit" className="w-full bg-orange-600 text-white p-3 rounded-lg shadow-md hover:bg-orange-700 transition-colors font-semibold text-lg">Send Message</button>
          </form>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6 text-orange-600">Contact Information</h2>
          <p><strong>Address:</strong> Tarahara City, Nepal</p>
          <p><strong>Phone:</strong> +977 9767115286</p>
          <p><strong>Email:</strong> info@taraharautsav.com</p>
          <p><strong>Hours:</strong> Mon - Fri: 9:00 AM - 5:00 PM</p>
        </div>
      </div>
    </div>
  );
}