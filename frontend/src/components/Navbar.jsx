import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/jobs", label: "Jobs" }, // ✅ Added Jobs link
    { to: "/services", label: "Services" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
  ];

  const roleLinks = {
    recruiter: [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/jobs/post", label: "Post a Job" }, // ✅ fixed route
      { to: "/manage-jobs", label: "Manage Jobs" }, // ✅ aligned with App.jsx
    ],
    admin: [
      { to: "/admin", label: "Admin Panel" },
      { to: "/users", label: "User Management" },
      { to: "/reports", label: "Reports" },
    ],
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50 border-b">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-2xl text-gray-900">
          WorkConnect <span className="text-red-600">ALBANIA</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "text-red-600 font-semibold border-b-2 border-red-600 pb-1"
                  : "text-gray-700 hover:text-red-600 transition"
              }
            >
              {link.label}
            </NavLink>
          ))}

          {!user ? (
            <>
              <NavLink to="/login" className="text-gray-700 hover:text-red-600 transition">
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
              >
                Register
              </NavLink>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full border" />
                ) : (
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 text-white font-bold">
                    {user.username?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-gray-700 font-medium">{user.username}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                  {(roleLinks[user.role] || []).map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  ))}
                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="block text-gray-700 hover:text-red-600 transition"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}

            {user ? (
              <>
                {(roleLinks[user.role] || []).map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className="block text-gray-700 hover:text-red-600 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left text-gray-700 hover:text-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="block text-gray-700 hover:text-red-600 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="block bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}








// import React, { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const navLinks = [
//     { to: "/", label: "Home" },
//     { to: "/services", label: "Services" },
//     { to: "/about", label: "About Us" },
//     { to: "/contact", label: "Contact" },
//   ];

//   const roleLinks = {
//     recruiter: [
//       { to: "/dashboard", label: "Dashboard" },
//       { to: "/post-job", label: "Post a Job" },
//       { to: "/my-jobs", label: "Manage Jobs" },
//     ],
//     admin: [
//       { to: "/admin", label: "Admin Panel" },
//       { to: "/users", label: "User Management" },
//       { to: "/reports", label: "Reports" },
//     ],
//   };

//   return (
//     <header className="bg-white shadow-md fixed w-full top-0 z-50 border-b">
//       <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//         {/* Logo */}
//         <Link to="/" className="font-bold text-2xl text-gray-900">
//           WorkConnect <span className="text-red-600">ALBANIA</span>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center gap-8">
//           {navLinks.map((link) => (
//             <NavLink
//               key={link.to}
//               to={link.to}
//               className={({ isActive }) =>
//                 isActive
//                   ? "text-red-600 font-semibold border-b-2 border-red-600 pb-1"
//                   : "text-gray-700 hover:text-red-600 transition"
//               }
//             >
//               {link.label}
//             </NavLink>
//           ))}

//           {!user ? (
//             <>
//               <NavLink
//                 to="/login"
//                 className="text-gray-700 hover:text-red-600 transition"
//               >
//                 Login
//               </NavLink>
//               <NavLink
//                 to="/register"
//                 className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
//               >
//                 Register
//               </NavLink>
//             </>
//           ) : (
//             <div className="relative">
//               {/* Avatar + Dropdown Toggle */}
//               <button
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 className="flex items-center gap-2 focus:outline-none"
//               >
//                 {/* Avatar (fallback to initials if no image) */}
//                 {user.avatar ? (
//                   <img
//                     src={user.avatar}
//                     alt="avatar"
//                     className="w-8 h-8 rounded-full border"
//                   />
//                 ) : (
//                   <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 text-white font-bold">
//                     {user.username?.charAt(0).toUpperCase()}
//                   </div>
//                 )}
//                 <span className="text-gray-700 font-medium">
//                   {user.username}
//                 </span>
//               </button>

//               {/* Dropdown Menu */}
//               {dropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
//                   {(roleLinks[user.role] || []).map((link) => (
//                     <NavLink
//                       key={link.to}
//                       to={link.to}
//                       className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 transition"
//                       onClick={() => setDropdownOpen(false)}
//                     >
//                       {link.label}
//                     </NavLink>
//                   ))}
//                   <button
//                     onClick={() => {
//                       logout();
//                       setDropdownOpen(false);
//                     }}
//                     className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 transition"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-gray-700 focus:outline-none"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? "✖" : "☰"}
//         </button>
//       </nav>
//     </header>
//   );
// }