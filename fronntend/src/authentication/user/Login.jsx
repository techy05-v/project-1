import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { userLogin } from '../../redux/slice/UserSlice';
import { axiosInstance } from '../../api/axiosConfig';
import { GoogleLogin } from "@react-oauth/google";
import registerImage from "../../assets/3d-user-login-form-page_169241-6920.avif";
import storeAccessToken from "../../utils/token store/storeAccessToken";
import { Link } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let isValid = true;
    let errors = { email: '', password: '' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }
    if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }
    setFormErrors(errors);
    if (!isValid) toast.error('Please fix the form errors');
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const toastId = toast.loading('Logging in...');
    try {
      const response = await axiosInstance.post('/user/login', formData);
      const { userData, accessToken, role } = response.data;
      storeAccessToken(role, accessToken);
      dispatch(userLogin({ userData, token: accessToken }));
      toast.success('Login successful!', { id: toastId });
      navigate('/user/home');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.', { id: toastId });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoogleLogin = async (credentialResponse) => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post('/user/google', {
        token: credentialResponse.credential,
        role: 'user',
      });
      if (response.status === 200) {
        const { userData, accessToken, role } = response.data;
        storeAccessToken(role, accessToken);
        dispatch(userLogin({ userData, token: accessToken }));
        toast.success('Successfully logged in with Google');
        navigate('/user/home');
      }
    } catch (error) {
      toast.error('Google Sign-Up failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUpError = (error) => {
    toast.error('Google Sign-Up failed. Please try again.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-white-600 p-4 relative">
      {/* <Toaster position="top-center" richColors /> */}
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-lg"></div>
      <div className="relative bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-lg flex flex-col md:flex-row max-w-4xl w-full">
        <div className="md:w-1/2 p-8">
          <img src={registerImage} alt="Login illustration" className="w-full max-w-md mx-auto rounded-xl" />
        </div>
        <div className="md:w-1/2 p-8">
          <div className="flex justify-end mb-8">
            <span className="text-sm text-gray-300">New User?</span>
            <a href="/user/signup" className="text-sm text-purple-200 ml-2">Sign Up</a>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Welcome Back!</h2>
          <p className="text-gray-200 mb-8">Login to continue</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                name="email"
                placeholder="username11@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              {formErrors.email && <p className="text-red-300 text-sm">{formErrors.email}</p>}
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              {formErrors.password && <p className="text-red-300 text-sm">{formErrors.password}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 bg-opacity-80 text-white py-3 rounded-lg hover:bg-purple-700 transition-all"
            >
              LOGIN
            </button>
          </form>
          <div className="mt-6">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={handleGoogleSignUpError}
              size="large"
              theme="filled_blue"
              text="continue_with"
              width="100%"
            />
          </div>
        <Link to="/user/forgot-password">
              FORGOT PASSWORD
        </Link>
        </div>
      </div>
    </div>
  );
}
