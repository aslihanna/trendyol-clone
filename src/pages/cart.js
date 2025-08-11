import Link from 'next/link';
import Image from 'next/image';
import { useShop } from '../context/ShopContext';

const CartPage = () => {
  // --- BU SATIRI KONTROL EDİN VEYA DEĞİŞTİRİN ---
  // Gerekli tüm fonksiyonların (removeFromCart, updateQuantity) ve değerlerin (cart, cartTotal)
  // useShop() hook'undan çekildiğinden emin oluyoruz.
  const { cart, removeFromCart, updateQuantity, cartTotal } = useShop();

  return (
    <div className="container mx-auto p-4 md:p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 border-b pb-4">Sepetim ({cart.length} Ürün)</h1>

      {cart.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sol Taraf: Ürün Listesi */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm">
              {cart.map(item => (
                <div key={item.id} className="flex items-center p-4 border-b last:border-b-0">
                  <Image src={item.imageUrl} alt={item.name} width={80} height={100} className="rounded-md object-cover"/>
                  <div className="flex-grow ml-4">
                    <p className="font-bold text-gray-800">{item.brand}</p>
                    <p className="text-sm text-gray-600">{item.name}</p>
                    <p className="text-orange-500 font-semibold mt-1">{item.price.toFixed(2)} TL</p>
                  </div>
                  <div className="flex items-center mx-4">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 border rounded-l-md hover:bg-gray-100">-</button>
                    <input type="text" readOnly value={item.quantity} className="w-12 text-center border-t border-b"/>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 border rounded-r-md hover:bg-gray-100">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 text-sm">
                    Kaldır
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sağ Taraf: Sipariş Özeti */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Sipariş Özeti</h2>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Ara Toplam</span>
                <span>{cartTotal} TL</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Kargo</span>
                <span>Ücretsiz</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Toplam</span>
                <span className="text-orange-500">{cartTotal} TL</span>
              </div>
              <button onClick={() => alert('Ödeme adımına geçiliyor!')} className="w-full mt-6 bg-green-600 text-white font-bold py-3 rounded-md hover:bg-green-700 transition-colors">
                Sepeti Onayla
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Sepetiniz şu an boş.</h2>
          <p className="text-gray-500 mb-6">Hemen alışverişe başlayarak sepetinizi doldurabilirsiniz.</p>
          <Link href="/" className="bg-orange-500 text-white font-bold py-3 px-6 rounded-md hover:bg-orange-600 transition-colors">
            Alışverişe Başla
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;