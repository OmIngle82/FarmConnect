import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
  
  return (
    <div className={lex justify-center items-center }>
      <div className={nimate-spin rounded-full border-t-2 border-b-2 border-green-600 }></div>
    </div>
  );
};

export default LoadingSpinner;
