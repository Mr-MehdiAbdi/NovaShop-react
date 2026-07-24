import React from 'react';
import { Link } from 'react-router-dom';
import { FiDollarSign, FiShoppingCart, FiTag } from 'react-icons/fi';
import { TbListDetails } from 'react-icons/tb';
import { shortenText } from '../helper/helper';

function Card({ product }) {
  return (
    <article className="glass-panel overflow-hidden rounded-3xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_rgba(217,36,58,0.14)]">
      <div className="w-full aspect-4/3 bg-[#fff6f7]/92">
        <img
          src={product.images?.[0] || product.thumbnail}
          alt={product.title}
          className="object-contain object-center w-full h-full"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="p-4 space-y-2">
        <p className="glass-chip inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-[#7a4a53]">
          <FiTag className="h-3.5 w-3.5" />
          <span>{product.category}</span>
        </p>
        <h3 className="text-base font-bold text-[#2f3036]">{product.title}</h3>
        <p className="text-sm text-[#63656f] line-clamp-2">
          {shortenText(product.description, 80)}
        </p>
        <p className="flex items-center gap-1.5 pt-1 text-lg font-extrabold text-[#d9243a]">
          <FiDollarSign className="w-4 h-4" />
          <span>{product.price}</span>
        </p>

        <div className="flex items-center gap-2 mt-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#ef394e] to-[#d9243a] px-3.5 py-2 text-xs font-bold text-white transition-all hover:from-[#e23448] hover:to-[#c91f35]"
          >
            <FiShoppingCart className="w-4 h-4" />
            <span>Add to cart</span>
          </button>

          <Link
            to={`/products/${product.id}`}
            className="glass-chip inline-flex items-center justify-center rounded-full p-2 text-[#5b4d51] transition-colors hover:bg-[#fff1f3]"
            aria-label={`View details for ${product.title}`}
            title="View details"
          >
            <TbListDetails className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default Card;
