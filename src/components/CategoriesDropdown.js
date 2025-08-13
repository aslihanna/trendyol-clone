import { useState, useRef, useEffect } from 'react';
import { categories } from '../data/products';

const CategoriesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (category) => {
    console.log('Seçilen kategori:', category);
    setIsOpen(false);
  };

  const categoryIcons = {
    'Elektronik': '📱',
    'Ayakkabı & Çanta': '👟',
    'Kozmetik': '💄',
    'Erkek': '👔',
    'Kadın': '👗',
    'Anne & Çocuk': '👶',
    'Ev & Yaşam': '🏠'
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-50"
      >
        <span className="text-lg">☰</span>
        <span className="hidden sm:inline text-sm font-medium">Tüm Kategoriler</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Tüm Kategoriler
            </h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-colors duration-200"
                >
                  <span className="text-lg">{categoryIcons[category] || '📦'}</span>
                  <span className="text-sm font-medium">{category}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesDropdown;
