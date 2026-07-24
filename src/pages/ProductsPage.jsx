import React, { useEffect, useMemo, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useProducts } from '../Context/ProductContext';
import Card from '../components/Card';
import LoadingState from '../components/LoadingState';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

function ProductsPage() {
  const { products = [], carts = [], loading, error } = useProducts() || {};
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const categoryStats = useMemo(() => {
    const map = products.reduce((acc, product) => {
      const key = String(product.category || '').trim();
      if (!key) {
        return acc;
      }

      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const orderedCategories = Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));

    return [{ name: 'all', count: products.length }, ...orderedCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    const matchesCategory = (product) =>
      selectedCategory === 'all' || String(product.category || '') === selectedCategory;

    return products.filter((product) => {
      if (!matchesCategory(product)) {
        return false;
      }

      if (!query) {
        return true;
      }

      const title = String(product.title || '').toLowerCase();
      const category = String(product.category || '').toLowerCase();
      const description = String(product.description || '').toLowerCase();

      return title.includes(query) || category.includes(query) || description.includes(query);
    });
  }, [products, debouncedSearch, selectedCategory]);

  const hasActiveFilters = selectedCategory !== 'all' || debouncedSearch.trim().length > 0;

  const clearFilters = () => {
    setSearch('');
    setDebouncedSearch('');
    setSelectedCategory('all');
  };

  if (loading) {
    return (
      <div className="theme-page">
        <SiteHeader />
        <LoadingState variant="products" message="Loading products..." count={6} />
        <SiteFooter />
      </div>
    );
  }

  if (error) {
    return (
      <div className="theme-page">
        <SiteHeader />
        <main dir="ltr" className="w-full max-w-6xl px-4 py-8 mx-auto md:px-8 md:py-10">
          <div className="rounded-2xl border border-[#f1c4c4] bg-[#fff5f5] p-6 text-[#8a2f2f]">
            <h2 className="text-xl font-black">Could not load products</h2>
            <p className="mt-2 text-sm">{error.message}</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="theme-page">
      <SiteHeader />

      <main dir="ltr" className="mx-auto w-full max-w-6xl px-4 py-6 text-[#12324f] md:px-8 md:py-8">
        <section className="px-4 py-5 mb-5 glass-panel rounded-2xl md:px-5">
          <h2 className="text-2xl font-black text-[#0f2740]">Products</h2>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm font-semibold text-[#4b5563]">
            <span>Total products: {products.length}</span>
            <span className="text-[#9ca3af]">|</span>
            <span>Total carts: {carts.length}</span>
            <span className="text-[#9ca3af]">|</span>
            <span>Showing: {filteredProducts.length}</span>
          </div>
        </section>

        <section className="p-3 mb-6 glass-panel rounded-2xl md:p-4">
          <div className="mb-3 grid gap-3 md:grid-cols-[1fr_auto]">
            <div className="relative">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7890a8]" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by product name, category, or description..."
                className="glass-panel-strong w-full rounded-xl py-3 pl-10 pr-10 text-sm font-medium text-[#12324f] shadow-sm outline-none transition focus:border-[#7ca9d6] focus:ring-2 focus:ring-[#cfe4fa]"
              />
              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#7890a8] transition hover:bg-[#eef5ff] hover:text-[#3d6788]"
                  aria-label="Clear search"
                >
                  <FiX className="w-4 h-4" />
                </button>
              ) : null}
            </div>

            <button
              type="button"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className="glass-chip rounded-xl px-3.5 py-3 text-sm font-bold text-[#3d6788] shadow-sm transition enabled:hover:bg-[#eef5ff] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear filters
            </button>
          </div>

          <div className="flex items-center justify-between gap-2 px-1 mb-2">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#5b7a99]">
              Filter by category
            </p>
            <p className="text-xs font-semibold text-[#6d8baa]">
              {categoryStats.length - 1} categories
            </p>
          </div>

          <div className="flex gap-2 pb-1 overflow-x-auto scrollbar-thin">
            {categoryStats.map((category) => {
              const isAll = category.name === 'all';
              const isActive = selectedCategory === category.name;
              const label = isAll ? 'All categories' : category.name;

              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => setSelectedCategory(category.name)}
                  className={[
                    'shrink-0 rounded-full border px-3.5 py-2 text-xs font-bold transition-all md:text-sm',
                    isActive
                      ? 'border-[#234d72] bg-[#234d72] text-white shadow-[0_8px_18px_rgba(35,77,114,0.24)]'
                      : 'border-[#d4e3f4] bg-[#f8fbff] text-[#3d6788] hover:border-[#b6cade] hover:bg-[#eef5ff]',
                  ].join(' ')}
                >
                  <span className="capitalize">{label}</span>
                  <span
                    className={[
                      'ml-2 rounded-full px-2 py-0.5 text-[11px] font-extrabold',
                      isActive ? 'bg-white/20 text-white' : 'bg-[#e6f0fb] text-[#3d688f]',
                    ].join(' ')}
                  >
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {filteredProducts.length ? (
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </section>
        ) : (
          <section className="p-6 text-center glass-panel rounded-2xl">
            <p className="text-base font-bold text-[#224264]">No products found.</p>
            <p className="mt-1 text-sm text-[#5c7d9b]">
              Try a different search keyword or category.
            </p>
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="glass-chip mt-4 rounded-full px-4 py-2 text-xs font-bold text-[#315d86] transition hover:bg-[#eef5ff]"
              >
                Clear filters
              </button>
            ) : null}
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

export default ProductsPage;
