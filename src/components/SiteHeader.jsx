import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../Context/ThemeContext';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/checkout', label: 'Checkout' },
];

function SiteHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="glass-panel-strong sticky top-0 z-40 border-b border-white/20">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <NavLink to="/" className="group inline-flex items-center gap-2" aria-label="NovaShop home">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-[#234d72] to-[#3c7aa9] text-sm font-black text-white shadow-[0_10px_18px_rgba(35,77,114,0.24)]">
            N
          </span>
          <span className="text-lg font-black tracking-tight text-[#12324f] transition-colors group-hover:text-[#4e89bf]">
            NovaShop
          </span>
        </NavLink>

        <div className="flex items-center gap-2">
          <nav
            aria-label="Primary navigation"
            className="glass-chip flex items-center gap-1.5 rounded-full p-1"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'rounded-full px-3.5 py-2 text-xs font-bold transition-all md:text-sm',
                    isActive
                      ? 'bg-[#234d72] text-white shadow-[0_8px_18px_rgba(35,77,114,0.22)]'
                      : 'text-[#315d86] hover:bg-white/35 hover:text-[#3d78a7]',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={toggleTheme}
            className="glass-chip inline-flex h-10 w-10 items-center justify-center rounded-full text-[#315d86] transition hover:text-[#3d78a7]"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? (
              <FiSun className="h-4.5 w-4.5" />
            ) : (
              <FiMoon className="h-4.5 w-4.5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
