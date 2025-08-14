import { useState } from 'react';
import { categories } from '../data/products';

const CategoriesModal = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categoryIcons = {
    'Nefesli Çalgılar': '🎷',
    'Eşofman Altı': '👖',
    'Mayo': '🏊',
    'Sweatshirt': '👕',
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
        {/* TÜM KATEGORİLER Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="text-lg font-bold text-gray-800">TÜM KATEGORİLER</span>
            <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">Yeni</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* İlgili Kategoriler Section */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-gray-800">İlgili Kategoriler</h3>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </div>
        
          <div className="space-y-2">
            {['Nefesli Çalgılar', 'Eşofman Altı', 'Mayo', 'Sweatshirt', 'T-Shirt'].map((category) => (
              <div
                key={category}
                className="text-sm text-gray-700 py-1"
              >
                {category}
              </div>
            ))}
          </div>
          
          <button className="w-full mt-3 bg-orange-500 text-white text-xs font-bold py-2 px-3 rounded hover:bg-orange-600 transition-colors">
            DAHA FAZLA GÖSTER
          </button>
        </div>
        
        {/* Marka Section */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-gray-800">Marka</h3>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </div>
          
          <input
            type="text"
            placeholder="Marka ara"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-500 mb-3"
          />
          
          <div className="space-y-2">
            {['Decathlon', 'BEYZANA', 'Delta', 'Kiwi'].map((brand) => (
              <div key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  id={brand}
                  className="w-4 h-4 border border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor={brand} className="ml-2 text-sm text-gray-700">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesModal;

