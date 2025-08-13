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
    brands: true,
    advantages: true,
    variety: false,
    type: false,
    sellerType: false,
    rating: false,
    price: false
  });
  const [selectedAdvantages, setSelectedAdvantages] = useState([]);

  const categories = [
    'Elektronik',
    'Ayakkabı & Çanta',
    'Kozmetik',
    'Erkek',
    'Kadın',
    'Anne & Çocuk',
    'Ev & Yaşam'
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

  const handleAdvantageToggle = (advantage) => {
    setSelectedAdvantages(prev => 
      prev.includes(advantage) 
        ? prev.filter(a => a !== advantage)
        : [...prev, advantage]
    );
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-4 overflow-y-auto h-fit sticky top-4">
      {/* İlgili Kategoriler */}
      <div className="mb-4 border-b border-gray-200 pb-4">
        <div 
          className="flex items-center justify-between mb-3 cursor-pointer"
          onClick={() => toggleSection('categories')}
        >
          <h3 className="font-bold text-gray-900">İlgili Kategoriler</h3>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.categories ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
        
        {expandedSections.categories && (
          <>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {displayedCategories.map((category, index) => (
                <div 
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`text-sm cursor-pointer hover:text-orange-500 transition-colors ${
                    index === 4 && !showMoreCategories ? 'text-gray-500' : 
                    selectedCategory === category ? 'text-orange-500 font-medium' : 'text-gray-900'
                  }`}
                >
                  {category}
                </div>
              ))}
            </div>
            
            {!showMoreCategories && (
              <button 
                onClick={() => setShowMoreCategories(true)}
                className="mt-3 w-full bg-orange-500 text-white text-xs font-medium py-2 px-3 rounded hover:bg-orange-600 transition-colors"
              >
                DAHA FAZLA GÖSTER
              </button>
            )}
          </>
        )}
      </div>

      {/* Avantajlı Ürünler */}
      <div className="mb-4 border-b border-gray-200 pb-4">
        <div 
          className="flex items-center justify-between mb-3 cursor-pointer"
          onClick={() => toggleSection('advantages')}
        >
          <h3 className="font-bold text-gray-900">Avantajlı Ürünler</h3>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.advantages ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
        
        {expandedSections.advantages && (
          <div className="space-y-2">
            {['Süper Avantajlı Ürün', 'Çok Avantajlı Ürün', 'Avantajlı Ürün'].map((advantage) => (
              <div key={advantage} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={advantage}
                  checked={selectedAdvantages.includes(advantage)}
                  onChange={() => handleAdvantageToggle(advantage)}
                  className="w-4 h-4 border border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor={advantage} className="text-sm text-gray-900 cursor-pointer">
                  {advantage}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Marka */}
      <div className="mb-4 border-b border-gray-200 pb-4">
        <div 
          className="flex items-center justify-between mb-3 cursor-pointer"
          onClick={() => toggleSection('brands')}
        >
          <h3 className="font-bold text-gray-900">Marka</h3>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.brands ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
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
            
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filteredBrands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={brand}
                    checked={selectedBrand === brand}
                    onChange={() => handleBrandToggle(brand)}
                    className="w-4 h-4 border border-gray-300 rounded focus:ring-orange-500"
                  />
                  <label htmlFor={brand} className="text-sm text-gray-900 cursor-pointer">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Çeşit */}
      <div className="mb-4 border-b border-gray-200 pb-4">
        <div 
          className="flex items-center justify-between mb-3 cursor-pointer"
          onClick={() => toggleSection('variety')}
        >
          <h3 className="font-bold text-gray-900">Çeşit</h3>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.variety ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
      </div>

      {/* Türü */}
      <div className="mb-4 border-b border-gray-200 pb-4">
        <div 
          className="flex items-center justify-between mb-3 cursor-pointer"
          onClick={() => toggleSection('type')}
        >
          <h3 className="font-bold text-gray-900">Türü</h3>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.type ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
      </div>

      {/* Satıcı Tipi */}
      <div className="mb-4 border-b border-gray-200 pb-4">
        <div 
          className="flex items-center justify-between mb-3 cursor-pointer"
          onClick={() => toggleSection('sellerType')}
        >
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-gray-900">Satıcı Tipi</h3>
            <span className="text-xs text-gray-500 underline">Satıcı Tipi Nedir?</span>
          </div>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.sellerType ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
      </div>

      {/* Ürün Puanı */}
      <div className="mb-4 border-b border-gray-200 pb-4">
        <div 
          className="flex items-center justify-between mb-3 cursor-pointer"
          onClick={() => toggleSection('rating')}
        >
          <h3 className="font-bold text-gray-900">Ürün Puanı</h3>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.rating ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
      </div>

      {/* Fiyat */}
      <div className="mb-4">
        <div 
          className="flex items-center justify-between mb-3 cursor-pointer"
          onClick={() => toggleSection('price')}
        >
          <h3 className="font-bold text-gray-900">Fiyat</h3>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;