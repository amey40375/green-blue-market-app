
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryGrid = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 'fashion', name: 'Fashion', icon: '👗', color: 'bg-pink-100' },
    { id: 'electronics', name: 'Elektronik', icon: '📱', color: 'bg-blue-100' },
    { id: 'food', name: 'Makanan', icon: '🍔', color: 'bg-yellow-100' },
    { id: 'beauty', name: 'Kecantikan', icon: '💄', color: 'bg-purple-100' },
    { id: 'sports', name: 'Olahraga', icon: '⚽', color: 'bg-green-100' },
    { id: 'books', name: 'Buku', icon: '📚', color: 'bg-indigo-100' },
    { id: 'home', name: 'Rumah', icon: '🏠', color: 'bg-orange-100' },
    { id: 'toys', name: 'Mainan', icon: '🧸', color: 'bg-red-100' },
  ];

  return (
    <div className="px-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Kategori</h2>
        <button
          onClick={() => navigate('/category/all')}
          className="text-[#00B894] text-sm font-medium"
        >
          Lihat Semua
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => navigate(`/category/${category.id}`)}
            className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mb-2`}>
              <span className="text-xl">{category.icon}</span>
            </div>
            <span className="text-xs font-medium text-gray-700 text-center">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
