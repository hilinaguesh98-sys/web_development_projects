import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

function RequireAuth({ children }) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;