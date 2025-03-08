import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { assets } from '../../assets/assets';
import { AppContext } from '../../Context/AppContext';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  // const { setDashbaordName } = useContext(AppContext);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNavigation = (path, title) => {
    navigate(path); // Navigate to the specified path
    // setDashbaordName(title);
  };
  return (
    <>
      <div
        className={`h-screen ${isCollapsed ? "w-20" : "w-56"
          } bg-black rounded-tr-2xl rounded-br-2xl text-white transition-all duration-300 ease-in-out flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-3 flex justify-center items-center">
          {!isCollapsed && (
            <div className="p-3 cursor-pointer">
              <span
                onClick={() => handleNavigation('/ritesh/dashboard')}
                className="font-bold">Exam<span className=" text-red-600 font-bold">Express</span></span>
            </div>
          )}
          <button onClick={toggleSidebar} className="text-white focus:outline-none transition-colors duration-200">
            {isCollapsed ? <img src={assets.right_arrow} className="w-14 absolute left-14 transition-all duration-300" /> : <img src={assets.left_arrow} className="w-14 absolute left-48 top-4 transition-all duration-300" />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleNavigation('/ritesh/dashboard', 'Dashboard')} // Navigate to Dashboard
                className="flex items-center p-3 space-x-3 hover:bg-[#e6602c] rounded-3xl transition-colors duration-200 hover:text-[#ffffff] w-full text-left"
              >
                <img src={assets.dashboard} size={20} />
                {!isCollapsed && <span className="ml-2">Dashboard</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('/ritesh/dashboard/create', 'Add Subject')} // Navigate to Add Subject
                className="flex items-center p-3 space-x-3 hover:bg-[#e6602c] rounded-3xl transition-colors duration-200 hover:text-[#ffffff] w-full text-left"
              >
                <img src={assets.add_icon} size={20} className="border-1 border-white rounded-md" />
                {!isCollapsed && <span className="ml-2">Add Subject</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('/ritesh/dashboard/subjects', 'All Subject')} // Navigate to Add Subject
                className="flex items-center p-3 space-x-3 hover:bg-[#e6602c] rounded-3xl transition-colors duration-200 hover:text-[#ffffff] w-full text-left"
              >
                <img src={assets.layers_icons} size={20} className="border-1 border-white rounded-md" />
                {!isCollapsed && <span className="ml-2">All Subject</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('/ritesh/dashboard/users', 'All Users')} // Navigate to Add Subject
                className="flex items-center p-3 space-x-3 hover:bg-[#e6602c] rounded-3xl transition-colors duration-200 hover:text-[#ffffff] w-full text-left"
              >
                <img src={assets.people_icons} size={20} className="border-1 border-white rounded-md" />
                {!isCollapsed && <span className="ml-2">All Users</span>}
              </button>
            </li>
            {/* Add more navigation items as needed */}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4">
          <ul>
            <li>
              <button
                onClick={() => handleNavigation('/ritesh/dashboard/profile', 'Profile')} // Navigate to Profile
                className="flex items-center p-3 space-x-3 hover:bg-[#e6602c] rounded-3xl transition-colors duration-200 hover:text-[#ffffff] w-full text-left"
              >
                <img src={assets.profile_icons} size={20} />
                {!isCollapsed && <span className="ml-2">Profile</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('/ritesh/dashboard/settings', 'Settings')} // Navigate to Settings
                className="flex items-center p-3 space-x-3 hover:bg-[#e6602c] rounded-3xl transition-colors duration-200 hover:text-[#ffffff] w-full text-left"
              >
                <img src={assets.setting_icons} alt="No Img" />
                {!isCollapsed && <span className="ml-2">Setting</span>}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;