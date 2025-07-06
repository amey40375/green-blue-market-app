
import React from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { Heart } from 'lucide-react';

const WishlistPage = () => {
  const wishlistItems = [
    {
      id: '1',
      nama: 'iPhone 14 Pro Max 256GB Space Black',
      harga: 15999000,
      originalPrice: 18999000,
      foto_url: '/placeholder.svg',
      kategori: 'elektronik',
      rating: 4.8,
      sold: 1500,
      diskon: 16,
      badge: 'Favorit'
    },
    {
      id: '2',
      nama: 'Nike Air Jordan 1 Mid Chicago',
      harga: 2099000,
      originalPrice: 2399000,
      foto_url: '/placeholder.svg',
      kategori: 'fashion',
      rating: 4.9,
      sold: 2340,
      diskon: 12
    },
    {
      id: '3',
      nama: 'MacBook Air M2 13" 256GB Silver',
      harga: 18999000,
      foto_url: '/placeholder.svg',
      kategori: 'elektronik',
      rating: 4.8,
      sold: 567
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Wishlist" showSearch={false} />
      
      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96">
          <Heart className="w-20 h-20 text-gray-300 mb-4" />
          <h2 className="text-lg font-semibold text-gray-600 mb-2">
            Wishlist Anda Kosong
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Tambahkan produk favorit Anda ke wishlist
          </p>
        </div>
      ) : (
        <div className="p-4">
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              {wishlistItems.length} produk dalam wishlist
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
