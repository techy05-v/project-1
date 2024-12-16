/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRole, redirectTo, children }) => {
  console.log("=== PrivateRoute Debugging Start ===");

  // Log the role being checked and the redirection path
  console.log("Allowed Role:", allowedRole);
  console.log("Redirect Path:", redirectTo);

  // Retrieve token from cookies
  const accessToken = Cookies.get(`${allowedRole}_access_token`);
  console.log("Access Token Retrieved from Cookies:", accessToken);

  const getRoleFromToken = (token) => {
    if (!token) {
      console.warn("No token provided for decoding.");
      return null;
    }
    try {
      const decoded = jwt_decode(token);
      console.log("Decoded Token:", decoded);
      console.log('role of the user',decoded.data.role)// Extract the role from the token
      return decoded?.data?.role; 
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  // Decode and extract the role
  const userRole = getRoleFromToken(accessToken);
  console.log("Extracted User Role from Token:", userRole);

  // Check authorization
  const isAuthorized = allowedRole === userRole;
  console.log("Authorization Status:", isAuthorized);

  if (!isAuthorized) {
    console.warn(
      `Access Denied: User role (${userRole}) does not match allowed role (${allowedRole}). Redirecting to: ${redirectTo}`
    );
    return <Navigate to={redirectTo} replace />;
  }

  console.log("Access Granted: Rendering children or Outlet.");
  console.log("=== PrivateRoute Debugging End ===");

  // Render children or Outlet if authorized
  return children || <Outlet />;
};

export default PrivateRoute;


