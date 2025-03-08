import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import gsap from 'gsap';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddSubject = () => {
  const { backendUrl } = useContext(AppContext);
  const [formData, setFormData] = useState({
    branch: '',
    semester: '',
    subjectName: '',
    unitNumber: '',
    unitName: '',
    unitNotes: '',
    unitQuestions: '',
    videoLink: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    gsap.from(".form-element", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.1,
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        VideoLink: formData.videoLink // Match backend capitalization
      };

      const response = await axios.post(`${backendUrl}/api/auth/ritesh/dashboard/create`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.error) {
        toast.error(response.data.error); // Show error toast
      } else {
        toast.success('Subject created successfully!'); // Show success toast
        setFormData({
          branch: '',
          semester: '',
          subjectName: '',
          unitNumber: '',
          unitName: '',
          unitNotes: '',
          unitQuestions: '',
          videoLink: ''
        });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error ||
        err.message ||
        'Error connecting to server. Please try again.';
      toast.error(errorMessage); // Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#faebd4] min-h-screen">
      <Helmet>
        <title>Add Subjects | Dashboard</title>
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
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Subject</h1>

      <form onSubmit={handleSubmit} className="bg-[#f7e6cb61] backdrop-blur-md p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <div className="space-y-6">
          {/* Branch */}
          <div className='flex flex-col-2 justify-stretch gap-8'>
            <div className="form-element w-full">
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
                Branch
              </label>
              <select
                id="branch"
                value={formData.branch}
                onChange={handleChange}
                className="mt-1 block w-full  p-2 border rounded-3xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Branch</option>
                <option value="cse">Computer Science</option>
                <option value="ece">Electronics</option>
                <option value="mechanical">Mechanical</option>
              </select>
            </div>

            {/* Semester */}
            <div className="form-element w-full">
              <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
                Semester
              </label>
              <input
                type="number"
                id="semester"
                value={formData.semester}
                onChange={handleChange}
                min="1"
                max="8"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter semester (1-8)"
                required
              />
            </div>
          </div>
          <div className='flex flex-col-2 justify-stretch gap-8'>
            {/* Subject Name */}
            <div className="form-element w-full">
              <label htmlFor="subjectName" className="block text-sm font-medium text-gray-700">
                Subject Name
              </label>
              <input
                type="text"
                id="subjectName"
                value={formData.subjectName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter subject name"
                required
              />
            </div>

            {/* Unit Number */}
            <div className="form-element w-full">
              <label htmlFor="unitNumber" className="block text-sm font-medium text-gray-700">
                Unit Number
              </label>
              <input
                type="number"
                id="unitNumber"
                value={formData.unitNumber}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter unit number"
                required
                min="1"
                max="5"
              />
            </div>
          </div>

          {/* Unit Name */}
          <div className="form-element">
            <label htmlFor="unitName" className="block text-sm font-medium text-gray-700">
              Unit Name
            </label>
            <input
              type="text"
              id="unitName"
              value={formData.unitName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter unit name"
              required
            />
          </div>

          {/* Unit Notes */}
          <div className="form-element">
            <label htmlFor="unitNotes" className="block text-sm font-medium text-gray-700">
              Unit Notes
            </label>
            <textarea
              id="unitNotes"
              value={formData.unitNotes}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter unit notes"
              rows={3}
            />
          </div>

          {/* Unit Questions */}
          <div className="form-element">
            <label htmlFor="unitQuestions" className="block text-sm font-medium text-gray-700">
              Unit Questions
            </label>
            <textarea
              id="unitQuestions"
              value={formData.unitQuestions}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter unit questions"
              rows={3}
            />
          </div>

          {/* Video Link */}
          <div className="form-element">
            <label htmlFor="videoLink" className="block text-sm font-medium text-gray-700">
              Video Link
            </label>
            <input
              type="url"
              id="videoLink"
              value={formData.videoLink}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter video URL"
            />
          </div>

          {/* Submit Button */}
          <div className="form-element">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  <span>Creating Subject...</span>
                </div>
              ) : (
                'Create Subject'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSubject;