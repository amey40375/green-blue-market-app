
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { Filter, SlidersHorizontal } from 'lucide-react';

const CategoryPage = () => {
  const { id } = useParams();
  const [sortBy, setSortBy] = useState('popular');
  
  const categories = [
    { id: 'all', name: 'Semua Kategori' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'electronics', name: 'Elektronik' },
    { id: 'food', name: 'Makanan' },
    { id: 'beauty', name: 'Kecantikan' },
    { id: 'sports', name: 'Olahraga' },
    { id: 'books', name: 'Buku' },
    { id: 'home', name: 'Rumah' },
    { id: 'toys', name: 'Mainan' },
  ];

  const currentCategory = categories.find(cat => cat.id === id) || categories[0];

  const products = [
    {
      id: '1',
      name: 'iPhone 14 Pro Max 256GB Space Black Premium',
      price: 15999000,
      originalPrice: 18999000,
      image: '/placeholder.svg',
      rating: 4.8,
      sold: 1500,
      discount: 16,
      badge: 'Terlaris'
    },
    {
      id: '2',
      name: 'Samsung Galaxy S23 Ultra 512GB Phantom Black',
      price: 14500000,
      originalPrice: 16999000,
      image: '/placeholder.svg',
      rating: 4.7,
      sold: 890,
      discount: 15
    },
    {
      id: '3',
      name: 'Nike Air Jordan 1 Mid Chicago Red White',
      price: 2099000,
      originalPrice: 2399000,
      image: '/placeholder.svg',
      rating: 4.9,
      sold: 2340,
      discount: 12
    },
    {
      id: '4',
      name: 'MacBook Air M2 13" 256GB Silver Space Gray',
      price: 18999000,
      image: '/placeholder.svg',
      rating: 4.8,
      sold: 567
    },
    {
      id: '5',
      name: 'Sony WH-1000XM4 Wireless Noise Canceling',
      price: 4299000,
      originalPrice: 4999000,
      image: '/placeholder.svg',
      rating: 4.6,
      sold: 1890,
      discount: 14
    },
    {
      id: '6',
      name: 'Adidas Ultraboost 22 Running Shoes Black',
      price: 2799000,
      image: '/placeholder.svg',
      rating: 4.7,
      sold: 743
    }
  ];

  const sortOptions = [
    { value: 'popular', label: 'Terpopuler' },
    { value: 'newest', label: 'Terbaru' },
    { value: 'price-low', label: 'Harga Terendah' },
    { value: 'price-high', label: 'Harga Tertinggi' },
    { value: 'rating', label: 'Rating Tertinggi' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={currentCategory.name} showSearch={false} />
      
      {/* Filter and Sort Bar */}
      <div className="sticky top-[120px] z-40 bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filter</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border-0 focus:ring-0 bg-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-4 py-3 bg-white border-b">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                category.id === id
                  ? 'bg-[#00B894] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4">
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Menampilkan {products.length} produk untuk "{currentCategory.name}"
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Load More */}
        <div className="flex justify-center mt-6">
          <button className="px-6 py-2 border border-[#00B894] text-[#00B894] rounded-lg hover:bg-[#00B894] hover:text-white transition-colors">
            Muat Lebih Banyak
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
