import React from 'react';

// İkonlar için SVG'ler
const FilterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
);

const SortIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
    </svg>
);

const MobileFilterBar = ({ 
  onFilterClick, 
  onSortClick, 
  hasActiveFilters, 
  onClearFilters,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy
}) => {
  return (
    // md:hidden -> Bu bar, medium (tablet) ve daha büyük ekranlarda GİZLENECEK.
    <div className="md:hidden sticky top-0 bg-white border-b border-gray-200 z-10 py-2 mb-4">
      {/* Ana filtre/sıralama bar */}
      <div className="flex items-center px-4">
        <button 
          onClick={onSortClick}
          className="flex items-center text-sm font-medium text-gray-900 ml-4"
        >
          <SortIcon />
          <span>Önerilen</span>
        </button>
        <div className="flex-1 flex justify-center">
          <div className="w-px h-6 bg-gray-300"></div>
        </div>
        <button 
          onClick={onFilterClick}
          className="flex items-center text-sm font-medium text-gray-900 mr-8"
        >
          <FilterIcon />
          <span>
            Filtrele {hasActiveFilters && <span className="text-orange-500">(1)</span>}
          </span>
        </button>
      </div>
      
      {/* Yatay kaydırılabilir filtre butonları */}
      <div className="flex space-x-2 px-4 overflow-x-auto scrollbar-hide mt-2">
        <button 
          onClick={onFilterClick}
          className={`flex items-center px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            selectedCategory 
              ? 'bg-orange-50 border border-orange-300 text-gray-900' 
              : 'bg-white border border-gray-200 text-gray-900 hover:border-gray-300'
          }`}
        >
          Kategori 
          <svg className="w-3 h-3 text-orange-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <button 
          onClick={onFilterClick}
          className={`flex items-center px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            selectedBrand 
              ? 'bg-orange-50 border border-orange-300 text-gray-900' 
              : 'bg-white border border-gray-200 text-gray-900 hover:border-gray-300'
          }`}
        >
          Marka 
          <svg className="w-3 h-3 text-orange-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <button 
          onClick={onFilterClick}
          className="flex items-center bg-white border border-gray-200 text-gray-900 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap hover:border-gray-300 transition-colors"
        >
          Çeşit 
          <svg className="w-3 h-3 text-orange-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <button 
          onClick={onFilterClick}
          className="flex items-center bg-white border border-gray-200 text-gray-900 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap hover:border-gray-300 transition-colors"
        >
          Türü 
          <svg className="w-3 h-3 text-orange-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <button 
          onClick={onFilterClick}
          className={`flex items-center px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            priceRange.min || priceRange.max
              ? 'bg-orange-50 border border-orange-300 text-gray-900' 
              : 'bg-white border border-gray-200 text-gray-900 hover:border-gray-300'
          }`}
        >
          Fiyat 
          <svg className="w-3 h-3 text-orange-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MobileFilterBar;