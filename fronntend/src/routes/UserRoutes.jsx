// import React from "react";
// import { Navigate } from "react-router-dom";
// import { Routes, Route } from "react-router-dom";
// import Login from "../authentication/user/Login";
// import Register from "../authentication/user/Register";
// import ProductPage from "../components/userComponents/ProductPage";
// import PublicRoute from "./ProtectRoute/PublicRoute";
// import PrivateRoute from "./ProtectRoute/PrivateRoute";
// import Layout from "../authentication/user/Layout/Layout";
// import HomePage from "../authentication/user/Home";
// import ShopPage from "../components/userComponents/ShopPage";
// import ForgotPassword from "../pages/ForgotPassword";
// import ResetPassword from "../pages/resetPassword";

// const UserRoutes = () => {
//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route 
//         path="login" 
//         element={
//           <PublicRoute>
//             <Login />
//           </PublicRoute>
//         } 
//       />
//       <Route 
//         path="signup" 
//         element={
//           <PublicRoute>
//             <Register />
//           </PublicRoute>
//         } 
//       />
//       <Route 
//         path="forgot-password" 
//         element={
//           <PublicRoute>
//             <ForgotPassword />
//           </PublicRoute>
//         } 
//       />
//       <Route 
//         path="reset-password/:token" 
//         element={
//           <PublicRoute>
//             <ResetPassword />
//           </PublicRoute>
//         } 
//       />

//       {/* Protected Routes with Layout */}
//       <Route 
//         element={
//           <PrivateRoute 
//             allowedRole="user" 
//             redirectTo="/user/login"
//           >
//             <Layout />
//           </PrivateRoute>
//         }
//       >
//         {/* Nested Routes within Protected Layout */}
//         <Route 
//           path="home" 
//           element={<HomePage />} 
//         />
//         <Route 
//           path="product/:id" 
//           element={<ProductPage />} 
//         />
//         <Route 
//           path="shop" 
//           element={<ShopPage />} 
//         />
//       </Route>

//       {/* Optional: Add a catch-all/404 route */}
//       <Route 
//         path="*" 
//         element={<Navigate to="/user/home" replace />} 
//       />
//     </Routes>
//   );
// };

// export default UserRoutes;

import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Login from "../authentication/user/Login";
import Register from "../authentication/user/Register";
import ProductPage from "../components/userComponents/ProductPage";
import PublicRoute from "./ProtectRoute/PublicRoute";
import PrivateRoute from "./ProtectRoute/PrivateRoute";
import Layout from "../authentication/user/Layout/Layout";
import HomePage from "../authentication/user/Home";
import ShopPage from "../components/userComponents/ShopPage";
import ForgotPassword  from  "../pages/ForgotPassword"



const UserRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="signup" 
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } 
      />
      <Route
       path="forgot-password"
       element={
        <PublicRoute>
        <ForgotPassword/>
        </PublicRoute>
       }

      />

      {/* Protected Routes */}
      <Route 
        element={
          <PrivateRoute 
            allowedRole="user" 
            redirectTo="/user/login"
          >
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="home" element={<HomePage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="shop" element={<ShopPage />} />
      </Route>

      {/* Catch-all route */}
      <Route 
        path="*" 
        element={<Navigate to="/user/login" replace />} 
      />
    </Routes>
  );
};

export default UserRoutes;