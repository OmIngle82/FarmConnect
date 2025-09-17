import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const Navigation = ({ showBackButton = false, onBackClick }) => {
  const { currentUser, logout, userRole } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };
  
  return (
    <nav className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        {showBackButton && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBackClick}
            className="mr-4"
          >
            <i className="fas fa-arrow-left mr-2"></i> Back
          </Button>
        )}
        <h1 className="text-xl font-bold text-green-700">FarmConnect</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-gray-700">
          {currentUser?.displayName || currentUser?.email} 
          <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            {userRole}
          </span>
        </span>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt mr-2"></i> Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
