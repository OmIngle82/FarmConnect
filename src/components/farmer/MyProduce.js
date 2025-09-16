import React from 'react';
import Button from '../common/Button';

const MyProduce = ({ onAddProduct }) => {
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
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">My Produce</h2>
        <Button variant="primary" onClick={onAddProduct}>
          <i className="fas fa-plus mr-2"></i> Add Product
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt={product.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.price}/{product.unit}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm text-gray-900">{product.rating}</div>
                    <div className="ml-1 text-yellow-400">
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-green-600 hover:text-green-900 mr-3">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 text-center">
        <Button variant="outline">
          View All Products
        </Button>
      </div>
    </div>
  );
};

export default MyProduce;