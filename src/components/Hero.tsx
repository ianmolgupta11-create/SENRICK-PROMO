import React from 'react';
import { Sparkles, Calendar, ArrowRight, Star, ShieldCheck, MapPin, Award } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onNavigateSection }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-[#0D0B0A] pt-8 pb-20 md:pt-14 md:pb-28">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#C9A96E]/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -right-24 w-[400px] h-[400px] bg-[#8F6A37]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & Value Proposition */}
          <div className="lg:col-span-7 text-left space-y-7">
            {/* Editorial Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#C9A96E]/30 bg-[#1A1613] text-[#DFCA9F] text-xs uppercase tracking-[0.2em] font-medium shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span>Eastern UP’s Premier Luxury Salon & Academy</span>
            </div>

            {/* Main Headline with Haute Couture Serif */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-light text-[#F7F3EE] tracking-tight leading-[1.08]">
              Where Royalty Meets <br className="hidden sm:inline" />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#DFCA9F] via-[#C9A96E] to-[#B38F52]">
                Haute Beauty
              </span> & Precision.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#B8ADA0] max-w-2xl leading-relaxed font-light">
              Elevating Gorakhpur’s beauty standard with master bridal transformations, international L’Oréal & Schwarzkopf hair science, clinical HydraFacial rituals, and bespoke unisex grooming across 3 iconic studios.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm font-semibold tracking-widest uppercase text-[#141009] bg-gradient-to-r from-[#DFCA9F] via-[#C9A96E] to-[#B38F52] hover:brightness-110 shadow-xl shadow-[#C9A96E]/20 transition-all transform hover:-translate-y-0.5 active:scale-98"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve An Appointment</span>
              </button>

              <button
                onClick={() => onNavigateSection('bridal')}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-medium tracking-wider uppercase text-[#E2D8CC] border border-[#3C352F] hover:border-[#C9A96E] hover:bg-[#1A1715] transition-all"
              >
                <span>Royal Bridal Couture</span>
                <ArrowRight className="w-4 h-4 text-[#C9A96E]" />
              </button>
            </div>

            {/* Trust Metrics & Social Proof */}
            <div className="pt-6 border-t border-[#24201D] grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <div className="flex items-center gap-1 text-[#DFCA9F] font-serif-luxury text-2xl sm:text-3xl font-bold">
                  4.9
                  <div className="flex text-[#C9A96E] text-xs">
                    <Star className="w-3.5 h-3.5 fill-[#C9A96E]" />
                  </div>
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#8E8377] font-medium mt-0.5">
                  1,800+ Google Reviews
                </div>
              </div>

              <div>
                <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#F7F3EE]">
                  3 Studios
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#8E8377] font-medium mt-0.5">
                  Across Gorakhpur
                </div>
              </div>

              <div>
                <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#F7F3EE]">
                  15,000+
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#8E8377] font-medium mt-0.5">
                  Happy Clients Styled
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Luxury Showcase Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative gold frame */}
              <div className="absolute -inset-2 rounded-2xl border border-[#C9A96E]/20 pointer-events-none" />

              {/* Main Visual Image Card */}
              <div className="relative rounded-2xl overflow-hidden bg-[#181513] shadow-2xl border border-[#2E2824]">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=85"
                  alt="Senrick Luxury Salon Interior Gorakhpur"
                  className="w-full h-[460px] sm:h-[500px] object-cover hover:scale-105 transition-transform duration-700 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A] via-transparent to-black/20" />

                {/* Floating Highlight Card 1: Bridal Artistry */}
                <div className="absolute top-5 left-5 bg-[#14110F]/90 backdrop-blur-md border border-[#3C352E] rounded-xl p-3 shadow-xl max-w-[200px]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#C9A96E]/20 flex items-center justify-center text-[#DFCA9F]">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#EDE7DF]">Temptu Airbrush</div>
                      <div className="text-[10px] text-[#A69C90]">Certified Bridal Team</div>
                    </div>
                  </div>
                </div>

                {/* Floating Highlight Card 2: Bottom Feature */}
                <div className="absolute bottom-5 inset-x-5 bg-[#14110F]/92 backdrop-blur-md border border-[#38312A] rounded-xl p-4 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#C9A96E] block mb-0.5">
                        Now Accepting Bookings
                      </span>
                      <h2 className="text-sm font-semibold text-[#EDE7DF]">
                        Wedding & Festive Season Calendar
                      </h2>
                    </div>
                    <button
                      onClick={() => onNavigateSection('services')}
                      className="text-xs font-semibold text-[#DFCA9F] hover:text-white flex items-center gap-1 group"
                    >
                      <span>Menu</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Branch Pills below image on mobile/tablet */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-start">
                {['Betiahata Flagship', 'Golghar Mangalam Tower', 'Gorakhnath Luxe'].map((branch, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs py-1 px-3 rounded-full bg-[#181513] text-[#A99E92] border border-[#2B2520]"
                  >
                    <MapPin className="w-3 h-3 text-[#C9A96E]" />
                    {branch}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
