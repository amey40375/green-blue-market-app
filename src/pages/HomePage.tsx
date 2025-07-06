
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import UserBalance from '@/components/UserBalance';
import CategoryGrid from '@/components/CategoryGrid';
import ProductCard from '@/components/ProductCard';
import { Flame, Clock, Gift } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: string;
  nama: string;
  harga: number;
  foto_url?: string;
  diskon?: number;
  kategori: string;
  stok?: number;
  deskripsi?: string;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('produk')
        .select('*')
        .eq('status', 'disetujui')
        .limit(20)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Separate products for different sections
  const flashSaleProducts = products.filter(product => (product.diskon || 0) > 10).slice(0, 2);
  const recommendedProducts = products.filter(product => (product.diskon || 0) <= 10).slice(0, 4);

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
      {flashSaleProducts.length > 0 && (
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
      )}

      {/* Recommended Products */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {loading ? 'Memuat Produk...' : 'Rekomendasi'}
          </h2>
          <button className="text-[#00B894] text-sm font-medium">
            Lihat Semua
          </button>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm animate-pulse">
                <div className="w-full h-32 bg-gray-300 rounded-t-lg"></div>
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {recommendedProducts.length > 0 ? (
              recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-2 text-center py-8">
                <p className="text-gray-500">Belum ada produk tersedia</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
