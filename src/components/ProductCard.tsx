
import React from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  sold: number;
  discount?: number;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addItem } = useCart();

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
      name: product.name,
      price: product.price,
      image: product.image
    });
    console.log('Added to cart:', product.name);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-32 object-cover rounded-t-lg"
        />
        
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            {product.badge}
          </div>
        )}

        {/* Discount */}
        {product.discount && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
            -{product.discount}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log('Added to wishlist:', product.name);
          }}
          className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full hover:bg-white transition-colors"
        >
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </button>
      </div>

      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center space-x-1 mb-2">
          <Star className="w-3 h-3 text-yellow-500 fill-current" />
          <span className="text-xs text-gray-600">{product.rating}</span>
          <span className="text-xs text-gray-500">| {product.sold} terjual</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-[#00B894]">
              {formatCurrency(product.price)}
            </p>
            {product.originalPrice && (
              <p className="text-xs text-gray-500 line-through">
                {formatCurrency(product.originalPrice)}
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
