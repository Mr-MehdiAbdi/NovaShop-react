import { useState } from 'react';
import { Route } from 'react-router-dom';
import CheckoutPage from './pages/CheckoutPage';
import MainPage from './pages/MainPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import PageNotFound from './pages/PageNotFound';
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

const categories = ['همه محصولات', 'موبایل', 'لپ تاپ', 'هدفون', 'ساعت هوشمند', 'گیمینگ'];
function createProductArtwork(category, title, accent, background) {
  const artByCategory = {
    موبایل: `
      <defs>
        <linearGradient id="phone-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0.95" />
        </linearGradient>
      </defs>
      <rect x="61" y="20" width="78" height="152" rx="24" fill="#0f172a" opacity="0.35" />
      <rect x="58" y="17" width="78" height="152" rx="24" fill="#111827" stroke="rgba(255,255,255,0.12)" stroke-width="2" />
      <rect x="66" y="28" width="62" height="130" rx="16" fill="url(#phone-screen)" />
      <circle cx="97" cy="38" r="3" fill="#ffffff" opacity="0.55" />
      <rect x="76" y="48" width="42" height="60" rx="10" fill="#ffffff" opacity="0.08" />
      <path d="M74 120h46" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.35" />
    `,
    'لپ تاپ': `
      <defs>
        <linearGradient id="laptop-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.92" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0.94" />
        </linearGradient>
      </defs>
      <rect x="38" y="40" width="124" height="78" rx="14" fill="#0f172a" opacity="0.32" />
      <rect x="34" y="36" width="124" height="78" rx="14" fill="#111827" stroke="rgba(255,255,255,0.12)" stroke-width="2" />
      <rect x="45" y="47" width="102" height="56" rx="10" fill="url(#laptop-screen)" />
      <path d="M26 136h148" stroke="#111827" stroke-width="12" stroke-linecap="round" opacity="0.92" />
      <path d="M52 139h96" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.15" />
      <rect x="56" y="58" width="38" height="6" rx="3" fill="#ffffff" opacity="0.6" />
      <rect x="56" y="70" width="54" height="6" rx="3" fill="#ffffff" opacity="0.3" />
    `,
    هدفون: `
      <path d="M58 106a42 42 0 0 1 84 0" fill="none" stroke="#111827" stroke-width="16" stroke-linecap="round" opacity="0.28" />
      <path d="M60 104a40 40 0 0 1 80 0" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round" opacity="0.95" />
      <rect x="42" y="104" width="22" height="48" rx="10" fill="#111827" opacity="0.9" />
      <rect x="136" y="104" width="22" height="48" rx="10" fill="#111827" opacity="0.9" />
      <rect x="46" y="108" width="14" height="36" rx="7" fill="#ffffff" opacity="0.1" />
      <rect x="140" y="108" width="14" height="36" rx="7" fill="#ffffff" opacity="0.1" />
      <circle cx="100" cy="116" r="26" fill="${accent}" opacity="0.92" />
      <circle cx="100" cy="116" r="14" fill="#ffffff" opacity="0.12" />
    `,
    'ساعت هوشمند': `
      <rect x="74" y="18" width="52" height="30" rx="12" fill="#111827" opacity="0.92" />
      <rect x="70" y="46" width="60" height="106" rx="24" fill="#111827" opacity="0.32" />
      <rect x="72" y="50" width="56" height="98" rx="22" fill="${accent}" opacity="0.95" />
      <circle cx="100" cy="98" r="20" fill="#ffffff" opacity="0.09" />
      <path d="M100 86v14l8 6" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.75" />
      <rect x="74" y="148" width="52" height="32" rx="12" fill="#111827" opacity="0.92" />
    `,
    گیمینگ: `
      <path d="M50 108c0-22 18-40 40-40h20c22 0 40 18 40 40v8c0 10-8 18-18 18h-14l-18 16-18-16H68c-10 0-18-8-18-18v-8Z" fill="#111827" opacity="0.32" />
      <path d="M52 106c0-20 16-36 36-36h24c20 0 36 16 36 36v8c0 9-7 16-16 16h-14l-16 14-16-14H68c-9 0-16-7-16-16v-8Z" fill="${accent}" opacity="0.95" />
      <circle cx="82" cy="110" r="5" fill="#ffffff" opacity="0.82" />
      <circle cx="118" cy="110" r="5" fill="#ffffff" opacity="0.82" />
      <path d="M74 96h16M82 88v16" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.72" />
      <path d="M108 94h18M126 112h-18" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.52" />
    `,
  };

  const safeTitle = title.replace(/&/g, '&amp;');
  const art = artByCategory[category] || artByCategory.گیمینگ;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="${safeTitle}">
      <defs>
        <radialGradient id="bg-glow" cx="50%" cy="22%" r="85%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.10" />
          <stop offset="45%" stop-color="${accent}" stop-opacity="0.14" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0.18" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" rx="28" fill="${background}" />
      <rect width="200" height="200" rx="28" fill="url(#bg-glow)" />
      <circle cx="154" cy="40" r="18" fill="#ffffff" opacity="0.05" />
      <circle cx="44" cy="156" r="26" fill="#ffffff" opacity="0.04" />
      <rect x="18" y="18" width="164" height="164" rx="26" fill="none" stroke="rgba(255,255,255,0.10)" />
      <g transform="translate(0 2)">${art}</g>
    </svg>
  `)}`;
}

const products = [
  {
    category: 'موبایل',
    name: 'Nova X1 Ultra',
    price: '۲۹,۹۰۰,۰۰۰ تومان',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: createProductArtwork('موبایل', 'Nova X1 Ultra', '#d7f3ff', '#1f4b99'),
  },
  {
    category: 'لپ تاپ',
    name: 'NovaBook Air 14',
    price: '۶۳,۴۰۰,۰۰۰ تومان',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: createProductArtwork('لپ تاپ', 'NovaBook Air 14', '#e8ebff', '#334155'),
  },
  {
    category: 'هدفون',
    name: 'Pulse ANC Pro',
    price: '۹,۳۰۰,۰۰۰ تومان',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: createProductArtwork('هدفون', 'Pulse ANC Pro', '#ffe9d6', '#b45309'),
  },
  {
    category: 'ساعت هوشمند',
    name: 'Orbit Watch S',
    price: '۷,۱۰۰,۰۰۰ تومان',
    image:
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: createProductArtwork('ساعت هوشمند', 'Orbit Watch S', '#e0f2fe', '#0f766e'),
  },
  {
    category: 'گیمینگ',
    name: 'NovaPad Controller',
    price: '۴,۸۰۰,۰۰۰ تومان',
    image:
      'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: createProductArtwork('گیمینگ', 'NovaPad Controller', '#ece4ff', '#6d28d9'),
  },
  {
    category: 'لپ تاپ',
    name: 'Creator Station 16',
    price: '۷۸,۹۰۰,۰۰۰ تومان',
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: createProductArtwork('لپ تاپ', 'Creator Station 16', '#f1f5f9', '#475569'),
  },
];

function ThemeButton({ isDark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'فعال سازی حالت روشن' : 'فعال سازی حالت تیره'}
      className={[
        'grid h-11 w-11 place-items-center rounded-2xl border transition-all duration-300 active:scale-95',
        isDark
          ? 'border-white/10 bg-[#10253b] text-amber-300 hover:bg-[#16314c]'
          : 'border-[#e2d8c5] bg-[#fff9f1] text-[#16324d] hover:bg-[#f6efe4]',
      ].join(' ')}
    >
      {isDark ? (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.64 5.64l1.56 1.56m9.6 9.6 1.56 1.56m0-12.72-1.56 1.56m-9.6 9.6-1.56 1.56" />
          <circle cx="12" cy="12" r="3.2" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
          <path d="M14.5 3.4a.8.8 0 0 0-1.03.9 8.5 8.5 0 1 1-8.16 10.22.8.8 0 0 0-1.28.78A10.3 10.3 0 1 0 14.5 3.4Z" />
        </svg>
      )}
    </button>
  );
}

function CategoryItem({ title, active, isDark }) {
  return (
    <li
      className={[
        'rounded-xl px-3 py-2.5 text-sm font-semibold leading-6 transition-all duration-300',
        active
          ? isDark
            ? 'bg-[#16324d] text-white'
            : 'bg-[#f0e3cf] text-[#16324d]'
          : isDark
            ? 'text-slate-200 hover:bg-[#10253b]'
            : 'text-slate-700 hover:bg-[#f3eadc]',
      ].join(' ')}
    >
      {title}
    </li>
  );
}

function ProductCard({ product, isDark, delayMs }) {
  return (
    <article
      className={[
        'animate-fade-up group overflow-hidden rounded-3xl border transition-colors duration-500',
        isDark
          ? 'border-white/10 bg-[#0e2438]/96 hover:border-sky-400/35'
          : 'border-[#e6dccd] bg-[#fffaf4] hover:border-[#d9cbb5]',
      ].join(' ')}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = product.fallbackImage;
          }}
          loading="lazy"
          className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </div>
      <div className="space-y-1.5 p-4">
        <p
          className={[
            'text-xs font-semibold leading-5',
            isDark ? 'text-slate-400' : 'text-[#7b6a55]',
          ].join(' ')}
        >
          {product.category}
        </p>
        <h3
          className={[
            'text-base font-bold leading-7',
            isDark ? 'text-[#f8fafc]' : 'text-[#152235]',
          ].join(' ')}
        >
          {product.name}
        </h3>
        <p
          className={[
            'pt-1 text-lg font-extrabold leading-7',
            isDark ? 'text-amber-200' : 'text-[#1a3658]',
          ].join(' ')}
        >
          {product.price}
        </p>

        <button
          type="button"
          className={[
            'mt-3 flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-black transition-colors duration-300',
            isDark
              ? 'bg-amber-400 text-[#07111f] hover:bg-amber-300'
              : 'bg-[#16324d] text-white hover:bg-[#1f4a74]',
          ].join(' ')}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            aria-hidden="true"
          >
            <path d="M3 4h2l2.2 10.5A2 2 0 0 0 9.1 16h7.8a2 2 0 0 0 1.9-1.5L21 8H6.1" />
            <circle cx="10" cy="20" r="1.4" />
            <circle cx="17" cy="20" r="1.4" />
          </svg>
          <span className="sr-only">افزودن به سبد خرید</span>
        </button>
      </div>
    </article>
  );
}

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div
      dir="rtl"
      className={[
        'min-h-screen font-[Vazirmatn,sans-serif] transition-colors duration-500',
        isDark ? 'bg-[#071826] text-[#f8fafc]' : 'bg-[#f7f4ee] text-[#122033]',
      ].join(' ')}
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div
          className={[
            'animate-float-slow absolute -top-24 right-[8%] h-72 w-72 rounded-full blur-3xl',
            isDark ? 'bg-amber-500/16' : 'bg-sky-300/35',
          ].join(' ')}
        />
        <div
          className={[
            'animate-float-slower absolute bottom-0 left-[8%] h-72 w-72 rounded-full blur-3xl',
            isDark ? 'bg-sky-500/12' : 'bg-amber-300/35',
          ].join(' ')}
        />
      </div>

      <header
        className={[
          'sticky top-0 z-20 border-b backdrop-blur-2xl transition-colors duration-500',
          isDark ? 'border-white/10 bg-[#0b1f31]/80' : 'border-[#e6dccd] bg-[#fbf7f1]/82',
        ].join(' ')}
      >
        <div className="grid items-center w-full grid-cols-12 gap-3 px-4 py-4 mx-auto max-w-7xl lg:px-8">
          <div className="flex items-center col-span-6 gap-3 md:col-span-3">
            <div
              className={[
                'animate-soft-pulse grid h-10 w-10 place-items-center rounded-2xl text-xs font-black',
                isDark ? 'bg-[#16324d] text-[#f8fafc]' : 'bg-[#f0e3cf] text-[#16324d]',
              ].join(' ')}
            >
              NS
            </div>
            <span className="text-lg font-extrabold tracking-tight md:text-xl">نواشاپ</span>
          </div>

          <div className="flex items-center justify-end col-span-6 gap-2 md:col-span-4 md:col-start-9">
            <div
              className={[
                'w-full max-w-xs rounded-2xl border px-4 py-2.5 transition-colors duration-500',
                isDark ? 'border-white/10 bg-[#10253b]' : 'border-[#e2d8c5] bg-[#fff9f1]',
              ].join(' ')}
            >
              <input
                type="text"
                placeholder="جستجوی محصول..."
                className={[
                  'w-full bg-transparent text-sm leading-6 outline-none',
                  isDark ? 'placeholder:text-slate-400' : 'placeholder:text-[#8a7a66]',
                ].join(' ')}
              />
            </div>
            <button
              type="button"
              aria-label="سبد خرید"
              className={[
                'grid h-11 w-11 place-items-center rounded-2xl border transition-all duration-300 active:scale-95',
                isDark
                  ? 'border-white/10 bg-[#10253b] text-amber-200 hover:bg-[#16324d]'
                  : 'border-[#e2d8c5] bg-[#fff9f1] text-[#16324d] hover:bg-[#f6efe4]',
              ].join(' ')}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M3 4h2l2.2 10.5A2 2 0 0 0 9.1 16h7.8a2 2 0 0 0 1.9-1.5L21 8H6.1" />
                <circle cx="10" cy="20" r="1.4" />
                <circle cx="17" cy="20" r="1.4" />
              </svg>
            </button>
            <ThemeButton isDark={isDark} onToggle={() => setIsDark((prev) => !prev)} />
          </div>

          <nav
            className={[
              'col-span-12 flex items-center gap-3 overflow-x-auto pt-1 text-sm font-semibold md:col-span-5 md:justify-center md:pt-0 lg:gap-4',
              isDark ? 'text-slate-300' : 'text-[#6b5c48]',
            ].join(' ')}
          >
            {['خانه', 'محصولات', 'جدیدترین', 'تماس با ما'].map((item) => (
              <a
                key={item}
                href="#"
                className={[
                  'whitespace-nowrap rounded-full px-3 py-1.5 transition-all duration-300',
                  isDark
                    ? 'hover:bg-[#16324d] hover:text-white'
                    : 'hover:bg-[#f0e3cf] hover:text-[#16324d]',
                ].join(' ')}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="grid w-full grid-cols-1 gap-6 px-4 py-6 mx-auto max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-8">
        <aside
          className={[
            'animate-fade-up order-1 rounded-3xl border p-5 transition-colors duration-500 lg:order-0 lg:col-span-3 lg:sticky lg:top-24 lg:self-start',
            isDark ? 'border-white/10 bg-[#0b1f31]' : 'border-[#e6dccd] bg-[#fffaf4]',
          ].join(' ')}
        >
          <h2 className="mb-4 text-base font-bold leading-7">دسته بندی</h2>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <CategoryItem key={category} title={category} active={index === 0} isDark={isDark} />
            ))}
          </ul>
        </aside>

        <section className="lg:col-span-9">
          <div
            className={[
              'animate-fade-up mb-6 overflow-hidden rounded-[30px] border p-6 transition-colors duration-500 md:p-8',
              isDark ? 'border-white/10 bg-[#0b1f31]' : 'border-[#e6dccd] bg-[#fffaf4]',
            ].join(' ')}
          >
            <span
              className={[
                'inline-block rounded-full px-3 py-1 text-xs font-bold',
                isDark ? 'bg-amber-500/12 text-amber-200' : 'bg-sky-50 text-sky-700',
              ].join(' ')}
            >
              فروش ویژه ۲۰۲۶
            </span>
            <h1 className="mt-3 text-2xl font-black leading-tight tracking-tight md:text-4xl">
              یه فروشگاه زنده با حال و هوای امروزی
            </h1>
            <p
              className={[
                'mt-3 max-w-2xl text-base leading-7',
                isDark ? 'text-slate-300' : 'text-[#5f5a51]',
              ].join(' ')}
            >
              رنگ های پویا، عمق بصری واقعی و انیمیشن های نرم برای یک تجربه متفاوت و جذاب.
            </p>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold leading-8 md:text-xl">محصولات منتخب</h2>
            <span
              className={[
                'rounded-full border px-3 py-1.5 text-xs font-semibold leading-5 transition-colors duration-500',
                isDark
                  ? 'border-white/10 bg-[#10253b] text-slate-300'
                  : 'border-[#e2d8c5] bg-[#fff9f1] text-[#6b5c48]',
              ].join(' ')}
            >
              {products.length} محصول
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product, index) => (
              <ProductCard
                key={product.name}
                product={product}
                isDark={isDark}
                delayMs={index * 110}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
