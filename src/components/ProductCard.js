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
    <div className="border rounded-lg overflow-hidden group relative flex flex-col">
      <div className="relative">
        <div className="w-full h-48 sm:h-64 md:h-80 relative">
          <Image 
            src={product.imageUrl} 
            alt={product.name} 
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
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

      <div className="p-2 sm:p-3 md:p-4 flex-grow flex flex-col">
        <p className="text-xs sm:text-sm">
          <span className="font-bold">{product.brand}</span>
          <span className="text-gray-600 truncate block" title={product.name}>
            {product.name.length > 25 ? product.name.substring(0, 25) + '...' : product.name}
          </span>
        </p>
        <div className="mt-1 sm:mt-2"><span className="text-sm sm:text-lg font-bold text-orange-600">{product.price.toFixed(2)} TL</span>{product.originalPrice && <span className="text-xs sm:text-sm text-gray-500 line-through ml-1 sm:ml-2">{product.originalPrice.toFixed(2)} TL</span>}</div>
      </div>
      
      <button 
        onClick={() => addToCart(product)}
        className="absolute bottom-0 left-0 w-full bg-orange-500 text-white py-2 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm sm:text-base"
      >
        Sepete Ekle
      </button>
    </div>
  );
};

export default ProductCard;