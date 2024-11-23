import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants/constants.js';

const Listing = () => {
  const [events, setEvents] = useState([]); // List of events
  const [searchQuery, setSearchQuery] = useState(''); // Search query
  const [filteredEvents, setFilteredEvents] = useState([]); // Filtered events
  const [isLoading, setIsLoading] = useState(false); // For search loading state
  const navigate = useNavigate();

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`${BASE_URL}/api/events/get-all-events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      setEvents(response.data);
      setFilteredEvents(response.data.events); // Initialize filtered events
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return; // Avoid empty searches
    setIsLoading(true); // Start loading
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/api/events/search`, {
        params: { query: searchQuery },
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setFilteredEvents(response.data.events); // Update filtered events
    } catch (error) {
      console.error('Error searching events:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };


  // Navigate to event creation form
  const handleAddEvent = () => {
    navigate('/add-event');
  };

  // Handle logout
  const handleLogout = async() => {
    
    const response = await axios.post(`${BASE_URL}/api/users/logout`, {
      refreshToken: localStorage.getItem('refreshToken')
    });

    if(response.status === 200){
      localStorage.removeItem('token'); // Clear the token
      localStorage.removeItem('refreshToken'); // Clear the refresh token
      alert('Logged out successfully');
      navigate('/'); // Redirect to home or login page
    }
    else{
      alert('Failed to logout');
    }
  };

  useEffect(() => {
    fetchEvents(); // Fetch events on component mount
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-white">Scheduled Meetings</h2>
        <div className="flex space-x-4">
          <button
            onClick={handleAddEvent}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          >
            Add New Event
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search meetings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/3 p-3 bg-gray-700 border border-gray-600 rounded-l-lg focus:outline-none"
        />
        <button
          type="submit"
          className="p-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-r-lg flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M4 12a8 8 0 1 1 16 0" />
            </svg>
          ) : (
            'Search'
          )}
        </button>
      </form>

      {/* Event Listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Link
              to={`/event/${event._id}`}
              key={event._id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition transform hover:scale-105"
            >
              <div className="mt-4">
                <h3 className="text-2xl font-bold">{event.title}</h3>
                <p className="text-gray-400">
                  Date: {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-gray-400">Time: {event.time}</p>
                <p className="text-gray-500">{event.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No meetings scheduled</p>
        )}
      </div>
    </div>
  );
};

export default Listing;
