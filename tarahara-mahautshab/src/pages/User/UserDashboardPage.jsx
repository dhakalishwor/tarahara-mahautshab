import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode.react';

export default function UserDashboardPage() {
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ name: '', phone: '' });
  const [updating, setUpdating] = useState(false);
  const [showQRCode, setShowQRCode] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get('/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.data.success) {
        setUser(response.data.data);
        setRegistrations(response.data.data.registrations || []);
        setEditData({
          name: response.data.data.name,
          phone: response.data.data.phone,
        });
      }
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load profile');
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const token = localStorage.getItem('authToken');
      
      const response = await axios.put('/api/user', editData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.data.success) {
        setUser({ ...user, ...response.data.data });
        setEditMode(false);
        setError(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleDownloadTicket = (registration) => {
    // This will be implemented to download ticket as PDF
    console.log('Download ticket:', registration.ticket_number);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="mb-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
                <p className="text-gray-600 text-sm mt-2">{user?.email}</p>
              </div>

              {!editMode ? (
                <div className="space-y-4">
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="text-gray-800 font-semibold">{user?.phone || 'Not provided'}</p>
                  </div>
                  <button
                    onClick={() => setEditMode(true)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Edit Profile
                  </button>
                </div>
              ) : (
                <form onSubmit={handleUpdateProfile} className="space-y-4 border-t pt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={updating}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
                    >
                      {updating ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Registrations List */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">My Registrations</h3>

            {registrations.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-600 text-lg mb-4">You haven't registered for any events yet</p>
                <button
                  onClick={() => navigate('/events')}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Browse Events
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {registrations.map((registration) => (
                  <div key={registration.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                    <div className="flex flex-col md:flex-row">
                      {/* Event Image */}
                      <div className="md:w-48 h-40 md:h-auto bg-gray-200 flex-shrink-0">
                        {registration.event.image_url ? (
                          <img
                            src={registration.event.image_url}
                            alt={registration.event.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white text-4xl font-bold">
                            {registration.event.name.charAt(0)}
                          </div>
                        )}
                      </div>

                      {/* Event Details */}
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xl font-bold text-gray-800 mb-2">
                            {registration.event.name}
                          </h4>
                          <div className="space-y-2 text-gray-600">
                            <p className="flex items-center gap-2">
                              <span>📅</span>
                              {new Date(registration.event.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                            <p className="flex items-center gap-2">
                              <span>⏰</span>
                              {registration.event.time}
                            </p>
                            <p className="flex items-center gap-2">
                              <span>📍</span>
                              {registration.event.location}
                            </p>
                          </div>
                        </div>

                        {/* Ticket Info */}
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-600">Ticket Number</p>
                              <p className="text-lg font-mono font-bold text-gray-800">
                                {registration.ticket_number}
                              </p>
                              <p className="text-sm text-gray-600 capitalize mt-1">
                                Status: <span className={`font-semibold ${
                                  registration.status === 'confirmed' ? 'text-green-600' :
                                  registration.status === 'pending' ? 'text-yellow-600' :
                                  registration.status === 'checked_in' ? 'text-blue-600' :
                                  'text-red-600'
                                }`}>
                                  {registration.status}
                                </span>
                              </p>
                            </div>

                            {/* QR Code Button */}
                            <button
                              onClick={() => setShowQRCode(showQRCode === registration.id ? null : registration.id)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                              {showQRCode === registration.id ? 'Hide QR' : 'Show QR'}
                            </button>
                          </div>

                          {/* QR Code Display */}
                          {showQRCode === registration.id && (
                            <div className="mt-4 pt-4 border-t flex flex-col items-center">
                              <QRCode
                                value={registration.ticket_number}
                                size={150}
                                level="H"
                                includeMargin={true}
                              />
                              <button
                                onClick={() => handleDownloadTicket(registration)}
                                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                              >
                                Download Ticket
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
