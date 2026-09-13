import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, Truck, Zap, ShieldCheck, Tag, Search, Star, 
  Sparkles, Eye, Check, ArrowRight, Clock, MessageSquare, 
  Percent, ChevronRight, HelpCircle, MapPin
} from 'lucide-react';
import { ProductItem } from '../types';
import { PRODUCTS_DATA, GORAKHPUR_AREAS, GORAKHPUR_PINCODES } from '../data/productsData';

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

  const handlePincodeCheck = (code: string) => {
    setPincodeInput(code);
    if (code.length === 6) {
      if (GORAKHPUR_PINCODES.includes(code)) {
        setPincodeStatus('valid');
      } else {
        setPincodeStatus('invalid');
      }
    } else {
      setPincodeStatus(null);
    }
  };

  return (
    <section id="store" className="py-24 bg-[#0A0908] text-[#EDE7DF] relative overflow-hidden border-t border-[#221D1A]">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-[#1BD741]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Navigation back bar if opened as dedicated page */}
        {onBackToSalon && (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#221D1A]">
            <button
              onClick={onBackToSalon}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#191512] hover:bg-[#251F1B] border border-[#352D26] hover:border-[#C9A96E] text-xs uppercase tracking-wider text-[#DFCA9F] transition-all group"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180 text-[#C9A96E] group-hover:-translate-x-1 transition-transform" />
              <span>Back to Salon Main Website</span>
            </button>

            <div className="flex items-center gap-3 text-xs text-[#A09384]">
              <span className="hidden sm:inline">Gorakhpur Salon Product Hub</span>
              <span className="hidden sm:inline">•</span>
              <button
                onClick={onOpenCart}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#C9A96E]/15 border border-[#C9A96E]/40 text-[#DFCA9F] text-xs font-semibold hover:bg-[#C9A96E]/25 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Bag ({cartCount})</span>
              </button>
            </div>
          </div>
        )}

        {/* Gorakhpur Exclusivity Flagship Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C9A96E]/15 border border-[#C9A96E]/30 text-xs font-semibold uppercase tracking-wider text-[#DFCA9F] mb-4">
            <Truck className="w-3.5 h-3.5 text-[#1BD741]" />
            <span>Exclusively for Gorakhpur Residents</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold tracking-tight text-[#F3EFE9] mb-4">
            Senrick Atelier <span className="text-[#C9A96E]">Product Store</span>
          </h2>
          <p className="text-sm sm:text-base text-[#B3A698] leading-relaxed">
            Market & e-commerce platforms (Amazon, Nykaa) se <strong>sasta aur 100% genuine</strong> salon-grade beauty care. Dispatched directly from our Betiahata & Golghar salon hubs with guaranteed <strong>Same-Day 3-Hour Delivery</strong> across Gorakhpur!
          </p>
        </div>

        {/* 4 Trust Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-xl bg-[#14110F] border border-[#2B2520] flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#1BD741]/10 text-[#1BD741] shrink-0 border border-[#1BD741]/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#EDE7DF] mb-0.5">
                Cheaper Than E-Com
              </h4>
              <p className="text-xs text-[#9E9285] leading-relaxed">
                Direct salon wholesale pricing without retailer middleman commissions. Save up to 30%.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#14110F] border border-[#2B2520] flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#C9A96E]/10 text-[#C9A96E] shrink-0 border border-[#C9A96E]/20">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#EDE7DF] mb-0.5">
                Same-Day 3-Hr Delivery
              </h4>
              <p className="text-xs text-[#9E9285] leading-relaxed">
                Hand-delivered by local salon riders in 2-4 hours. No 4-day courier wait.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#14110F] border border-[#2B2520] flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#E5B869]/10 text-[#E5B869] shrink-0 border border-[#E5B869]/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#EDE7DF] mb-0.5">
                100% Sealed & Authentic
              </h4>
              <p className="text-xs text-[#9E9285] leading-relaxed">
                Directly sourced from authorized brand distributors with tamper-evident seals.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#14110F] border border-[#2B2520] flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#25D366]/10 text-[#25D366] shrink-0 border border-[#25D366]/20">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#EDE7DF] mb-0.5">
                Stylist Guidance on WhatsApp
              </h4>
              <p className="text-xs text-[#9E9285] leading-relaxed">
                Free consultation with Senrick senior stylists before picking the right product.
              </p>
            </div>
          </div>
        </div>

        {/* Gorakhpur Locality & Pincode Checker Bar */}
        <div className="p-5 rounded-2xl bg-[#171311] border border-[#352D26] mb-12 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#C9A96E]/15 text-[#DFCA9F] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#F3EFE9]">
                  Check Gorakhpur Same-Day Delivery Slot
                </h4>
                <p className="text-xs text-[#9E9285]">
                  Select your area or verify your 6-digit Gorakhpur pincode (273001 - 273016)
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <select
                value={checkedArea}
                onChange={(e) => setCheckedArea(e.target.value)}
                className="bg-[#1F1A17] border border-[#3A322A] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C9A96E]"
              >
                {GORAKHPUR_AREAS.slice(0, 10).map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>

              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => handlePincodeCheck(e.target.value)}
                  placeholder="Pincode e.g. 273001"
                  className="bg-[#1F1A17] border border-[#3A322A] rounded-lg px-3 py-2 text-xs text-white w-32 focus:outline-none focus:border-[#C9A96E]"
                />
              </div>

              {pincodeStatus === 'valid' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1BD741]/15 text-[#1BD741] border border-[#1BD741]/30 text-xs font-semibold">
                  <Check className="w-4 h-4" />
                  <span>Eligible: Delivery by Today Evening!</span>
                </div>
              )}
              {pincodeStatus === 'invalid' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-yellow-950/40 text-yellow-300 border border-yellow-800 text-xs font-medium">
                  <span>Available via custom dispatch in Gorakhpur outskirts</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filter, Search & Category Navigation */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#C9A96E] text-black shadow-lg shadow-[#C9A96E]/20'
                    : 'bg-[#151210] border border-[#2B241F] text-[#A6998C] hover:text-white hover:border-[#3E352E]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar & Sorting */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#8E8377] absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search L'Oréal, Olaplex, Serums..."
                className="w-full bg-[#151210] border border-[#2B241F] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#6E645A] focus:outline-none focus:border-[#C9A96E]"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#151210] border border-[#2B241F] rounded-xl px-3 py-2 text-xs text-[#A6998C] focus:outline-none focus:border-[#C9A96E]"
            >
              <option value="discount">Biggest Discount (%)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const savings = product.marketPrice - product.salonPrice;
            const savingsPercent = Math.round((savings / product.marketPrice) * 100);

            return (
              <div
                key={product.id}
                className="rounded-2xl bg-[#14110F] border border-[#2A241F] overflow-hidden flex flex-col justify-between hover:border-[#C9A96E]/40 hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-[#1B1715]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    {product.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C9A96E] text-black shadow-md">
                        {product.badge}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#1BD741] text-black shadow-md">
                      Save ₹{savings} ({savingsPercent}% OFF)
                    </span>
                  </div>

                  {/* Quick View Button on hover */}
                  <button
                    onClick={() => onQuickView(product)}
                    className="absolute inset-x-4 bottom-3 py-2 rounded-lg bg-black/80 backdrop-blur-md text-[#DFCA9F] text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 hover:bg-black"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick Preview & Specs</span>
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold uppercase tracking-widest text-[#C9A96E]">
                        {product.brand}
                      </span>
                      <span className="text-[#8E8377]">{product.size}</span>
                    </div>

                    <h3 
                      onClick={() => onQuickView(product)}
                      className="text-sm font-semibold text-[#F3EFE9] line-clamp-2 hover:text-[#DFCA9F] transition-colors cursor-pointer mb-2"
                      title={product.name}
                    >
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex items-center text-[#E5B869]">
                        <Star className="w-3.5 h-3.5 fill-[#E5B869]" />
                      </div>
                      <span className="text-xs font-semibold text-[#DFCA9F]">{product.rating}</span>
                      <span className="text-[11px] text-[#7A7168]">({product.reviewsCount})</span>
                      <span className="text-[#7A7168]">•</span>
                      <span className="text-[10px] text-[#1BD741] font-medium flex items-center gap-1">
                        <Truck className="w-3 h-3" /> Same Day GKP
                      </span>
                    </div>

                    {/* Price Comparison Box */}
                    <div className="p-2.5 rounded-xl bg-[#1A1613] border border-[#2D2620] mb-4">
                      <div className="text-[10px] uppercase tracking-wider text-[#DFCA9F] font-semibold mb-0.5">
                        Senrick Salon's Special Price:
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-extrabold text-[#F3EFE9]">
                          ₹{product.salonPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-[#7A7168] line-through">
                          ₹{product.marketPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#26201B]">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="py-2.5 px-2 rounded-lg border border-[#3D352D] text-[#C6BBAE] hover:border-[#C9A96E] hover:text-[#DFCA9F] font-semibold text-xs tracking-wider transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                    <button
                      onClick={() => onBuyNow(product)}
                      className="py-2.5 px-2 rounded-lg bg-[#C9A96E] hover:bg-[#DFCA9F] text-black font-bold text-xs tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5 fill-black" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Table: Senrick vs Nykaa/Amazon vs Local Counter */}
        <div className="mt-20 p-6 sm:p-8 rounded-2xl bg-[#14110F] border border-[#2B241F]">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-widest text-[#C9A96E] font-semibold">
              Transparent Gorakhpur Comparison
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#F3EFE9] mt-1 mb-2">
              Why Buy From Senrick Instead of E-Commerce?
            </h3>
            <p className="text-xs text-[#9E9285]">
              Here is how Senrick Salon Gorakhpur beats Amazon, Nykaa, and generic cosmetic counters.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#2C2520] text-[#A6998C] uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Feature / Guarantee</th>
                  <th className="py-3 px-4 text-[#DFCA9F] bg-[#C9A96E]/10 rounded-t-lg">
                    ✨ Senrick Salon (Gorakhpur)
                  </th>
                  <th className="py-3 px-4">Nykaa / Amazon</th>
                  <th className="py-3 px-4">Local Retail Cosmetics Store</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#221D19] text-[#C6BBAE]">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Delivery Speed in Gorakhpur</td>
                  <td className="py-3.5 px-4 bg-[#C9A96E]/5 font-bold text-[#1BD741]">
                    ⚡ Same Day (Within 2-4 Hours)
                  </td>
                  <td className="py-3.5 px-4 text-[#8E8377]">3 to 6 Days Courier Wait</td>
                  <td className="py-3.5 px-4 text-[#8E8377]">Must visit physically in traffic</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Pricing & Discounts</td>
                  <td className="py-3.5 px-4 bg-[#C9A96E]/5 font-bold text-[#DFCA9F]">
                    Sasta Salon Direct (15-30% OFF)
                  </td>
                  <td className="py-3.5 px-4 text-[#8E8377]">Full MRP or minimal 5-10% coupon</td>
                  <td className="py-3.5 px-4 text-[#8E8377]">Mostly Full MRP</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Product Authenticity</td>
                  <td className="py-3.5 px-4 bg-[#C9A96E]/5 font-bold text-[#1BD741]">
                    100% Sealed Salon Authorized Stock
                  </td>
                  <td className="py-3.5 px-4 text-[#8E8377]">Frequent fake/diluted 3rd party seller issues</td>
                  <td className="py-3.5 px-4 text-[#8E8377]">Unverified gray market duplicates</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Professional Consultation</td>
                  <td className="py-3.5 px-4 bg-[#C9A96E]/5 font-bold text-[#DFCA9F]">
                    Free Senior Stylist Call/WhatsApp
                  </td>
                  <td className="py-3.5 px-4 text-[#8E8377]">Automated AI Chatbot</td>
                  <td className="py-3.5 px-4 text-[#8E8377]">Untrained sales staff</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Payment Options</td>
                  <td className="py-3.5 px-4 bg-[#C9A96E]/5 font-bold text-white">
                    Cash or UPI on Delivery in GKP
                  </td>
                  <td className="py-3.5 px-4 text-[#8E8377]">Often Pre-paid only for high-value items</td>
                  <td className="py-3.5 px-4 text-[#8E8377]">Immediate payment</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* WhatsApp Custom Stylist Help Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#171412] via-[#1F1914] to-[#171412] border border-[#382E26] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-[#C9A96E] font-bold">
              Need Personal Product Advice?
            </span>
            <h4 className="font-serif-luxury text-2xl text-[#F3EFE9]">
              Confused about which treatment your hair or skin needs?
            </h4>
            <p className="text-xs text-[#B8ABA0] max-w-xl">
              Send a photo or question to our Gorakhpur master cosmetologist on WhatsApp. We will analyze your texture and recommend the exact routine.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/918574003784?text=Hello%20Senrick%20Salon!%20I%20am%20looking%20for%20a%20product%20recommendation%20for%20my%20hair/skin%20in%20Gorakhpur."
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-[#1BD741] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-[#1BD741]/20"
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              <span>Ask A Stylist on WhatsApp</span>
            </a>
            <button
              onClick={onOpenCart}
              className="px-5 py-3 rounded-xl border border-[#C9A96E] text-[#DFCA9F] hover:bg-[#C9A96E]/10 font-semibold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Salon Bag ({cartCount})</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
