// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, roles = [] }) {
  const { user } = useAuth();

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role-based protection
  const hasAccess =
    roles.length === 0 ||
    roles.includes(user.role) ||
    roles.some((r) => user.roles?.includes(r));

  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}









// // src/components/ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ children, roles }) {
//   const { user } = useAuth();

//   // Not logged in → redirect
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // Role-based protection (optional)
//   if (roles && !roles.includes(user.role)) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }
