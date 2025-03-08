import React, { useContext, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../Context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap'; // Import GSAP

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedIn, userData, getUserData } = useContext(AppContext);
  const navigate = useNavigate();

  // Refs for GSAP animations
  const imageRef = useRef(null);
  const formRef = useRef(null);

  // GSAP Animations
  useEffect(() => {
    gsap.from(imageRef.current, { x: '-100%', opacity: 0, duration: 1, delay: 0.5 });
    gsap.from(formRef.current, { x: '100%', opacity: 0, duration: 1, delay: 0.5 });
  }, []);

  // OTP Input Handling
  const inputRefs = React.useRef([]);
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && e.target.value === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');

    if (pasteArray.length <= 6) {
      pasteArray.forEach((char, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = char;
          if (index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
          }
        }
      });
    }
  };

  // Form Submission
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value);
      const otp = otpArray.join('');

      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp });

      if (data.success) {
        toast.success(data.message); // Show success message
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message); // Show error message
      }
    } catch (error) {
      // Handle network errors or unexpected errors
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (isLoggedIn && userData && userData.isAccountVerified) {
      navigate('/');
    }
  }, [isLoggedIn, userData, navigate]);

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0' style={{ backgroundImage: `url(${assets.login_background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Transparent background with white border */}
      <div className='flex flex-col sm:flex-row items-center justify-center w-full max-w-4xl rounded-xl shadow-lg overflow-hidden border-gray-500 border-opacity-20 border-2 backdrop-blur'>
        {/* Back to Home Button */}
        <button
          onClick={() => navigate('/')}
          className='absolute left-1 sm:left-1 z-10 top-1 w-32 h-8 sm:w-32 cursor-pointer bg-black backdrop-blur-sm rounded-lg text-white text-sm sm:text-base font-medium hover:bg-opacity-30 transition-all duration-300 shadow-lg'
        >
          Back to Home
        </button>

        {/* Image Section */}
        <div
          ref={imageRef}
          className='w-full sm:w-1/2'
        >
          <img
            src={assets.otp} // Replace with your OTP-related image
            alt='OTP Verification'
            className='w-full h-full object-cover rounded-3xl'
          />
        </div>

        {/* Form Section */}
        <div
          ref={formRef}
          className='w-full sm:w-1/2 p-10'
        >
          <h2 className='text-3xl font-bold text-black text-center mb-3'>
            Email Verify OTP
          </h2>
          <p className='text-center text-sm mb-6 text-black'>
            Enter the 6-digit code sent to your email id
          </p>

          <form onSubmit={onSubmitHandler}>
            <div className='flex justify-between mb-8' onPaste={handlePaste}>
              {Array(6).fill(0).map((_, index) => (
                <input
                  type='text'
                  maxLength='1'
                  key={index}
                  required
                  className='w-12 h-12 bg-[#000000] text-white text-center text-xl rounded-md'
                  ref={e => inputRefs.current[index] = e}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
            <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full text-white'>
              Verify Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;