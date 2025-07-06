
import React from 'react';
import Header from '@/components/Header';
import { Bell, Package, CreditCard, Gift, Star } from 'lucide-react';

const NotificationsPage = () => {
  const notifications = [
    {
      id: '1',
      type: 'order',
      title: 'Pesanan Dikirim',
      message: 'Pesanan ORD-001 sedang dalam perjalanan ke alamat Anda',
      time: '2 jam yang lalu',
      read: false,
      icon: Package
    },
    {
      id: '2',
      type: 'payment',
      title: 'Pembayaran Berhasil',
      message: 'Pembayaran untuk pesanan ORD-002 telah berhasil diproses',
      time: '5 jam yang lalu',
      read: false,
      icon: CreditCard
    },
    {
      id: '3',
      type: 'promo',
      title: 'Flash Sale Dimulai!',
      message: 'Dapatkan diskon hingga 70% untuk produk pilihan',
      time: '1 hari yang lalu',
      read: true,
      icon: Gift
    },
    {
      id: '4',
      type: 'review',
      title: 'Berikan Ulasan',
      message: 'Bagaimana pengalaman Anda dengan iPhone 14 Pro Max?',
      time: '2 hari yang lalu',
      read: true,
      icon: Star
    },
    {
      id: '5',
      type: 'order',
      title: 'Pesanan Selesai',
      message: 'Pesanan ORD-003 telah sampai. Terima kasih telah berbelanja!',
      time: '3 hari yang lalu',
      read: true,
      icon: Package
    }
  ];

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'text-blue-600 bg-blue-100';
      case 'payment':
        return 'text-green-600 bg-green-100';
      case 'promo':
        return 'text-orange-600 bg-orange-100';
      case 'review':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const markAsRead = (id: string) => {
    console.log(`Marking notification ${id} as read`);
  };

  const markAllAsRead = () => {
    console.log('Marking all notifications as read');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Notifikasi" showSearch={false} />
      
      {/* Header Actions */}
      <div className="bg-white p-4 border-b">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {unreadCount} notifikasi belum dibaca
          </span>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-[#00B894] font-medium"
            >
              Tandai Semua Dibaca
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-4 space-y-3">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <Bell className="w-20 h-20 text-gray-300 mb-4" />
            <h2 className="text-lg font-semibold text-gray-600 mb-2">
              Tidak Ada Notifikasi
            </h2>
            <p className="text-gray-500 text-center">
              Notifikasi Anda akan muncul di sini
            </p>
          </div>
        ) : (
          notifications.map((notification) => {
            const Icon = notification.icon;
            const colorClass = getNotificationColor(notification.type);
            
            return (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`bg-white rounded-lg p-4 shadow-sm cursor-pointer ${
                  !notification.read ? 'border-l-4 border-[#00B894]' : ''
                }`}
              >
                <div className="flex space-x-3">
                  <div className={`p-2 rounded-full ${colorClass} flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className={`text-sm font-medium ${
                        !notification.read ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-[#00B894] rounded-full flex-shrink-0 mt-1"></div>
                      )}
                    </div>
                    
                    <p className={`text-sm mt-1 ${
                      !notification.read ? 'text-gray-700' : 'text-gray-500'
                    }`}>
                      {notification.message}
                    </p>
                    
                    <p className="text-xs text-gray-400 mt-2">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
