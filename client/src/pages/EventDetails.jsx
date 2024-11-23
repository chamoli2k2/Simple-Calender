import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { BASE_URL } from '../constants/constants.js';

const EventDetails = () => {
  const { id } = useParams(); // Get event ID from URL params
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/api/events/get-event/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEvent(response.data.event);
        setUpdatedEvent(response.data.event);
      } catch (error) {
        console.error('Error fetching event:', error);
        alert('Failed to fetch event details.');
      }
    };
    fetchEvent();
  }, [id]);

  // Handle Update
  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${BASE_URL}/api/events/update/${id}`, updatedEvent, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      if (response.status === 200) {
        alert('Event updated successfully!');
        setEvent(response.data.event);
        setIsEditing(false);
      } else {
        alert('Failed to update event.');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update the event.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${BASE_URL}/api/events/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        if (response.status === 200) {
          alert('Event deleted successfully!');
          navigate('/listing'); // Redirect to events listing page
        } else {
          alert('Failed to delete event.');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete the event.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!event) return <p className="text-center text-white">Loading event details...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-5xl font-bold text-center mb-8">Event Details</h1>
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-md space-y-6">
        {isEditing ? (
          <>
            {/* Edit Form */}
            <div>
              <label className="block text-lg font-semibold mb-2">Event Title</label>
              <input
                type="text"
                value={updatedEvent.title || ''}
                onChange={(e) =>
                  setUpdatedEvent((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">Event Description</label>
              <textarea
                value={updatedEvent.description || ''}
                onChange={(e) =>
                  setUpdatedEvent((prev) => ({ ...prev, description: e.target.value }))
                }
                rows="4"
                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded"
              ></textarea>
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">Event Date</label>
              <Datetime
                value={updatedEvent.date}
                onChange={(date) =>
                  setUpdatedEvent((prev) => ({ ...prev, date: date }))
                }
                dateFormat="YYYY-MM-DD"
                timeFormat={false}
                inputProps={{
                  className: 'w-full p-3 bg-gray-700 text-white border border-gray-600 rounded',
                }}
              />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">Event Time</label>
              <Datetime
                value={updatedEvent.time}
                onChange={(time) =>
                  setUpdatedEvent((prev) => ({ ...prev, time: time }))
                }
                dateFormat={false}
                timeFormat="HH:mm"
                inputProps={{
                  className: 'w-full p-3 bg-gray-700 text-white border border-gray-600 rounded',
                }}
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className={`p-3 bg-green-600 text-white rounded font-semibold ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                }`}
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Save Changes'}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="p-3 bg-gray-600 text-white rounded font-semibold hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Event Details */}
            <h2 className="text-3xl font-bold">{event.title}</h2>
            <p className="text-lg">{event.description}</p>
            <p className="text-lg">
              <span className="font-bold">Date:</span> {event.date}
            </p>
            <p className="text-lg">
              <span className="font-bold">Time:</span> {event.time}
            </p>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="p-3 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
              >
                Edit Event
              </button>
              <button
                onClick={handleDelete}
                className="p-3 bg-red-600 text-white rounded font-semibold hover:bg-red-700"
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Delete Event'}
              </button>
              <button
                onClick={() => navigate('/listing')} // Navigate back to the listing page
                className="p-3 bg-gray-600 text-white rounded font-semibold hover:bg-gray-700"
              >
                Go Back to Listing
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
