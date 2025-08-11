import React from 'react';
import { useShop } from '../context/ShopContext';

const CloseIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> );

const QuickViewModal = ({ product, onClose }) => {
  const { addToCart } = useShop();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    onClose(); // Sepete ekledikten sonra modal'ı kapat
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-1/2 max-w-4xl p-4 md:p-8 relative flex flex-col md:flex-row gap-8" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <CloseIcon />
        </button>
        
        {/* Sol Taraf: Ürün Görseli */}
        <div className="w-full md:w-1/2">
          <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-md" />
        </div>

        {/* Sağ Taraf: Ürün Bilgileri */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h2 className="text-2xl font-bold">{product.brand}</h2>
          <p className="text-lg text-gray-600 mb-4">{product.name}</p>
          <div className="text-3xl font-bold text-orange-600 mb-6">{product.price.toFixed(2)} TL</div>
          
          <div className="mt-auto">
             <button onClick={handleAddToCart} className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors">
              SEPETE EKLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;