import React from 'react';
import Image from 'next/image';
import { useShop } from '../context/ShopContext';

const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;

const HeartIcon = ({ isFavorite }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

const ProductCard = ({ product, onQuickViewClick }) => {
  const { toggleFavorite, addToCart, isFavorite } = useShop();

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden group relative flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className="relative bg-gray-50">
        <div className="w-full h-40 relative overflow-hidden">
          <Image 
            src={product.imageUrl} 
            alt={product.name} 
            fill
            className="object-contain hover:object-cover transition-all duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
            priority={product.id <= 8}
          />
        </div>
        
        <button 
          onClick={() => toggleFavorite(product.id)} 
          className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-white rounded-full p-1 sm:p-1.5 shadow-md opacity-80 hover:opacity-100 z-10"
        >
          <HeartIcon isFavorite={isFavorite(product.id)} />
        </button>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button onClick={() => onQuickViewClick(product)} className="flex items-center bg-white text-xs sm:text-sm font-semibold px-2 sm:px-4 py-1.5 sm:py-2 rounded-md shadow-lg">
            <EyeIcon />
            <span className="ml-1 sm:ml-2">Hızlı Gözat</span>
          </button>
        </div>

        {product.hasFastShipping && <span className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-green-500 text-white text-xs font-bold px-1 sm:px-2 py-0.5 sm:py-1 rounded z-10">Hızlı Teslimat</span>}
      </div>

      <div className="p-3 flex-grow flex flex-col">
        <div className="mb-2">
          <p className="text-sm font-semibold text-gray-900 mb-1">{product.brand}</p>
          <p className="text-xs text-gray-600 line-clamp-2" title={product.name}>
            {product.name}
          </p>
        </div>
        
        <div className="mt-auto">
          <div className="flex flex-col gap-1 mb-2">
            <span className="text-sm font-bold text-orange-600">
              {product.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                {product.originalPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL
              </span>
            )}
          </div>
          
          {product.originalPrice && (
            <div className="text-xs text-green-600 font-medium">
              %{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)} İndirim
            </div>
          )}
        </div>
      </div>
      
      <button 
        onClick={() => addToCart(product)}
        className="absolute bottom-0 left-0 w-full bg-orange-500 text-white py-2 font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm hover:bg-orange-600 transform translate-y-full group-hover:translate-y-0"
      >
        Sepete Ekle
      </button>
    </div>
  );
};

export default ProductCard;