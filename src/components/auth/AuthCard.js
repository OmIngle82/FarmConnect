import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const AuthCard = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { userRole } = useAuth();
  
  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-cyan-50 p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">FarmConnect</h1>
          <p className="text-gray-600 mt-2">
            {isSignIn ? 'Sign in to your account' : 'Create a new account'}
          </p>
          <div className="mt-2 inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            {userRole === 'farmer' ? 'Farmer Account' : 'Buyer Account'}
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300">
          {isSignIn ? (
            <SignInForm toggleAuthMode={toggleAuthMode} />
          ) : (
            <SignUpForm toggleAuthMode={toggleAuthMode} />
          )}
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            By continuing, you agree to FarmConnect's Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;