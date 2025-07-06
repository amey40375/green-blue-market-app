
import React from 'react';
import { Wallet, Gift, ArrowRight } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const UserBalance = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const quickActions = [
    { id: 'transfer', label: 'Transfer', icon: '💸', color: 'bg-blue-100 text-blue-600' },
    { id: 'topup', label: 'Top Up', icon: '💰', color: 'bg-green-100 text-green-600' },
    { id: 'voucher', label: 'Voucher', icon: '🎫', color: 'bg-purple-100 text-purple-600' },
    { id: 'checkin', label: 'Check-in', icon: '📅', color: 'bg-orange-100 text-orange-600' },
  ];

  const handleAction = (actionId: string) => {
    console.log(`${actionId} clicked`);
    // Add specific navigation or action logic here
  };

  return (
    <div className="bg-gradient-to-r from-[#002D62] to-[#00B894] p-4 mx-4 rounded-xl text-white mb-4">
      {/* Balance Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm opacity-90">Saldo Anda</p>
            <p className="text-xl font-bold">{formatCurrency(user.balance)}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1">
            <Gift className="w-4 h-4" />
            <span className="text-sm">{user.points.toLocaleString()} Poin</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleAction(action.id)}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex flex-col items-center space-y-2 hover:bg-white/20 transition-colors"
          >
            <span className="text-lg">{action.icon}</span>
            <span className="text-xs font-medium text-center">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserBalance;
