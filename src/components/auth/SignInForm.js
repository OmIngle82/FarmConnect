import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const SignInForm = ({ toggleAuthMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  
  const { login, currentUser, userRole, setUserRole } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get temporary role from localStorage
    const tempRole = localStorage.getItem('tempUserRole');
    if (tempRole && !userRole) {
      setUserRole(tempRole);
    }
  }, [userRole, setUserRole]);
  
  useEffect(() => {
    if (currentUser && userRole && !redirecting) {
      setRedirecting(true);
      // Save role with user ID
      localStorage.setItem(`userRole_${currentUser.uid}`, userRole);
      // Remove temporary role
      localStorage.removeItem('tempUserRole');
      
      // Navigate to appropriate dashboard
      setTimeout(() => {
        if (userRole === 'farmer') {
          navigate('/farmer-dashboard');
        } else {
          navigate('/buyer-dashboard');
        }
      }, 300);
    }
  }, [currentUser, userRole, navigate, redirecting]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
      // The useEffect will handle the redirect
    } catch (err) {
      handleAuthError(err);
      setLoading(false);
    }
  };
  
  const handleAuthError = (error) => {
    switch (error.code) {
      case 'auth/user-not-found':
        setError('No account found with this email address.');
        break;
      case 'auth/wrong-password':
        setError('Incorrect password. Please try again.');
        break;
      case 'auth/invalid-email':
        setError('Invalid email address format.');
        break;
      case 'auth/user-disabled':
        setError('This account has been disabled.');
        break;
      default:
        setError('Failed to sign in. Please try again.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="you@example.com"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="••••••••"
          required
        />
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>
        
        <div className="text-sm">
          <button type="button" className="font-medium text-green-600 hover:text-green-500 bg-transparent border-none p-0 cursor-pointer">
            Forgot your password?
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full mb-4"
        disabled={loading || redirecting}
      >
        {loading || redirecting ? <LoadingSpinner size="sm" /> : 'Sign In'}
      </Button>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={toggleAuthMode}
            className="font-medium text-green-600 hover:text-green-500"
          >
            Sign up
          </button>
        </p>
      </div>
    </form>
  );
};

export default SignInForm;