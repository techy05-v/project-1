import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import {axiosInstance} from "../api/axiosConfig"
import { KeyIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState(true);

  const { token } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract role from URL query parameters
  const role = new URLSearchParams(location.search).get('role') || 'user';
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    // Debug log to verify token and role
    console.log('Submitting with:', {
      token,
      role,
      url: `/user/reset-password/${token}?role=${role}`
    });
  
    // Client-side validations
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }
  
    try {
      const response = await axiosInstance.post(
        `/user/reset-password/${token}?role=${role}`, 
        {
          newPassword: password,
          confirmPassword: confirmPassword
        }
      );
  
      if (response.data.message === "Password reset successfully") {
        setIsSubmitted(true);
        setTimeout(() => {
          navigate(`/${role}/login`);
        }, 3000);
      }
    } catch (err) {
      console.error('Reset password error:', {
        status: err.response?.status,
        message: err.response?.data?.message,
        error: err
      });
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  // At the top of your ResetPassword component, add this console log
console.log("URL params:", {
    token: useParams().token,
    fullPath: window.location.pathname,
    search: window.location.search
  });

  if (!validToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <h2 className="text-3xl font-extrabold text-red-600">Invalid Reset Link</h2>
          <p className="text-gray-600">
            The password reset link is invalid or has expired.
          </p>
          <Link 
            to="/forgot-password" 
            className="text-indigo-600 hover:text-indigo-500"
          >
            Request a new password reset
          </Link>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Password Reset Successful</h2>
            <p className="mt-2 text-sm text-gray-600">
              Your password has been successfully reset. 
              You will be redirected to login shortly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Your Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your new password below
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="password" className="sr-only">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link 
            to="/login" 
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}