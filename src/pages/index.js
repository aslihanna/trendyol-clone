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
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-2">
          Trendyol {'>'} {
            searchTerm ? `"${searchTerm}" araması` : 
            selectedCategory ? selectedCategory : 
            selectedBrand ? `${selectedBrand} markası` : 
            'Tüm Ürünler'
          }
        </div>
        
        {/* Page Header */}
        <div className="flex items-center justify-center mb-4">
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900">
              {searchTerm ? `"${searchTerm}" araması` : 
               selectedCategory ? selectedCategory : 
               selectedBrand ? `${selectedBrand} markası` : 
               'Tüm Ürünler'}
            </h1>
            <p className="text-sm text-gray-600">{filteredProducts.length} Ürün Listeleniyor</p>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          
          <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
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



            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
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
                <button className="border border-gray-300 bg-white px-12 py-3 rounded-lg hover:border-orange-500 hover:text-orange-500 transition-colors text-sm font-medium">
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