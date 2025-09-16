import React from 'react';
import Button from '../common/Button';

const ToolsServices = () => {
  const tools = [
    {
      id: 1,
      name: 'B2B Contracts',
      icon: 'fa-file-contract',
      description: 'Create and manage business-to-business contracts'
    },
    {
      id: 2,
      name: 'AI Crop Health Advisor',
      icon: 'fa-seedling',
      description: 'Get AI-powered insights for your crop health'
    },
    {
      id: 3,
      name: 'Virtual Godown',
      icon: 'fa-warehouse',
      description: 'Manage your inventory and storage digitally'
    }
  ];
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Tools & Services</h2>
      
      <div className="space-y-4">
        {tools.map((tool) => (
          <div 
            key={tool.id} 
            className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <i className={`fas ${tool.icon} text-green-600`}></i>
            </div>
            <div className="ml-3 flex-grow">
              <h3 className="font-medium text-gray-900">{tool.name}</h3>
              <p className="text-sm text-gray-500">{tool.description}</p>
            </div>
            <Button variant="outline" size="sm">
              <i className="fas fa-arrow-right"></i>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsServices; 
