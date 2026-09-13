import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube, MessageSquare, Heart, Sparkles } from 'lucide-react';
import { BRANCHES } from '../data/salonData';

interface FooterProps {
  onOpenBooking: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onNavigateSection }) => {
  return (
    <footer className="bg-[#0A0908] border-t border-[#211B17] text-[#A89E93] text-xs">
      {/* Top Pre-Footer CTA */}
      <div className="border-b border-[#1C1714] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C9A96E]">
              Excellence in Beauty Since 2014
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#F7F3EE]">
              Experience Haute Beauty at Senrick Salon Gorakhpur
            </h3>
            <p className="text-xs text-[#8A7E72]">
              Betiahata Flagship • Golghar Mangalam Tower • Gorakhnath Luxe
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-7 py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold text-[#141009] bg-gradient-to-r from-[#DFCA9F] to-[#C9A96E] hover:brightness-110 shadow-lg shadow-[#C9A96E]/20 transition-all shrink-0"
          >
            Book An Appointment
          </button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="font-serif-luxury text-3xl font-bold tracking-[0.2em] text-[#F7F3EE] block">
                SENRICK
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C9A96E] font-semibold block">
                Luxury Salon & Academy
              </span>
            </div>
            <p className="text-xs text-[#8E8377] leading-relaxed max-w-sm">
              Eastern Uttar Pradesh’s quintessential luxury beauty destination. Specializing in royal bridal transformations, high-fashion hair coloring, clinical skincare, and certified cosmetology diplomas.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#181412] border border-[#2B231D] flex items-center justify-center text-[#DFCA9F] hover:bg-[#C9A96E] hover:text-black transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#181412] border border-[#2B231D] flex items-center justify-center text-[#DFCA9F] hover:bg-[#C9A96E] hover:text-black transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#181412] border border-[#2B231D] flex items-center justify-center text-[#DFCA9F] hover:bg-[#C9A96E] hover:text-black transition-colors"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/918574003784"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#181412] border border-[#2B231D] flex items-center justify-center text-[#34D399] hover:bg-[#34D399] hover:text-black transition-colors"
                title="WhatsApp Direct"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#EDE7DF]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#8E8377]">
              <li>
                <button onClick={() => onNavigateSection('store')} className="hover:text-[#DFCA9F] transition-colors">
                  Store
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('services')} className="hover:text-[#DFCA9F] transition-colors">
                  Services Atelier
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('bridal')} className="hover:text-[#DFCA9F] transition-colors">
                  Royal Bridal Suite
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('transformations')} className="hover:text-[#DFCA9F] transition-colors">
                  Before & After Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('academy')} className="hover:text-[#DFCA9F] transition-colors">
                  Senrick Academy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('branches')} className="hover:text-[#DFCA9F] transition-colors">
                  Gorakhpur Branches
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('testimonials')} className="hover:text-[#DFCA9F] transition-colors">
                  Client Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Branches list */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#EDE7DF]">
              Gorakhpur Studios
            </h4>
            <div className="space-y-3 text-xs">
              {BRANCHES.map((b) => (
                <div key={b.id} className="space-y-0.5">
                  <div className="text-[#EDE7DF] font-medium">{b.name}</div>
                  <div className="text-[#7D7267] text-[11px]">{b.address}</div>
                  <a
                    href={`tel:${b.phone.replace(/\s+/g, '')}`}
                    className="text-[#DFCA9F] hover:underline text-[11px] inline-flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{b.phone}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Academy & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#EDE7DF]">
              Academy & Central Desk
            </h4>
            <div className="space-y-2 text-xs text-[#8E8377]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C9A96E] shrink-0 mt-0.5" />
                <span>2nd Floor, Hanuman Mandir Road, Betiahata, Gorakhpur</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C9A96E] shrink-0" />
                <span>Academy: Mon - Sat: 10 AM – 5 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C9A96E] shrink-0" />
                <a href="mailto:senrickbeauty@gmail.com" className="hover:text-[#DFCA9F] transition-colors">
                  senrickbeauty@gmail.com
                </a>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#14110F] border border-[#26201B] space-y-1">
              <div className="text-[10px] uppercase font-bold text-[#DFCA9F] tracking-wider">
                Official Redesign
              </div>
              <p className="text-[11px] text-[#786D62]">
                Redesigned modern digital salon experience with direct booking concierge.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-12 pt-8 border-t border-[#1C1714] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6E6357]">
          <div>
            © {new Date().getFullYear()} Senrick Luxury Salon & Academy. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#hero" className="hover:text-[#DFCA9F] transition-colors">Back to Top</a>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
