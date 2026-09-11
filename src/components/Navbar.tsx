import React, { useState, useEffect } from 'react';
import { Phone, Calendar, MapPin, Menu, X, Sparkles, ChevronDown } from 'lucide-react';
import { BRANCHES } from '../data/salonData';

interface NavbarProps {
  onOpenBooking: (serviceId?: string, branchId?: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onNavigateSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Bridal Couture', id: 'bridal' },
    { label: 'Transformations', id: 'transformations' },
    { label: 'Academy', id: 'academy' },
    { label: 'Branches', id: 'branches' },
    { label: 'Reviews', id: 'testimonials' },
  ];

  return (
    <>
      {/* Top micro-announcement bar */}
      <div className="bg-[#141210] border-b border-[#2C2723] text-xs text-[#C6BBAE] py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#C9A96E]/15 text-[#DFCA9F] font-medium tracking-wide">
              Gorakhpur’s Premier Destination
            </span>
            <span className="hidden sm:inline text-[#7A7168]">|</span>
            <span className="hidden sm:inline">3 Luxury Branches: Betiahata • Golghar • Gorakhnath</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] sm:text-xs font-medium ml-auto">
            <span className="text-[#A3988C] hidden md:inline">Open 7 Days: 10:00 AM – 9:00 PM</span>
            <a
              href="tel:+918574003784"
              className="flex items-center gap-1.5 text-[#DFCA9F] hover:text-[#FFFFFF] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#C9A96E]" />
              <span>+91 85740 03784</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0D0B0A]/95 backdrop-blur-md shadow-2xl border-b border-[#2C2723]'
            : 'bg-[#0D0B0A]/85 backdrop-blur-sm border-b border-[#1F1B18]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => onNavigateSection('hero')}
              className="flex flex-col text-left group focus:outline-none"
            >
              <span className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-[0.22em] text-[#F3EFE9] group-hover:text-[#DFCA9F] transition-colors">
                SENRICK
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.38em] text-[#C9A96E] font-medium">
                Luxury Salon & Academy
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigateSection(link.id)}
                  className="text-sm tracking-wider uppercase text-[#C6BBAE] hover:text-[#DFCA9F] transition-colors font-medium relative group py-1"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C9A96E] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Branch Quick Select / Call Popover */}
              <div className="relative">
                <button
                  onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-wider text-[#C6BBAE] border border-[#352F2A] rounded-lg hover:border-[#C9A96E]/50 hover:text-white transition-all bg-[#171412]"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>Gorakhpur Branches</span>
                  <ChevronDown className="w-3 h-3 ml-0.5 text-[#8E8377]" />
                </button>

                {branchDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-[#171412] border border-[#352F2A] rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="text-[10px] uppercase font-semibold text-[#8E8377] tracking-wider px-3 py-1.5 border-b border-[#2A2420]">
                      Select Branch to Call or Navigate
                    </div>
                    {BRANCHES.map((b) => (
                      <div
                        key={b.id}
                        className="p-2.5 hover:bg-[#231F1C] rounded-lg transition-colors group flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-semibold text-[#EDE7DF] group-hover:text-[#DFCA9F]">
                            {b.name}
                          </div>
                          <div className="text-[11px] text-[#9A8F83] truncate max-w-[160px]">
                            {b.address}
                          </div>
                        </div>
                        <a
                          href={`tel:${b.phone.replace(/\s+/g, '')}`}
                          className="p-1.5 rounded-md bg-[#C9A96E]/15 text-[#DFCA9F] hover:bg-[#C9A96E] hover:text-black transition-colors"
                          title="Call branch"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Book Appointment CTA */}
              <button
                onClick={() => {
                  setBranchDropdownOpen(false);
                  onOpenBooking();
                }}
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs uppercase tracking-widest font-semibold text-[#141009] bg-gradient-to-r from-[#DFCA9F] via-[#C9A96E] to-[#B38F52] hover:brightness-110 shadow-lg shadow-[#C9A96E]/20 transition-all transform active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5 text-[#141009]" />
                <span>Book Appointment</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => onOpenBooking()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] uppercase tracking-wider font-semibold text-[#141009] bg-[#C9A96E]"
              >
                <Calendar className="w-3 h-3" />
                <span>Book</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#C6BBAE] hover:text-white border border-[#2C2723] hover:border-[#C9A96E]/50"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#12100E] border-b border-[#2A2420] px-4 py-5 space-y-3">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#231F1C]">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigateSection(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-lg text-xs uppercase tracking-wider text-[#C6BBAE] hover:text-[#DFCA9F] hover:bg-[#1E1A17] transition-colors font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile Branch Quick Dial */}
            <div className="pt-1 space-y-2">
              <div className="text-[10px] uppercase tracking-widest text-[#8E8377] font-semibold">
                Direct Branch Call
              </div>
              {BRANCHES.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-[#181513] border border-[#26211D]"
                >
                  <span className="text-[#EDE7DF] font-medium">{b.name}</span>
                  <a
                    href={`tel:${b.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-1 text-[#DFCA9F] text-xs font-semibold"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call</span>
                  </a>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-lg text-center text-xs uppercase tracking-widest font-bold text-[#141009] bg-gradient-to-r from-[#DFCA9F] to-[#C9A96E] shadow-lg flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Reserve An Appointment</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
