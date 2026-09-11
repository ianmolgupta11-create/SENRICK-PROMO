import React from 'react';
import { Star, Quote, CheckCircle, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/salonData';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-[#0D0B0A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-[#DFCA9F] text-xs font-semibold uppercase tracking-widest">
            <Star className="w-3.5 h-3.5 fill-[#C9A96E] text-[#C9A96E]" />
            <span>Google Verified Patron Reviews</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-[#F7F3EE]">
            Loved by Over <span className="italic text-[#DFCA9F]">15,000 Patrons</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A89E93]">
            Read unfiltered feedback from brides, corporate professionals, doctors, and students who make Senrick their trusted sanctuary in Gorakhpur.
          </p>
        </div>

        {/* Rating Banner */}
        <div className="max-w-md mx-auto mb-12 p-4 rounded-2xl bg-[#171412] border border-[#2E2822] flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#231E1A] flex items-center justify-center font-serif-luxury text-2xl font-bold text-[#DFCA9F] border border-[#3E342A]">
              4.9
            </div>
            <div>
              <div className="flex text-[#C9A96E] gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C9A96E]" />
                ))}
              </div>
              <div className="text-xs text-[#A89E93] mt-0.5">Overall Rating • 1,840+ Verified Reviews</div>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-[#102A1C] text-[#34D399] border border-[#1B4B32]">
            Top Rated
          </span>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl p-7 bg-[#141210] border border-[#29231E] hover:border-[#C9A96E]/40 transition-all duration-300 flex flex-col justify-between space-y-5 relative group"
            >
              <Quote className="w-8 h-8 text-[#C9A96E]/20 absolute top-6 right-6 pointer-events-none" />

              <div className="space-y-4">
                {/* Rating & Service */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#C9A96E] gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A96E]" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-[#DFCA9F] bg-[#221D18] px-2.5 py-0.5 rounded-full border border-[#383028]">
                    {t.service}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-sm text-[#CFC4B6] leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              {/* Client Info */}
              <div className="pt-4 border-t border-[#231F1C] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#C9A96E]/30"
                  />
                  <div>
                    <h3 className="text-xs font-semibold text-[#EDE7DF]">{t.name}</h3>
                    <p className="text-[10px] text-[#8E8377]">{t.role}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#C9A96E] font-medium block">
                    {t.branch}
                  </span>
                  <span className="text-[10px] text-[#6E6357]">{t.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
