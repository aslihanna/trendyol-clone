import React from 'react';

// İkonlar için SVG'ler
const FilterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M3 8h18M3 12h18M3 16h18M3 20h18" transform="rotate(90 12 12)"/>
    </svg>
);

const SortIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9M3 12h9M3 16h5" />
    </svg>
);

const MobileFilterBar = ({ onFilterClick, onSortClick }) => {
  return (
    // md:hidden -> Bu bar, medium (tablet) ve daha büyük ekranlarda GİZLENECEK.
    <div className="md:hidden sticky top-0 bg-gray-50 z-10 py-2 mb-4 px-3 sm:px-4">
      <div className="flex space-x-2">
        <button 
          onClick={onFilterClick}
          className="flex-1 flex items-center justify-center bg-white border border-gray-300 rounded-md py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <FilterIcon />
          <span className="ml-1">Filtrele</span>
        </button>
        <button 
          onClick={onSortClick}
          className="flex-1 flex items-center justify-center bg-white border border-gray-300 rounded-md py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <SortIcon />
          <span className="ml-1">Sırala</span>
        </button>
      </div>
    </div>
  );
};

export default MobileFilterBar;