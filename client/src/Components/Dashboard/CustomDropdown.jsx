import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
const CustomDropdown = ({ options, selectedValue, onSelect, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null); // Ref for the dropdown options container

    const handleSelect = (value) => {
        onSelect(value);
        setIsOpen(false); // Close dropdown after selection
    };
    // GSAP Animation for dropdown options
    useEffect(() => {
        if (isOpen) {
            gsap.from(dropdownRef.current, {
                opacity: 0,
                y: -10,
                duration: 0.3,
                ease: 'power2.out',
            });
        }
    }, [isOpen]);

    return (
        <div className="relative w-full">
            {/* Dropdown Button */}
            <div
                className="mt-1 w-full p-2 m-2 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedValue || placeholder}</span>
                <svg
                    className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>

            {/* Dropdown Options */}
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute z-10 right-0 mt-3 w-[300%] bg-white text-black border border-gray-300 rounded-md shadow-lg">
                    <div className="grid grid-cols-3 gap-2 p-2">
                        {options.slice(0, 6).map((option) => ( // Show only 6 options (3 cols x 2 rows)
                            <div
                                key={option.value}
                                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center justify-center border border-gray-200 rounded-md shadow-lg shadow-[#f7e6ca]  transition-shadow duration-300"
                                onClick={() => handleSelect(option.value)}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;