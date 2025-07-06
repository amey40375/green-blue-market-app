
import React from 'react';
import Header from '@/components/Header';
import { useUser } from '@/contexts/UserContext';
import { 
  User, 
  Settings, 
  CreditCard, 
  MapPin, 
  Bell, 
  HelpCircle, 
  Star,
  Shield,
  LogOut,
  ChevronRight
} from 'lucide-react';

const ProfilePage = () => {
  const { user, logout } = useUser();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const menuItems = [
    {
      id: 'edit-profile',
      label: 'Edit Profil',
      icon: User,
      color: 'text-blue-600'
    },
    {
      id: 'payment',
      label: 'Metode Pembayaran',
      icon: CreditCard,
      color: 'text-green-600'
    },
    {
      id: 'address',
      label: 'Alamat Pengiriman',
      icon: MapPin,
      color: 'text-orange-600'
    },
    {
      id: 'notifications',
      label: 'Notifikasi',
      icon: Bell,
      color: 'text-purple-600'
    },
    {
      id: 'reviews',
      label: 'Ulasan Saya',
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      id: 'privacy',
      label: 'Privasi & Keamanan',
      icon: Shield,
      color: 'text-red-600'
    },
    {
      id: 'settings',
      label: 'Pengaturan',
      icon: Settings,
      color: 'text-gray-600'
    },
    {
      id: 'help',
      label: 'Bantuan',
      icon: HelpCircle,
      color: 'text-indigo-600'
    }
  ];

  const handleMenuClick = (itemId: string) => {
    console.log(`Menu clicked: ${itemId}`);
    // Add navigation logic here
  };

  const handleLogout = () => {
    logout();
    console.log('User logged out');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Profil" showSearch={false} />
        
        <div className="flex flex-col items-center justify-center h-96">
          <User className="w-20 h-20 text-gray-300 mb-4" />
          <h2 className="text-lg font-semibold text-gray-600 mb-2">
            Silakan Masuk
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Masuk untuk mengakses profil dan fitur lainnya
          </p>
          <button className="bg-[#00B894] text-white px-6 py-3 rounded-lg font-medium">
            Masuk Sekarang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Profil" showSearch={false} />
      
      {/* User Info */}
      <div className="bg-gradient-to-r from-[#002D62] to-[#00B894] p-6 text-white">
        <div className="flex items-center space-x-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full border-2 border-white"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-sm opacity-90">{user.email}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <p className="text-sm opacity-90">Saldo</p>
            <p className="text-lg font-bold">{formatCurrency(user.balance)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <p className="text-sm opacity-90">ARVIN Points</p>
            <p className="text-lg font-bold">{user.points.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className="w-full bg-white rounded-lg p-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors"
            >
              <div className={`p-2 rounded-lg bg-gray-100 ${item.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="flex-1 text-left font-medium text-gray-800">
                {item.label}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          );
        })}
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-white rounded-lg p-4 flex items-center space-x-3 hover:bg-red-50 transition-colors"
        >
          <div className="p-2 rounded-lg bg-gray-100 text-red-600">
            <LogOut className="w-5 h-5" />
          </div>
          <span className="flex-1 text-left font-medium text-red-600">
            Keluar
          </span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Version Info */}
      <div className="p-4 text-center">
        <p className="text-sm text-gray-500">
          ARVIN trade v1.0.0
        </p>
        <p className="text-xs text-gray-400 mt-1">
          © 2024 ARVIN trade. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
