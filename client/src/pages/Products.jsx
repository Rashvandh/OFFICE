import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, X } from 'lucide-react';
import HeroBanner from '../components/common/HeroBanner.jsx';
import ProductGrid from '../components/products/ProductGrid.jsx';
import QuickViewModal from '../components/products/QuickViewModal.jsx';
import Pagination from '../components/common/Pagination.jsx';
import { productService } from '../services/productService.js';
import { productCategories } from '../data/siteData.js';

const ITEMS_PER_PAGE = 8;

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialFilter = searchParams.get('filter') || '';

  const [products, setProducts] = useState([]);
  const [dataSource, setDataSource] = useState('placeholder');
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [newArrivalsOnly, setNewArrivalsOnly] = useState(initialFilter === 'new');
  const [bestSellersOnly, setBestSellersOnly] = useState(initialFilter === 'bestseller');
  const [sortBy, setSortBy] = useState('featured');
  const [page, setPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    const cat = searchParams.get('category') || 'All';
    setSelectedCategory(cat);
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    productService.getProducts().then(({ products: list, source }) => {
      if (!mounted) return;
      setProducts(list);
      setDataSource(source);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory && selectedCategory !== 'All') {
      list = list.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    list = list.filter((p) => p.price == null || p.price <= maxPrice);

    if (inStockOnly) {
      list = list.filter((p) => p.inStock !== false);
    }
    if (newArrivalsOnly) {
      list = list.filter((p) => p.isNewLaunch);
    }
    if (bestSellersOnly) {
      list = list.filter((p) =>
        ['BESTSELLER', 'TOP SELLER', "PEOPLE'S FAVOURITE"].includes(
          String(p.tag || '').toUpperCase()
        )
      );
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => Number(Boolean(b.isNewLaunch)) - Number(Boolean(a.isNewLaunch)));
    } else if (sortBy === 'popularity') {
      list.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    }

    return list;
  }, [
    products,
    selectedCategory,
    searchQuery,
    maxPrice,
    inStockOnly,
    newArrivalsOnly,
    bestSellersOnly,
    sortBy,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setPage(1);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setMaxPrice(1000);
    setInStockOnly(false);
    setNewArrivalsOnly(false);
    setBestSellersOnly(false);
    setSortBy('featured');
    setPage(1);
    setSearchParams({});
  };

  return (
    <main>
      <HeroBanner
        compact
        eyebrow="Herbal Catalogue"
        title="Gramiyam Formulations"
        subtitle="Explore Pure Herbs, Hair Care, Body Care, Soap, Shampoo, Baby Care, Herbal Wellness, and Pharmaceuticals."
      />

      <section className="py-12 sm:py-16">
        <div className="container-gramiyam">
          {dataSource === 'placeholder' && (
            <div className="mb-8 rounded-sm border-l-4 border-gold bg-cream px-5 py-3.5 text-xs leading-relaxed text-charcoal/85">
              <strong>Sample Catalogue Notice:</strong> Product prices and stock availability shown below are illustrative placeholders until the official Gramiyam product catalogue is connected via the backend API.
            </div>
          )}

          {/* Category Pills */}
          <div className="mb-8 flex flex-wrap gap-2">
            {productCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  selectedCategory === cat
                    ? 'bg-forest text-ivory'
                    : 'border border-softgrey bg-white text-charcoal hover:border-forest'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Sidebar Filters */}
            <aside className="space-y-6 rounded-sm border border-softgrey bg-white p-6 lg:col-span-3 h-fit">
              <div className="flex items-center justify-between border-b border-softgrey pb-3">
                <h2 className="flex items-center gap-2 font-serif text-lg font-medium text-forest">
                  <SlidersHorizontal className="h-4 w-4 text-gold-dark" />
                  Filters
                </h2>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-gold-dark hover:text-forest"
                >
                  <X className="h-3 w-3" />
                  Reset
                </button>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                  Search
                </label>
                <div className="flex items-center rounded-sm border border-softgrey bg-ivory/60 px-3">
                  <Search className="h-4 w-4 text-charcoal/45" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Filter by name..."
                    className="w-full bg-transparent py-2.5 pl-2 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-charcoal/70">
                    Max Price (Sample)
                  </span>
                  <span className="font-semibold text-forest">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={1000}
                  step={50}
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                    setPage(1);
                  }}
                  className="w-full accent-forest"
                />
              </div>

              <div className="space-y-2.5 border-t border-softgrey pt-4 text-xs">
                <label className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => {
                      setInStockOnly(e.target.checked);
                      setPage(1);
                    }}
                    className="accent-forest"
                  />
                  <span>In Stock Only</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={newArrivalsOnly}
                    onChange={(e) => {
                      setNewArrivalsOnly(e.target.checked);
                      setPage(1);
                    }}
                    className="accent-forest"
                  />
                  <span>New Arrivals</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={bestSellersOnly}
                    onChange={(e) => {
                      setBestSellersOnly(e.target.checked);
                      setPage(1);
                    }}
                    className="accent-forest"
                  />
                  <span>Best Sellers</span>
                </label>
              </div>
            </aside>

            {/* Product Grid & Sort */}
            <div className="lg:col-span-9">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-charcoal/70">
                  Showing <strong className="text-forest">{filteredProducts.length}</strong>{' '}
                  {filteredProducts.length === 1 ? 'formulation' : 'formulations'}
                </p>

                <div className="flex items-center gap-2.5">
                  <label htmlFor="sort-products" className="text-xs text-charcoal/70">
                    Sort by:
                  </label>
                  <select
                    id="sort-products"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-sm border border-softgrey bg-white px-3 py-2 text-xs font-medium text-forest focus:border-forest focus:outline-none"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="newest">Newest</option>
                    <option value="popularity">Popularity</option>
                  </select>
                </div>
              </div>

              <ProductGrid
                products={paginatedProducts}
                loading={loading}
                columns={3}
                onQuickView={setQuickViewProduct}
                onResetFilters={resetFilters}
              />

              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(nextPage) => {
                  setPage(nextPage);
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </main>
  );
}
