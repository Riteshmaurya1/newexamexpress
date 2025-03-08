import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import gsap from "gsap"; // Import GSAP
import { assets } from '../../assets/assets.js';

const SubjectsPage = () => {
  const {
    subjectData,
    error,
    filter,
    setFilter
  } = useContext(AppContext);
  
  // Create refs for GSAP animations
  const errorRef = useRef(null);
  const cardRef = useRef(null);

  // GSAP Animations
  useEffect(() => {
    // Animate the error message if it exists
    if (error) {
      gsap.from(errorRef.current, {
        opacity: 0,
        y: 50,
        duration: 2,
        ease: "power2.out",
      });
    }

    // Animate the card when subjectData is available
    if (subjectData) {
      gsap.from(cardRef.current, {
        opacity: 0,
        x: -100,
        duration: 1,
        delay: 1,
        ease: "power3.out",
      });
    }
  }, [error, subjectData]);

  // Filter subjects based on search term
  const filteredSubjects = subjectData.filter(
    (subject) =>
      subject.subjectName.toLowerCase().includes(filter.toLowerCase()) ||
      subject.unitName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4">
      {/* Error Message */}
      {error && (
        <div
          ref={errorRef}
          className="w-full max-w-md bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6 mx-auto flex items-center"
        >
          {/* SVG Icon */}
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>

          {/* Error Message */}
          <span>Coming Soon.</span>
        </div>
      )}

      {/* Subject Data Cards */}
      <div className="grid md:grid-cols-1 sm:grid-cols-1 gap-4" ref={cardRef}>
        {filteredSubjects.length > 0 ? (
          filteredSubjects.map((subject) => (
            <div
              key={subject._id}
              className="w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                {/* Subject Info */}
                <div className="bg-gray-300 p-3 rounded-md flex-shrink-2">
                  <p className="text-sm flex-shrink-1 font-medium text-gray-800">SUBJECT</p>
                  <p className="text-2xl sm:text-3xl text-black">{subject.subjectName}</p>
                </div>

                {/* Unit Info and Links */}
                <div className="flex-1 p-1">
                  <div>
                    <p className="text-sm font-medium text-gray-600">UNIT {subject.unitNumber}</p>
                    <p className="text-xl sm:text-2xl font-bold text-blue-800">{subject.unitName}</p>
                  </div>

                  {/* Links */}
                  <div className="flex space-x-2 mt-2">
                    <a
                      href={subject.unitNotes}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      <button className="w-full bg-slate-400 rounded-3xl p-2 px-4 flex gap-2 text-black hover:underline-offset-0">
                        <img className="h-5 w-5" src={assets.sheet} alt="Notes" />Notes
                      </button>
                    </a>
                    <a
                      href={subject.unitQuestions}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      <button className="w-full bg-slate-400 rounded-3xl p-2 px-4 flex gap-2 text-black">
                        <img className="h-5 w-5" src={assets.pdfs} alt="Questions" />Questions
                      </button>
                    </a>
                    <a
                      href={subject.VideoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      <button className="w-full bg-slate-400 rounded-3xl p-2 px-4 flex gap-2 text-black">
                        <img className="h-5 w-5" src={assets.yt} alt="Youtube" />Lecture
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No subjects found for the search term.
          </p>
        )}
      </div>
    </div>
  );
};

export default SubjectsPage;