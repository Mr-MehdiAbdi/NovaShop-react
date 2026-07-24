import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiClock, FiShield, FiTruck } from 'react-icons/fi';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { useProducts } from '../Context/ProductContext';
import LoadingState from '../components/LoadingState';
import Card from '../components/Card';

function MainPage() {
  const { products = [], carts = [], loading, error } = useProducts() || {};

  const topCategories = useMemo(() => {
    const bucket = products.reduce((acc, product) => {
      const key = product.category || 'Other';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(bucket)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }));
  }, [products]);

  const featuredProducts = useMemo(() => products.slice(0, 6), [products]);

  const discountedProducts = useMemo(() => {
    return [...products]
      .filter((product) => Number(product.discountPercentage || 0) > 0)
      .sort((firstProduct, secondProduct) => {
        return (
          Number(secondProduct.discountPercentage || 0) -
          Number(firstProduct.discountPercentage || 0)
        );
      })
      .slice(0, 4);
  }, [products]);

  const heroDeal = discountedProducts[0] || null;

  const averagePrice = useMemo(() => {
    if (!products.length) {
      return 0;
    }

    const total = products.reduce((sum, product) => sum + Number(product.price || 0), 0);
    return Math.round(total / products.length);
  }, [products]);

  const totalUnitsInCarts = useMemo(() => {
    return carts.reduce((sum, cart) => {
      const cartUnits = (cart.products || []).reduce(
        (units, item) => units + Number(item.quantity || 0),
        0
      );
      return sum + cartUnits;
    }, 0);
  }, [carts]);

  if (loading) {
    return (
      <div className="theme-page text-[#12324f]">
        <SiteHeader />
        <LoadingState variant="products" message="Preparing your storefront..." count={6} />
        <SiteFooter />
      </div>
    );
  }

  if (error) {
    return (
      <div className="theme-page text-[#12324f]">
        <SiteHeader />
        <main className="w-full max-w-6xl px-4 py-16 mx-auto md:px-8">
          <div className="rounded-2xl border border-[#f1c4c4] bg-[#fff5f5] p-6 text-[#8a2f2f]">
            <h2 className="text-xl font-black">Could not load store data</h2>
            <p className="mt-2 text-sm">{error.message}</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="theme-page text-[#12324f]">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-[#dce8f3]/70 blur-3xl animate-float-slow" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-[#d4e2ee]/55 blur-3xl animate-float-slower" />

          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-24">
            <div className="space-y-6">
              <p className="glass-chip inline-flex rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[#3d6484]">
                Trusted Daily Essentials Store
              </p>

              <h1 className="max-w-xl text-4xl font-black leading-[1.05] tracking-tight text-[#0f2740] md:text-6xl">
                Everything You Need,
                <br />
                Delivered Faster.
              </h1>

              <p className="max-w-lg text-base leading-7 text-[#5d7690] md:text-lg">
                Shop electronics, groceries, beauty, and home supplies in one place with secure
                checkout, clear pricing, and fast shipping updates.
              </p>

              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#6a8098]">
                <span className="glass-chip rounded-full px-3 py-1">Free shipping over $50</span>
                <span className="glass-chip rounded-full px-3 py-1">30-day returns</span>
                <span className="glass-chip rounded-full px-3 py-1">Secure payments</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/products"
                  className="rounded-full bg-linear-to-r from-[#234d72] to-[#3b78a6] px-6 py-3 text-sm font-extrabold text-white shadow-[0_14px_28px_rgba(35,77,114,0.2)] transition-all hover:-translate-y-0.5 hover:from-[#1d4161] hover:to-[#31658d]"
                >
                  Shop now
                </Link>

                <Link
                  to="/checkout"
                  className="glass-chip rounded-full px-6 py-3 text-sm font-bold text-[#315d86] transition-colors hover:bg-white/90"
                >
                  View cart flow
                </Link>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-5 md:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <article
                  className="glass-panel-strong rounded-2xl p-4 animate-fade-up"
                  style={{ animationDelay: '80ms' }}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5d82a3]">
                    In-Stock Items
                  </p>
                  <p className="mt-2 text-2xl font-black text-[#163855]">{products.length}</p>
                  <p className="mt-1 text-sm text-[#547697]">
                    Freshly listed and ready to order today.
                  </p>
                </article>

                <article
                  className="glass-panel-strong rounded-2xl p-4 animate-fade-up"
                  style={{ animationDelay: '170ms' }}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5d82a3]">
                    Popular Categories
                  </p>
                  <p className="mt-2 text-2xl font-black text-[#163855]">{topCategories.length}</p>
                  <p className="mt-1 text-sm text-[#547697]">
                    From daily groceries to smart devices.
                  </p>
                </article>

                <article
                  className="glass-panel-strong rounded-2xl p-4 animate-fade-up"
                  style={{ animationDelay: '260ms' }}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5d82a3]">
                    Average Price
                  </p>
                  <p className="mt-2 text-2xl font-black text-[#163855]">${averagePrice}</p>
                  <p className="mt-1 text-sm text-[#547697]">
                    Balanced pricing across our top picks.
                  </p>
                </article>

                <article
                  className="glass-panel-strong rounded-2xl p-4 animate-fade-up"
                  style={{ animationDelay: '350ms' }}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5d82a3]">
                    Active Carts
                  </p>
                  <p className="mt-2 text-2xl font-black text-[#163855]">{carts.length}</p>
                  <p className="mt-1 text-sm text-[#547697]">
                    {totalUnitsInCarts} items waiting for checkout.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full max-w-6xl px-4 pb-10 mx-auto md:px-8">
          <div className="grid gap-3 md:grid-cols-3">
            <article className="glass-panel rounded-2xl p-4">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-[#edf4f9] to-[#ffffff] text-[#3b6f99]">
                <FiTruck className="h-4.5 w-4.5" />
              </div>
              <p className="text-sm font-black text-[#173a59]">Same-Day Dispatch</p>
              <p className="mt-1 text-sm text-[#547697]">
                Orders confirmed before 2 PM are packed and sent on the same day.
              </p>
            </article>

            <article className="glass-panel rounded-2xl p-4">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-[#edf4f9] to-[#ffffff] text-[#3b6f99]">
                <FiClock className="h-4.5 w-4.5" />
              </div>
              <p className="text-sm font-black text-[#173a59]">Support That Replies Fast</p>
              <p className="mt-1 text-sm text-[#547697]">
                Our team responds quickly for order, refund, and product questions.
              </p>
            </article>

            <article className="glass-panel rounded-2xl p-4">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-[#edf4f9] to-[#ffffff] text-[#3b6f99]">
                <FiShield className="h-4.5 w-4.5" />
              </div>
              <p className="text-sm font-black text-[#173a59]">Verified Product Quality</p>
              <p className="mt-1 text-sm text-[#547697]">
                Every listing is reviewed for accurate details and fair pricing.
              </p>
            </article>
          </div>
        </section>

        <section className="w-full max-w-6xl px-4 pb-10 mx-auto md:px-8">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-2xl font-black tracking-tight text-[#0f2740] md:text-3xl">
              Shop by Category
            </h2>
            <Link
              to="/products"
              className="glass-chip rounded-full px-4 py-2 text-xs font-bold text-[#315d86] transition-colors hover:bg-[#eef5ff]"
            >
              View all items
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {topCategories.map((category) => (
              <article key={category.name} className="glass-panel rounded-2xl p-4">
                <p className="truncate text-sm font-bold text-[#224264]">{category.name}</p>
                <p className="mt-1 text-xs font-semibold text-[#5c7d9b]">
                  {category.count} products
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-10 md:px-8">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#5d82a3]">
                Limited-Time Offers
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[#0f2740] md:text-3xl">
                Today&apos;s best discounts
              </h2>
              <p className="mt-1 text-sm text-[#547697]">
                Quick picks with real markdowns, limited stock, and fast delivery.
              </p>
            </div>

            <Link
              to="/products"
              className="glass-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-[#315d86] transition-colors hover:bg-[#eef5ff]"
            >
              See all offers
              <FiArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {heroDeal ? (
            <Link
              to={`/products/${heroDeal.id}`}
              className="glass-panel mb-4 flex flex-col gap-4 rounded-3xl p-4 transition-transform hover:-translate-y-1 md:flex-row md:items-center md:justify-between md:p-5"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-[#f4f8ff]/80 p-3 md:h-28 md:w-28">
                  <img
                    src={heroDeal.images?.[0] || heroDeal.thumbnail}
                    alt={heroDeal.title}
                    className="max-h-full w-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="space-y-2">
                  <p className="inline-flex rounded-full bg-[#e7f3ff] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#23608e]">
                    Today&apos;s featured deal
                  </p>
                  <h3 className="line-clamp-2 text-xl font-black text-[#0f2740] md:text-2xl">
                    {heroDeal.title}
                  </h3>
                  <p className="text-sm text-[#547697]">
                    Save {Math.round(heroDeal.discountPercentage)}% on this customer-favorite pick.
                  </p>
                </div>
              </div>

              <div className="flex items-end justify-between gap-5 md:min-w-60 md:justify-end">
                <div className="text-left md:text-right">
                  <p className="text-sm font-bold text-[#6d8baa] line-through">
                    ${Math.round(heroDeal.price / (1 - heroDeal.discountPercentage / 100))}
                  </p>
                  <p className="text-3xl font-black text-[#0b4f7a]">${heroDeal.price}</p>
                  <p className="text-xs font-bold text-[#315d86]">
                    {Math.round(heroDeal.discountPercentage)}% off
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-[#315d86]">
                  View deal
                  <FiArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {discountedProducts.map((product) => {
              const originalPrice = Math.round(
                product.price / (1 - product.discountPercentage / 100)
              );

              return (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="glass-panel group rounded-3xl p-4 transition-transform hover:-translate-y-1"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span className="inline-flex rounded-full bg-[#e7f3ff] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#23608e]">
                      -{Math.round(product.discountPercentage)}%
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#6d8baa]">
                      <FiClock className="h-3.5 w-3.5" />
                      Limited stock
                    </span>
                  </div>

                  <div className="mb-4 flex h-36 items-center justify-center rounded-2xl bg-[#f4f8ff]/80 p-3">
                    <img
                      src={product.images?.[0] || product.thumbnail}
                      alt={product.title}
                      className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5d82a3]">
                    {product.category}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-base font-black text-[#12324f]">
                    {product.title}
                  </h3>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-lg font-black text-[#0b4f7a]">${product.price}</p>
                      <p className="text-xs font-semibold text-[#6d8baa] line-through">
                        ${originalPrice}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#315d86]">
                      View deal
                      <FiArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="w-full max-w-6xl px-4 pb-16 mx-auto md:px-8">
          <div className="flex items-end justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-[#0f2740] md:text-3xl">
                Featured Products
              </h2>
              <p className="mt-1 text-sm text-[#547697]">
                Best-selling picks customers are adding to cart this week.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

export default MainPage;
