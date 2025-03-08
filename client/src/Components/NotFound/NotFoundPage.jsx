import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap"; // Import GSAP

const NotFoundPage = () => {
  // Refs for GSAP animations
  const errorCodeRef = useRef(null);
  const messageRef = useRef(null);
  const buttonRef = useRef(null);

  // GSAP Animations
  useEffect(() => {
    // Animate the 404 error code
    gsap.from(errorCodeRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power3.out",
      delay: 0.5,
    });

    // Animate the message
    gsap.from(messageRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      delay: 1,
    });

    // Animate the button
    gsap.from(buttonRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      delay: 1.5,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* 404 Error Code */}
      <div
        ref={errorCodeRef}
        className="text-9xl md:text-[12rem] font-bold text-gray-900 mb-4"
      >
        404
      </div>

      {/* Message */}
      <div
        ref={messageRef}
        className="text-center max-w-2xl mx-auto mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-xl md:text-2xl text-gray-600">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      {/* Go Back Home Button */}
      <div ref={buttonRef}>
        <Link
          to="/login"
          className="inline-flex items-center px-8 py-4 bg-gray-900 text-white text-xl font-semibold rounded-lg hover:bg-gray-800 transition duration-300"
        >
          Go Back Home
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
