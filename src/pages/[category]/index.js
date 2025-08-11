import { useRouter } from 'next/router';
import { products } from '../../data/products';
import ProductCard from '../../components/ProductCard';
import Link from 'next/link';

const CategoryPage = () => {
  const router = useRouter();
  const { category: categorySlug } = router.query;

  if (!categorySlug) {
    return <div>Yükleniyor...</div>;
  }
  
  // URL slug'ını (örn: "ev-yasam") gerçek kategori adına ("Ev & Yaşam") çevir
  const categoryName = categorySlug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase()) // Her kelimenin ilk harfini büyüt
    .replace(/&/g, ' & '); // & işaretini düzelt
    
  // İlgili kategorideki ürünleri filtrele
  const categoryProducts = products.filter(
    product => product.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-6">
        <Link href="/" className="text-sm text-gray-600 hover:text-orange-500">
          &larr; Ana Sayfa
        </Link>
        <h1 className="text-3xl font-bold mt-2">{categoryName}</h1>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categoryProducts.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              onQuickViewClick={() => {}} // Bu sayfada hızlı bakış şimdilik pasif
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-700">Bu kategoride ürün bulunamadı.</h2>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;