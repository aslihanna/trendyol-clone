import React from 'react';

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const FilterModal = ({ isOpen, onClose, onClear, onApply, children }) => {
  if (!isOpen) return null;

  return (
    // Modal ana kapsayıcısı (arka plan karartma ve tıklanınca kapatma)
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-40" 
      onClick={onClose}
    >
      {/* Asıl içerik paneli */}
      <div 
        className={`fixed top-0 left-0 h-full bg-white w-4/5 max-w-xs z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        onClick={(e) => e.stopPropagation()} // Panele tıklayınca modalın kapanmasını engelle
      >
        <div className="flex flex-col h-full">
            {/* Modal Başlığı */}
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-bold">Filtrele</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                    <CloseIcon />
                </button>
            </div>
            
            {/* Filtre İçeriği (Sidebar buraya gelecek) */}
            <div className="flex-grow overflow-y-auto p-4">
                {children}
            </div>

            {/* Modal Alt Butonları */}
            <div className="p-4 border-t flex space-x-2">
                <button onClick={onClear} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100">Temizle</button>
                <button onClick={onApply} className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">Filtreleri Uygula</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;