import React from 'react';
import { X, Star, ShieldCheck, Zap, Truck, Sparkles, Check, ShoppingBag } from 'lucide-react';
import { ProductItem } from '../types';

interface ProductQuickViewModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem) => void;
  onBuyNow: (product: ProductItem) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!product) return null;

  const savings = product.marketPrice - product.salonPrice;
  const savingsPercent = Math.round((savings / product.marketPrice) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#141210] border border-[#2F2924] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-[#C6BBAE] hover:text-white hover:bg-black transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Section */}
        <div className="md:w-1/2 relative bg-[#1A1614] flex items-center justify-center min-h-[260px] md:min-h-full p-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg border border-[#2F2924]"
          />
          {product.badge && (
            <span className="absolute top-8 left-8 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#C9A96E] text-black shadow-lg">
              {product.badge}
            </span>
          )}
          <div className="absolute bottom-6 left-6 right-6 px-3 py-2 rounded-lg bg-black/85 backdrop-blur-sm border border-[#2F2924] flex items-center justify-between text-[11px] text-[#DFCA9F]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1BD741]" />
              100% Original Salon Seal
            </span>
            <span className="text-[#A5998B]">Gorakhpur Hub Stock</span>
          </div>
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between max-h-[60vh] md:max-h-[85vh]">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold tracking-widest text-[#C9A96E] uppercase">
                {product.brand}
              </span>
              <span className="text-xs text-[#8E8377] bg-[#1E1A17] px-2 py-0.5 rounded border border-[#2E2824]">
                {product.size}
              </span>
            </div>

            <h3 className="font-serif-luxury text-2xl text-[#F3EFE9] leading-tight mb-2">
              {product.name}
            </h3>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center text-[#E5B869]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-[#E5B869]'
                        : 'text-[#4A4139]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-[#DFCA9F]">
                {product.rating}
              </span>
              <span className="text-xs text-[#7A7168]">
                ({product.reviewsCount} Gorakhpur verified buyers)
              </span>
            </div>

            {/* Price Comparison Card */}
            <div className="p-3.5 rounded-xl bg-[#1C1815] border border-[#352F29] mb-4">
              <div className="text-[11px] uppercase tracking-wider text-[#DFCA9F] mb-1 font-semibold">
                Senrick Salon's Special Price:
              </div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-2xl font-bold text-[#F3EFE9]">
                  ₹{product.salonPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-[#7A7168] line-through">
                  MRP / E-com: ₹{product.marketPrice.toLocaleString('en-IN')}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-[#1BD741]/15 text-[#1BD741] border border-[#1BD741]/30">
                  Save ₹{savings} ({savingsPercent}% OFF)
                </span>
              </div>
              <p className="text-[11px] text-[#A89C8F] mt-1.5 flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-[#E5B869] shrink-0" />
                Guaranteed cheaper than Nykaa, Amazon & local cosmetic retail counters.
              </p>
            </div>

            {/* Delivery Banner */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#241F1A] border border-[#3D352E] mb-4 text-xs text-[#EDE7DF]">
              <Truck className="w-4 h-4 text-[#1BD741] shrink-0" />
              <div>
                <span className="font-semibold text-[#1BD741]">Same Day Delivery in Gorakhpur:</span>{' '}
                Dispatched from Betiahata / Golghar salon hub within 2-4 hours.
              </div>
            </div>

            <p className="text-xs text-[#B8ACA0] leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Key Benefits */}
            <div className="mb-4 space-y-1.5">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-[#C9A96E]">
                Key Professional Benefits:
              </div>
              {product.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#C6BBAE]">
                  <Check className="w-3.5 h-3.5 text-[#C9A96E] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Salon Tip */}
            <div className="p-3 rounded-lg bg-[#181512] border-l-2 border-[#C9A96E] text-xs text-[#D1C6BA] mb-6">
              <span className="font-semibold text-[#DFCA9F] flex items-center gap-1.5 mb-0.5">
                <Sparkles className="w-3 h-3 text-[#C9A96E]" />
                Senrick Master Stylist Tip:
              </span>
              {product.salonTip}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 pt-3 border-t border-[#2A2420]">
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="flex-1 py-3 px-4 rounded-xl border border-[#C9A96E] text-[#DFCA9F] hover:bg-[#C9A96E]/10 font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag</span>
            </button>
            <button
              onClick={() => {
                onBuyNow(product);
                onClose();
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#DFCA9F] via-[#C9A96E] to-[#B38F52] text-[#141009] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#C9A96E]/20 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-[#141009] fill-[#141009]" />
              <span>Buy Now (Same Day)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
