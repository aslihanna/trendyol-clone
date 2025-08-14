import React from 'react';
import Image from 'next/image';
import { useShop } from '../context/ShopContext';

const HeartIcon = ({ isFavorite }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

const ProductCard = ({ product, onQuickViewClick }) => {
  const { toggleFavorite, addToCart, isFavorite } = useShop();

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden group relative flex flex-col hover:shadow-lg transition-shadow duration-300 h-full">
      <div className="relative bg-gray-50">
        <div className="w-full h-40 sm:h-48 lg:h-56 relative overflow-hidden">
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



        {product.hasFastShipping && (
          <div className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg z-10 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
            <div className="flex flex-col leading-tight">
              <span>HIZLI</span>
              <span>TESLİMAT</span>
            </div>
          </div>
        )}
        {product.hasGift && <span className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-yellow-500 text-white text-xs font-bold px-1 sm:px-2 py-0.5 sm:py-1 rounded z-10">DUŞ LIFI HEDİYE!</span>}
        {product.isSponsored && <span className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 bg-gray-500 text-white text-xs font-bold px-1 sm:px-2 py-0.5 sm:py-1 rounded z-10">Sponsorlu</span>}
        {product.packSize && (
          <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-green-700 text-white text-xs font-bold px-1 sm:px-2 py-0.5 sm:py-1 rounded z-10">
            {product.packSize}
          </div>
        )}
      </div>

      <div className="p-2 sm:p-3 lg:p-4 flex-grow flex flex-col">
        <div className="mb-2">
          <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">{product.brand}</p>
          <p className="text-xs text-gray-600 line-clamp-2 break-words" title={product.name}>
            {product.name}
          </p>
          
          {/* Puan ve Değerlendirme */}
          <div className="flex items-center mt-2 space-x-1">
            <span className="text-sm font-medium text-gray-900">{product.rating}</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-3 h-3 ${index < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-600">({product.reviewCount})</span>
            <svg className="w-4 h-4 text-gray-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4h-3.17L15 2H9L7.17 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6C22 4.9 21.1 4 20 4zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5S14.76 17 12 17z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
        </div>
      
        <div className="mt-auto">
          <div className="flex flex-col gap-1 mb-2">
            <span className="text-xs sm:text-sm font-bold text-orange-600">
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
    </div>
  );
};

export default ProductCard;