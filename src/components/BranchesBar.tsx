import React, { useState } from 'react';
import { MapPin, Phone, Clock, MessageSquare, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { BRANCHES } from '../data/salonData';

interface BranchesBarProps {
  onOpenBooking: (serviceId?: string, branchId?: string) => void;
}

export const BranchesBar: React.FC<BranchesBarProps> = ({ onOpenBooking }) => {
  const [activeBranch, setActiveBranch] = useState(BRANCHES[0].id);

  return (
    <section id="branches" className="py-20 bg-[#12100E] border-y border-[#26211D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-[#DFCA9F] text-xs font-semibold uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>Locations Across Gorakhpur</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#F7F3EE]">
            Visit Our <span className="italic text-[#DFCA9F]">Three Luxury</span> Sanctuaries
          </h2>
          <p className="text-sm sm:text-base text-[#A89E93]">
            Engineered with modern Italian styling stations, private VIP bridal lounges, and state-of-the-art hygiene protocols. All 3 locations are open 7 days a week.
          </p>
        </div>

        {/* Branch Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {BRANCHES.map((b) => {
            const isSelected = activeBranch === b.id;
            return (
              <div
                key={b.id}
                onClick={() => setActiveBranch(b.id)}
                className={`relative rounded-2xl overflow-hidden bg-[#181513] border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#C9A96E] shadow-2xl shadow-[#C9A96E]/15 -translate-y-1'
                    : 'border-[#2C2621] hover:border-[#423932]'
                }`}
              >
                {/* Branch Image Preview */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={b.image}
                    alt={b.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181513] via-[#181513]/40 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#0D0B0A]/85 text-[#DFCA9F] border border-[#3C352E]">
                      {b.tagline}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#C9A96E] text-black text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                      <CheckCircle2 className="w-3 h-3" />
                      Selected
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <h3 className="font-serif-luxury text-2xl font-normal text-[#F7F3EE] mb-2">
                      {b.name}
                    </h3>

                    <div className="space-y-2.5 text-xs text-[#B0A59A]">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
                        <span>{b.address}</span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-[#C9A96E] shrink-0" />
                        <span>{b.hours}</span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-[#C9A96E] shrink-0" />
                        <span className="text-[#EDE7DF] font-medium">{b.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#26211D] space-y-2.5">
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`tel:${b.phone.replace(/\s+/g, '')}`}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-[#EDE7DF] bg-[#221D1A] hover:bg-[#2F2823] border border-[#3A322C] transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#C9A96E]" />
                        <span>Call Direct</span>
                      </a>

                      <a
                        href={`https://wa.me/${b.whatsapp}?text=Hello%20Senrick%20Salon%20(${b.name}),%20I%20would%20like%20to%20book%20an%20appointment.`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-[#34D399] bg-[#12281E]/60 hover:bg-[#153427] border border-[#1E4D37] transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenBooking(undefined, b.id);
                      }}
                      className="w-full py-2.5 px-4 rounded-lg text-xs font-bold uppercase tracking-wider text-[#141009] bg-[#C9A96E] hover:bg-[#DFCA9F] transition-all flex items-center justify-center gap-2 shadow"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book At {b.name.split(' ')[0]}</span>
                    </button>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.mapQuery)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1 text-[11px] text-[#8E8377] hover:text-[#C9A96E] transition-colors pt-1"
                    >
                      <span>Get Directions on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
