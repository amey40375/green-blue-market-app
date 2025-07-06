
import React from 'react';
import Header from '@/components/Header';
import UserBalance from '@/components/UserBalance';
import CategoryGrid from '@/components/CategoryGrid';
import ProductCard from '@/components/ProductCard';
import { Flame, Clock, Gift } from 'lucide-react';

const HomePage = () => {
  // Sample product data
  const flashSaleProducts = [
    {
      id: '1',
      name: 'iPhone 14 Pro Max 256GB Space Black',
      price: 15999000,
      originalPrice: 18999000,
      image: '/placeholder.svg',
      rating: 4.8,
      sold: 1500,
      discount: 16,
      badge: 'Flash Sale'
    },
    {
      id: '2',
      name: 'Samsung Galaxy S23 Ultra 512GB',
      price: 14500000,
      originalPrice: 16999000,
      image: '/placeholder.svg',
      rating: 4.7,
      sold: 890,
      discount: 15,
      badge: 'Flash Sale'
    }
  ];

  const recommendedProducts = [
    {
      id: '3',
      name: 'Nike Air Jordan 1 Mid Chicago',
      price: 2099000,
      originalPrice: 2399000,
      image: '/placeholder.svg',
      rating: 4.9,
      sold: 2340,
      discount: 12
    },
    {
      id: '4',
      name: 'MacBook Air M2 13" 256GB Silver',
      price: 18999000,
      image: '/placeholder.svg',
      rating: 4.8,
      sold: 567
    },
    {
      id: '5',
      name: 'Sony WH-1000XM4 Wireless Headphones',
      price: 4299000,
      originalPrice: 4999000,
      image: '/placeholder.svg',
      rating: 4.6,
      sold: 1890,
      discount: 14
    },
    {
      id: '6',
      name: 'Adidas Ultraboost 22 Running Shoes',
      price: 2799000,
      image: '/placeholder.svg',
      rating: 4.7,
      sold: 743
    }
  ];

  const banners = [
    {
      id: 1,
      title: 'Flash Sale Hari Ini!',
      subtitle: 'Diskon hingga 70%',
      image: '/placeholder.svg',
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 2,
      title: 'Gratis Ongkir',
      subtitle: 'Min. belanja Rp50rb',
      image: '/placeholder.svg',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      title: 'Cashback 100%',
      subtitle: 'Untuk pengguna baru',
      image: '/placeholder.svg',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* User Balance */}
      <UserBalance />

      {/* Banner Carousel */}
      <div className="px-4 mb-6">
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`min-w-[280px] h-32 bg-gradient-to-r ${banner.color} rounded-xl p-4 text-white flex items-center justify-between flex-shrink-0`}
            >
              <div>
                <h3 className="text-lg font-bold mb-1">{banner.title}</h3>
                <p className="text-sm opacity-90">{banner.subtitle}</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Gift className="w-8 h-8" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <CategoryGrid />

      {/* Flash Sale Section */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5" />
              <span className="font-bold">FLASH SALE</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Berakhir dalam 02:15:30</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {flashSaleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Recommended Products */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Rekomendasi</h2>
          <button className="text-[#00B894] text-sm font-medium">
            Lihat Semua
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
