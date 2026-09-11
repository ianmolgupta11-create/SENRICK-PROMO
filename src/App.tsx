import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BranchesBar } from './components/BranchesBar';
import { ServicesSection } from './components/ServicesSection';
import { BridalCouture } from './components/BridalCouture';
import { Transformations } from './components/Transformations';
import { AcademySection } from './components/AcademySection';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { MessageSquare, Phone, Sparkles } from 'lucide-react';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | undefined>();
  const [preSelectedBranchId, setPreSelectedBranchId] = useState<string | undefined>();

  const handleOpenBooking = (serviceId?: string, branchId?: string) => {
    setPreSelectedServiceId(serviceId);
    setPreSelectedBranchId(branchId);
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
    setPreSelectedServiceId(undefined);
    setPreSelectedBranchId(undefined);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0B0A] text-[#EDE7DF] selection:bg-[#C9A96E] selection:text-black font-sans-modern relative">
      {/* Navigation Header */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onNavigateSection={scrollToSection}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onNavigateSection={scrollToSection}
        />

        <BranchesBar
          onOpenBooking={handleOpenBooking}
        />

        <ServicesSection
          onOpenBooking={handleOpenBooking}
        />

        <BridalCouture
          onOpenBooking={handleOpenBooking}
        />

        <Transformations />

        <AcademySection />

        <Testimonials />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onNavigateSection={scrollToSection}
      />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={handleCloseBooking}
        preSelectedServiceId={preSelectedServiceId}
        preSelectedBranchId={preSelectedBranchId}
      />

      {/* Floating Action Buttons for quick mobile convenience */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        <a
          href="https://wa.me/918574003784?text=Hello%20Senrick%20Salon,%20I%20would%20like%20to%20know%20more%20about%20your%20services%20and%20book%20an%20appointment."
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#1BD741] text-black font-semibold text-xs shadow-2xl hover:scale-105 transition-transform"
          aria-label="WhatsApp Us"
        >
          <MessageSquare className="w-4 h-4 fill-black" />
          <span className="hidden sm:inline">WhatsApp Salon</span>
        </a>
      </div>
    </div>
  );
}
