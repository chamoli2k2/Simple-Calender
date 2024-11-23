import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Home = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Update the current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentDateTime.toLocaleString("en-US", {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      {/* Calendar Logo */}
      <div className="mb-6">
        <img src="/image3.png" alt="Calendar Logo" className="w-24 h-24" />
      </div>

      {/* Current Date & Time */}
      <div className="text-xl font-semibold mb-8">
        <p>{formattedDate}</p>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold leading-tight mb-4 text-white">Welcome to Meeting Scheduler</h1>
      <p className="text-lg mb-8">Your all-in-one solution for scheduling and managing meetings.</p>

      {/* Image */}
      <div className="mb-8">
        <img src="./image1.jpg" alt="Meeting Scheduler" className="w-48 h-48 object-cover rounded-md" />
      </div>

      {/* Call to Action Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
        <Link 
          to="/login" 
          className="px-8 py-3 bg-blue-600 text-xl text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:bg-blue-700"
        >
          Login
        </Link>
        <Link 
          to="/signup" 
          className="px-8 py-3 bg-green-600 text-xl text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:bg-green-700"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;
