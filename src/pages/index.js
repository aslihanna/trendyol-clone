import { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { products, brands, categories } from '../data/products';

import ProductCard from '../components/ProductCard';
import MobileFilterBar from '../components/MobileFilterBar';
import FilterModal from '../components/FilterModal';
import QuickViewModal from '../components/QuickViewModal';
import Sidebar from '../components/Sidebar';

export default function Home() {
  const { searchTerm } = useShop();
  
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('default');

  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    // Arama filtresi
    if (searchTerm.trim()) {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(lowercasedSearchTerm) ||
      product.brand.toLowerCase().includes(lowercasedSearchTerm)
    );
    }

    // Kategori filtresi
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Marka filtresi
    if (selectedBrand) {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    // Fiyat aralığı filtresi
    if (priceRange.min !== '' || priceRange.max !== '') {
      filtered = filtered.filter(product => {
        const price = product.price;
        const min = priceRange.min === '' ? 0 : parseFloat(priceRange.min);
        const max = priceRange.max === '' ? Infinity : parseFloat(priceRange.max);
        return price >= min && price <= max;
      });
    }

    // Sıralama
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedBrand, priceRange, sortBy]);

  const SortIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
    </svg>
  );

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setPriceRange({ min: '', max: '' });
    setSortBy('default');
  };

  const applyFilters = () => {
    setIsFilterMenuOpen(false);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-2 sm:px-4">


        
        <div className="flex flex-col lg:flex-row gap-4">
          
          <div className="hidden lg:block lg:w-56 xl:w-64 lg:flex-shrink-0">
            <Sidebar 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>

                      <div className="flex-1 min-w-0">
 
            {/* Sonuç Sayısı ve Sıralama */}
            <div className="hidden lg:flex items-center justify-between mb-4 mt-4">
              <div className="text-gray-800 text-sm font-semibold">
                "Avantajlı Ürünler" için 15 sonuç listeleniyor
              </div>
              <div className="flex items-center">
                <div className="relative bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500">
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-transparent border-none outline-none w-full text-gray-800 font-medium"
                  >
                    <option value="default">Önerilen</option>
                    <option value="price-low">Fiyat (Düşükten Yükseğe)</option>
                    <option value="price-high">Fiyat (Yüksekten Düşüğe)</option>
                    <option value="rating">Puana Göre</option>
                    <option value="name">İsme Göre</option>
                  </select>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Filtre Butonları */}
            <div className="hidden lg:flex items-center space-x-3 mb-4 overflow-x-auto scrollbar-hide">
              <button className="flex items-center bg-gradient-to-r from-orange-200 to-pink-200 text-gray-800 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap border border-orange-300">
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="url(#lightning-gradient)"/>
                  <defs>
                    <linearGradient id="lightning-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="50%" stopColor="#f97316"/>
                      <stop offset="50%" stopColor="#ec4899"/>
                    </linearGradient>
                  </defs>
                </svg>
                Flaş Ürünler
              </button>
              <button className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                <svg className="w-4 h-4 mr-1 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Yüksek Puanlı Ürünler
              </button>
              <button className="flex items-center bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                <svg className="w-4 h-4 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
                </svg>
                Yüksek Puanlı Satıcılar
              </button>
              <button className="flex items-center bg-gray-100 text-gray-800 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                <svg className="w-4 h-4 mr-1 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
                Kargo Bedava
              </button>
              <button className="flex items-center bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                <svg className="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" opacity="0.3"/>
                </svg>
                Hızlı Teslimat
              </button>
            </div>
            
            {/* Mobil Breadcrumb ve Kategori Başlığı */}
            <div className="md:hidden px-4 py-3">
              {/* Breadcrumb */}
              <div className="text-xs text-gray-500 mb-2">
                Trendyol &gt; Avantajlı Ürünler
              </div>
              
              {/* Kategori Başlığı ve Ürün Sayısı */}
              <div className="flex items-center justify-between mb-4">
                <button className="p-2">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="text-center">
                  <h1 className="text-lg font-bold text-gray-900">Avantajlı Ürünler</h1>
                  <p className="text-sm text-gray-500">63292 Ürün Listeleniyor</p>
                </div>
                <div className="w-9"></div>
              </div>
            </div>
            
            <MobileFilterBar 
              onFilterClick={() => setIsFilterMenuOpen(true)} 
              onSortClick={() => setIsFilterMenuOpen(true)}
              hasActiveFilters={selectedCategory || selectedBrand || priceRange.min || priceRange.max || sortBy !== 'default'}
              onClearFilters={clearFilters}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />



            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    onQuickViewClick={setQuickViewProduct}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <h2 className="text-2xl font-semibold text-gray-600">Aradığınız kriterlere uygun ürün bulunamadı.</h2>
                  <p className="text-gray-500 mt-2">Farklı bir arama yapmayı deneyebilirsiniz.</p>
                </div>
              )}
            </div>
            
            <div className="text-center mt-8">
                <span className="text-orange-500 text-base font-bold cursor-pointer hover:text-orange-600 transition-colors">
                    DAHA FAZLA GÖSTER
                </span>
            </div>
          </div>
        </div>
      </div>

      <FilterModal 
        isOpen={isFilterMenuOpen} 
        onClose={() => setIsFilterMenuOpen(false)}
        onClear={clearFilters}
        onApply={applyFilters}
        selectedCategory={selectedCategory}
        selectedBrand={selectedBrand}
        filteredProductsCount={filteredProducts.length}
        setSelectedCategory={setSelectedCategory}
        setSelectedBrand={setSelectedBrand}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <QuickViewModal 
        product={quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
      />
    </>
  );
}