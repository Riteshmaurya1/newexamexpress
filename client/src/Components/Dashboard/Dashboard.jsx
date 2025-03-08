import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Dashboard = () => {
  return (
    <div className='flex bg-[#f7e6ca] h-screen'> {/* Full height */}
      <Helmet>
        <title>Dashboard  | PathshalaPlus</title>
        <meta
          name='description'
          content='Exam Express is a platform for students to practice and improve their knowledge in various subjects.'
        />
        <meta
          name='keywords'
          content='Exam Express, practice, improve, knowledge, subjects'
        />
      </Helmet>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden"> {/* Flex column layout */}
        <Navbar /> {/* Navbar takes only the space it needs */}
        <div className="flex-1 overflow-y-auto"> {/* Scrollable content area */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;