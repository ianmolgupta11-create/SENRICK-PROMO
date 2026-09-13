import React, { useState, useEffect } from 'react';
import { Phone, Calendar, MapPin, Menu, X, Sparkles, ChevronDown, ShoppingBag, ArrowLeft } from 'lucide-react';
import { BRANCHES } from '../data/salonData';

interface NavbarProps {
  onOpenBooking: (serviceId?: string, branchId?: string) => void;
  onNavigateSection: (sectionId: string) => void;
  cartCount?: number;
  onOpenCart?: () => void;
  activeView?: 'salon' | 'store';
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenBooking, 
  onNavigateSection,
  cartCount = 0,
  onOpenCart = () => {},
  activeView = 'salon',
}) => {
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

  // Clean, uncluttered navigation links for luxury aesthetic
  const mainNavLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Bridal', id: 'bridal' },
    { label: 'Gallery', id: 'transformations' },
    { label: 'Academy', id: 'academy' },
    { label: 'Branches', id: 'branches' },
    { label: 'Store', id: 'store' },
  ];

  return (
    <>
      {/* Top micro-announcement bar */}
      <div className="bg-[#110F0D] border-b border-[#25201C] text-xs text-[#B5ABA0] py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {activeView === 'store' ? (
            <div className="flex items-center gap-2 text-[11px] sm:text-xs">
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#C9A96E]/15 text-[#DFCA9F] font-semibold tracking-wider uppercase text-[10px]">
                Official Store
              </span>
              <span className="hidden sm:inline text-[#554D44]">•</span>
              <span className="hidden sm:inline text-[#9E9285]">100% Authentic Salon Skincare & Haircare • Gorakhpur Hub</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-[11px] sm:text-xs">
              <span className="text-[#DFCA9F] font-medium tracking-wide">Gorakhpur Flagship</span>
              <span className="text-[#554D44]">•</span>
              <span className="text-[#9E9285] hidden sm:inline">Betiahata • Golghar • Gorakhnath</span>
            </div>
          )}

          <div className="flex items-center gap-5 text-[11px] sm:text-xs font-medium ml-auto">
            <span className="text-[#8C8074] hidden md:inline">Daily: 10:00 AM – 9:00 PM</span>
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
            ? 'bg-[#0D0B0A]/95 backdrop-blur-md shadow-2xl border-b border-[#26201B]'
            : 'bg-[#0D0B0A]/85 backdrop-blur-sm border-b border-[#1C1714]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo / Branding */}
            {activeView === 'store' ? (
              <button
                onClick={() => onNavigateSection('salon-home')}
                className="flex flex-col text-left group focus:outline-none py-1"
                title="Return to Salon Homepage"
              >
                <span className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-[0.24em] text-[#F3EFE9] group-hover:text-[#DFCA9F] transition-colors">
                  SENRICK
                </span>
                <span className="text-[10px] uppercase tracking-[0.34em] text-[#C9A96E] font-semibold">
                  SALON STORE
                </span>
              </button>
            ) : (
              <button
                onClick={() => onNavigateSection('hero')}
                className="flex flex-col text-left group focus:outline-none py-1"
              >
                <span className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-[0.22em] text-[#F3EFE9] group-hover:text-[#DFCA9F] transition-colors">
                  SENRICK
                </span>
                <span className="text-[9px] uppercase tracking-[0.38em] text-[#C9A96E] font-medium">
                  Luxury Salon & Academy
                </span>
              </button>
            )}

            {/* Desktop Navigation Links (Spacious & Clean) */}
            {activeView === 'store' ? (
              /* When in Store View: Keep it calm and focused */
              <div className="hidden lg:flex items-center">
                <button
                  onClick={() => onNavigateSection('salon-home')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold text-[#D3C7B8] hover:text-white bg-[#171412] hover:bg-[#221D19] border border-[#322A23] hover:border-[#C9A96E] transition-all group"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#C9A96E] group-hover:-translate-x-0.5 transition-transform" />
                  <span>Back to Salon Main Site</span>
                </button>
              </div>
            ) : (
              /* Main Salon Navigation Links - Airy & uncluttered */
              <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9">
                {mainNavLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => onNavigateSection(link.id)}
                    className="text-xs uppercase tracking-[0.14em] transition-all font-medium relative group py-1 text-[#C4B8AB] hover:text-[#DFCA9F]"
                  >
                    <span>{link.label}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C9A96E] transition-all duration-300 group-hover:w-full" />
                  </button>
                ))}
              </nav>
            )}

            {/* Right Action Buttons */}
            {activeView === 'store' ? (
              /* Store View: Clean Bag Button */
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigateSection('salon-home')}
                  className="hidden sm:inline-flex lg:hidden items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-wider text-[#C6BBAE] hover:text-white border border-[#352F2A] rounded-lg bg-[#171412]"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>Salon</span>
                </button>

                <button
                  onClick={onOpenCart}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold text-[#141009] bg-gradient-to-r from-[#DFCA9F] via-[#C9A96E] to-[#B38F52] hover:brightness-110 shadow-lg shadow-[#C9A96E]/20 transition-all group"
                  title="Open Bag"
                >
                  <ShoppingBag className="w-4 h-4 text-[#141009]" />
                  <span>Bag</span>
                  <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#141009] text-[#DFCA9F] text-[10px] font-extrabold">
                    {cartCount}
                  </span>
                </button>
              </div>
            ) : (
              /* Main Salon Screen Right Actions: Clean, only Bag + Book Appointment */
              <div className="hidden sm:flex items-center gap-3.5">
                {/* Salon Product Bag Button */}
                <button
                  onClick={onOpenCart}
                  className="relative flex items-center gap-2 px-3.5 py-2 text-xs uppercase tracking-wider text-[#EDE7DF] border border-[#322A23] rounded-lg hover:border-[#C9A96E] hover:text-white transition-all bg-[#171311] group"
                  title="View Salon Bag"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C9A96E] group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Bag</span>
                  {cartCount > 0 ? (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#1BD741] text-black text-[10px] font-extrabold animate-pulse">
                      {cartCount}
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#26201B] text-[#9A8D7E] text-[10px]">
                      0
                    </span>
                  )}
                </button>

                {/* Book Appointment CTA */}
                <button
                  onClick={() => onOpenBooking()}
                  className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs uppercase tracking-widest font-semibold text-[#141009] bg-gradient-to-r from-[#DFCA9F] via-[#C9A96E] to-[#B38F52] hover:brightness-110 shadow-lg shadow-[#C9A96E]/20 transition-all transform active:scale-95"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#141009]" />
                  <span>Book Appointment</span>
                </button>
              </div>
            )}

            {/* Mobile Action Controls */}
            {activeView === 'store' ? (
              <div className="flex sm:hidden items-center gap-2">
                <button
                  onClick={() => onNavigateSection('salon-home')}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-semibold text-[#EDE7DF] bg-[#1E1A17] border border-[#352F2A]"
                >
                  <ArrowLeft className="w-3 h-3 text-[#C9A96E]" />
                  <span>Salon</span>
                </button>
                <button
                  onClick={onOpenCart}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-[#141009] bg-[#C9A96E]"
                  aria-label="View Bag"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Bag ({cartCount})</span>
                </button>
              </div>
            ) : (
              <div className="flex sm:hidden items-center gap-2">
                <button
                  onClick={onOpenCart}
                  className="relative p-2 rounded-lg text-[#C6BBAE] bg-[#171412] border border-[#2C2723]"
                  aria-label="View Bag"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C9A96E]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-[#1BD741] text-black text-[9px] font-black">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => onOpenBooking()}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-semibold text-[#141009] bg-[#C9A96E]"
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
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu (Only active for Main Salon view) */}
        {mobileMenuOpen && activeView === 'salon' && (
          <div className="lg:hidden bg-[#12100E] border-b border-[#2A2420] px-4 py-5 space-y-3">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#231F1C]">
              {mainNavLinks.map((link) => (
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

export default Navbar;
