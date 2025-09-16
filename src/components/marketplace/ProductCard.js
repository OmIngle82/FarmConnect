 import React from 'react';
import Button from '../common/Button';

const ProductCard = ({ product }) => {
  const { name, farmer, price, unit, image } = product;
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="h-48 overflow-hidden">
        <img 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
          src={image} 
          alt={name} 
        />
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-600 mt-1">
              <i className="fas fa-user mr-1"></i> {farmer}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-green-600">{price}</p>
            <p className="text-sm text-gray-500">per {unit}</p>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center text-yellow-400">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
            <span className="ml-1 text-sm text-gray-600">(24)</span>
          </div>
          
          <Button variant="primary" size="sm">
            <i className="fas fa-shopping-cart mr-1"></i> Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
