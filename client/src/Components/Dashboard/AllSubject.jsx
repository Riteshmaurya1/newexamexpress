import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';
import CustomDropdown from './CustomDropdown';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModalSubject from './ConfirmationModalSubject'; // Import the ConfirmationModal component
import { Helmet } from 'react-helmet';

const AllSubject = () => {
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [subjectData, setSubjectData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState({
    _id: '',
    subjectName: '',
    unitNumber: '',
    unitName: '',
    unitNotes: '',
    unitQuestions: '',
    VideoLink: '',
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation modal
  const [subjectToDelete, setSubjectToDelete] = useState(null); // State to store the subject ID to delete
  const { backendUrl } = useContext(AppContext);

  // Fetch subject data
  const getSubjectData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/api/subjects`, {
        branch,
        semester,
      });

      if (response.data.success) {
        setSubjectData(response.data.subjectData);
        setError('');
        toast.success('Subjects fetched successfully!');
      } else {
        setError('No data found for the selected criteria.');
        setSubjectData([]);
        toast.error('No data found for the selected criteria.');
      }
    } catch (err) {
      console.error('Error fetching subject data:', err);
      setError('Error fetching subject data.');
      toast.error('Error fetching subject data.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when branch or semester changes
  useEffect(() => {
    if (branch && semester) {
      getSubjectData();
    }
  }, [branch, semester]);

  // Open edit modal and set selected subject
  const handleEdit = (subject) => {
    setSelectedSubject(subject);
    setEditModalOpen(true);
  };

  // Handle form submission for updating subject
  const handleUpdateSubject = async (e) => {
    e.preventDefault();
    if (!selectedSubject || !selectedSubject._id) {
      console.error('Selected subject is null or has no ID');
      toast.error('Selected subject is invalid.');
      return;
    }

    try {
      const response = await axios.put(
        `${backendUrl}/api/auth/ritesh/dashboard/subject/update/${selectedSubject._id}`,
        selectedSubject
      );

      if (response.data.success) {
        setSubjectData((prevData) =>
          prevData.map((subject) =>
            subject._id === selectedSubject._id ? response.data.data : subject
          )
        );
        setEditModalOpen(false);
        toast.success('Subject updated successfully!');
      } else {
        setError('Failed to update subject.');
        toast.error('Failed to update subject.');
      }
    } catch (err) {
      console.error('Error updating subject:', err);
      setError('Error updating subject.');
      toast.error('Error updating subject.');
    }
  };

  // Handle input changes in the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedSubject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Open delete confirmation modal
  const openDeleteModal = (subjectId) => {
    setSubjectToDelete(subjectId);
    setIsDeleteModalOpen(true);
  };

  // Handle delete subject
  const handleDeleteSubject = async () => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/auth/ritesh/dashboard/subject/delete/${subjectToDelete}`
      );

      if (response.data.success) {
        // Remove the deleted subject from the state
        setSubjectData((prevData) =>
          prevData.filter((subject) => subject._id !== subjectToDelete)
        );
        toast.success('Subject deleted successfully!');
      } else {
        toast.error('Failed to delete subject.');
      }
    } catch (err) {
      console.error('Error deleting subject:', err);
      toast.error('Error deleting subject.');
    } finally {
      setIsDeleteModalOpen(false); // Close the confirmation modal
      setSubjectToDelete(null); // Reset the subject to delete
    }
  };

  const branchOptions = [
    { value: 'Branch', label: 'Branch' },
    { value: 'CSE', label: 'CSE' },
    { value: 'ECE', label: 'ECE' },
    { value: 'ME', label: 'ME' },
    { value: 'AI', label: 'AI' },
    { value: 'ML', label: 'ML' },
  ];

  const semesterOptions = [
    { value: 'Semester', label: 'Sem...' },
    { value: '1', label: ' 1' },
    { value: '2', label: ' 2' },
    { value: '3', label: ' 3' },
    { value: '7', label: ' 7' },
    { value: '8', label: ' 8' },
  ];

  return (
    <div className="p-6 bg-[#faebd4] min-h-screen">
      <Helmet>
        <title>All Subjects | Dashboard</title>
        <meta
          name='description'
          content='Exam Express is a platform for students to practice and improve their knowledge in various subjects.'
        />
        <meta
          name='keywords'
          content='Exam Express, practice, improve, knowledge, subjects'
        />
      </Helmet>
      {/* Toast Container */}
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
        theme="light"
      />

      {/* Confirmation Modal */}
      <ConfirmationModalSubject
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteSubject}
        message="Are you sure you want to delete this subject?"
      />

      {/* Branch and Semester Selection */}
      <div className="flex justify-end gap-5 pb-10">
        <div className="w-4/5">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">All Subject</h1>
        </div>
        <div className="mb-6 flex space-x-4">
          {/* Branch Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Branch</label>
            <CustomDropdown
              options={branchOptions}
              selectedValue={branchOptions.find((opt) => opt.value === branch)?.label}
              onSelect={setBranch}
              placeholder="Branch"
            />
          </div>

          {/* Semester Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Semester</label>
            <CustomDropdown
              options={semesterOptions}
              selectedValue={semesterOptions.find((opt) => opt.value === semester)?.label}
              onSelect={setSemester}
              placeholder="Semester"
            />
          </div>
        </div>
      </div>

      {/* Display Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Skeleton Loading State */}
      {loading && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                {[...Array(8)].map((_, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[...Array(5)].map((_, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50 transition-colors duration-200">
                  {[...Array(8)].map((_, colIndex) => (
                    <td key={colIndex} className="px-2 py-3 whitespace-nowrap">
                      <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Display Subject Data */}
      {!loading && subjectData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            {/* Table Header */}
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sr.No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Questions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Video Link
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {subjectData.map((subject, index) => (
                <tr key={subject._id} className="hover:bg-gray-50 transition-colors duration-200">
                  {/* Row Number */}
                  <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>

                  {/* Subject Name */}
                  <td className="px-2 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {subject.subjectName}
                  </td>

                  {/* Unit Number */}
                  <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">
                    {subject.unitNumber}
                  </td>

                  {/* Unit Name */}
                  <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">
                    {subject.unitName}
                  </td>

                  {/* Notes Link */}
                  <td className="px-2 py-3 whitespace-nowrap text-sm text-blue-600 hover:underline">
                    <a
                      href={subject.unitNotes}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Notes
                    </a>
                  </td>

                  {/* Questions Link */}
                  <td className="px-2 py-3 whitespace-nowrap text-sm text-blue-600 hover:underline">
                    <a
                      href={subject.unitQuestions}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Questions
                    </a>
                  </td>

                  {/* Video Link */}
                  <td className="px-2 py-3 whitespace-nowrap text-sm text-blue-600 hover:underline">
                    <a
                      href={subject.VideoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch Video
                    </a>
                  </td>

                  {/* Actions (Edit and Delete Buttons) */}
                  <td className="px-2 py-3 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button
                        className="text-white hover:text-white rounded-3xl w-14 h-7 bg-black hover:bg-[#e6602c] focus:outline-none"
                        onClick={() => handleEdit(subject)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-white hover:text-white rounded-3xl w-14 h-7 bg-black hover:bg-[#e6602c] focus:outline-none"
                        onClick={() => openDeleteModal(subject._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Not Found State */}
      {!loading && subjectData.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-600 text-lg mt-4">No data found</p>
          {error && <div className="text-gray-500 mb-4">So Select valid subject and sem...</div>}
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Subject</h2>
            <form onSubmit={handleUpdateSubject}>
              {/* Subject Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Unit Number</label>
                <input
                  type="text"
                  name="subjectName"
                  value={selectedSubject.subjectName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {/* Unit Number */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Unit Number</label>
                <input
                  type="number"
                  name="unitNumber"
                  value={selectedSubject.unitNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Unit Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Unit Name</label>
                <input
                  type="text"
                  name="unitName"
                  value={selectedSubject.unitName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Unit Notes */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Unit Notes</label>
                <input
                  type="text"
                  name="unitNotes"
                  value={selectedSubject.unitNotes}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Unit Questions */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Unit Questions</label>
                <input
                  type="text"
                  name="unitQuestions"
                  value={selectedSubject.unitQuestions}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Video Link */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Video Link</label>
                <input
                  type="text"
                  name="VideoLink"
                  value={selectedSubject.VideoLink}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllSubject;