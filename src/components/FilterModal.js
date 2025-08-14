import React from 'react';

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);

const FilterModal = ({ 
  isOpen, 
  onClose, 
  onClear, 
  onApply, 
  children, 
  selectedCategory, 
  selectedBrand, 
  filteredProductsCount,
  setSelectedCategory,
  setSelectedBrand,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy
}) => {
  const [expandedSections, setExpandedSections] = React.useState({
    category: false,
    brand: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!isOpen) return null;

  return (
    // Modal ana kapsayıcısı (arka plan karartma ve tıklanınca kapatma)
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-40" 
      onClick={onClose}
    >
      {/* Asıl içerik paneli - Tam ekran */}
      <div 
        className={`fixed top-0 left-0 h-full w-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        onClick={(e) => e.stopPropagation()} // Panele tıklayınca modalın kapanmasını engelle
      >
        <div className="flex flex-col h-full">
            {/* Modal Başlığı */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800 p-2">
                    <CloseIcon />
                </button>
                <h2 className="text-lg font-bold text-gray-900">FİLTRELE</h2>
                <div className="w-10"></div>
            </div>
            
            {/* Seçili Filtreler */}
            {(selectedCategory || selectedBrand) && (
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 mb-3">Seçili Filtreler</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory && (
                    <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-sm">
                      <span className="text-gray-800">{selectedCategory}</span>
                      <button 
                        onClick={() => setSelectedCategory('')}
                        className="ml-2 text-gray-500 hover:text-gray-700 text-lg font-bold"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  {selectedBrand && (
                    <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-sm">
                      <span className="text-gray-800">{selectedBrand}</span>
                      <button 
                        onClick={() => setSelectedBrand('')}
                        className="ml-2 text-gray-500 hover:text-gray-700 text-lg font-bold"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Filtre Kategorileri */}
            <div className="flex-grow overflow-y-auto">
              <div className="p-4">
                <div className="space-y-0">
                  {/* Avantajlı Ürünler */}
                  <div className="py-4 border-b border-gray-100 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-gray-900">Avantajlı Ürünler</span>
                      <ArrowIcon />
                    </div>
                  </div>
                  
                  {/* Kategori */}
                  <div className="py-4 border-b border-gray-100 rounded-lg">
                    <button 
                      onClick={() => toggleSection('category')}
                      className="w-full flex items-center justify-between"
                    >
                      <span className="text-base font-semibold text-gray-900">
                        Kategori {selectedCategory && '(1)'}
                      </span>
                      <ArrowIcon />
                    </button>
                    {expandedSections.category && (
                      <>
                        {selectedCategory && (
                          <div className="mt-3">
                            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-sm">
                              <span className="text-gray-800">{selectedCategory}</span>
                              <button 
                                onClick={() => setSelectedCategory('')}
                                className="ml-2 text-gray-500 hover:text-gray-700 text-lg font-bold"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        )}
                        <div className="mt-3 space-y-2">
                          {['Elektronik', 'Ayakkabı & Çanta', 'Kozmetik', 'Erkek', 'Kadın', 'Anne & Çocuk', 'Ev & Yaşam'].map((category) => (
                            <button
                              key={category}
                              onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                selectedCategory === category 
                                  ? 'bg-orange-50 text-orange-600 border border-orange-200' 
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Marka */}
                  <div className="py-4 border-b border-gray-100 rounded-lg">
                    <button 
                      onClick={() => toggleSection('brand')}
                      className="w-full flex items-center justify-between"
                    >
                      <span className="text-base font-semibold text-gray-900">
                        Marka {selectedBrand && '(1)'}
                      </span>
                      <ArrowIcon />
                    </button>
                    {expandedSections.brand && (
                      <>
                        {selectedBrand && (
                          <div className="mt-3">
                            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-sm">
                              <span className="text-gray-800">{selectedBrand}</span>
                              <button 
                                onClick={() => setSelectedBrand('')}
                                className="ml-2 text-gray-500 hover:text-gray-700 text-lg font-bold"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        )}
                        <div className="mt-3 space-y-2">
                          {['Apple', 'Bershka', 'MSI', 'Nike', 'Louis Vuitton', 'La Mer', 'Chanel', 'Giorgio Armani', 'Tom Ford', 'Christian Dior', 'Gucci', 'Pampers', 'LEGO', 'Dyson', 'IKEA'].map((brand) => (
                            <button
                              key={brand}
                              onClick={() => setSelectedBrand(selectedBrand === brand ? '' : brand)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                selectedBrand === brand 
                                  ? 'bg-orange-50 text-orange-600 border border-orange-200' 
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {brand}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Çeşit */}
                  <div className="py-4 border-b border-gray-100 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-gray-900">Çeşit</span>
                      <ArrowIcon />
                    </div>
                  </div>
                  
                  {/* Türü */}
                  <div className="py-4 border-b border-gray-100 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-gray-900">Türü</span>
                      <ArrowIcon />
                    </div>
                  </div>
                  
                  {/* Satıcı Tipi */}
                  <div className="py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-base font-semibold text-gray-900">Satıcı Tipi</span>
                      <span className="text-xs text-orange-500">Satıcı Tipi Nedir?</span>
                    </div>
                    <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                      <div className="flex items-center p-3 bg-blue-50 rounded-full border border-blue-200 whitespace-nowrap">
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900">Onaylanmış Satıcı</span>
                      </div>
                      <div className="flex items-center p-3 bg-white rounded-full border border-gray-200 whitespace-nowrap">
                        <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900">Başarılı Satıcı</span>
                      </div>
                      <div className="flex items-center p-3 bg-white rounded-full border border-gray-200 whitespace-nowrap">
                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900">Yetkili</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Fiyat */}
                  <div className="py-4 border-b border-gray-100 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-gray-900">Fiyat</span>
                      <ArrowIcon />
                    </div>
                  </div>
                  
                  {/* Ürün Puanı */}
                  <div className="py-4 border-b border-gray-100 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-gray-900">Ürün Puanı</span>
                      <ArrowIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Alt Buton */}
            <div className="p-4 border-t border-gray-200">
              <button 
                onClick={onApply}
                className="w-full bg-orange-500 text-white font-bold py-4 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Tüm Sonuçları Listele ({filteredProductsCount || 63292})
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default FilterModal;