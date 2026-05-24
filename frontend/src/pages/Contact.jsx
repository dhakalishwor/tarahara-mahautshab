import React from 'react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-14 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}
        <div className="text-center mb-12">
          <span className="inline-block bg-primary text-gray-900 px-5 py-2 rounded-full text-sm font-bold shadow-sm">
            Contact Us
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900">
            Let’s Talk Food
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            Have a question about your order, delivery, restaurants, or feedback?
            We’re always happy to help.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <ContactCard
            icon="📍"
            title="Address"
            text="Foodmandu HQ, Kathmandu, Nepal"
          />

          <ContactCard
            icon="📞"
            title="Phone"
            text="+977 9767115286"
          />

          <ContactCard
            icon="✉️"
            title="Email"
            text="support@foodmandu.com"
          />

          <ContactCard
            icon="🕒"
            title="Hours"
            text="Mon - Sun: 8:00 AM - 10:00 PM"
          />
        </div>

        {/* Form Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-sm">
              🍔
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Send Us a Message
            </h2>

            <p className="text-gray-500 mt-3">
              Fill out the form and our team will respond soon.
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-gray-800 mb-2"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full h-12 rounded-xl bg-gray-50 border border-gray-200 px-4 text-gray-900 placeholder:text-gray-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-gray-800 mb-2"
                >
                  Your Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-12 rounded-xl bg-gray-50 border border-gray-200 px-4 text-gray-900 placeholder:text-gray-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-bold text-gray-800 mb-2"
              >
                Subject
              </label>

              <input
                id="subject"
                type="text"
                placeholder="Order issue, feedback, restaurant inquiry..."
                className="w-full h-12 rounded-xl bg-gray-50 border border-gray-200 px-4 text-gray-900 placeholder:text-gray-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-bold text-gray-800 mb-2"
              >
                Your Message
              </label>

              <textarea
                id="message"
                placeholder="Write your message here..."
                className="w-full h-40 resize-none rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg shadow-md hover:bg-gray-800 active:scale-[0.98] transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Extra Help Section */}
        <div className="mt-12 max-w-4xl mx-auto bg-primary text-gray-900 rounded-[2rem] p-8 text-center shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            Need urgent order support?
          </h3>

          <p className="text-gray-800 mt-3 font-medium">
            Call us directly at{' '}
            <span className="font-bold text-gray-900 bg-white/50 px-2 py-1 rounded">+977 9767115286</span> for
            faster help.
          </p>
        </div>

      </div>
    </div>
  );
}

function ContactCard({ icon, title, text }) {
  return (
    <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
      <div className="w-14 h-14 mx-auto mb-4 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-2xl">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {title}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed min-h-[40px] flex items-center justify-center">
        {text}
      </p>
    </div>
  );
}