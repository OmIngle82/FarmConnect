 import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Navigation from '../layout/Navigation';
import ProductCard from './ProductCard';

const BuyerDashboard = () => {
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Redirect if not a buyer
  React.useEffect(() => {
    if (currentUser && userRole !== 'buyer') {
      navigate('/farmer-dashboard');
    }
  }, [currentUser, userRole, navigate]);
  
  const handleBackClick = () => {
    navigate('/');
  };
  
  // Sample product data
const products = [
  {
    id: 1,
    name: 'Organic Tomatoes',
    farmer: 'Green Valley Farm',
    price: '$2.50',
    unit: 'kg',
    image: 'https://picsum.photos/300/200?random=1'
  },
  {
    id: 2,
    name: 'Fresh Carrots',
    farmer: 'Sunny Acres',
    price: '$1.80',
    unit: 'kg',
    image: 'https://picsum.photos/300/200?random=2'
  },
  {
    id: 3,
    name: 'Farm Fresh Eggs',
    farmer: 'Happy Hen Farm',
    price: '$4.00',
    unit: 'dozen',
    image: 'https://picsum.photos/300/200?random=3'
  },
  {
    id: 4,
    name: 'Green Lettuce',
    farmer: 'Crisp Greens',
    price: '$1.50',
    unit: 'head',
    image: 'https://picsum.photos/300/200?random=4'
  },
  {
    id: 5,
    name: 'Red Apples',
    farmer: 'Orchard Delights',
    price: '$3.20',
    unit: 'kg',
    image: 'https://picsum.photos/300/200?random=5'
  },
  {
    id: 6,
    name: 'Whole Wheat Bread',
    farmer: 'Grain Mill',
    price: '$4.50',
    unit: 'loaf',
    image: 'https://picsum.photos/300/200?random=6'
  }
];
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.farmer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation showBackButton={true} onBackClick={handleBackClick} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Marketplace</h1>
          <p className="text-gray-600">Discover fresh produce directly from local farmers</p>
        </div>
        
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Search for products or farmers..."
            />
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <i className="fas fa-search text-gray-300 text-5xl mb-4"></i>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;
