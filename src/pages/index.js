import { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { products, brands, categories } from '../data/products';

import ProductCard from '../components/ProductCard';
import MobileFilterBar from '../components/MobileFilterBar';
import FilterModal from '../components/FilterModal';
import QuickViewModal from '../components/QuickViewModal';

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
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          <div className="w-full">
            
            <MobileFilterBar 
              onFilterClick={() => setIsFilterMenuOpen(true)} 
              onSortClick={() => setIsFilterMenuOpen(true)}
            />

            <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm mb-4">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
                {searchTerm ? `"${searchTerm}" araması için ` : '"Tüm Ürünler" için '} 
                {filteredProducts.length} sonuç listeleniyor
              </h1>
              
              <div className="hidden md:flex items-center justify-end mt-4">
                <div className="relative">
                  <button className="border rounded-md px-4 py-2 text-sm flex items-center">
                    Önerilen Sıralama
                    <SortIcon />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
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
            
            <div className="text-center mt-6 sm:mt-8">
                <button className="border border-gray-300 bg-white px-8 sm:px-12 md:px-16 py-2 sm:py-3 rounded-lg hover:border-orange-500 hover:text-orange-500 transition text-sm sm:text-base">
                    DAHA FAZLA ÜRÜN GÖSTER
                </button>
            </div>
          </div>
        </div>
      </div>

      <FilterModal 
        isOpen={isFilterMenuOpen} 
        onClose={() => setIsFilterMenuOpen(false)}
        onClear={clearFilters}
        onApply={applyFilters}
      >
        <div className="space-y-6">
          {/* Kategori Filtresi */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Kategori</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Marka Filtresi */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Marka</h3>
            <div className="space-y-2">
              {brands.map(brand => (
                <label key={brand} className="flex items-center">
                  <input
                    type="radio"
                    name="brand"
                    value={brand}
                    checked={selectedBrand === brand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Fiyat Aralığı */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Fiyat Aralığı</h3>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Sıralama */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Sıralama</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sort"
                  value="default"
                  checked={sortBy === 'default'}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm">Önerilen</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sort"
                  value="price-low"
                  checked={sortBy === 'price-low'}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm">Fiyat (Düşükten Yükseğe)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sort"
                  value="price-high"
                  checked={sortBy === 'price-high'}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm">Fiyat (Yüksekten Düşüğe)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sort"
                  value="rating"
                  checked={sortBy === 'rating'}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm">Puana Göre</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sort"
                  value="name"
                  checked={sortBy === 'name'}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm">İsme Göre</span>
              </label>
            </div>
          </div>
        </div>
      </FilterModal>

      <QuickViewModal 
        product={quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
      />
    </>
  );
}