
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Home from './Pages/Home';
import Login from './Pages/Login';
import EmailVerify from './Pages/EmailVerify';
import ResetPassword from './Pages/ResetPassword';
import SubjectData from './Pages/SubjectsData';
import NotFoundPage from './Components/NotFound/NotFoundPage';

import { ToastContainer, Flip } from 'react-toastify';
import { AppContext } from './Context/AppContext';
import { Helmet } from 'react-helmet';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './Components/Dashboard/Dashboard';
import DashboardHome from './Components/Dashboard/DashboardHome';
import AddSubject from './Components/Dashboard/AddSubject';
import AllSubject from './Components/Dashboard/AllSubject';
import Users from './Components/Dashboard/Users';
import Profile from './Components/Dashboard/Profile';
import Settings from './Components/Dashboard/Settings';

const App = () => {
  const { isLoggedin } = useContext(AppContext);

  return (
    <>
      <Helmet>
        <title>Exam Express</title>
        <meta
          name='description'
          content='Exam Express is a platform for students to practice and improve their knowledge in various subjects.'
        />
        <meta
          name='keywords'
          content='Exam Express, practice, improve, knowledge, subjects'
        />
      </Helmet>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />

      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        {/* Protected Routes (Only for logged-in users) */}
        {isLoggedin && (
          <>
            <Route path='/home' element={<Home />} />
            <Route path='/subjects' element={<SubjectData />} />
          </>
        )}

        {/* Dashboard Routes (Only for logged-in users) */}
          <Route path='/ritesh/dashboard' element={<Dashboard />}>
            <Route index element={<DashboardHome />} /> {/* Default dashboard page */}
            <Route path='create' element={<AddSubject />} /> {/* Add Subject page */}
            <Route path='subjects' element={<AllSubject />} /> {/* All Subjects page */}
            <Route path='users' element={<Users />} />
            <Route path='profile' element={<Profile />} />
            <Route path='settings' element={<Settings />} />
          </Route>

        {/* Global 404 Page */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;