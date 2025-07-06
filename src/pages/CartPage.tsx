
import React from 'react';
import Header from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout with items:', items);
    // Add checkout logic here
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Keranjang Belanja" showSearch={false} />
        
        <div className="flex flex-col items-center justify-center h-96">
          <ShoppingBag className="w-20 h-20 text-gray-300 mb-4" />
          <h2 className="text-lg font-semibold text-gray-600 mb-2">
            Keranjang Anda Kosong
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Mulai belanja dan tambahkan produk ke keranjang Anda
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#00B894] text-white px-6 py-3 rounded-lg font-medium"
          >
            Mulai Belanja
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Keranjang Belanja" showSearch={false} />
      
      <div className="p-4 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex space-x-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  {item.name}
                </h3>
                {item.variant && (
                  <p className="text-xs text-gray-500 mb-2">
                    Varian: {item.variant}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#00B894]">
                    {formatCurrency(item.price)}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-medium">
                    Subtotal: {formatCurrency(item.price * item.quantity)}
                  </span>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Summary */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Ringkasan Belanja</h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>{formatCurrency(getTotalPrice())}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ongkos Kirim</span>
              <span className="text-green-600">Gratis</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-[#00B894] text-lg">
                  {formatCurrency(getTotalPrice())}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Checkout Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4 z-40">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-lg font-bold text-[#00B894]">
              {formatCurrency(getTotalPrice())}
            </p>
          </div>
          <button
            onClick={handleCheckout}
            className="bg-[#00B894] text-white px-8 py-3 rounded-lg font-medium"
          >
            Checkout ({items.length} item)
          </button>
        </div>
      </div>

      <div className="h-24"></div> {/* Spacer for bottom bars */}
    </div>
  );
};

export default CartPage;
