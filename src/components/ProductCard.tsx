
import React from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: string;
  nama: string;
  harga: number;
  foto_url?: string;
  diskon?: number;
  kategori: string;
  stok?: number;
  deskripsi?: string;
  // Legacy support for existing product structure
  name?: string;
  price?: number;
  originalPrice?: number;
  image?: string;
  rating?: number;
  sold?: number;
  discount?: number;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  // Support both new (Supabase) and old (dummy) data structures
  const productName = product.nama || product.name || '';
  const productPrice = product.harga || product.price || 0;
  const productImage = product.foto_url || product.image || '/placeholder.svg';
  const productDiscount = product.diskon || product.discount || 0;
  const productRating = product.rating || 4.5;
  const productSold = product.sold || 0;
  const originalPrice = product.originalPrice || (productDiscount > 0 ? productPrice / (1 - productDiscount / 100) : undefined);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: productName,
      price: productPrice,
      image: productImage
    });
    console.log('Added to cart:', productName);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="relative">
        <img
          src={productImage}
          alt={productName}
          className="w-full h-32 object-cover rounded-t-lg"
        />
        
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            {product.badge}
          </div>
        )}

        {/* Discount */}
        {productDiscount > 0 && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
            -{productDiscount}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log('Added to wishlist:', productName);
          }}
          className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full hover:bg-white transition-colors"
        >
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </button>
      </div>

      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
          {productName}
        </h3>

        <div className="flex items-center space-x-1 mb-2">
          <Star className="w-3 h-3 text-yellow-500 fill-current" />
          <span className="text-xs text-gray-600">{productRating}</span>
          {productSold > 0 && (
            <span className="text-xs text-gray-500">| {productSold} terjual</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-[#00B894]">
              {formatCurrency(productPrice)}
            </p>
            {originalPrice && originalPrice > productPrice && (
              <p className="text-xs text-gray-500 line-through">
                {formatCurrency(originalPrice)}
              </p>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-[#00B894] text-white p-1.5 rounded-lg hover:bg-[#00A085] transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
