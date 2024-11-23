import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { BASE_URL } from '../constants/constants.js';

const AddEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState(null);
  const [eventTime, setEventTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddEvent = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!title.trim() || !description.trim() || !eventDate || !eventTime) {
      alert('Please fill in all fields, select a date, and specify a time.');
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/api/events/create`, {
        title,
        description,
        date: eventDate,
        time: eventTime,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        alert('Event added successfully!');
        navigate('/listing');
      } else {
        alert('Failed to add event.');
      }
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Error adding the event.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-gray-900 p-10 flex flex-col items-center">
      <h2 className="text-5xl font-extrabold text-white mb-8 text-center">
        <span className="bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text">
          Schedule Your Event
        </span>
      </h2>
      
      <div className="bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-3xl">
        <form onSubmit={handleAddEvent} className="space-y-8">
          {/* Event Title */}
          <div className="relative">
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder=" "
              className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-pink-500"
              required
            />
            <label
              htmlFor="title"
              className="absolute top-2 left-4 text-gray-400 bg-gray-800 px-1 text-sm transition-all duration-300 transform -translate-y-4 scale-90">
              Event Title
            </label>
          </div>

          {/* Description */}
          <div className="relative">
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=" "
              rows="4"
              className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-pink-500"
              required
            />
            <label
              htmlFor="description"
              className="absolute top-2 left-4 text-gray-400 bg-gray-800 px-1 text-sm transition-all duration-300 transform -translate-y-4 scale-90">
              Event Description
            </label>
          </div>

          {/* Event Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Event Date
            </label>
            <Datetime
              value={eventDate}
              onChange={(date) => setEventDate(date)}
              dateFormat="YYYY-MM-DD"
              timeFormat={false}
              inputProps={{
                placeholder: 'Select event date',
                className:
                  'w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-pink-500',
              }}
            />
          </div>

          {/* Event Time */}
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Event Time
            </label>
            <Datetime
              value={eventTime}
              onChange={(time) => setEventTime(time)}
              dateFormat={false}
              timeFormat="HH:mm"
              inputProps={{
                placeholder: 'Select event time',
                className:
                  'w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-pink-500',
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-lg font-bold tracking-wide ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
            }`}
          >
            {isLoading ? 'Adding Event...' : 'Add Event'}
          </button>

          {/* Back to Listing Button */}
          <button
            type="button"
            onClick={() => navigate('/listing')}
            className="w-full py-4 mt-4 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-500 transition-all"
          >
            Back to Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
