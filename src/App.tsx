import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BranchesBar } from './components/BranchesBar';
import { ProductStore } from './components/ProductStore';
import { ServicesSection } from './components/ServicesSection';
import { BridalCouture } from './components/BridalCouture';
import { Transformations } from './components/Transformations';
import { AcademySection } from './components/AcademySection';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { CartDrawer } from './components/CartDrawer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { MessageSquare, Phone, Sparkles, ShoppingBag, Truck } from 'lucide-react';
import { ProductItem, CartItem } from './types';

export default function App() {
  const [activeView, setActiveView] = useState<'salon' | 'store'>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#store') {
      return 'store';
    }
    return 'salon';
  });

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | undefined>();
  const [preSelectedBranchId, setPreSelectedBranchId] = useState<string | undefined>();

  // Cart & Product Store State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + item.product.salonPrice * item.quantity, 0);

  // Sync with browser hash so back/forward works
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#store') {
        setActiveView('store');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setActiveView('salon');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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

  const handleAddToCart = (product: ProductItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const handleBuyNow = (product: ProductItem) => {
    handleAddToCart(product);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleNavigate = (targetId: string) => {
    if (targetId === 'store') {
      setActiveView('store');
      window.location.hash = '#store';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (targetId === 'salon-home' || targetId === 'hero') {
      setActiveView('salon');
      if (window.location.hash === '#store') {
        history.pushState(null, '', window.location.pathname);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If on store page and user clicked a salon section (services, bridal, etc.)
    if (activeView === 'store') {
      setActiveView('salon');
      if (window.location.hash === '#store') {
        history.pushState(null, '', window.location.pathname);
      }
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 80);
      return;
    }

    // Standard smooth scroll on salon page
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0B0A] text-[#EDE7DF] selection:bg-[#C9A96E] selection:text-black font-sans-modern relative">
      {/* Navigation Header */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onNavigateSection={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeView={activeView}
      />

      {/* Main Content: Either Salon Homepage or Dedicated Store Page */}
      <main>
        {activeView === 'salon' ? (
          <>
            {/* Salon Main Homepage (No product store in between) */}
            <Hero
              onOpenBooking={() => handleOpenBooking()}
              onNavigateSection={handleNavigate}
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
          </>
        ) : (
          /* Dedicated Gorakhpur Product Store Page */
          <ProductStore
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onQuickView={(p) => setQuickViewProduct(p)}
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
            onBackToSalon={() => handleNavigate('salon-home')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onNavigateSection={handleNavigate}
      />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={handleCloseBooking}
        preSelectedServiceId={preSelectedServiceId}
        preSelectedBranchId={preSelectedBranchId}
      />

      {/* Gorakhpur Salon Product Cart & Express Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {/* Product Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-auto">
        {/* Floating Cart Button when items exist */}
        {totalCartCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#DFCA9F] via-[#C9A96E] to-[#B38F52] text-black font-bold text-xs shadow-2xl hover:scale-105 transition-all border border-black/20 group animate-bounce"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-4 h-4 fill-black" />
            <span>Bag ({totalCartCount}) • ₹{totalCartPrice.toLocaleString('en-IN')}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-black text-[#DFCA9F] uppercase font-semibold">
              GKP Same Day
            </span>
          </button>
        )}

        <a
          href="https://wa.me/918574003784?text=Hello%20Senrick%20Salon,%20I%20would%20like%20to%20know%20more%20about%20your%20services%20and%20products%20in%20Gorakhpur."
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
