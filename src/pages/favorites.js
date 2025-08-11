import { useState } from 'react';
import Link from 'next/link';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

const FavoritesPage = () => {
  // Global context'ten favori ürün ID'lerini alan fonksiyonu çekiyoruz
  const { isFavorite } = useShop();

  // Bu sayfaya özel, "Hızlı Gözat" modalının durumunu tutan state
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Favori olarak işaretlenmiş ürünlerin tam listesini oluşturuyoruz
  const favoriteProducts = products.filter(product => isFavorite(product.id));

  return (
    // <> (Fragment) kullanarak modal ve sayfa içeriğini bir arada döndürüyoruz
    <>
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6 border-b pb-4">
          Favorilerim ({favoriteProducts.length})
        </h1>
        
        {/* Favori listesinde ürün varsa ürünleri göster */}
        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {favoriteProducts.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                // Hızlı bakış fonksiyonunu ProductCard'a prop olarak geçiriyoruz
                // Tıklandığında, setQuickViewProduct state'ini güncelleyecek
                onQuickViewClick={setQuickViewProduct} 
              />
            ))}
          </div>
        ) : (
          // Favori listesi boşsa, kullanıcıyı bilgilendiren bir mesaj göster
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Favori listeniz boş.</h2>
            <p className="text-gray-500 mb-6">Beğendiğiniz ürünleri kalp ikonuna tıklayarak favorilerinize ekleyebilirsiniz.</p>
            <Link href="/" className="bg-orange-500 text-white font-bold py-3 px-6 rounded-md hover:bg-orange-600 transition-colors">
              Alışverişe Başla
            </Link>
          </div>
        )}
      </div>

      {/* Hızlı Gözat (Quick View) Modalı */}
      {/* Bu modal sadece quickViewProduct state'i bir ürünle dolu olduğunda görünür */}
      <QuickViewModal 
        product={quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} // Kapatma butonu state'i null yapar
      />
    </>
  );
};

export default FavoritesPage;