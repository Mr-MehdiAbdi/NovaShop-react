import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiBox, FiChevronLeft, FiDollarSign, FiSearch, FiTag } from 'react-icons/fi';
import { apiGet } from '../services/config';
import LoadingState from '../components/LoadingState';

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiGet(`/products/${id}`, { showErrorToast: false });
        setProduct(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <LoadingState variant="details" message="Loading product details..." />;
  }

  if (error) {
    return (
      <div dir="ltr" className="px-4 py-6 md:px-8">
        Error loading product details: {error.message}
      </div>
    );
  }

  if (!product) {
    return (
      <div dir="ltr" className="px-4 py-6 md:px-8">
        Product not found.
      </div>
    );
  }

  const handleImageMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  return (
    <div dir="ltr" className="theme-page mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Link
            to="/products"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d7e3f2] bg-white text-[#224264] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#eef5ff]"
            aria-label="Back to products"
            title="Back to products"
          >
            <FiChevronLeft className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid w-full gap-5 overflow-hidden rounded-2xl border border-[#dbe7f5] bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] md:grid-cols-[minmax(280px,420px)_1fr] md:gap-6 md:p-5">
          <div className="w-full max-w-sm mx-auto md:max-w-md">
            <div
              className="group relative overflow-hidden rounded-xl bg-[#f4f8ff]"
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleImageMouseMove}
            >
              <div className="aspect-4/3 md:aspect-square">
                <img
                  src={product.images?.[0] || product.thumbnail}
                  alt={product.title}
                  className="object-contain object-center w-full h-full transition-transform duration-200 cursor-zoom-in"
                  style={{
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transform: isZooming ? 'scale(2)' : 'scale(1)',
                  }}
                  loading="eager"
                  decoding="async"
                />
              </div>

              <div
                className={[
                  'pointer-events-none absolute inset-0 transition-opacity duration-200',
                  isZooming ? 'opacity-100' : 'opacity-0',
                ].join(' ')}
              >
                <div
                  className="absolute w-24 h-24 -translate-x-1/2 -translate-y-1/2 border-2 rounded-full shadow-lg border-white/90 bg-white/10"
                  style={{ left: `${zoomPosition.x}%`, top: `${zoomPosition.y}%` }}
                />
                <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[11px] font-semibold text-white">
                  <FiSearch className="h-3.5 w-3.5" />
                  <span>Zoom</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3.5 self-center">
            <h1 className="text-xl font-black leading-tight text-[#0f2740] md:text-2xl">
              {product.title}
            </h1>

            <p className="inline-flex items-center gap-2 rounded-full bg-[#eef5ff] px-3 py-1.5 text-sm font-semibold text-[#315d86]">
              <FiTag className="w-4 h-4" />
              <span>{product.category}</span>
            </p>

            <p className="flex items-center gap-2 text-lg font-extrabold text-[#0b4f7a] md:text-xl">
              <FiDollarSign className="w-5 h-5" />
              <span>${product.price}</span>
            </p>

            <p className="inline-flex items-center gap-2 rounded-full bg-[#f3f4f6] px-3 py-1.5 text-sm font-semibold text-[#4b5563]">
              <FiBox className="w-4 h-4" />
              <span>Stock: {product.stock}</span>
            </p>

            <p className="text-sm leading-6 text-[#4b5563] md:max-w-prose">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
