import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/events');
      if (response.data.success) {
        setEvents(response.data.data);
      }
    } catch (err) {
      setError('Failed to load events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Our Events</h1>
        <p className="text-xl text-gray-600 mb-12">Discover and register for upcoming celebrations</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No events available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                {/* Event Image */}
                <div className="relative h-48 bg-gradient-to-r from-indigo-600 to-purple-600">
                  {event.image_url && (
                    <img
                      src={event.image_url}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {event.remaining_slots > 0 ? (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {event.remaining_slots} slots left
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Sold Out
                    </div>
                  )}
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4 text-sm text-gray-700">
                    <div className="flex items-center">
                      <span className="mr-2">📅</span>
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">🕐</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">📍</span>
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{
                          width: `${(event.registered_count / event.capacity) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {event.registered_count} / {event.capacity} registered
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition">
                      View Details
                    </button>
                    <button className="flex-1 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium py-2 rounded-lg transition">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventListPage;
