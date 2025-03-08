// import React from "react";
// import { assets } from "../../assets/assets";
// import { useContext } from "react";
// import { AppContext } from "../../Context/AppContext";

// const Navbar = () => {
//   const { dashboardName } = useContext(AppContext);
//   console.log(dashboardName);
  
//   return (
//     <>
//       <nav className="flex flex-1 gap-2 p-2 border-b-2 border-gray-300 navbar-expand-lg navbar-light bg-light justify-between">
//         {/* <nav className="flex "> */}
//         <div className="flex h-fit">
//           <h1 className="font-bold text-3xl p-2">{dashboardName}</h1>
//         </div>
//         <div className="flex">
//           <input
//             type="text"
//             placeholder="Search for anything..."
//             className="w-full bg-white h-fit m-1 p-2 pl-10 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <div className="flex h-fit items-center justify-center m-1">
//             <h1 className="font-bold rounded-full bg-white p-1 h-10 w-10 text-3xl"></h1>
//           </div>
//           <div className="flex h-fit items-center justify-center m-1">
//             <div className="relative rounded-full bg-white p-1 h-10 w-40 text-xl flex items-center">
//               {/* Black circle */}
//               <span className="absolute left-1 rounded-full bg-black h-8 w-8 flex items-center justify-center text-white text-xl">
//                 R
//               </span>
//               {/* Text "itesh Maurya" */}
//               <div className="ml-10">Ritesh</div>
//             </div>
//           </div>
//         </div>

//       </nav>
//     </>
//   );
// };

// export default Navbar;


import React from "react";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

const Navbar = () => {
  const { dashboardName } = useContext(AppContext);
  // console.log(dashboardName);
  
  return (
    <>
      <nav className="flex gap-2 p-2 border-b-2 border-gray-300 navbar-expand-lg navbar-light bg-light justify-between">
        {/* Removed flex-1 from here */}
        <div className="flex h-fit">
          <h1 className="font-bold text-3xl p-2">{dashboardName}</h1>
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Search for anything..."
            className="w-full bg-white h-fit m-1 p-2 pl-10 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex h-fit items-center justify-center m-1">
            <h1 className="font-bold rounded-full bg-white p-1 h-10 w-10 text-3xl"></h1>
          </div>
          <div className="flex h-fit items-center justify-center m-1">
            <div className="relative rounded-full bg-white p-1 h-10 w-40 text-xl flex items-center">
              {/* Black circle */}
              <span className="absolute left-1 rounded-full bg-black h-8 w-8 flex items-center justify-center text-white text-xl">
                R
              </span>
              {/* Text "itesh Maurya" */}
              <div className="ml-10">Ritesh</div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;