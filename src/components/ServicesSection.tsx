import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Crown, 
  Scissors, 
  Flower2, 
  UserCheck, 
  Heart, 
  Sun, 
  Clock, 
  Check, 
  Calendar, 
  Search, 
  Tag
} from 'lucide-react';
import { SERVICES, SERVICE_CATEGORIES } from '../data/salonData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredServices = useMemo(() => {
    return SERVICES.filter((s) => {
      const matchesCat = activeCategory === 'all' || s.category === activeCategory;
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.recommendedFor && s.recommendedFor.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'bridal':
        return <Crown className="w-3.5 h-3.5" />;
      case 'hair':
        return <Scissors className="w-3.5 h-3.5" />;
      case 'skin':
        return <Flower2 className="w-3.5 h-3.5" />;
      case 'men':
        return <UserCheck className="w-3.5 h-3.5" />;
      case 'nails':
        return <Heart className="w-3.5 h-3.5" />;
      case 'spa':
        return <Sun className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#0D0B0A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/25 text-[#DFCA9F] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>The Service Atelier</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#F7F3EE]">
            Couture Beauty, Hair & <span className="italic text-[#DFCA9F]">Skin Rituals</span>
          </h2>
          <p className="text-sm sm:text-base text-[#B0A59A]">
            Every treatment at Senrick is performed by certified master cosmetologists using authentic international formulations from L’Oréal Professionnel, Schwarzkopf, Moroccanoil, Temptu, and O3+.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-none">
            {SERVICE_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#C9A96E] text-[#120F0C] font-semibold shadow-md shadow-[#C9A96E]/20'
                      : 'bg-[#181513] text-[#A69C90] border border-[#2B2520] hover:border-[#423932] hover:text-white'
                  }`}
                >
                  {getCategoryIcon(cat.id)}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-[#8C8073] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search treatments or hair spa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full text-xs bg-[#171412] border border-[#2D2621] text-[#EDE7DF] placeholder-[#796F64] focus:outline-none focus:border-[#C9A96E] transition-colors"
            />
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-[#141210] rounded-2xl border border-[#26211D]">
            <Sparkles className="w-8 h-8 text-[#C9A96E] mx-auto mb-3 opacity-60" />
            <p className="text-base text-[#EDE7DF] font-serif-luxury">No treatments matched your query</p>
            <p className="text-xs text-[#8E8377] mt-1">Try clearing the search or exploring our other categories</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-lg text-xs uppercase font-semibold text-[#DFCA9F] border border-[#3C352E] hover:border-[#C9A96E]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredServices.map((service: ServiceItem) => (
              <div
                key={service.id}
                className="group rounded-2xl overflow-hidden bg-[#151210] border border-[#29231E] hover:border-[#C9A96E]/50 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-[#C9A96E]/5"
              >
                {/* Image & Badges */}
                <div className="relative h-56 overflow-hidden bg-[#1D1916]">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151210] via-transparent to-black/20" />

                  {service.popular && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-[#DFCA9F] to-[#C9A96E] text-black text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow">
                      Most Requested
                    </div>
                  )}

                  <div className="absolute bottom-3 right-3 bg-[#0D0B0A]/85 backdrop-blur-sm border border-[#3A322C] text-[#DFCA9F] text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C9A96E]" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif-luxury text-xl sm:text-2xl font-normal text-[#F7F3EE] group-hover:text-[#DFCA9F] transition-colors leading-snug">
                        {service.name}
                      </h3>
                    </div>

                    <p className="text-xs text-[#A89E93] leading-relaxed line-clamp-3">
                      {service.description}
                    </p>

                    {service.recommendedFor && (
                      <div className="inline-flex items-center gap-1.5 text-[11px] text-[#C9A96E] pt-1">
                        <Tag className="w-3 h-3 shrink-0" />
                        <span>Best for: {service.recommendedFor}</span>
                      </div>
                    )}

                    {/* Key Benefits List */}
                    <div className="pt-2 space-y-1.5 border-t border-[#231F1C]">
                      {service.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#C6BBAE]">
                          <Check className="w-3.5 h-3.5 text-[#C9A96E] shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-4 border-t border-[#231F1C] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8A7E72] block">
                        Investment
                      </span>
                      <span className="font-serif-luxury text-2xl font-bold text-[#F7F3EE]">
                        {service.price}
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenBooking(service.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#141009] bg-[#C9A96E] hover:bg-[#DFCA9F] transition-colors shadow"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Service</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Banner for Custom Consultation */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-[#1D1916] via-[#241F1A] to-[#1D1916] border border-[#3D342C] p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h4 className="font-serif-luxury text-2xl text-[#F7F3EE] font-normal">
              Not sure which hair therapy or facial suits your skin?
            </h4>
            <p className="text-xs sm:text-sm text-[#A89E93]">
              Walk into any of our 3 branches in Gorakhpur for a complimentary trichology scalp analysis and clinical skin consultation before choosing your package.
            </p>
          </div>
          <button
            onClick={() => onOpenBooking()}
            className="shrink-0 px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-widest text-[#EDE7DF] border border-[#C9A96E]/50 hover:bg-[#C9A96E] hover:text-black transition-all"
          >
            Schedule Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
};
