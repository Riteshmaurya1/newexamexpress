import React, { useContext, useState, useEffect } from 'react';
import './PaperSide.css';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

const PaperSide = ({ subjectData }) => {
  const navigate = useNavigate();
  const { filter, setFilter } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Simulate loading delay (replace this with your actual data fetching logic)
  useEffect(() => {
    if (subjectData && subjectData.length > 0) {
      setIsLoading(false); // Data is loaded
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false); // Stop loading after a delay (for demonstration)
      }, 3000); // Adjust the delay as needed
      return () => clearTimeout(timer);
    }
  }, [subjectData]);

  // Handle click to navigate to the subjects page
  const handleClick = () => {
    navigate('/subjects'); // Navigate to the subjects page
  };

  // Filter and get unique subjects
  const filteredSubjects = subjectData
    .filter(
      (subject) =>
        subject.subjectName.toLowerCase().includes(filter.toLowerCase()) ||
        subject.unitName.toLowerCase().includes(filter.toLowerCase())
    )
    // Reduce duplicates by subject name
    .reduce((acc, current) => {
      const x = acc.find((item) => item.subjectName === current.subjectName);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

  return (
    <div className="flex flex-col rounded-3xl">
      <div className="px-6 py-8 sm:p-10 sm:pb-6">
        {/* Loading Indicator */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            <p className="ml-4 text-gray-700">Loading subjects...</p>
          </div>
        ) : (
          <>
            {/* Grid for Subjects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((subject, index) => (
                  <div
                    key={index}
                    className="bg-[#f7e6cb] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Subject Name */}
                    <h2 className="text-lg font-medium tracking-tighter text-gray-600 lg:text-xl text-center">
                      Subject Name:{' '}
                      <span className="text-red-400 flex items-center justify-center">
                        {subject.subjectName}
                      </span>
                    </h2>

                    {/* Explore Button */}
                    <div className="mt-6">
                      <button
                        onClick={handleClick}
                        className="w-full px-6 py-2.5 text-center text-white duration-200 border-2 bg-[#000] rounded-full hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-indigo-500 text-sm focus-visible:ring-indigo-500"
                      >
                        Explore
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-[#000] col-span-full">
                  No subjects found for the selected branch and semester.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaperSide;