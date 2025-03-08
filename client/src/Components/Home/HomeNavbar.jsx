import React, { useCallback, useContext, useState } from 'react'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import './HomeNavbar.css'


const HomeNavbar = () => {
  const navigate = useNavigate();
  const {
    userData,
    backendUrl,
    setUserData,
    setIsLoggedin,
    setSemester,
    setBranch,
    branch,
    semester,
    filter,
    setFilter } = useContext(AppContext);


  /* ************Set Semester and Branch ************ */
  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // user logOut function 
  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate('/');
      toast.success('User Logged Out')
    } catch (error) {
      toast.error(error.message);
    }
  }
  const returnLogo = () => {
    navigate('/home');
  }

  // Send verification OTP
  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp')

      if (data.success) {
        navigate('/email-verify')
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default form submission
      performSearch(searchTerm);
    }
  };



  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  return (
    <nav className="navbar-top flex flex-col md:flex-row items-stretch md:items-center justify-between p-1 text-white">
      {/* Mobile Header */}
      <div className="flex items-center justify-between md:hidden">
        <img
          src={assets.logo}
          onClick={returnLogo}
          alt="Logo"
          className="h-8 cursor-pointer"
        />
        {/* Mobile Menu Toggle */}
        <button
          className="p-2"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Left Section (always visible on desktop) */}
      <div className={`${showMobileMenu ? 'flex' : 'hidden'} md:flex items-center gap-4 flex-1 flex-col md:flex-row p-2 md:p-0`}>
        {/* Desktop Logo */}
        <img
          src={assets.logo}
          onClick={returnLogo}
          alt="Logo"
          className="hidden md:block h-10 cursor-pointer"
        />

        {/* Search Box */}
        <div className="navbar-search-box flex items-center gap-2 flex-grow max-w-xl w-4 md:w-1/4">
          <input
            className='navbar-page-input focus:outline-none w-full'
            onKeyPress={handleKeyPress}
            type="text"
            placeholder='Search...'
            value={filter}
            onChange={handleFilterChange}
          />
          <div className='send-icon'>
            <img src={assets.search_icon} alt="search icon" className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Right Section (collapsible on mobile) */}
      <div className={`${showMobileMenu ? 'flex' : 'hidden'} md:flex items-center gap-4 ml-4 flex-col md:flex-row p-2 md:p-0`}>
        {/* Dropdowns */}
        <div className="selection-container flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <select value={branch} onChange={handleBranchChange} className="select-input w-full md:w-40">
            <option className='option-values' value="">Select Branch</option>
            <option className='option-values' value="CSE">CSE</option>
            <option className='option-values' value="ECE">ECE</option>
            <option className='option-values' value="ME">ME</option>
          </select>

          <select value={semester} onChange={handleSemesterChange} className="select-input w-full md:w-40">
            <option className='option-values' value="">Select Semester</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} className='option-values' value={num}>Sem {num}</option>
            ))}
          </select>
        </div>

        {/* Profile Section */}
        {userData ?
          <div
            className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative cursor-pointer'
            onClick={toggleDropdown}
          >
            {userData.name[0].toUpperCase()}

            {/* Dropdown content */}
            {isDropdownVisible && (
              <div className='absolute top-10 right-0 z-10 text-black rounded bg-white shadow-lg'>
                <ul className='account-details'>
                  <div className="account-details-upper py-1 bg-gray-300 rounded-sm">
                    <li className=' px-3'>{userData.name}</li>
                    <li className=' px-3'>{userData.email}</li>
                  </div>
                  <hr className='account-details-hr' />
                  {!userData.isAccountVerified && (
                    <li
                      onClick={sendVerificationOtp}
                      className='account-details-li cursor-pointer'
                    >
                      Verify Email
                    </li>
                  )}
                  <li
                    onClick={logout}
                    className='account-details-li cursor-pointer'
                  >
                    Log Out
                  </li>
                </ul>
              </div>
            )}
          </div>
          :
          <button onClick={() => { navigate('/login') }} className=' flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gry-800 hover:bg-gray-100 transition-all ' >
            Login<img src={assets.arrow_icon} alt="No selected!" />
          </button>
        }
      </div>
    </nav>


  )
}

export default HomeNavbar