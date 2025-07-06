
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Clock, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const recentSearches = [
    'iPhone 14 Pro Max',
    'Nike Air Jordan',
    'MacBook Air M2',
    'Sony Headphones'
  ];

  const popularSearches = [
    'Smartphone',
    'Sepatu Nike',
    'Laptop Gaming',
    'Earbuds Wireless',
    'Tas Gunung',
    'Jam Tangan',
    'Kamera DSLR',
    'Power Bank'
  ];

  const searchResults = [
    {
      id: '1',
      name: 'iPhone 14 Pro Max 256GB Space Black',
      price: 15999000,
      originalPrice: 18999000,
      image: '/placeholder.svg',
      rating: 4.8,
      sold: 1500,
      discount: 16
    },
    {
      id: '2',
      name: 'iPhone 13 Pro 128GB Blue',
      price: 12999000,
      originalPrice: 14999000,
      image: '/placeholder.svg',
      rating: 4.7,
      sold: 890,
      discount: 13
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    console.log('Searching for:', query);
    // Add search logic here
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  const removeRecentSearch = (search: string) => {
    console.log('Removing recent search:', search);
    // Add logic to remove from recent searches
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b px-4 py-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                placeholder="Cari produk, brand, atau kategori"
                className="flex-1 bg-transparent border-0 focus:outline-none text-sm"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="p-1 hover:bg-gray-200 rounded-full"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              )}
            </div>
          </div>
          
          <button
            onClick={() => handleSearch(searchQuery)}
            className="text-[#00B894] font-medium text-sm"
          >
            Cari
          </button>
        </div>
      </div>

      <div className="p-4">
        {!isSearching ? (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Pencarian Terakhir
                </h3>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2"
                    >
                      <button
                        onClick={() => handleSearch(search)}
                        className="flex items-center space-x-3 flex-1"
                      >
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{search}</span>
                      </button>
                      <button
                        onClick={() => removeRecentSearch(search)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <button className="text-sm text-[#00B894] font-medium mt-2">
                  Hapus Semua Riwayat
                </button>
              </div>
            )}

            {/* Popular Searches */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Pencarian Populer
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="px-3 py-2 bg-white text-gray-700 text-sm rounded-lg border hover:border-[#00B894] hover:text-[#00B894] transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Search Results */}
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Hasil pencarian untuk "{searchQuery}" ({searchResults.length} produk)
              </p>
            </div>
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96">
                <Search className="w-20 h-20 text-gray-300 mb-4" />
                <h2 className="text-lg font-semibold text-gray-600 mb-2">
                  Produk Tidak Ditemukan
                </h2>
                <p className="text-gray-500 text-center mb-6">
                  Coba kata kunci lain atau jelajahi kategori
                </p>
                <button
                  onClick={() => navigate('/category/all')}
                  className="bg-[#00B894] text-white px-6 py-3 rounded-lg font-medium"
                >
                  Jelajahi Kategori
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
