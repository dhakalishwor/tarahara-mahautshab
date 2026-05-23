import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import QRCode from 'qrcode.react';
import html2pdf from 'html2pdf.js';

export default function TicketConfirmationPage() {
  const { ticketNumber } = useParams();
  const [registration, setRegistration] = useState(null);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkingIn, setCheckingIn] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [downloadTimeout, setDownloadTimeout] = useState(false);
  const navigate = useNavigate();
  const qrRef = React.useRef();
  const ticketRef = React.useRef();

  useEffect(() => {
    fetchTicketDetails();
  }, [ticketNumber]);

  const fetchTicketDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');

      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get(`/api/ticket/${ticketNumber}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.data.success) {
        const data = response.data.data;
        setRegistration(data.registration);
        setEvent(data.event);
        setCheckedIn(data.registration.status === 'checked_in');
      }
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load ticket details');
      if (err.response?.status === 401) {
        navigate('/login');
      } else if (err.response?.status === 404) {
        setError('Ticket not found');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      setCheckingIn(true);
      const token = localStorage.getItem('authToken');

      const response = await axios.post(
        `/api/ticket/${ticketNumber}/check-in`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data.success) {
        setCheckedIn(true);
        setRegistration({ ...registration, status: 'checked_in' });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to check in');
    } finally {
      setCheckingIn(false);
    }
  };

  const handleDownloadTicket = async () => {
    try {
      setDownloadTimeout(true);
      const element = ticketRef.current;
      const opt = {
        margin: 10,
        filename: `ticket-${ticketNumber}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
      };
      html2pdf().set(opt).from(element).save();

      setTimeout(() => {
        setDownloadTimeout(false);
      }, 2000);
    } catch (err) {
      console.error('Error downloading ticket:', err);
      setError('Failed to download ticket');
      setDownloadTimeout(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your ticket...</p>
        </div>
      </div>
    );
  }

  if (error && !registration) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={() => navigate('/events')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Browse Events
          </button>
        </div>
      </div>
    );
  }

  if (!registration || !event) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No ticket found</p>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Message */}
        {checkedIn && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 text-center">
            ✓ You have successfully checked in!
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        {/* Ticket Card */}
        <div ref={ticketRef} className="bg-white rounded-lg shadow-xl overflow-hidden mb-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
            <h1 className="text-4xl font-bold mb-2">Event Ticket</h1>
            <p className="text-purple-100">Your confirmation receipt</p>
          </div>

          {/* Event Image */}
          <div className="h-48 bg-gray-200 overflow-hidden">
            {event.image_url ? (
              <img
                src={event.image_url}
                alt={event.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white text-6xl font-bold">
                {event.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Event Details */}
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{event.name}</h2>

            {/* Event Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b">
              <div>
                <p className="text-sm text-gray-600 mb-1">📅 Date</p>
                <p className="text-lg font-semibold text-gray-800">{eventDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">⏰ Time</p>
                <p className="text-lg font-semibold text-gray-800">{event.time}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600 mb-1">📍 Location</p>
                <p className="text-lg font-semibold text-gray-800">{event.location}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 pb-8 border-b">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Event Description</h3>
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
            </div>

            {/* Ticket Information */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Ticket Number</p>
                  <p className="text-2xl font-mono font-bold text-purple-600 break-all">
                    {registration.ticket_number}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Registration Status</p>
                  <div className="flex items-center gap-2">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      checkedIn
                        ? 'bg-blue-100 text-blue-800'
                        : registration.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {checkedIn ? '✓ Checked In' : registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="flex flex-col items-center mb-8 pb-8 border-b">
              <p className="text-sm text-gray-600 mb-4">Scan this QR code at the event</p>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <QRCode
                  ref={qrRef}
                  value={registration.ticket_number}
                  size={200}
                  level="H"
                  includeMargin={true}
                  renderAs="canvas"
                />
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-blue-800">
                <strong>📌 Important:</strong> Please present this ticket at the event entrance. You can either show the QR code on your phone or print this ticket.
              </p>
            </div>

            {/* Additional Event Info */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Event Agenda</h3>
                <div className="space-y-3">
                  {event.agenda.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-16 font-semibold text-purple-600">
                        {item.time}
                      </div>
                      <div className="flex-1 text-gray-700">
                        {item.activity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-100 px-8 py-4 text-center text-sm text-gray-600">
            <p>Issued on {new Date().toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {!checkedIn ? (
            <button
              onClick={handleCheckIn}
              disabled={checkingIn}
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {checkingIn ? 'Checking In...' : '✓ Check In'}
            </button>
          ) : (
            <div className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg text-center">
              ✓ Already Checked In
            </div>
          )}

          <button
            onClick={handleDownloadTicket}
            disabled={downloadTimeout}
            className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
          >
            {downloadTimeout ? 'Downloaded!' : '📥 Download Ticket (PDF)'}
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
