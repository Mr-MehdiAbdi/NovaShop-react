import React from 'react';
import { Link } from 'react-router-dom';

function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#ffc9d2] bg-[#2d2f36] text-[#f6e9eb]">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:px-8">
        <div>
          <h3 className="text-lg font-black tracking-tight text-white">NovaShop</h3>
          <p className="mt-2 text-sm leading-6 text-[#d4c7ca]">
            Smart shopping experience with clean UI, fast pages, and modern product discovery.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-[#ffb4c0]">Explore</h4>
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
          <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-[#ffb4c0]">Contact</h4>
          <p className="mt-3 text-sm text-[#e1d4d7]">support@novashop.dev</p>
          <p className="mt-1 text-sm text-[#e1d4d7]">+1 (555) 904-2223</p>
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 text-xs text-[#cebfc3] md:px-8">
          <span>© {year} NovaShop. All rights reserved.</span>
          <span>Built for better shopping flow.</span>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
