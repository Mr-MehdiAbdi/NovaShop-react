import React from 'react';

function ProductDetailsLoader({ message }) {
  return (
    <div
      dir="ltr"
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="theme-page mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8"
    >
      <div className="w-full max-w-5xl mx-auto min-h-140">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="h-10 w-10 animate-pulse rounded-full border border-[#d7e3f2] bg-white" />
          <div className="h-4 w-32 animate-pulse rounded-md bg-[#dfeaf7]" />
        </div>

        <div className="relative grid w-full gap-5 overflow-hidden rounded-2xl border border-[#dbe7f5] bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] md:grid-cols-[minmax(280px,420px)_1fr] md:gap-6 md:p-5">
          <div className="pointer-events-none absolute -top-20 -left-16 h-44 w-44 animate-pulse rounded-full bg-[#d9eaff]/55 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-10 h-36 w-36 animate-pulse rounded-full bg-[#e4edf8]/70 blur-3xl" />

          <div className="w-full max-w-sm mx-auto md:max-w-md">
            <div className="relative overflow-hidden rounded-xl border border-[#e4edf8] bg-[#f4f8ff]">
              <div className="aspect-4/3 animate-pulse bg-linear-to-r from-[#e8f1fb] via-[#f8fbff] to-[#e8f1fb] md:aspect-square" />
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/55 to-transparent animate-pulse" />
              <div className="absolute bottom-3 right-3 h-6 w-16 animate-pulse rounded-full bg-white/70" />
            </div>
          </div>

          <div className="relative z-10 self-center space-y-3.5">
            <div className="h-7 w-4/5 animate-pulse rounded-lg bg-[#e8f1fb]" />
            <div className="h-9 w-32 animate-pulse rounded-full bg-[#eef5ff]" />
            <div className="h-8 w-24 animate-pulse rounded-lg bg-[#e5f0fb]" />
            <div className="h-9 w-36 animate-pulse rounded-full bg-[#edf1f5]" />
            <div className="space-y-2 pt-1">
              <div className="h-3.5 w-full animate-pulse rounded bg-[#eef2f6]" />
              <div className="h-3.5 w-[94%] animate-pulse rounded bg-[#eef2f6]" />
              <div className="h-3.5 w-[88%] animate-pulse rounded bg-[#eef2f6]" />
              <div className="h-3.5 w-[75%] animate-pulse rounded bg-[#eef2f6]" />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-[#9dc3eb] border-t-[#2f6ea8]" />
              <span className="h-3.5 w-40 animate-pulse rounded bg-[#e7eff8]" />
            </div>
          </div>
        </div>

        <p className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-[#4b6988]">
          <span className="h-2 w-2 animate-ping rounded-full bg-[#3b82f6]" />
          <span>{message}</span>
        </p>

        <span className="sr-only">{message}</span>
      </div>
    </div>
  );
}

function ProductCardLoader() {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#dbe7f5] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
      <div className="aspect-4/3 w-full animate-pulse bg-linear-to-r from-[#e8f1fb] via-[#f8fbff] to-[#e8f1fb]" />

      <div className="space-y-2 p-4">
        <div className="h-6 w-24 animate-pulse rounded-full bg-[#eef5ff]" />
        <div className="h-5 w-4/5 animate-pulse rounded-md bg-[#e8f1fb]" />
        <div className="space-y-1.5">
          <div className="h-3.5 w-full animate-pulse rounded bg-[#eef2f6]" />
          <div className="h-3.5 w-3/4 animate-pulse rounded bg-[#eef2f6]" />
        </div>
        <div className="h-6 w-20 animate-pulse rounded-md bg-[#e5f0fb]" />
        <div className="mt-2 flex items-center gap-2">
          <div className="h-9 w-28 animate-pulse rounded-full bg-[#dce9f8]" />
          <div className="h-9 w-9 animate-pulse rounded-full bg-[#eef5ff]" />
        </div>
      </div>
    </article>
  );
}

function ProductsLoader({ message, count }) {
  return (
    <div
      dir="ltr"
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="theme-page mx-auto min-h-screen w-full max-w-6xl px-4 py-6 md:px-8 md:py-8"
    >
      <div className="mb-2 h-8 w-44 animate-pulse rounded-lg bg-[#e8f1fb]" />
      <div className="mb-6 h-4 w-24 animate-pulse rounded bg-[#e3ecf7]" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <ProductCardLoader key={`product-card-loader-${index}`} />
        ))}
      </div>

      <p className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-[#4b6988]">
        <span className="h-2 w-2 animate-ping rounded-full bg-[#3b82f6]" />
        <span>{message}</span>
      </p>

      <span className="sr-only">{message}</span>
    </div>
  );
}

function LoadingState({ variant = 'products', message, count = 6 }) {
  if (variant === 'details') {
    return <ProductDetailsLoader message={message || 'Loading product details...'} />;
  }

  return <ProductsLoader count={count} message={message || 'Loading products...'} />;
}

export default LoadingState;
