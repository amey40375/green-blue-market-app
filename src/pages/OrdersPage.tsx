
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-05',
      status: 'delivered',
      total: 15999000,
      items: [
        {
          name: 'iPhone 14 Pro Max 256GB',
          image: '/placeholder.svg',
          price: 15999000,
          quantity: 1
        }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-03',
      status: 'shipping',
      total: 2099000,
      items: [
        {
          name: 'Nike Air Jordan 1 Mid',
          image: '/placeholder.svg',
          price: 2099000,
          quantity: 1
        }
      ]
    },
    {
      id: 'ORD-003',
      date: '2024-01-01',
      status: 'processing',
      total: 4299000,
      items: [
        {
          name: 'Sony WH-1000XM4',
          image: '/placeholder.svg',
          price: 4299000,
          quantity: 1
        }
      ]
    }
  ];

  const tabs = [
    { id: 'all', label: 'Semua', count: orders.length },
    { id: 'processing', label: 'Diproses', count: 1 },
    { id: 'shipping', label: 'Dikirim', count: 1 },
    { id: 'delivered', label: 'Selesai', count: 1 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'processing':
        return { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Diproses' };
      case 'shipping':
        return { icon: Truck, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Dikirim' };
      case 'delivered':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Selesai' };
      default:
        return { icon: Package, color: 'text-gray-600', bg: 'bg-gray-100', label: 'Unknown' };
    }
  };

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Pesanan Saya" showSearch={false} />
      
      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === tab.id
                  ? 'border-[#00B894] text-[#00B894]'
                  : 'border-transparent text-gray-500'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <Package className="w-20 h-20 text-gray-300 mb-4" />
            <h2 className="text-lg font-semibold text-gray-600 mb-2">
              Tidak Ada Pesanan
            </h2>
            <p className="text-gray-500 text-center">
              Pesanan Anda akan muncul di sini
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon;
            
            return (
              <div key={order.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${statusInfo.bg}`}>
                    <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                    <span className={`text-sm font-medium ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                </div>
                
                {order.items.map((item, index) => (
                  <div key={index} className="flex space-x-3 mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.quantity}x • {formatCurrency(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-sm text-gray-600">Total Pesanan</span>
                  <span className="text-lg font-bold text-[#00B894]">
                    {formatCurrency(order.total)}
                  </span>
                </div>
                
                <div className="flex space-x-2 mt-3">
                  <button className="flex-1 py-2 border border-[#00B894] text-[#00B894] rounded-lg text-sm font-medium">
                    Lacak Pesanan
                  </button>
                  {order.status === 'delivered' && (
                    <button className="flex-1 py-2 bg-[#00B894] text-white rounded-lg text-sm font-medium">
                      Beli Lagi
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
