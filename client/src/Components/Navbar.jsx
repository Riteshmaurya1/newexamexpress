import React, { useCallback, useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Navbar.css';
const Navbar = () => {
    const navigate = useNavigate();
    const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext);

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



    return (
        <div className=' w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
            <img src={assets.logo} alt="" style={{ width: '10rem', height: '3rem' }} />
            {/* <img src={assets.logo} alt="" className=' w-18 sm:w-22' /> */}
            {userData ?
                <div className=' w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
                    {userData.name[0].toUpperCase()}
                    <div className=' absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
                        <ul className='account-details'>
                            {
                                <li className='account-details-li' >{userData.email}</li>
                            }
                            {
                                <hr className='account-details-hr' />
                            }
                            {!userData.isAccountVerified &&
                                <li className='account-details-li cursor-pointer'>
                                    Verify Email
                                </li>
                            }
                            {
                                <li onClick={logout} className='account-details-li cursor-pointer'>
                                    Log Out
                                </li>
                            }
                        </ul>
                    </div>
                </div>
                :
                <button onClick={() => { navigate('/login') }} className=' flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gry-800 hover:bg-gray-100 transition-all ' >
                    Login<img src={assets.arrow_icon} alt="No selected!" />
                </button>
            }
        </div>
    )
}

export default Navbar
