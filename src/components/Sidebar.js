import React, { useState } from 'react';

const Sidebar = ({ 
  selectedCategory, 
  setSelectedCategory, 
  selectedBrand, 
  setSelectedBrand,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy
}) => {
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [brandSearch, setBrandSearch] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: false,
    sizes: false,
    variety: false,
    type: false,
    sellerType: false,
    rating: false,
    price: false
  });

  const categories = [
    'Elektronik',
    'Ayakkabı & Çanta',
    'Kozmetik',
    'Erkek',
    'Kadın',
    'Anne & Çocuk',
    'Ev & Yaşam',
    'Spor & Outdoor',
    'Kitap & Hobi',
    'Otomotiv',
    'Bahçe & Yapı Market'
  ];

  const brands = [
    'Apple',
    'Bershka',
    'MSI',
    'Nike',
    'Louis Vuitton',
    'La Mer',
    'Chanel',
    'Giorgio Armani',
    'Tom Ford',
    'Christian Dior',
    'Gucci',
    'Pampers',
    'LEGO',
    'Dyson',
    'IKEA'
  ];

  const sizes = [
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL'
  ];

  const displayedCategories = showMoreCategories ? categories : categories.slice(0, 5);
  const filteredBrands = brands.filter(brand => 
    brand.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrand(selectedBrand === brand ? '' : brand);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };



  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-2 sm:p-3 lg:p-6 overflow-y-auto h-fit sticky top-4 custom-scrollbar pr-2 max-h-screen">
      {/* İlgili Kategoriler */}
      <div className="mb-2 border-b border-gray-200 pb-2">
        <div 
          className="flex items-center justify-between mb-2 cursor-pointer"
          onClick={() => toggleSection('categories')}
        >
          <h3 className="font-bold text-gray-900 text-sm sm:text-base">İLGİLİ KATEGORİLER</h3>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.categories ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {expandedSections.categories && (
          <>
            <div className="space-y-0.5 sm:space-y-1">
              {displayedCategories.map((category, index) => (
                <div 
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`text-xs sm:text-sm cursor-pointer hover:text-orange-500 transition-colors ${
                    index === 4 && !showMoreCategories ? 'text-gray-500' : 
                    selectedCategory === category ? 'text-orange-500 font-medium' : 'text-gray-900'
                  }`}
                >
                  {category}
                </div>
              ))}
            </div>
            
            {!showMoreCategories && (
              <div className="mt-2 text-center">
                <span 
                  onClick={() => setShowMoreCategories(true)}
                  className="text-orange-500 text-xs font-bold cursor-pointer hover:text-orange-600 transition-colors"
                >
                  DAHA FAZLA GÖSTER
                </span>
              </div>
            )}
          </>
        )}
      </div>



      {/* Marka */}
      <div className="mb-2 border-b border-gray-200 pb-2">
        <div 
          className="flex items-center justify-between mb-2 cursor-pointer"
          onClick={() => toggleSection('brands')}
        >
          <h3 className="font-bold text-gray-900 text-sm sm:text-base">Marka</h3>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.brands ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {expandedSections.brands && (
          <>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Marka ara"
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
      </div>

            <div className="space-y-0.5 sm:space-y-1 max-h-48 overflow-y-auto custom-scrollbar pr-2">
              {filteredBrands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id={brand} 
                    checked={selectedBrand === brand}
                    onChange={() => handleBrandToggle(brand)}
                    className="w-3 h-3 sm:w-4 sm:h-4 border border-gray-300 rounded focus:ring-orange-500"
                  />
                  <label htmlFor={brand} className="text-xs sm:text-sm text-gray-900 cursor-pointer">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Beden */}
      <div className="mb-4 border-b border-gray-200 pb-4">
        <div 
          className="flex items-center justify-between mb-3 cursor-pointer"
          onClick={() => toggleSection('sizes')}
        >
          <h3 className="font-bold text-gray-900 text-sm sm:text-base">Beden</h3>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.sizes ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {expandedSections.sizes && (
          <div className="space-y-1 sm:space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
            {sizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={size}
                  className="w-3 h-3 sm:w-4 sm:h-4 border border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor={size} className="text-xs sm:text-sm text-gray-900 cursor-pointer">
                  {size}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Çeşit */}
      <div className="mb-4 border-b border-gray-200 pb-4">
        <div 
          className="flex items-center justify-between mb-3 cursor-pointer"
          onClick={() => toggleSection('variety')}
        >
          <h3 className="font-bold text-gray-900 text-sm sm:text-base">Çeşit</h3>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.variety ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {expandedSections.variety && (
          <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
            {sizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={size}
                  className="w-4 h-4 border border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor={size} className="text-sm text-gray-900 cursor-pointer">
                  {size}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Türü */}
      <div className="mb-4 border-b border-gray-200 pb-4">
        <div 
          className="flex items-center justify-between mb-3 cursor-pointer"
          onClick={() => toggleSection('type')}
        >
          <h3 className="font-bold text-gray-900 text-sm sm:text-base">Türü</h3>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.type ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {expandedSections.type && (
          <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
            {['Spor', 'Günlük', 'Resmi', 'Özel'].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={type}
                  className="w-4 h-4 border border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor={type} className="text-sm text-gray-900 cursor-pointer">
                  {type}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Satıcı Tipi */}
      <div className="mb-4 border-b border-gray-200 pb-4">
        <div 
          className="flex items-center justify-between mb-3 cursor-pointer"
          onClick={() => toggleSection('sellerType')}
        >
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-gray-900 text-sm sm:text-base">Satıcı Tipi</h3>
            <span className="text-xs text-gray-500 underline hidden sm:inline">Satıcı Tipi Nedir?</span>
          </div>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.sellerType ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
      </div>

        {expandedSections.sellerType && (
          <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
            {['Trendyol', 'Mağaza', 'Özel Satıcı'].map((seller) => (
              <div key={seller} className="flex items-center space-x-2">
    <input 
                  type="checkbox"
                  id={seller}
                  className="w-4 h-4 border border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor={seller} className="text-sm text-gray-900 cursor-pointer">
                  {seller}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ürün Puanı */}
      <div className="mb-4 border-b border-gray-200 pb-4">
        <div 
          className="flex items-center justify-between mb-3 cursor-pointer"
          onClick={() => toggleSection('rating')}
        >
          <h3 className="font-bold text-gray-900 text-sm sm:text-base">Ürün Puanı</h3>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.rating ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Fiyat */}
      <div className="mb-4">
        <div 
          className="flex items-center justify-between mb-3 cursor-pointer"
          onClick={() => toggleSection('price')}
        >
          <h3 className="font-bold text-gray-900 text-sm sm:text-base">Fiyat</h3>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
    </div>
    </div>
  );
};

export default Sidebar;