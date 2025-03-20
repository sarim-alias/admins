import React from 'react';

const CategoryTag = ({ name, count, onClick }) => {
    return (
      <div
        onClick={onClick}
        className="bg-gray-800 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
      >
        <span className="text-white">{name}</span>
        <span className="text-purple-400 ml-2">{count}</span>
      </div>
    );
  };
  

export default CategoryTag;