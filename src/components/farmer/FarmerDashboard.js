import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Navigation from '../layout/Navigation';
import StatCard from '../common/StatCard';
import MyProduce from './MyProduce';
import FinanceManagement from './FinanceManagement';
import ReviewsSection from './ReviewsSection';
import ToolsServices from './ToolsServices';

const FarmerDashboard = () => {
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  
  // Redirect if not a farmer
  React.useEffect(() => {
    if (currentUser && userRole !== 'farmer') {
      navigate('/buyer-dashboard');
    }
  }, [currentUser, userRole, navigate]);
  
  const handleBackClick = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation showBackButton={true} onBackClick={handleBackClick} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Farmer Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser?.displayName || 'Farmer'}!</p>
        </div>
        
        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Pending Orders" 
            value="12" 
            icon={<i className="fas fa-shopping-cart text-xl"></i>}
            color="yellow"
            change="+3 from last week"
          />
          <StatCard 
            title="Fulfilled Orders" 
            value="48" 
            icon={<i className="fas fa-check-circle text-xl"></i>}
            color="green"
            change="+12 from last month"
          />
          <StatCard 
            title="Total Revenue" 
            value="$4,820" 
            icon={<i className="fas fa-dollar-sign text-xl"></i>}
            color="blue"
            change="+$820 from last month"
          />
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Produce Section */}
          <div className="lg:col-span-2">
            <MyProduce onAddProduct={() => setShowAddProductModal(true)} />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Finance Management */}
            <FinanceManagement />
            
            {/* Customer Reviews */}
            <ReviewsSection />
            
            {/* Tools & Services */}
            <ToolsServices />
          </div>
        </div>
      </div>
      
      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Add New Product</h3>
                <button 
                  onClick={() => setShowAddProductModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <p className="text-gray-600 mb-4">This is a stub for the Add Product functionality.</p>
              
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;