import { useState } from 'react';
import { categories } from '../data/products';

const CategoriesModal = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categoryIcons = {
    'Elektronik': '📱',
    'Ayakkabı & Çanta': '👟',
    'Kozmetik': '💄',
    'Erkek': '👔',
    'Kadın': '👗',
    'Anne & Çocuk': '👶',
    'Ev & Yaşam': '🏠'
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    console.log('Seçilen kategori:', category);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Tüm Kategoriler</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
          <div className="p-4 space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="w-full flex items-center space-x-4 p-3 text-left text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors duration-200 border border-transparent hover:border-orange-200"
              >
                <span className="text-2xl">{categoryIcons[category] || '📦'}</span>
                <div className="flex-1">
                  <span className="text-sm font-medium">{category}</span>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesModal;

