// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, roles = [], redirectTo = "/login" }) {
  const { user, loading } = useAuth();

  // 🚦 Show loading state while AuthContext is initializing
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // 🚫 Not logged in → redirect
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // 🔒 Role-based protection
  const hasAccess =
    roles.length === 0 ||
    roles.includes(user.role) ||
    (Array.isArray(user.roles) && roles.some((r) => user.roles.includes(r)));

  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Authorized → render children
  return children;
}
















// // src/components/ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ children, roles = [], redirectTo = "/login" }) {
//   const { user } = useAuth();

//   // 🚦 Loading state (while AuthContext is checking token)
//   if (user === undefined) {
//     return <div className="flex justify-center items-center h-screen">
//       <p className="text-gray-600">Loading...</p>
//     </div>;
//   }

//   // 🚫 Not logged in → redirect
//   if (!user) {
//     return <Navigate to={redirectTo} replace />;
//   }

//   // 🔒 Role-based protection
//   const hasAccess =
//     roles.length === 0 ||
//     roles.includes(user.role) ||
//     (Array.isArray(user.roles) && roles.some((r) => user.roles.includes(r)));

//   if (!hasAccess) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   // ✅ Authorized → render children
//   return children;
// }















// // src/components/ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ children, roles = [] }) {
//   const { user } = useAuth();

//   // Not logged in → redirect to login
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // Role-based protection
//   const hasAccess =
//     roles.length === 0 ||
//     roles.includes(user.role) ||
//     roles.some((r) => user.roles?.includes(r));

//   if (!hasAccess) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return children;
// }