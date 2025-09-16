import React from 'react';
import Button from '../common/Button';

const FinanceManagement = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Finance Management</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Current Balance</span>
          <span className="font-bold text-lg">$1,240.50</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Pending Payments</span>
          <span className="font-bold text-lg">$320.00</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">This Month's Earnings</span>
          <span className="font-bold text-lg text-green-600">$820.00</span>
        </div>
      </div>
      
      <div className="mt-6">
        <Button variant="primary" className="w-full">
          <i className="fas fa-chart-line mr-2"></i> View Detailed Report
        </Button>
      </div>
    </div>
  );
};

export default FinanceManagement; 
