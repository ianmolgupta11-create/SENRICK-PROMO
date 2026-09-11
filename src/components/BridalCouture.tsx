import React, { useState } from 'react';
import { Crown, Sparkles, Check, Heart, Calendar, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { BRIDAL_PACKAGES } from '../data/salonData';

interface BridalCoutureProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const BridalCouture: React.FC<BridalCoutureProps> = ({ onOpenBooking }) => {
  // Bridal calculator options
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>(['wedding']);
  const [includePreBridal, setIncludePreBridal] = useState<boolean>(true);
  const [includeAirbrush, setIncludeAirbrush] = useState<boolean>(true);

  const functionOptions = [
    { id: 'engagement', name: 'Engagement / Sagan', price: 7500 },
    { id: 'haldi', name: 'Haldi & Mehendi Look', price: 5500 },
    { id: 'wedding', name: 'Grand Wedding Muhurat (Pheras)', price: 16500 },
    { id: 'reception', name: 'Grand Reception / Cocktail', price: 8000 },
  ];

  const toggleFunction = (id: string) => {
    if (selectedFunctions.includes(id)) {
      if (selectedFunctions.length > 1) {
        setSelectedFunctions(selectedFunctions.filter((f) => f !== id));
      }
    } else {
      setSelectedFunctions([...selectedFunctions, id]);
    }
  };

  const calculatedTotal = () => {
    let base = selectedFunctions.reduce((acc, curr) => {
      const opt = functionOptions.find((o) => o.id === curr);
      return acc + (opt ? opt.price : 0);
    }, 0);
    if (includePreBridal) base += 5999;
    if (includeAirbrush) base += 4000;
    return base;
  };

  return (
    <section id="bridal" className="py-24 bg-[#110F0D] border-t border-[#26211D] relative overflow-hidden">
      {/* Subtle gold glow behind bridal */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#C9A96E]/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 text-[#DFCA9F] text-xs font-semibold uppercase tracking-widest">
            <Crown className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>The Royal Bridal Suite</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-light text-[#F7F3EE]">
            Crafted For Your <span className="italic text-[#DFCA9F]">Royal Walk</span>
          </h2>
          <p className="text-sm sm:text-base text-[#AEA396]">
            Gorakhpur’s most trusted bridal artisans. With over a decade of curating royal brides across Eastern Uttar Pradesh, we guarantee 24-hour waterproof longevity, flawless skin-matching, and personalized jewelry draping.
          </p>
        </div>

        {/* 3 Main Curated Bridal Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {BRIDAL_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-3xl overflow-hidden bg-[#171412] border transition-all duration-300 flex flex-col justify-between ${
                pkg.popular
                  ? 'border-[#C9A96E] shadow-2xl shadow-[#C9A96E]/15 lg:-translate-y-3'
                  : 'border-[#2B241F] hover:border-[#3E342C]'
              }`}
            >
              {pkg.popular && (
                <div className="bg-gradient-to-r from-[#DFCA9F] via-[#C9A96E] to-[#B38F52] text-black text-center text-xs font-bold uppercase tracking-widest py-1.5 shadow">
                  Most Preferred by Gorakhpur Brides
                </div>
              )}

              {/* Package Image & Tier Header */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171412] via-[#171412]/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#0D0B0A]/85 text-[#DFCA9F] border border-[#3C352E]">
                    {pkg.tier}
                  </span>
                </div>
              </div>

              {/* Package Content */}
              <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#F7F3EE] font-normal mb-2">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-[#A89E93] leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  <div className="space-y-3">
                    <div className="text-[11px] uppercase tracking-wider text-[#8A7E72] font-semibold">
                      Included Privileges
                    </div>
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#EDE7DF]">
                        <Check className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-6 border-t border-[#27211C] space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8A7E72] block">
                        Complete Package
                      </span>
                      <span className="font-serif-luxury text-3xl font-bold text-[#F7F3EE]">
                        {pkg.price}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#A89E93]">Taxes & kit included</span>
                  </div>

                  <button
                    onClick={() => onOpenBooking('senrick-signature-bridal')}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-[#DFCA9F] via-[#C9A96E] to-[#B38F52] text-black shadow-lg shadow-[#C9A96E]/20 hover:brightness-110'
                        : 'bg-[#221D1A] text-[#EDE7DF] hover:bg-[#2C2521] border border-[#3A322C]'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Reserve Bridal Date</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Custom Bridal Planner */}
        <div className="rounded-3xl bg-[#181512] border border-[#332A23] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Customization options */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-widest text-[#C9A96E]">
                  Interactive Package Customizer
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#F7F3EE]">
                  Tailor Your Multi-Day Wedding Calendar
                </h3>
                <p className="text-xs sm:text-sm text-[#A89E93]">
                  Select the wedding functions you need styling for. Our Gorakhpur bridal desk will block the dates and assign a dedicated master artist.
                </p>
              </div>

              {/* Function Checkboxes */}
              <div className="space-y-2.5">
                <label className="text-xs uppercase font-semibold text-[#8A7E72] tracking-wider block">
                  Select Functions
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {functionOptions.map((opt) => {
                    const isChecked = selectedFunctions.includes(opt.id);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => toggleFunction(opt.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                          isChecked
                            ? 'bg-[#241E1A] border-[#C9A96E] text-white'
                            : 'bg-[#141210] border-[#29231E] text-[#A69C90] hover:border-[#3E342C]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center border ${
                              isChecked
                                ? 'bg-[#C9A96E] border-[#C9A96E] text-black'
                                : 'border-[#4A4037]'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="font-medium">{opt.name}</span>
                        </div>
                        <span className="text-[#DFCA9F] font-semibold">₹{opt.price.toLocaleString('en-IN')}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Addons toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div
                  onClick={() => setIncludePreBridal(!includePreBridal)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                    includePreBridal
                      ? 'bg-[#241E1A] border-[#C9A96E] text-white'
                      : 'bg-[#141210] border-[#29231E] text-[#A69C90]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border ${
                        includePreBridal ? 'bg-[#C9A96E] border-[#C9A96E] text-black' : 'border-[#4A4037]'
                      }`}
                    >
                      {includePreBridal && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="font-medium">Pre-Bridal Glow Ritual</div>
                      <div className="text-[10px] text-[#8E8377]">Body polish + O3+ Facial</div>
                    </div>
                  </div>
                  <span className="text-[#DFCA9F] font-semibold">+₹5,999</span>
                </div>

                <div
                  onClick={() => setIncludeAirbrush(!includeAirbrush)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                    includeAirbrush
                      ? 'bg-[#241E1A] border-[#C9A96E] text-white'
                      : 'bg-[#141210] border-[#29231E] text-[#A69C90]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border ${
                        includeAirbrush ? 'bg-[#C9A96E] border-[#C9A96E] text-black' : 'border-[#4A4037]'
                      }`}
                    >
                      {includeAirbrush && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="font-medium">Upgrade to Temptu Airbrush</div>
                      <div className="text-[10px] text-[#8E8377]">High definition 24hr hold</div>
                    </div>
                  </div>
                  <span className="text-[#DFCA9F] font-semibold">+₹4,000</span>
                </div>
              </div>
            </div>

            {/* Right: Estimated Total card */}
            <div className="lg:col-span-5 bg-[#12100E] border border-[#2B2520] rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8A7E72]">
                  Estimated Custom Package
                </span>
                <div className="font-serif-luxury text-4xl sm:text-5xl font-bold text-[#F7F3EE]">
                  ₹{calculatedTotal().toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-[#A89E93]">
                  Includes senior makeup artist, designer hair styling, jewelry draping & post-vidai kit.
                </p>
              </div>

              <div className="space-y-2 text-xs border-y border-[#231F1C] py-4 text-[#C6BBAE]">
                <div className="flex justify-between">
                  <span>Selected Functions:</span>
                  <span className="text-[#EDE7DF] font-semibold">{selectedFunctions.length} Event(s)</span>
                </div>
                <div className="flex justify-between">
                  <span>Pre-Bridal Glow Care:</span>
                  <span className="text-[#EDE7DF] font-semibold">{includePreBridal ? 'Included' : 'Not Added'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Makeup System:</span>
                  <span className="text-[#EDE7DF] font-semibold">{includeAirbrush ? 'Temptu Airbrush HD' : 'MAC UHD Standard'}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => onOpenBooking('senrick-signature-bridal')}
                  className="w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-widest text-[#141009] bg-gradient-to-r from-[#DFCA9F] to-[#C9A96E] hover:brightness-110 shadow-lg shadow-[#C9A96E]/20 transition-all flex items-center justify-center gap-2"
                >
                  <Crown className="w-4 h-4" />
                  <span>Lock Custom Bridal Quote</span>
                </button>

                <a
                  href="https://wa.me/918574003784?text=Hello%20Senrick%20Bridal%20Studio,%20I%20would%20like%20to%20consult%20for%20my%20wedding%20package."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-[#C6BBAE] hover:text-white border border-[#2B2520] hover:border-[#3D342C] flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>Chat With Bridal Coordinator</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
