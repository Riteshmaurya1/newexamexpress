import React, { useContext, useState, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import gsap from 'gsap'; // Import GSAP
import { Helmet } from 'react-helmet';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

  const [name, setName] = useState('');
  const [collageName, setCollageName] = useState('');
  const [cityName, setCityName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Refs for GSAP animations
  const imageRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    // GSAP animation when state changes
    const tl = gsap.timeline();

    if (state === 'Sign Up') {
      // Reset positions before animating
      gsap.set(imageRef.current, { x: '-100%', opacity: 0 });
      gsap.set(formRef.current, { x: '100%', opacity: 0 });

      // Animate image to the left and form to the right
      tl.to(imageRef.current, { x: 0, opacity: 1, duration: 0.5 })
        .to(formRef.current, { x: 0, opacity: 1, duration: 0.5 }, '-=0.5');
    } else {
      // Reset positions before animating
      gsap.set(imageRef.current, { x: '100%', opacity: 0 });
      gsap.set(formRef.current, { x: '-100%', opacity: 0 });

      // Animate image to the right and form to the left
      tl.to(imageRef.current, { x: 0, opacity: 1, duration: 0.5 })
        .to(formRef.current, { x: 0, opacity: 1, duration: 0.5 }, '-=0.5');
    }
  }, [state]);

  const onSubmithandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password, cityName, collageName });

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate('/');
          toast.success('Registered Successfully.');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password });

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate('/');
          toast.success('Logged In Successfully');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    // 
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0' style={{ backgroundImage: `url(${assets.login_background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Transparent background with white border */}
      <Helmet>
        <title>Exam Express | {state === 'Sign Up' ? 'Register' : 'Login'} </title>
        <meta
          name='description'
          content='Exam Express is a platform for students to practice and improve their knowledge in various subjects.'
        />
        <meta
          name='keywords'
          content='Exam Express, practice, improve, knowledge, subjects'
        />
      </Helmet>
      <div className='flex flex-col sm:flex-row items-center justify-center w-full max-w-4xl rounded-xl shadow-lg overflow-hidden border-gray-500 border-opacity-20 border-2 backdrop-blur'>
        <button
          onClick={() => navigate('/')}
          className='absolute left-1 sm:left-1 z-10 top-1 w-32 h-8 sm:w-32 cursor-pointer bg-black backdrop-blur-sm rounded-lg text-white text-sm sm:text-base font-medium hover:bg-opacity-30 transition-all duration-300 shadow-lg'
        >
          Back to Home
        </button>
        <div
          ref={imageRef}
          className={`w-full sm:w-1/2 ${state === 'Sign Up' ? 'order-1' : 'order-2'
            }`}
        >
          <img
            src={state === 'Sign Up' ? assets.sign_in : assets.sign_up} // Dynamic image based on state
            alt='Login/Signup'
            className='w-full h-full object-cover sm: top-2'
          />
        </div>

        {/* Form Section */}
        <div
          ref={formRef}
          className={`w-full sm:w-1/2 p-10 ${state === 'Sign Up' ? 'order-2' : 'order-1'
            }`}
        >
          <h2 className='text-3xl font-bold text-black text-center mb-3'>
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </h2>
          <p className='text-center text-sm mb-6 text-black'>
            {state === 'Sign Up' ? 'Create your account' : 'Login to your account'}
          </p>

          <form onSubmit={onSubmithandler}>
            {state === 'Sign Up' && (
              <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#000000]'>
                <img src={assets.person_icon} alt='' className='w-5 h-5' />
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className='bg-transparent outline-none text-white flex-1 overflow-hidden text-ellipsis'
                  type='text'
                  placeholder='Full Name'
                  required
                />
              </div>
            )}

            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#000000]'>
              <img src={assets.mail_icon} alt='' className='w-5 h-5' />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className='bg-transparent outline-none text-white flex-1 overflow-hidden text-ellipsis'
                type='email'
                placeholder='Email ID'
                required
              />
            </div>

            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#000000]'>
              <img src={assets.lock_icon} alt='' className='w-5 h-5' />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className='bg-transparent outline-none text-white flex-1 overflow-hidden text-ellipsis'
                type='password'
                placeholder='Password'
                required
              />
            </div>

            {state === 'Sign Up' && (
              <div className='flex gap-3 w-full'>
                {/* City Input (30% width) */}
                <div className='mb-4 flex items-center gap-3 w-[34%] px-5 py-2.5 rounded-full bg-[#000000]'>
                  {/* <img src={assets.location} alt='City Icon' className='w-5 h-5' /> */}
                  <input
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                    className='bg-transparent outline-none text-white flex-1 overflow-hidden text-ellipsis'
                    type='text'
                    placeholder='City'
                  />
                </div>

                {/* College Name Input (70% width) */}
                <div className='mb-4 flex items-center gap-3 w-[66%] px-5 py-2.5 rounded-full bg-[#000000]'>
                  {/* <img src={assets.education} alt='College Icon' className='w-5 h-5' /> */}
                  <input
                    onChange={(e) => setCollageName(e.target.value)}
                    value={collageName}
                    className='bg-transparent outline-none text-white flex-1 overflow-hidden text-ellipsis'
                    type='text'
                    placeholder='College'
                  />
                </div>
              </div>
            )}

            <p
              onClick={() => navigate('/reset-password')}
              className='mb-4 text-[#000000] cursor-pointer'
            >
              Forgot password?
            </p>

            <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>
              {state}
            </button>
          </form>

          {state === 'Sign Up' ? (
            <p className='text-black text-center text-xs mt-4'>
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className='text-blue-400 cursor-pointer underline'
              >
                Login here
              </span>
            </p>
          ) : (
            <p className='text-black text-center text-xs mt-4'>
              Don't have an account?{' '}
              <span
                onClick={() => setState('Sign Up')}
                className='text-blue-400 cursor-pointer underline'
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;