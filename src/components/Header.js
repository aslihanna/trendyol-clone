import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useShop } from '../context/ShopContext';
import CategoriesDropdown from './CategoriesDropdown';
import CategoriesModal from './CategoriesModal';

const SearchIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg> );
const UserIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> );
const HeartIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg> );
const CartIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg> );

const Header = () => {
  const { cart, searchTerm, setSearchTerm, totalCartItems } = useShop();
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      {/* Üst Bilgi Çubuğu */}
      <div className="hidden lg:block bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-end py-2">
            <div className="flex items-center space-x-6">
              <a href="#" className="text-xs text-gray-600 hover:text-orange-500 transition-colors">
                İndirim Kuponlarım
              </a>
              <a href="#" className="text-xs text-gray-600 hover:text-orange-500 transition-colors">
                Trendyol'da Satış Yap
              </a>
              <a href="#" className="text-xs text-gray-600 hover:text-orange-500 transition-colors">
                Hakkımızda
              </a>
              <a href="#" className="text-xs text-gray-600 hover:text-orange-500 transition-colors">
                Yardım & Destek
              </a>
            </div>
          </div>
        </div>
      </div>

              {/* Ana Navbar */}
        <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
            
            {/* Sol taraf - Logo */}
            <div className="flex items-center lg:-ml-20">
              {/* Mobil Menü İkonu */}
              <button className="lg:hidden -mr-6 p-1 flex flex-col items-center">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M6 12h12M4 18h16" />
                </svg>
                <span className="text-[10px] text-gray-700 -mt-1">menü</span>
              </button>
              {/* Logo */}
              <Link href="/" aria-label="Anasayfa" className="flex items-center -mt-2 -ml-1">
                <Image 
                  src="/trendyol-simple.svg" 
                  alt="trendyol" 
                  width={180} 
                  height={50} 
                  className="h-8 sm:h-10 lg:h-20 w-auto"
                />
            </Link>
          </div>

            {/* Orta - Arama */}
            <div className="hidden md:flex flex-1 max-w-xl lg:-ml-20">
            <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Aradığınız ürün, kategori veya markayı yazınız"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      // Arama işlemi otomatik olarak yapılır
                    }
                  }}
                  className="w-full pl-10 pr-12 py-2 lg:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <SearchIcon />
              </div>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
            </div>
          </div>

                        {/* Sağ taraf - İkonlar */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              
              {/* Mobilde arama ikonu, webde giriş ikonu */}
              <Link href="/search" className="lg:hidden flex items-center text-gray-700 hover:text-orange-500 transition-colors">
                <SearchIcon />
                <span className="hidden sm:inline ml-1 text-sm font-medium">Ara</span>
              </Link>
              
              <Link href="/login" className="hidden lg:flex items-center text-gray-700 hover:text-orange-500 transition-colors">
                <UserIcon />
                <span className="hidden sm:inline ml-1 text-sm font-medium">Giriş Yap</span>
              </Link>
              
              <Link href="/favorites" className="flex items-center text-gray-700 hover:text-orange-500 transition-colors">
                <HeartIcon />
                <span className="hidden sm:inline ml-1 text-sm font-medium">Favorilerim</span>
              </Link>
              
              <Link href="/cart" className="relative flex items-center text-gray-700 hover:text-orange-500 transition-colors">
                <CartIcon />
                <span className="hidden sm:inline ml-1 text-sm font-medium">Sepetim</span>
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
              </Link>
            </div>
        </div>

          {/* Alt Kategori Menüsü */}
          <div className="hidden lg:flex items-center justify-between py-2 border-t border-gray-100">
            <button
              onClick={() => setIsCategoriesModalOpen(true)}
              className="flex items-center text-gray-700 hover:text-orange-500 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="text-sm font-bold uppercase">TÜM KATEGORİLER</span>
              <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">Yeni</span>
            </button>
            
            <div className="flex items-center space-x-6 overflow-x-auto scrollbar-hide px-2">
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors border-b-2 border-orange-500 pb-1">
                Kadın
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
                Erkek
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
                Anne & Çocuk
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
                Ev & Yaşam
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
                Süpermarket
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
                Kozmetik
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
                Ayakkabı & Çanta
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
                Elektronik
              </a>
              <a href="#" className="flex items-center text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
                <span className="text-yellow-500 mr-1">🏆</span>
                Çok Satanlar
              </a>
              <a href="#" className="flex items-center text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
                <span className="text-red-500 mr-1">⚡</span>
                Flaş Ürünler
              </a>
            </div>
          </div>
      </div>
      

      
      <CategoriesModal 
        isOpen={isCategoriesModalOpen} 
        onClose={() => setIsCategoriesModalOpen(false)} 
      />
    </header>
  );
};

export default Header;