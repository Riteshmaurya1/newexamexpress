import React, { useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Header = () => {
    const { userData, viewCount, setViewCount } = useContext(AppContext);
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        if (userData) {
            navigate('/home');
        } else {
            toast.info('Please log in to get started.');
        }
    };
    return (
        <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
            <img src={assets.header_img} alt="" className='w-36 h-36 rounded-full mb-6' />
            <h1 className='flex items-center gsp-2 text-xl sm:text-3xl font-medium mb-2'>
                Hey {userData ? userData.name : 'Students'}!
                <img src={assets.hand_wave} alt="" className='w-8 aspect-square ml-1' />
            </h1>
            <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to our website</h2>
            <p className='mb-8 max-w-md'>Let's start with a quick product tour and we will have you up and running in no time</p>
            <p className='mb-8 max-w-md'>{viewCount}</p>
            <button
                onClick={handleGetStartedClick}
                className={`border border-gray-500 rounded-full px-8 py-2.5 transition-all ${userData ? 'hover:bg-gray-100' : 'bg-gray-300 cursor-not-allowed'}`}
                disabled={!userData}
            >
                Get Started
            </button>
        </div>
    );
};

export default Header;