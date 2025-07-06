
import React from 'react';
import { Home, Grid3X3, Heart, User, Package } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'home', label: 'Beranda', icon: Home, path: '/' },
    { id: 'category', label: 'Kategori', icon: Grid3X3, path: '/category/all' },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, path: '/wishlist' },
    { id: 'orders', label: 'Pesanan', icon: Package, path: '/orders' },
    { id: 'profile', label: 'Profil', icon: User, path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path || 
            (tab.id === 'category' && location.pathname.startsWith('/category'));
          
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex-1 py-2 px-1 flex flex-col items-center justify-center min-h-[60px] ${
                isActive 
                  ? 'text-[#00B894]' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-[#00B894]' : ''}`} />
              <span className={`text-xs font-medium ${isActive ? 'text-[#00B894]' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
