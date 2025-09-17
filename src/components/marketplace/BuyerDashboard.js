import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Navigation from '../layout/Navigation';
import ProductCard from './ProductCard';
import { productService } from '../../services/productService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const BuyerDashboard = () => {
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  
  // Redirect if not a buyer
  useEffect(() => {
    if (currentUser && userRole !== 'buyer') {
      navigate('/farmer-dashboard');
    }
  }, [currentUser, userRole, navigate]);
  
  const handleBackClick = () => {
    navigate('/');
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  useEffect(() => {
    // Filter products based on search term and category
    let result = products;
    
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory]);
  
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { products: productsData } = await productService.getProducts(20);
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  
  const categories = [
    { id: '', name: 'All Categories' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'grains', name: 'Grains' },
    { id: 'dairy', name: 'Dairy' },
    { id: 'meat', name: 'Meat' },
    { id: 'poultry', name: 'Poultry' },
    { id: 'seafood', name: 'Seafood' }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation showBackButton={true} onBackClick={handleBackClick} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Marketplace</h1>
          <p className="text-gray-600">Discover fresh produce directly from local farmers</p>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Search for products..."
                />
              </div>
            </div>
            
            <div className="w-full md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <i className="fas fa-search text-gray-300 text-5xl mb-4"></i>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search term or filters</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;
