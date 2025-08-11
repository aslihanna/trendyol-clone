import React, { useState } from 'react';
import { brands, categories } from '../data/products';

const Sidebar = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState(5000);

  // Marka seçimini yöneten fonksiyon (gerçek filtreleme burada yapılmaz, sadece state yönetilir)
  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  return (
    <aside className="w-full md:w-64 lg:w-72 pr-4">
      {/* Kategoriler */}
      <div className="p-4 mb-4 border rounded-lg">
        <h3 className="font-bold mb-2 text-gray-800">İlgili Kategoriler</h3>
        <ul className="space-y-1">
          {categories.map(category => (
            <li key={category}><a href="#" className="text-sm text-gray-600 hover:text-orange-600">{category}</a></li>
          ))}
        </ul>
        <a href="#" className="text-sm text-gray-500 mt-2 inline-block">DAHA FAZLA GÖSTER</a>
      </div>

      {/* Marka Filtresi */}
      <div className="p-4 mb-4 border rounded-lg">
        <h3 className="font-bold mb-2 text-gray-800">Marka</h3>
        <input type="text" placeholder="Marka ara" className="w-full p-2 border rounded-md mb-2 text-sm" />
        <ul className="space-y-2 h-48 overflow-y-auto">
          {brands.map(brand => (
            <li key={brand} className="flex items-center">
              <input 
                type="checkbox" 
                id={brand} 
                className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
              <label htmlFor={brand} className="ml-2 text-sm text-gray-600">{brand}</label>
            </li>
          ))}
        </ul>
      </div>

      {/* Fiyat Aralığı */}
      <div className="p-4 border rounded-lg">
    <h3 className="font-bold mb-4 text-gray-800">Fiyat</h3>
    <input 
        type="range" 
        min="0" 
        max="5000" 
        step="50"
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
    />
    <div className="flex justify-between text-sm text-gray-600 mt-2">
        <span>0 TL</span>
        <span>{priceRange} TL</span>
    </div>
    {/* BU BUTONU SİLİN VEYA YORUM SATIRINA ALIN */}
    {/* <button className="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">FİLTRELE</button> */}
    </div>
    </aside>
  );
};

export default Sidebar;