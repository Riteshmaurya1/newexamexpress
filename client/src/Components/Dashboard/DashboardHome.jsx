import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets';
import gsap from 'gsap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { Helmet } from 'react-helmet';

const DashboardHome = () => {
  const { backendUrl } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState({
    totalSubjects: 0,
    totalUsers: 0,
    timeSpent: 0,
    pageViews: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Mock data for charts (replace with actual data from your backend)
  const chartData = [
    { name: 'Jan', subjects: 40, users: 24, timeSpent: 10, pageViews: 100 },
    { name: 'Feb', subjects: 30, users: 13, timeSpent: 15, pageViews: 120 },
    { name: 'Mar', subjects: 20, users: 18, timeSpent: 20, pageViews: 140 },
    { name: 'Apr', subjects: 27, users: 39, timeSpent: 25, pageViews: 160 },
    { name: 'May', subjects: 18, users: 48, timeSpent: 30, pageViews: 180 },
    { name: 'Jun', subjects: 23, users: 38, timeSpent: 35, pageViews: 200 },
  ];

  // Fetch dashboard data from the backend
  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/auth/ritesh/dashboard`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setDashboardData({
          totalSubjects: response.data.totalSubjects,
          totalUsers: response.data.totalUsers,
          timeSpent: response.data.timeSpent,
          pageViews: response.data.pageViews,
        });
      } else {
        setError('Failed to fetch dashboard data.');
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Error fetching dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 bg-[#f9ead4] min-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
        <Helmet>
          <title>Home | Dashboard</title>
          <meta
            name='description'
            content='Exam Express is a platform for students to practice and improve their knowledge in various subjects.'
          />
          <meta
            name='keywords'
            content='Exam Express, practice, improve, knowledge, subjects'
          />
        </Helmet>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Overview</h1>

        {/* Skeleton Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-[#fff4e1a4] drop-shadow-2xl p-4 sm:p-6 rounded-lg shadow-lg shadow-[#f7e6ca] transition-shadow duration-300"
            >
              <div className="flex items-center h-16 sm:h-20 space-x-3 sm:space-x-4">
                <div className="bg-gray-300 rounded-full p-2 sm:p-3 animate-pulse">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 bg-gray-400 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-2 animate-pulse"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skeleton Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-lg animate-pulse"
            >
              <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-6">{error}</div>;
  }

  return (
    <div className="p-4 sm:p-6 bg-[#f9ead4] min-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Overview</h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Card 1: Total Subjects */}
        <div className="bg-[#fff4e1a4] drop-shadow-2xl p-4 sm:p-6 rounded-lg shadow-lg shadow-[#f7e6ca] transition-shadow duration-300">
          <div className="flex items-center h-16 sm:h-20 space-x-3 sm:space-x-4">
            <div className="bg-[#ff80e8] rounded-full p-2 sm:p-3">
              <img src={assets.layers_icons} className="h-6 w-6 sm:h-8 sm:w-8" alt="Total Subjects" />
            </div>
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">Total Subjects</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">{dashboardData.totalSubjects}</p>
            </div>
          </div>
        </div>

        {/* Card 2: Total Users */}
        <div className="bg-[#fff4e1a4] drop-shadow-2xl p-4 sm:p-6 rounded-lg shadow-lg shadow-[#f7e6ca] transition-shadow duration-300">
          <div className="flex items-center h-16 sm:h-20 space-x-3 sm:space-x-4">
            <div className="bg-[#80b9ff] rounded-full p-2 sm:p-3">
              <img src={assets.people_icons} className="h-6 w-6 sm:h-8 sm:w-8" alt="Total Users" />
            </div>
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">Total Users</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">{dashboardData.totalUsers}</p>
            </div>
          </div>
        </div>

        {/* Card 3: Time Spent */}
        <div className="bg-[#fff4e1a4] drop-shadow-2xl p-4 sm:p-6 rounded-lg shadow-lg shadow-[#f7e6ca] transition-shadow duration-300">
          <div className="flex items-center h-16 sm:h-20 space-x-3 sm:space-x-4">
            <div className="bg-[#ff8080] rounded-full p-2 sm:p-3">
              <img src={assets.setting_icons} className="h-6 w-6 sm:h-8 sm:w-8" alt="Time Spent" />
            </div>
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">Time Spent</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">{dashboardData.timeSpent} hrs</p>
            </div>
          </div>
        </div>

        {/* Card 4: Page Views */}
        <div className="bg-[#fff4e1a4] drop-shadow-2xl p-4 sm:p-6 rounded-lg shadow-lg shadow-[#f7e6ca] transition-shadow duration-300">
          <div className="flex items-center h-16 sm:h-20 space-x-3 sm:space-x-4">
            <div className="bg-[#ffd380] rounded-full p-2 sm:p-3">
              <img src={assets.people_icons} className="h-6 w-6 sm:h-8 sm:w-8" alt="Page Views" />
            </div>
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">Page Views</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">{dashboardData.pageViews}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Bar Chart */}
        <div className="bg-transparent p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Subjects and Users Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="subjects"
                fill="#8884d8"
                name="Total Subjects"
                radius={[10, 10, 0, 0]} // Rounded top corners
              />
              <Bar
                dataKey="users"
                fill="#82ca9d"
                name="Total Users"
                radius={[10, 10, 0, 0]} // Rounded top corners
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-transparent p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Time Spent and Page Views</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="timeSpent" stroke="#8884d8" name="Time Spent (hrs)" />
              <Line type="monotone" dataKey="pageViews" stroke="#82ca9d" name="Page Views" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;