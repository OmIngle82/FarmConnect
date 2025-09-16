import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import RoleSelection from '../components/layout/RoleSelection';
import AuthCard from '../components/auth/AuthCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const HomePage = () => {
  const { currentUser, userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is logged in and has a role, redirect to appropriate dashboard
    if (currentUser && userRole) {
      if (userRole === 'farmer') {
        navigate('/farmer-dashboard');
      } else {
        navigate('/buyer-dashboard');
      }
    }
  }, [currentUser, userRole, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // If user is not logged in, show role selection
  if (!currentUser) {
    return <RoleSelection />;
  }

  // If user is logged in but role is not set, show role selection
  if (!userRole) {
    return <RoleSelection />;
  }

  // This should not happen, but just in case
  return <div>Loading...</div>;
};

export default HomePage;