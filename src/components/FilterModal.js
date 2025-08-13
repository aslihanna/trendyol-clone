import React from 'react';

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">FİLTRELE</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800 p-2">
                    <CloseIcon />
                </button>
            </div>
            
            {/* Seçili Filtreler */}
            {(selectedCategory || selectedBrand) && (
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Seçili Filtreler</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory && (
                    <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 text-sm">
                      <span className="text-gray-800">{selectedCategory}</span>
                      <button 
                        onClick={() => onClear()}
                        className="ml-2 text-gray-500 hover:text-gray-700 text-lg font-bold"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  {selectedBrand && (
                    <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 text-sm">
                      <span className="text-gray-800">{selectedBrand}</span>
                      <button 
                        onClick={() => onClear()}
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
               <div className="p-6">
                 <div className="space-y-0">
                   {/* Sıralama */}
                   <div className="py-4 border-b border-gray-100">
                     <div className="flex items-center justify-between mb-3">
                       <span className="text-base font-medium text-gray-900">
                         Sıralama {sortBy !== 'default' && '(1)'}
                       </span>
                       <ArrowIcon />
                     </div>
                     {sortBy !== 'default' && (
                       <div className="flex flex-wrap gap-2 mb-3">
                         <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 text-sm">
                           <span className="text-gray-800">
                             {sortBy === 'price-low' && 'Fiyat (Düşükten Yükseğe)'}
                             {sortBy === 'price-high' && 'Fiyat (Yüksekten Düşüğe)'}
                             {sortBy === 'rating' && 'Puana Göre'}
                             {sortBy === 'name' && 'İsme Göre'}
                           </span>
                           <button 
                             onClick={() => setSortBy('default')}
                             className="ml-2 text-gray-500 hover:text-gray-700 text-lg font-bold"
                           >
                             ×
                           </button>
                         </div>
                       </div>
                     )}
                     <div className="space-y-2">
                       {[
                         { value: 'default', label: 'Önerilen' },
                         { value: 'price-low', label: 'Fiyat (Düşükten Yükseğe)' },
                         { value: 'price-high', label: 'Fiyat (Yüksekten Düşüğe)' },
                         { value: 'rating', label: 'Puana Göre' },
                         { value: 'name', label: 'İsme Göre' }
                       ].map((option) => (
                         <button
                           key={option.value}
                           onClick={() => setSortBy(option.value)}
                           className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                             sortBy === option.value 
                               ? 'bg-orange-50 text-orange-600 border border-orange-200' 
                               : 'text-gray-700 hover:bg-gray-50'
                           }`}
                         >
                           {option.label}
                         </button>
                       ))}
                     </div>
                   </div>
                   
                   {/* Avantajlı Ürünler */}
                   <div className="flex items-center justify-between py-4 border-b border-gray-100">
                     <span className="text-base font-medium text-gray-900">Avantajlı Ürünler</span>
                     <ArrowIcon />
                   </div>
                   
                   {/* Kategori */}
                   <div className="py-4 border-b border-gray-100">
                     <div className="flex items-center justify-between mb-3">
                       <span className="text-base font-medium text-gray-900">
                         Kategori {selectedCategory && '(1)'}
                       </span>
                       <ArrowIcon />
                     </div>
                     {selectedCategory && (
                       <div className="flex flex-wrap gap-2 mb-3">
                         <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 text-sm">
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
                     <div className="space-y-2">
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
                   </div>
                   
                   {/* Marka */}
                   <div className="py-4 border-b border-gray-100">
                     <div className="flex items-center justify-between mb-3">
                       <span className="text-base font-medium text-gray-900">
                         Marka {selectedBrand && '(1)'}
                       </span>
                       <ArrowIcon />
                     </div>
                     {selectedBrand && (
                       <div className="flex flex-wrap gap-2 mb-3">
                         <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 text-sm">
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
                     <div className="space-y-2">
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
                   </div>
                   
                   {/* Çeşit */}
                   <div className="flex items-center justify-between py-4 border-b border-gray-100">
                     <span className="text-base font-medium text-gray-900">Çeşit</span>
                     <ArrowIcon />
                   </div>
                   
                   {/* Fiyat Aralığı */}
                   <div className="py-4 border-b border-gray-100">
                     <div className="flex items-center justify-between mb-3">
                       <span className="text-base font-medium text-gray-900">
                         Fiyat Aralığı {(priceRange.min || priceRange.max) && '(1)'}
                       </span>
                       <ArrowIcon />
                     </div>
                     {(priceRange.min || priceRange.max) && (
                       <div className="flex flex-wrap gap-2 mb-3">
                         <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 text-sm">
                           <span className="text-gray-800">
                             {priceRange.min && priceRange.max 
                               ? `${priceRange.min} TL - ${priceRange.max} TL`
                               : priceRange.min 
                               ? `${priceRange.min} TL ve üzeri`
                               : `${priceRange.max} TL ve altı`
                             }
                           </span>
                           <button 
                             onClick={() => setPriceRange({ min: '', max: '' })}
                             className="ml-2 text-gray-500 hover:text-gray-700 text-lg font-bold"
                           >
                             ×
                           </button>
                         </div>
                       </div>
                     )}
                     <div className="space-y-3">
                       <div className="flex space-x-2">
                         <input
                           type="number"
                           placeholder="Min"
                           value={priceRange.min}
                           onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                           className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-500"
                         />
                         <input
                           type="number"
                           placeholder="Max"
                           value={priceRange.max}
                           onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                           className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-500"
                         />
                       </div>
                       <div className="grid grid-cols-2 gap-2">
                         {[
                           { label: '0-100 TL', min: '0', max: '100' },
                           { label: '100-500 TL', min: '100', max: '500' },
                           { label: '500-1000 TL', min: '500', max: '1000' },
                           { label: '1000+ TL', min: '1000', max: '' }
                         ].map((range) => (
                           <button
                             key={range.label}
                             onClick={() => setPriceRange({ min: range.min, max: range.max })}
                             className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                           >
                             {range.label}
                           </button>
                         ))}
                       </div>
                     </div>
                   </div>
                   
                   {/* Türü */}
                   <div className="flex items-center justify-between py-4 border-b border-gray-100">
                     <span className="text-base font-medium text-gray-900">Türü</span>
                     <ArrowIcon />
                   </div>
                  
                                     {/* Satıcı Tipi */}
                   <div className="py-4 border-b border-gray-100">
                     <div className="flex items-center justify-between mb-4">
                       <span className="text-base font-medium text-gray-900">Satıcı Tipi</span>
                       <span className="text-sm text-gray-500 underline">Satıcı Tipi Nedir?</span>
                     </div>
                     <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
                       <button className="flex items-center bg-white border border-gray-200 text-gray-900 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap hover:border-gray-300 hover:shadow-sm transition-all">
                         <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                           <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                           </svg>
                         </div>
                         Onaylanmış Satıcı
                       </button>
                       <button className="flex items-center bg-white border border-gray-200 text-gray-900 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap hover:border-gray-300 hover:shadow-sm transition-all">
                         <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center mr-2">
                           <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                           </svg>
                         </div>
                         Başarılı Satıcı
                       </button>
                       <button className="flex items-center bg-white border border-gray-200 text-gray-900 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap hover:border-gray-300 hover:shadow-sm transition-all">
                         <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center mr-2">
                           <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                             <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                           </svg>
                         </div>
                         Yetkili
                       </button>
                     </div>
                   </div>
                  
                                     {/* Ürün Puanı */}
                   <div className="flex items-center justify-between py-4 border-b border-gray-100">
                     <span className="text-base font-medium text-gray-900">Ürün Puanı</span>
                     <ArrowIcon />
                   </div>
                </div>
              </div>
            </div>

                         {/* Modal Alt Butonu */}
             <div className="p-6 border-t border-gray-100">
                 <button 
                   onClick={onApply} 
                   className="w-full bg-orange-500 text-white py-5 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-lg"
                 >
                   Tüm Sonuçları Listele ({filteredProductsCount || 0})
                 </button>
             </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;