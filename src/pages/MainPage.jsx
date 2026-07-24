import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiBox,
  FiClock,
  FiCreditCard,
  FiGift,
  FiHeadphones,
  FiRefreshCw,
  FiShield,
  FiSmartphone,
  FiTruck,
} from 'react-icons/fi';
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
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  const heroSlides = useMemo(() => {
    const source = discountedProducts.length ? discountedProducts : featuredProducts;
    const tones = [
      {
        badge: 'AMAZING OFFER',
        heading: "Today's Spotlight Collection",
        description: 'Handpicked essentials with fast shipping and secure checkout.',
      },
      {
        badge: 'FLASH PICK',
        heading: 'Fresh Deals, Updated Daily',
        description: 'Discover trending products curated for smart daily shopping.',
      },
      {
        badge: 'LIMITED DROP',
        heading: 'Premium Picks For Your Cart',
        description: 'Quality products, clear pricing, and a frictionless checkout flow.',
      },
    ];

    return source.slice(0, 5).map((product, index) => {
      const tone = tones[index % tones.length];
      return {
        id: product.id,
        title: product.title,
        category: product.category || 'General',
        price: product.price,
        image: product.images?.[0] || product.thumbnail,
        ...tone,
      };
    });
  }, [discountedProducts, featuredProducts]);

  const currentHeroSlide = heroSlides[activeHeroIndex] || null;

  useEffect(() => {
    if (!heroSlides.length) {
      return;
    }

    if (activeHeroIndex >= heroSlides.length) {
      setActiveHeroIndex(0);
      return;
    }

    if (heroSlides.length === 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveHeroIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, [activeHeroIndex, heroSlides]);

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

  const quickActions = [
    { label: 'Mobile Store', icon: FiSmartphone },
    { label: 'Gift Cards', icon: FiGift },
    { label: 'Express Delivery', icon: FiTruck },
    { label: 'Easy Returns', icon: FiRefreshCw },
    { label: 'Secure Payment', icon: FiCreditCard },
    { label: 'Support Center', icon: FiHeadphones },
  ];

  if (loading) {
    return (
      <div className="theme-page text-[#2f3036]">
        <SiteHeader />
        <LoadingState variant="products" message="Preparing your storefront..." count={6} />
        <SiteFooter />
      </div>
    );
  }

  if (error) {
    return (
      <div className="theme-page text-[#2f3036]">
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
          <div className="rounded-2xl border border-[#ffb9c2] bg-[#fff5f6] p-6 text-[#9d2738]">
            <h2 className="text-xl font-black">Could not load store data</h2>
            <p className="mt-2 text-sm">{error.message}</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="theme-page text-[#2f3036]">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-10 md:px-8 md:pb-16 md:pt-14">
            <article className="relative overflow-hidden rounded-3xl border border-[#d58f9b] bg-linear-to-br from-[#ae2a3b] via-[#912535] to-[#741f2d] p-6 text-white shadow-[0_20px_44px_rgba(90,27,39,0.34)] md:min-h-97.5 md:p-8">
              {currentHeroSlide ? (
                <>
                  <div className="relative z-10 grid items-center gap-6 md:grid-cols-[1fr_0.75fr]">
                    <div>
                      <p className="inline-flex rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-black tracking-[0.14em]">
                        {currentHeroSlide.badge}
                      </p>
                      <h1 className="mt-4 text-3xl font-black leading-[1.12] md:text-5xl">
                        {currentHeroSlide.heading}
                      </h1>
                      <p className="mt-3 max-w-xl text-sm leading-7 text-[#f8dce2] md:text-base">
                        {currentHeroSlide.description}
                      </p>

                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <Link
                          to={`/products/${currentHeroSlide.id}`}
                          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-black text-[#8f2433] transition hover:bg-[#fff1f3]"
                        >
                          Explore this amazing offer
                          <FiArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                          to="/products"
                          className="inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/20"
                        >
                          See all amazing offers
                        </Link>
                      </div>

                      <div className="mt-6 grid grid-cols-3 gap-2.5 text-center text-xs font-bold sm:max-w-lg">
                        <div className="rounded-xl border border-white/28 bg-white/12 px-3 py-2">
                          <p className="text-[11px] text-[#f3ccd4]">Products</p>
                          <p className="mt-1 text-lg font-black text-white">{products.length}</p>
                        </div>
                        <div className="rounded-xl border border-white/28 bg-white/12 px-3 py-2">
                          <p className="text-[11px] text-[#f3ccd4]">Avg Price</p>
                          <p className="mt-1 text-lg font-black text-white">${averagePrice}</p>
                        </div>
                        <div className="rounded-xl border border-white/28 bg-white/12 px-3 py-2">
                          <p className="text-[11px] text-[#f3ccd4]">Active Carts</p>
                          <p className="mt-1 text-lg font-black text-white">{carts.length}</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 flex items-center justify-center rounded-3xl border border-white/25 bg-white/12 p-5 backdrop-blur-sm">
                      <img
                        src={currentHeroSlide.image}
                        alt={currentHeroSlide.title}
                        className="max-h-56 w-auto object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.28)] md:max-h-72"
                        loading="lazy"
                        decoding="async"
                      />

                      <div className="absolute bottom-3 left-3 rounded-2xl bg-white/20 px-3 py-2 backdrop-blur-sm">
                        <p className="line-clamp-1 text-xs font-black tracking-[0.08em] text-[#f8d5dd]">
                          {currentHeroSlide.category}
                        </p>
                        <p className="line-clamp-1 text-sm font-black text-white">
                          {currentHeroSlide.title}
                        </p>
                        <p className="mt-0.5 text-lg font-black text-white">
                          ${currentHeroSlide.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {heroSlides.map((slide, index) => (
                        <button
                          key={slide.id}
                          type="button"
                          onClick={() => setActiveHeroIndex(index)}
                          className={`h-2 rounded-full transition-all ${
                            index === activeHeroIndex
                              ? 'w-8 bg-white'
                              : 'w-2 bg-white/55 hover:bg-white/75'
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveHeroIndex((prevIndex) =>
                            prevIndex === 0 ? heroSlides.length - 1 : prevIndex - 1
                          )
                        }
                        className="rounded-full border border-white/40 bg-white/10 px-3 py-1.5 text-sm font-bold text-white transition hover:bg-white/20"
                        aria-label="Previous slide"
                      >
                        Prev
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveHeroIndex((prevIndex) => (prevIndex + 1) % heroSlides.length)
                        }
                        className="rounded-full border border-white/40 bg-white/10 px-3 py-1.5 text-sm font-bold text-white transition hover:bg-white/20"
                        aria-label="Next slide"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="relative z-10 py-10 text-center">
                  <p className="text-lg font-black text-white">Amazing offers are loading...</p>
                </div>
              )}
            </article>

            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {topCategories.slice(0, 4).map((category) => (
                <Link
                  key={category.name}
                  to="/products"
                  className="glass-panel rounded-2xl px-4 py-3 transition-colors hover:bg-white/95"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a5a63]">
                    Category Spotlight
                  </p>
                  <p className="mt-1 truncate text-base font-black text-[#2f3036]">
                    {category.name}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-[#6f6266]">
                    {category.count} products
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-12 md:px-8 md:pb-14">
          <div className="glass-panel rounded-3xl p-4 md:p-5">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {quickActions.map((action) => {
                const ActionIcon = action.icon;

                return (
                  <Link
                    key={action.label}
                    to="/products"
                    className="group rounded-2xl border border-[#ffd4da] bg-white/70 p-3 text-center transition-all hover:-translate-y-0.5 hover:border-[#f3a7b3] hover:bg-[#fff7f8]"
                  >
                    <span className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-[#fff1f3] to-white text-[#b6283a] transition group-hover:from-[#ffe5e9] group-hover:text-[#8f2433]">
                      <ActionIcon className="h-5 w-5" />
                    </span>
                    <p className="mt-2 text-xs font-bold text-[#4a4d56]">{action.label}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-12 md:px-8 md:pb-14">
          <div className="glass-panel overflow-hidden rounded-3xl border border-[#ffd4da] p-4 md:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#9a4f5a]">
                  Super Daily Deals
                </p>
                <h3 className="mt-1 text-xl font-black text-[#2d2f36] md:text-2xl">
                  Shocking deals, limited time
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {['08', '42', '19'].map((unit, index) => (
                  <div
                    key={`${unit}-${index}`}
                    className="rounded-xl border border-[#ffc9d2] bg-white px-3 py-2 text-center"
                  >
                    <p className="text-lg font-black text-[#b6283a]">{unit}</p>
                    <p className="text-[10px] font-bold uppercase text-[#8d6670]">
                      {index === 0 ? 'HRS' : index === 1 ? 'MIN' : 'SEC'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {discountedProducts.map((product) => (
                <Link
                  key={`super-${product.id}`}
                  to={`/products/${product.id}`}
                  className="group rounded-2xl border border-[#ffdce2] bg-white p-3 transition-all hover:-translate-y-0.5 hover:border-[#f3a7b3]"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <span className="rounded-full bg-[#fff1f3] px-2.5 py-1 text-[11px] font-black text-[#c91f35]">
                      {Math.round(product.discountPercentage)}% OFF
                    </span>
                    <FiBox className="mt-0.5 h-4 w-4 text-[#b7707d]" />
                  </div>

                  <div className="mb-3 flex h-24 items-center justify-center rounded-xl bg-[#fff8f9]">
                    <img
                      src={product.images?.[0] || product.thumbnail}
                      alt={product.title}
                      className="max-h-full w-auto object-contain transition-transform group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <p className="line-clamp-2 text-sm font-bold text-[#2f3036]">{product.title}</p>
                  <div className="mt-2 flex items-end justify-between gap-2">
                    <div>
                      <p className="text-base font-black text-[#c91f35]">${product.price}</p>
                      <p className="text-[11px] font-semibold text-[#8d7b81] line-through">
                        ${Math.round(product.price / (1 - product.discountPercentage / 100))}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#8f2433]">View</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-12 md:px-8 md:pb-14">
          <div className="grid gap-3 md:grid-cols-3">
            <article className="glass-panel rounded-2xl p-4">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-[#fff0f2] to-[#ffffff] text-[#d9243a]">
                <FiTruck className="h-4.5 w-4.5" />
              </div>
              <p className="text-sm font-black text-[#2f3036]">Same-Day Dispatch</p>
              <p className="mt-1 text-sm text-[#676a74]">
                Orders confirmed before 2 PM are packed and sent on the same day.
              </p>
            </article>

            <article className="glass-panel rounded-2xl p-4">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-[#fff0f2] to-[#ffffff] text-[#d9243a]">
                <FiClock className="h-4.5 w-4.5" />
              </div>
              <p className="text-sm font-black text-[#2f3036]">Support That Replies Fast</p>
              <p className="mt-1 text-sm text-[#676a74]">
                Our team responds quickly for order, refund, and product questions.
              </p>
            </article>

            <article className="glass-panel rounded-2xl p-4">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-[#fff0f2] to-[#ffffff] text-[#d9243a]">
                <FiShield className="h-4.5 w-4.5" />
              </div>
              <p className="text-sm font-black text-[#2f3036]">Verified Product Quality</p>
              <p className="mt-1 text-sm text-[#676a74]">
                Every listing is reviewed for accurate details and fair pricing.
              </p>
            </article>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-12 md:px-8 md:pb-14">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-black tracking-tight text-[#2d2f36] md:text-3xl">
              Shop by Category
            </h2>
            <Link
              to="/products"
              className="glass-chip rounded-full px-4 py-2 text-xs font-bold text-[#c91f35] transition-colors hover:bg-[#fff1f3]"
            >
              View all items
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {topCategories.map((category) => (
              <article key={category.name} className="glass-panel rounded-2xl p-4">
                <p className="truncate text-sm font-bold text-[#2f3036]">{category.name}</p>
                <p className="mt-1 text-xs font-semibold text-[#676a74]">
                  {category.count} products
                </p>
              </article>
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <article className="glass-panel rounded-2xl p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#9a4f5a]">
                Trending Searches
              </p>
              <p className="mt-2 text-sm font-bold text-[#2f3036]">
                Wireless earbuds, skincare sets, coffee maker, smart watches
              </p>
            </article>
            <article className="glass-panel rounded-2xl p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#9a4f5a]">
                Active Carts
              </p>
              <p className="mt-2 text-2xl font-black text-[#c91f35]">{carts.length}</p>
              <p className="text-xs font-semibold text-[#676a74]">
                {totalUnitsInCarts} units pending checkout
              </p>
            </article>
            <article className="glass-panel rounded-2xl p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#9a4f5a]">
                Price Snapshot
              </p>
              <p className="mt-2 text-2xl font-black text-[#c91f35]">${averagePrice}</p>
              <p className="text-xs font-semibold text-[#676a74]">
                Average price across current catalog
              </p>
            </article>
            <article className="glass-panel rounded-2xl p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#9a4f5a]">
                Customer Promise
              </p>
              <p className="mt-2 text-sm font-bold text-[#2f3036]">
                Refund support, tracked shipping, and verified product information.
              </p>
            </article>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-12 md:px-8 md:pb-14">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#9a4f5a]">
                Limited-Time Offers
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[#2d2f36] md:text-3xl">
                Today&apos;s best discounts
              </h2>
              <p className="mt-1 text-sm text-[#676a74]">
                Quick picks with real markdowns, limited stock, and fast delivery.
              </p>
            </div>

            <Link
              to="/products"
              className="glass-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-[#c91f35] transition-colors hover:bg-[#fff1f3]"
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
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-[#fff6f7]/92 p-3 md:h-28 md:w-28">
                  <img
                    src={heroDeal.images?.[0] || heroDeal.thumbnail}
                    alt={heroDeal.title}
                    className="max-h-full w-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="space-y-2">
                  <p className="inline-flex rounded-full bg-[#fff1f3] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#c91f35]">
                    Today&apos;s featured deal
                  </p>
                  <h3 className="line-clamp-2 text-xl font-black text-[#2d2f36] md:text-2xl">
                    {heroDeal.title}
                  </h3>
                  <p className="text-sm text-[#676a74]">
                    Save {Math.round(heroDeal.discountPercentage)}% on this customer-favorite pick.
                  </p>
                </div>
              </div>

              <div className="flex items-end justify-between gap-5 md:min-w-60 md:justify-end">
                <div className="text-left md:text-right">
                  <p className="text-sm font-bold text-[#8c7f84] line-through">
                    ${Math.round(heroDeal.price / (1 - heroDeal.discountPercentage / 100))}
                  </p>
                  <p className="text-3xl font-black text-[#d9233a]">${heroDeal.price}</p>
                  <p className="text-xs font-bold text-[#c91f35]">
                    {Math.round(heroDeal.discountPercentage)}% off
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-[#c91f35]">
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
                    <span className="inline-flex rounded-full bg-[#fff1f3] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#c91f35]">
                      -{Math.round(product.discountPercentage)}%
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#8c7f84]">
                      <FiClock className="h-3.5 w-3.5" />
                      Limited stock
                    </span>
                  </div>

                  <div className="mb-4 flex h-36 items-center justify-center rounded-2xl bg-[#fff6f7]/92 p-3">
                    <img
                      src={product.images?.[0] || product.thumbnail}
                      alt={product.title}
                      className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#965764]">
                    {product.category}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-base font-black text-[#2f3036]">
                    {product.title}
                  </h3>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-lg font-black text-[#d9233a]">${product.price}</p>
                      <p className="text-xs font-semibold text-[#8c7f84] line-through">
                        ${originalPrice}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#c91f35]">
                      View deal
                      <FiArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-20 md:px-8 md:pb-24">
          <div className="mb-6 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-[#2d2f36] md:text-3xl">
                Featured Products
              </h2>
              <p className="mt-1 text-sm text-[#676a74]">
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
