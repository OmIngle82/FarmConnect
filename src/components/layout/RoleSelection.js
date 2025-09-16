import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const RoleSelection = () => {
  const { setUserRole, currentUser } = useAuth();
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);
  
  const handleRoleSelect = (role) => {
    // Set the role in localStorage temporarily
    localStorage.setItem('tempUserRole', role);
    setUserRole(role);
    setIsNavigating(true);
    
    // Navigate to auth page after a short delay
    setTimeout(() => {
      navigate('/auth');
    }, 300);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-cyan-50 p-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">FarmConnect</h1>
        <p className="text-lg text-gray-600 mb-12">Connecting farmers directly with buyers</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            className={`bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl cursor-pointer transform hover:-translate-y-1 ${isNavigating ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={() => handleRoleSelect('farmer')}
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <i className="fas fa-seedling text-3xl text-green-600"></i>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">I'm a Farmer</h2>
            <p className="text-gray-600 mb-6">
              Sell your produce directly to buyers, manage your inventory, and grow your business.
            </p>
            <Button variant="primary" size="lg" className="w-full">
              Continue as Farmer
            </Button>
          </div>
          
          <div 
            className={`bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl cursor-pointer transform hover:-translate-y-1 ${isNavigating ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={() => handleRoleSelect('buyer')}
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                <i className="fas fa-shopping-basket text-3xl text-blue-600"></i>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">I'm a Buyer</h2>
            <p className="text-gray-600 mb-6">
              Source fresh produce directly from farmers, discover new products, and support local agriculture.
            </p>
            <Button variant="primary" size="lg" className="w-full">
              Continue as Buyer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;