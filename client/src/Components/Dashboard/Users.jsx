import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import gsap from 'gsap';
import ConfirmationModal from './ConfirmationModal.jsx'; // Import the modal component
import { Helmet } from 'react-helmet';

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // For search functionality
  const [loading, setLoading] = useState(true); // Loading state
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const { backendUrl } = useContext(AppContext);

  // State for the confirmation modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmailToDelete, setUserEmailToDelete] = useState(null);

  // Fetch user data from the backend
  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axios.get(backendUrl + '/api/auth/ritesh/dashboard/users');
        if (data.success) {
          // console.log("Fetched User Data:", data.userData); // Debugging
          setUserData(data.userData); // Set user data
          setFilteredData(data.userData); // Initialize filtered data
          animateTableRows(); // Trigger GSAP animation
        } else {
          toast.error(data.message);
          setFilteredData([]); // Reset filtered data on error
        }
      } catch (error) {
        toast.error(error.message);
        setFilteredData([]); // Reset filtered data on error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getUserData(); // Call the async function
  }, [backendUrl]); // Re-run effect if backendUrl changes

  // GSAP animation for table rows
  const animateTableRows = () => {
    gsap.from('.table-row', {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power3.out',
    });
  };

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter user data based on search query
    const filtered = userData.filter(
      (user) =>
        user.name?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.cityName?.toLowerCase().includes(query) ||
        user.collageName?.toLowerCase().includes(query)
    );

    setFilteredData(filtered);
  };

  // Handle delete user confirmation
  const handleDeleteConfirmation = (email) => {
    // console.log("User email to delete (handleDeleteConfirmation):", email); // Debugging
    if (!email) {
      toast.error("User email is missing");
      return;
    }
    setUserEmailToDelete(email); // Set the user email to delete
    setIsModalOpen(true); // Open the modal
  };

  // Handle delete user
  const handleDeleteUser = async () => {
    // console.log("User email to delete (handleDeleteUser):", userEmailToDelete); // Debugging
    if (!userEmailToDelete) {
      toast.error("User email is missing");
      return;
    }

    try {
      // console.log("Deleting user with email:", userEmailToDelete); // Debugging
      const { data } = await axios.delete(`${backendUrl}/api/auth/ritesh/dashboard/users/${userEmailToDelete}`);
      if (data.success) {
        toast.success("User deleted successfully");
        // Remove the deleted user from the state
        setUserData((prevData) => prevData.filter((user) => user.email !== userEmailToDelete));
        setFilteredData((prevData) => prevData.filter((user) => user.email !== userEmailToDelete));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error); // Debugging
      toast.error("Error deleting user");
    } finally {
      setIsModalOpen(false); // Close the modal
      setUserEmailToDelete(null); // Reset userEmailToDelete
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>All Users | Dashboard</title>
        <meta
          name='description'
          content='Exam Express is a platform for students to practice and improve their knowledge in various subjects.'
        />
        <meta
          name='keywords'
          content='Exam Express, practice, improve, knowledge, subjects'
        />
      </Helmet>
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteUser}
        message="Are you sure you want to delete this user?"
      />

      <div className='flex flex-col sm:flex-row justify-between items-center mb-8 gap-4'>
        <h1 className="text-3xl font-bold text-center">Users Dashboard</h1>

        {/* Search Input */}
        <div className="w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search users by name, email, city, or collage..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {loading ? (
        // Loading animation
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div

              key={index}
              className="h-16 bg-gray-200 rounded-lg animate-pulse"
              style={{ animationDelay: `${index * 0.2}s` }}
            ></div>
          ))}
        </div>
      ) : filteredData.length > 0 ? (
        // Table with user data
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Email</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">City</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Collage</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Account Verified</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user, index) => (
                <tr
                  key={index}
                  className="table-row border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-700">{user.name}</td>
                  <td className="py-3 px-4 text-gray-600">{user.email}</td>
                  <td className="py-3 px-4 text-gray-600">{user.cityName}</td>
                  <td className="py-3 px-4 text-gray-600">{user.collageName}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-semibold ${user.isAccountVerified ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                      {user.isAccountVerified ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button
                        className="text-white px-4 py-2 flex items-center text-md hover:text-white rounded-3xl bg-black hover:bg-[#e6602c] focus:outline-none"
                        aria-label="Delete User"
                        onClick={() => handleDeleteConfirmation(user.email)} // Ensure user._id is passed
                      >
                        Delete User
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // No users found message with SVG illustration
        <div className="flex flex-col items-center justify-center mt-10">
          {/* SVG Illustration */}
          <img
            src="https://www.svgrepo.com/show/426192/cogs-settings.svg" // Replace with your preferred SVG
            alt="No Users Found"
            className="w-64 h-64 mb-6"
          />
          <p className="text-2xl font-semibold text-gray-700 mb-2">No Users Found</p>
          <p className="text-gray-500 text-center">
            It looks like there are no users matching your search. Try adjusting your search query.
          </p>
        </div>
      )}
    </div>
  );
};

export default Users;