
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share, Star, ShoppingCart, MessageCircle, Shield, Truck } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState('256GB');
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: id || '1',
    name: 'iPhone 14 Pro Max - Premium Smartphone with Advanced Camera System',
    price: 15999000,
    originalPrice: 18999000,
    discount: 16,
    rating: 4.8,
    reviews: 2847,
    sold: 1500,
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    variants: ['128GB', '256GB', '512GB', '1TB'],
    colors: ['Space Black', 'Deep Purple', 'Gold', 'Silver'],
    description: 'iPhone 14 Pro Max memiliki sistem kamera Pro yang revolusioner, Dynamic Island yang dapat disesuaikan, dan fitur keamanan yang dapat menyelamatkan nyawa.',
    specifications: [
      { key: 'Layar', value: '6.7" Super Retina XDR' },
      { key: 'Prosesor', value: 'A16 Bionic Chip' },
      { key: 'Kamera', value: '48MP Main + 12MP Ultra Wide' },
      { key: 'Baterai', value: 'Hingga 29 jam video playback' },
      { key: 'Storage', value: '128GB - 1TB' },
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedVariant}`,
      name: `${product.name} ${selectedVariant}`,
      price: product.price,
      image: product.images[0],
      variant: selectedVariant
    });
    console.log('Added to cart:', product.name, selectedVariant);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Share className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Heart className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Images */}
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-80 object-cover"
        />
        <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
          -{product.discount}%
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({product.reviews} ulasan)</span>
          <span className="text-sm text-gray-500">• {product.sold} terjual</span>
        </div>

        <h1 className="text-lg font-semibold text-gray-900 mb-3">
          {product.name}
        </h1>

        <div className="flex items-center space-x-3 mb-4">
          <span className="text-2xl font-bold text-[#00B894]">
            {formatCurrency(product.price)}
          </span>
          <span className="text-lg text-gray-500 line-through">
            {formatCurrency(product.originalPrice)}
          </span>
        </div>

        {/* Variants */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Storage:</h3>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant}
                onClick={() => setSelectedVariant(variant)}
                className={`px-3 py-2 border rounded-lg text-sm ${
                  selectedVariant === variant
                    ? 'border-[#00B894] bg-[#00B894]/10 text-[#00B894]'
                    : 'border-gray-300 text-gray-600'
                }`}
              >
                {variant}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Warna:</h3>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600"
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col items-center text-center">
            <Truck className="w-5 h-5 text-[#00B894] mb-1" />
            <span className="text-xs text-gray-600">Gratis Ongkir</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Shield className="w-5 h-5 text-[#00B894] mb-1" />
            <span className="text-xs text-gray-600">Garansi Resmi</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <MessageCircle className="w-5 h-5 text-[#00B894] mb-1" />
            <span className="text-xs text-gray-600">Chat Penjual</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Deskripsi Produk</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Specifications */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Spesifikasi</h3>
          <div className="space-y-2">
            {product.specifications.map((spec, index) => (
              <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">{spec.key}</span>
                <span className="text-sm font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
        <div className="flex space-x-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-[#00B894]/10 text-[#00B894] py-3 rounded-lg font-medium border border-[#00B894]"
          >
            Tambah ke Keranjang
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-[#00B894] text-white py-3 rounded-lg font-medium"
          >
            Beli Sekarang
          </button>
        </div>
      </div>

      <div className="h-20"></div> {/* Spacer for bottom bar */}
    </div>
  );
};

export default ProductPage;
