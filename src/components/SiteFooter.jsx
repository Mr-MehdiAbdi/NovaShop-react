import React from 'react';
import { Link } from 'react-router-dom';

function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#dbe7f5] bg-[#0f2740] text-[#dbe7f8]">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:px-8">
        <div>
          <h3 className="text-lg font-black tracking-tight text-white">NovaShop</h3>
          <p className="mt-2 text-sm leading-6 text-[#b7cde3]">
            Smart shopping experience with clean UI, fast pages, and modern product discovery.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-[#9eb9d5]">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/products" className="transition-colors hover:text-white">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/checkout" className="transition-colors hover:text-white">
                Checkout
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-[#9eb9d5]">Contact</h4>
          <p className="mt-3 text-sm text-[#c7daeb]">support@novashop.dev</p>
          <p className="mt-1 text-sm text-[#c7daeb]">+1 (555) 904-2223</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 text-xs text-[#9eb9d5] md:px-8">
          <span>© {year} NovaShop. All rights reserved.</span>
          <span>Built for better shopping flow.</span>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
