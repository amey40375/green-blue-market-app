
import React from 'react';
import { Search, MessageCircle, Bell, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

interface HeaderProps {
  showSearch?: boolean;
  title?: string;
}

const Header = ({ showSearch = true, title }: HeaderProps) => {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const cartItems = getTotalItems();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold">
              <span className="text-[#002D62]">ARVIN</span>
              <span className="text-[#00B894] ml-1">trade</span>
            </h1>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/chat')}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <MessageCircle className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
            
            <button
              onClick={() => navigate('/notifications')}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                5
              </span>
            </button>

            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="mt-3">
            <div
              onClick={() => navigate('/search')}
              className="relative bg-gray-100 rounded-lg p-3 cursor-pointer hover:bg-gray-200 transition-colors"
            >
              <div className="flex items-center">
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-gray-500">Cari Produk...</span>
              </div>
            </div>
          </div>
        )}

        {/* Page Title */}
        {title && (
          <div className="mt-2">
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
