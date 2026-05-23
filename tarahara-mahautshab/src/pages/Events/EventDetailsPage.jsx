import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventDetailsPage = ({ eventId }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/events/${eventId}`);
      if (response.data.success) {
        setEvent(response.data.data);
      }
    } catch (err) {
      setError('Failed to load event details');
      console.error('Error fetching event:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setRegistering(true);
      setRegistrationError(null);
      const token = localStorage.getItem('authToken');

      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.post(
        `/api/events/${eventId}/register`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data.success) {
        // Update the event's registered count
        setEvent({
          ...event,
          registered_count: event.registered_count + 1,
          remaining_slots: event.remaining_slots - 1,
        });
        // Navigate to dashboard
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setRegistrationError(err.response?.data?.message || 'Failed to register for event');
      }
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Loading event details...</div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-600">{error || 'Event not found'}</div>
      </div>
    );
  }

  const capacityPercentage = (event.registered_count / event.capacity) * 100;
  const eventDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image */}
      <div className="relative h-96 bg-gray-900">
        {event.image_url ? (
          <img
            src={event.image_url}
            alt={event.name}
            className="w-full h-full object-cover opacity-75"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600"></div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="container mx-auto px-4 pb-8 text-white">
            <h1 className="text-5xl font-bold mb-2">{event.name}</h1>
            <p className="text-xl opacity-90">{eventDate}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2">
            {/* Event Info Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  {event.time}
                </div>
                <div className="text-gray-600">Time</div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  {event.remaining_slots}
                </div>
                <div className="text-gray-600">Slots Available</div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  {event.registered_count}/{event.capacity}
                </div>
                <div className="text-gray-600">Registered</div>
              </div>
            </div>

            {/* Capacity Bar */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Capacity Status</h3>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-indigo-600 h-4 rounded-full transition-all"
                  style={{ width: `${capacityPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {capacityPercentage.toFixed(0)}% capacity filled
              </p>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h3 className="text-2xl font-bold mb-4">About This Event</h3>
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h3 className="text-2xl font-bold mb-4">📍 Location</h3>
              <p className="text-gray-700 mb-4">{event.location}</p>
              
              {event.latitude && event.longitude && (
                <>
                  <button
                    onClick={() => setShowMap(!showMap)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    {showMap ? 'Hide Map' : 'View on Map'}
                  </button>
                  
                  {showMap && (
                    <div className="mt-4">
                      <iframe
                        width="100%"
                        height="400"
                        style={{ border: 0, borderRadius: '8px' }}
                        loading="lazy"
                        allowFullScreen=""
                        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${event.latitude},${event.longitude}`}
                      ></iframe>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Agenda */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-2xl font-bold mb-4">📋 Agenda</h3>
                <div className="space-y-4">
                  {event.agenda.map((item, index) => (
                    <div key={index} className="border-l-4 border-indigo-600 pl-4">
                      <p className="font-semibold text-gray-900">{item.time}</p>
                      <p className="text-gray-700">{item.activity}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Registration Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
              <h3 className="text-2xl font-bold mb-4">Event Registration</h3>

              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-2">Event Status</div>
                {event.has_available_slots ? (
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    ✓ Open for Registration
                  </span>
                ) : (
                  <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    ✗ Sold Out
                  </span>
                )}
              </div>

              <div className="space-y-4 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{eventDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{event.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium text-right text-sm">{event.location}</span>
                </div>
              </div>

              {registrationError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-red-700 text-sm">
                  {registrationError}
                </div>
              )}

              {event.has_available_slots ? (
                <button
                  onClick={handleRegister}
                  disabled={registering}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition mb-3 disabled:bg-gray-400"
                >
                  {registering ? 'Registering...' : 'Register Now'}
                </button>
              ) : (
                <button disabled className="w-full bg-gray-400 text-white font-semibold py-3 rounded-lg cursor-not-allowed">
                  Registrations Closed
                </button>
              )}

              <button className="w-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-2 rounded-lg transition">
                Share Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
