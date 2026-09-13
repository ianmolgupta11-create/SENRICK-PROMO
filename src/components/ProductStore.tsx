import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, Truck, Zap, ShieldCheck, Tag, Search, Star, 
  Sparkles, Eye, Check, ArrowRight, Clock, MessageSquare, 
  Percent, ChevronRight, HelpCircle, MapPin
} from 'lucide-react';
import { ProductItem } from '../types';
import { 
  PRODUCTS_DATA, 
  GORAKHPUR_AREAS, 
  GORAKHPUR_PINCODES, 
  GORAKHPUR_AREA_DETAILS, 
  getPincodeByArea, 
  isGorakhpurPincodeDeliverable 
} from '../data/productsData';

interface ProductStoreProps {
  onAddToCart: (product: ProductItem) => void;
  onBuyNow: (product: ProductItem) => void;
  onQuickView: (product: ProductItem) => void;
  cartCount: number;
  onOpenCart: () => void;
  onBackToSalon?: () => void;
}

export const ProductStore: React.FC<ProductStoreProps> = ({
  onAddToCart,
  onBuyNow,
  onQuickView,
  cartCount,
  onOpenCart,
  onBackToSalon,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'discount' | 'price-low' | 'price-high' | 'rating'>('discount');
  const [checkedArea, setCheckedArea] = useState<string>('Betiahata');
  const [pincodeInput, setPincodeInput] = useState<string>('273001');
  const [pincodeStatus, setPincodeStatus] = useState<'valid' | 'invalid' | null>('valid');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'discount') {
        const discA = ((a.marketPrice - a.salonPrice) / a.marketPrice) * 100;
        const discB = ((b.marketPrice - b.salonPrice) / b.marketPrice) * 100;
        return discB - discA;
      }
      if (sortBy === 'price-low') {
        return a.salonPrice - b.salonPrice;
      }
      if (sortBy === 'price-high') {
        return b.salonPrice - a.salonPrice;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'combos', label: 'Combos & Gift Sets' },
    { id: 'haircare', label: 'Hair Repair & Spa' },
    { id: 'skincare', label: 'Facial & Skincare' },
    { id: 'serums', label: 'Serums & Elixirs' },
    { id: 'mens', label: "Men's Grooming" },
  ];

  const handleAreaChange = (newArea: string) => {
    setCheckedArea(newArea);
    const pin = getPincodeByArea(newArea);
    setPincodeInput(pin);
    setPincodeStatus('valid');
  };

  const handlePincodeCheck = (code: string) => {
    setPincodeInput(code);
    if (code.length === 6) {
      if (isGorakhpurPincodeDeliverable(code)) {
        setPincodeStatus('valid');
        const matched = GORAKHPUR_AREA_DETAILS.find((a) => a.pincode === code);
        if (matched) {
          setCheckedArea(matched.name);
        }
      } else {
        setPincodeStatus('invalid');
      }
    } else {
      setPincodeStatus(null);
    }
  };

  return (
    <section id="store" className="pt-4 sm:pt-10 pb-20 bg-[#0A0908] text-[#EDE7DF] relative overflow-hidden border-t border-[#221D1A]">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-[#1BD741]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* Navigation back bar */}
        {onBackToSalon && (
          <div className="mb-4 sm:mb-8 flex items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-[#221D1A]">
            <button
              onClick={onBackToSalon}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[#191512] hover:bg-[#251F1B] border border-[#352D26] hover:border-[#C9A96E] text-[11px] sm:text-xs uppercase tracking-wider text-[#DFCA9F] transition-all group active:scale-95"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180 text-[#C9A96E] group-hover:-translate-x-1 transition-transform" />
              <span>Back to Salon</span>
            </button>

            <div className="flex items-center gap-2 sm:gap-3 text-xs text-[#A09384]">
              <span className="hidden sm:inline">Gorakhpur Salon Product Hub</span>
              <span className="hidden sm:inline">•</span>
              <button
                onClick={onOpenCart}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C9A96E]/15 border border-[#C9A96E]/40 text-[#DFCA9F] text-xs font-semibold hover:bg-[#C9A96E]/25 transition-colors active:scale-95"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Bag ({cartCount})</span>
              </button>
            </div>
          </div>
        )}

        {/* Flagship Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#C9A96E]/15 border border-[#C9A96E]/30 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#DFCA9F] mb-2 sm:mb-4">
            <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1BD741]" />
            <span>Exclusively for Gorakhpur Residents</span>
          </div>

          <h2 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F3EFE9] mb-2 sm:mb-3">
            Senrick Atelier <span className="text-[#C9A96E]">Product Store</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#B3A698] leading-relaxed max-w-2xl mx-auto">
            100% genuine salon-grade beauty care dispatched directly from our Gorakhpur salons with <strong className="text-white">Same-Day 3-Hour Delivery</strong> across town!
          </p>
        </div>

        {/* 4 Trust Value Pillars (Compact 2x2 on Mobile) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-10">
          <div className="p-3 sm:p-4 rounded-xl bg-[#14110F] border border-[#2B2520] flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3.5">
            <div className="p-2 rounded-lg bg-[#1BD741]/10 text-[#1BD741] shrink-0 border border-[#1BD741]/20">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#EDE7DF] mb-0.5">
                Save Up To 30%
              </h4>
              <p className="text-[10px] sm:text-xs text-[#9E9285] leading-snug">
                Direct salon wholesale price without middleman markup.
              </p>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#14110F] border border-[#2B2520] flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3.5">
            <div className="p-2 rounded-lg bg-[#C9A96E]/10 text-[#C9A96E] shrink-0 border border-[#C9A96E]/20">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#EDE7DF] mb-0.5">
                Same-Day 3-Hr GKP
              </h4>
              <p className="text-[10px] sm:text-xs text-[#9E9285] leading-snug">
                Hand-delivered in 2-4 hours. No 4-day courier waiting.
              </p>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#14110F] border border-[#2B2520] flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3.5">
            <div className="p-2 rounded-lg bg-[#E5B869]/10 text-[#E5B869] shrink-0 border border-[#E5B869]/20">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#EDE7DF] mb-0.5">
                100% Sealed & Authentic
              </h4>
              <p className="text-[10px] sm:text-xs text-[#9E9285] leading-snug">
                Authorized salon batch directly from authorized brands.
              </p>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#14110F] border border-[#2B2520] flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3.5">
            <div className="p-2 rounded-lg bg-[#25D366]/10 text-[#25D366] shrink-0 border border-[#25D366]/20">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#EDE7DF] mb-0.5">
                Stylist Advice
              </h4>
              <p className="text-[10px] sm:text-xs text-[#9E9285] leading-snug">
                Free routine consultation with Senrick senior stylists.
              </p>
            </div>
          </div>
        </div>

        {/* Gorakhpur Locality & Pincode Checker Bar (Clean on Mobile) */}
        <div className="p-3.5 sm:p-5 rounded-2xl bg-[#171311] border border-[#352D26] mb-6 sm:mb-8 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="p-2 rounded-lg bg-[#C9A96E]/15 text-[#DFCA9F] shrink-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#F3EFE9]">
                  Gorakhpur Delivery Checker
                </h4>
                <p className="text-[11px] sm:text-xs text-[#9E9285]">
                  Select your area or verify your 6-digit GKP pincode
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto">
              <select
                value={checkedArea}
                onChange={(e) => handleAreaChange(e.target.value)}
                className="bg-[#1F1A17] border border-[#3A322A] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#C9A96E] flex-1 sm:flex-none"
              >
                {GORAKHPUR_AREA_DETAILS.map((area) => (
                  <option key={area.name} value={area.name}>
                    {area.name} — PIN {area.pincode}
                  </option>
                ))}
              </select>

              <div className="relative flex-1 sm:flex-none">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => handlePincodeCheck(e.target.value)}
                  placeholder="e.g. 273001"
                  className="bg-[#1F1A17] border border-[#3A322A] rounded-lg px-2.5 py-1.5 text-xs text-white w-full sm:w-28 focus:outline-none focus:border-[#C9A96E]"
                />
              </div>

              {pincodeStatus === 'valid' && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1BD741]/15 text-[#1BD741] border border-[#1BD741]/30 text-[11px] font-semibold w-full sm:w-auto">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    Delivery Available: {GORAKHPUR_AREA_DETAILS.find((a) => a.name === checkedArea)?.estTime || 'Same-Day Express'}
                  </span>
                </div>
              )}
              {pincodeStatus === 'invalid' && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-yellow-950/40 text-yellow-300 border border-yellow-800 text-[11px] font-medium w-full sm:w-auto">
                  <span>Out of Express Hub - Contact salon for custom delivery</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filter, Search & Category Navigation */}
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {/* Category Tabs - Touch-friendly horizontal scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all active:scale-95 ${
                  selectedCategory === cat.id
                    ? 'bg-[#C9A96E] text-black shadow-md shadow-[#C9A96E]/20'
                    : 'bg-[#151210] border border-[#2B241F] text-[#A6998C] hover:text-white hover:border-[#3E352E]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar & Sorting */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-[#8E8377] absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search L'Oréal, Olaplex, Serums..."
                className="w-full bg-[#151210] border border-[#2B241F] rounded-xl pl-8 sm:pl-9 pr-3 py-2 text-xs text-white placeholder-[#6E645A] focus:outline-none focus:border-[#C9A96E]"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#151210] border border-[#2B241F] rounded-xl px-2.5 py-2 text-[11px] sm:text-xs text-[#A6998C] focus:outline-none focus:border-[#C9A96E] shrink-0"
            >
              <option value="discount">Discount (%)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid: 2 Columns on Mobile, 3 on Tablet, 4 on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-5 lg:gap-6">
          {filteredProducts.map((product) => {
            const savings = product.marketPrice - product.salonPrice;
            const savingsPercent = Math.round((savings / product.marketPrice) * 100);

            return (
              <div
                key={product.id}
                className="rounded-xl sm:rounded-2xl bg-[#14110F] border border-[#2A241F] overflow-hidden flex flex-col justify-between hover:border-[#C9A96E]/40 hover:shadow-xl transition-all duration-300 group"
              >
                {/* Image Container with Tap to Quick View */}
                <div 
                  onClick={() => onQuickView(product)}
                  className="relative aspect-square overflow-hidden bg-[#1B1715] cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Badges */}
                  <div className="absolute top-1.5 sm:top-2.5 left-1.5 sm:left-2.5 flex flex-col gap-1 items-start">
                    {product.badge && (
                      <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold uppercase tracking-wider bg-[#C9A96E] text-black shadow-md">
                        {product.badge}
                      </span>
                    )}
                    <span className="px-1.5 py-0.5 rounded-md text-[8px] sm:text-[9px] font-extrabold uppercase tracking-tight bg-[#1BD741] text-black shadow-md">
                      {savingsPercent}% OFF
                    </span>
                  </div>

                  {/* Quick View Button on Desktop Hover / Mobile tap badge */}
                  <div className="hidden sm:flex absolute inset-x-3 bottom-2 py-1.5 rounded-lg bg-black/85 backdrop-blur-md text-[#DFCA9F] text-[11px] font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>Quick Preview</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[9px] sm:text-[11px] mb-1">
                      <span className="font-bold uppercase tracking-widest text-[#C9A96E] truncate max-w-[90px] sm:max-w-none">
                        {product.brand}
                      </span>
                      <span className="text-[#8E8377] text-[9px] sm:text-[10px] shrink-0">{product.size}</span>
                    </div>

                    <h3 
                      onClick={() => onQuickView(product)}
                      className="text-xs sm:text-sm font-semibold text-[#F3EFE9] line-clamp-2 hover:text-[#DFCA9F] transition-colors cursor-pointer mb-1.5 leading-snug min-h-[2rem] sm:min-h-[2.5rem]"
                      title={product.name}
                    >
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 fill-[#E5B869] text-[#E5B869]" />
                      <span className="text-[10px] sm:text-xs font-semibold text-[#DFCA9F]">{product.rating}</span>
                      <span className="text-[9px] text-[#7A7168]">({product.reviewsCount})</span>
                    </div>

                    {/* Price Comparison Box */}
                    <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#1A1613] border border-[#2D2620] mb-2 sm:mb-3">
                      <div className="text-[8px] sm:text-[10px] uppercase tracking-wider text-[#DFCA9F] font-semibold mb-0.5 truncate">
                        Senrick Salon's Special Price:
                      </div>
                      <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                        <span className="text-sm sm:text-lg font-extrabold text-[#F3EFE9]">
                          ₹{product.salonPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] sm:text-xs text-[#7A7168] line-through">
                          ₹{product.marketPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons (Full Touch-Friendly on Mobile) */}
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-1 sm:pt-2 border-t border-[#26201B]">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="py-2 px-1 sm:px-2 rounded-lg border border-[#3D352D] text-[#C6BBAE] hover:border-[#C9A96E] hover:text-[#DFCA9F] font-semibold text-[10px] sm:text-xs tracking-tight transition-colors flex items-center justify-center gap-1 active:scale-95"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                      <span className="truncate">Add</span>
                    </button>
                    <button
                      onClick={() => onBuyNow(product)}
                      className="py-2 px-1 sm:px-2 rounded-lg bg-[#C9A96E] hover:bg-[#DFCA9F] text-black font-bold text-[10px] sm:text-xs tracking-tight transition-all shadow-md flex items-center justify-center gap-1 active:scale-95"
                      title="Buy Now"
                    >
                      <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-black shrink-0" />
                      <span className="truncate">Buy</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Sticky Quick Bag Access Bar (Floating at bottom on mobile when cart has items) */}
        {cartCount > 0 && (
          <div className="fixed bottom-4 inset-x-4 z-40 sm:hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            <button
              onClick={onOpenCart}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#DFCA9F] via-[#C9A96E] to-[#B38F52] text-black font-extrabold text-xs uppercase tracking-wider shadow-2xl flex items-center justify-between border border-[#DFCA9F]/50"
            >
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-full bg-black text-[#DFCA9F]">
                  <ShoppingBag className="w-3.5 h-3.5" />
                </div>
                <span>{cartCount} {cartCount === 1 ? 'Product' : 'Products'} in Bag</span>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-black underline">
                View Bag & Order →
              </span>
            </button>
          </div>
        )}

        {/* Comparison Table: Senrick vs Nykaa/Amazon */}
        <div className="mt-12 sm:mt-20 p-4 sm:p-8 rounded-2xl bg-[#14110F] border border-[#2B241F]">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#C9A96E] font-semibold">
              Transparent Gorakhpur Comparison
            </span>
            <h3 className="font-serif-luxury text-xl sm:text-3xl text-[#F3EFE9] mt-1 mb-2">
              Why Buy From Senrick Instead of E-Commerce?
            </h3>
            <p className="text-[11px] sm:text-xs text-[#9E9285]">
              How Senrick Salon Gorakhpur beats Amazon, Nykaa, and generic cosmetic counters.
            </p>
          </div>

          <div className="overflow-x-auto -mx-2 px-2">
            <table className="w-full text-left text-xs border-collapse min-w-[520px]">
              <thead>
                <tr className="border-b border-[#2C2520] text-[#A6998C] uppercase tracking-wider text-[10px] sm:text-[11px]">
                  <th className="py-2.5 px-3">Feature</th>
                  <th className="py-2.5 px-3 text-[#DFCA9F] bg-[#C9A96E]/10 rounded-t-lg font-bold">
                    ✨ Senrick Salon (GKP)
                  </th>
                  <th className="py-2.5 px-3">Nykaa / Amazon</th>
                  <th className="py-2.5 px-3">Local Counter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#221D19] text-[#C6BBAE] text-[11px] sm:text-xs">
                <tr>
                  <td className="py-2.5 sm:py-3.5 px-3 font-semibold text-white">Delivery Speed</td>
                  <td className="py-2.5 sm:py-3.5 px-3 bg-[#C9A96E]/5 font-bold text-[#1BD741]">
                    Same Day (2-4 Hours)
                  </td>
                  <td className="py-2.5 sm:py-3.5 px-3 text-[#8E8377]">3-6 Days Wait</td>
                  <td className="py-2.5 sm:py-3.5 px-3 text-[#8E8377]">Physical Visit</td>
                </tr>
                <tr>
                  <td className="py-2.5 sm:py-3.5 px-3 font-semibold text-white">Pricing</td>
                  <td className="py-2.5 sm:py-3.5 px-3 bg-[#C9A96E]/5 font-bold text-[#DFCA9F]">
                    Salon Direct (15-30% OFF)
                  </td>
                  <td className="py-2.5 sm:py-3.5 px-3 text-[#8E8377]">Full MRP or minimal coupon</td>
                  <td className="py-2.5 sm:py-3.5 px-3 text-[#8E8377]">Full MRP</td>
                </tr>
                <tr>
                  <td className="py-2.5 sm:py-3.5 px-3 font-semibold text-white">Authenticity</td>
                  <td className="py-2.5 sm:py-3.5 px-3 bg-[#C9A96E]/5 font-bold text-[#1BD741]">
                    100% Sealed Salon Batch
                  </td>
                  <td className="py-2.5 sm:py-3.5 px-3 text-[#8E8377]">Frequent 3rd-party issues</td>
                  <td className="py-2.5 sm:py-3.5 px-3 text-[#8E8377]">Unverified duplicates</td>
                </tr>
                <tr>
                  <td className="py-2.5 sm:py-3.5 px-3 font-semibold text-white">Consultation</td>
                  <td className="py-2.5 sm:py-3.5 px-3 bg-[#C9A96E]/5 font-bold text-[#DFCA9F]">
                    Free Senior Stylist Call
                  </td>
                  <td className="py-2.5 sm:py-3.5 px-3 text-[#8E8377]">AI Chatbot</td>
                  <td className="py-2.5 sm:py-3.5 px-3 text-[#8E8377]">Untrained staff</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* WhatsApp Custom Stylist Help Banner */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-8 rounded-2xl bg-gradient-to-r from-[#171412] via-[#1F1914] to-[#171412] border border-[#382E26] flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 shadow-2xl text-center md:text-left">
          <div className="space-y-1.5 sm:space-y-2">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#C9A96E] font-bold">
              Need Personal Advice?
            </span>
            <h4 className="font-serif-luxury text-lg sm:text-2xl text-[#F3EFE9]">
              Confused about which treatment your hair or skin needs?
            </h4>
            <p className="text-[11px] sm:text-xs text-[#B8ABA0] max-w-xl">
              Send a photo or question to our Gorakhpur cosmetologist on WhatsApp for free customized routine guidance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full md:w-auto shrink-0">
            <a
              href="https://wa.me/918574003784?text=Hello%20Senrick%20Salon!%20I%20am%20looking%20for%20a%20product%20recommendation%20for%20my%20hair/skin%20in%20Gorakhpur."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 sm:py-3 rounded-xl bg-[#1BD741] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#1BD741]/20 active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              <span>Ask On WhatsApp</span>
            </a>
            <button
              onClick={onOpenCart}
              className="w-full sm:w-auto px-4 py-2.5 sm:py-3 rounded-xl border border-[#C9A96E] text-[#DFCA9F] hover:bg-[#C9A96E]/10 font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Bag ({cartCount})</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
