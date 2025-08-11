import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useShop } from '../context/ShopContext';

const SearchIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg> );
const UserIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> );
const HeartIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg> );
const CartIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg> );

const Header = () => {
  const { cart, searchTerm, setSearchTerm, totalCartItems } = useShop();
  const navLinks = ["Kadın", "Erkek", "Anne & Çocuk", "Ev & Yaşam", "Süpermarket", "Kozmetik", "Ayakkabı & Çanta", "Elektronik", "Çok Satanlar"];

  const createSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/ & /g, '-')
      .replace(/ /g, '-')
      .replace(/&/g, '-')
      .replace(/ç/g, 'c')
      .replace(/ı/g, 'i')
      .replace(/ğ/g, 'g')
      .replace(/ö/g, 'o')
      .replace(/ş/g, 's')
      .replace(/ü/g, 'u');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex-shrink-0">
            <Link href="/" aria-label="Anasayfa">
              <Image src="/trendyol-logo.svg" alt="Trendyol Logo" width={120} height={35} className="w-24 sm:w-28 md:w-36" priority />
            </Link>
          </div>

          <div className="flex-1 max-w-xl mx-4 hidden md:flex">
            <div className="relative w-full">
              <input type="text" placeholder="Aradığınız ürün, kategori veya markayı yazınız" className="w-full bg-gray-100 border border-gray-200 rounded-md py-2.5 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-orange-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <SearchIcon />
              </div>
            </div>
          </div>

          <div className="md:hidden flex-1 mx-2">
            <div className="relative w-full">
              <input type="text" placeholder="Ara..." className="w-full bg-gray-100 border border-gray-200 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SearchIcon />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-6 text-sm">
            <Link href="/login" className="hidden md:flex items-center space-x-1 hover:text-orange-500">
              <UserIcon />
              <span>Giriş Yap</span>
            </Link>
            <Link href="/favorites" className="hidden md:flex items-center space-x-1 hover:text-orange-500">
              <HeartIcon />
              <span>Favorilerim</span>
            </Link>
            <Link href="/cart" className="relative flex items-center space-x-1 hover:text-orange-500">
              <CartIcon />
              <span className="hidden sm:inline">Sepetim</span>
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        <nav className="hidden md:flex items-center justify-between h-10 text-sm border-t">
          {navLinks.map((linkText) => {
            const slug = createSlug(linkText);
            return (
              <Link
                key={linkText}
                href={`/${slug}`}
                className={`py-2 border-b-2 font-medium transition-colors duration-200 
                  ${linkText === 'Çok Satanlar'
                    ? 'text-red-600 border-red-600'
                    : 'text-gray-600 border-transparent hover:text-orange-500 hover:border-orange-500'}`
                }
              >
                {linkText}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;