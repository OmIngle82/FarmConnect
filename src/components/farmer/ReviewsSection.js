 import React from 'react';

const ReviewsSection = () => {
  // Sample reviews data
  const reviews = [
    {
      id: 1,
      customer: 'John Smith',
      product: 'Organic Tomatoes',
      rating: 5,
      comment: 'Best tomatoes I\'ve ever bought! Very fresh and flavorful.',
      date: '2 days ago'
    },
    {
      id: 2,
      customer: 'Sarah Johnson',
      product: 'Farm Fresh Eggs',
      rating: 4,
      comment: 'Great quality eggs. Will definitely order again.',
      date: '1 week ago'
    },
    {
      id: 3,
      customer: 'Michael Brown',
      product: 'Green Lettuce',
      rating: 4,
      comment: 'Fresh lettuce, arrived in good condition.',
      date: '1 week ago'
    }
  ];
  
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i 
        key={i} 
        className={`fas fa-star ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      ></i>
    ));
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Customer Reviews</h2>
        <span className="text-sm text-gray-500">Recent</span>
      </div>
      
      <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
            <div className="flex justify-between">
              <h3 className="font-medium text-gray-900">{review.customer}</h3>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            
            <div className="flex items-center mt-1">
              <div className="flex">
                {renderStars(review.rating)}
              </div>
              <span className="ml-2 text-sm text-gray-600">for {review.product}</span>
            </div>
            
            <p className="mt-2 text-gray-600 text-sm">{review.comment}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button className="text-green-600 hover:text-green-800 text-sm font-medium">
          View All Reviews
        </button>
      </div>
    </div>
  );
};

export default ReviewsSection;
