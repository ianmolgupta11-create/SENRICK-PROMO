import React, { useState } from 'react';
import { 
  X, Trash2, Plus, Minus, Truck, ShieldCheck, CheckCircle2, 
  MapPin, Clock, ArrowRight, MessageSquare, Phone, Sparkles, Tag, ShoppingBag 
} from 'lucide-react';
import { CartItem } from '../types';
import { GORAKHPUR_AREAS } from '../data/productsData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onClearCart,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [selectedArea, setSelectedArea] = useState(GORAKHPUR_AREAS[0]);
  const [deliverySlot, setDeliverySlot] = useState('Express (Within 2-3 Hours Today)');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi_delivery'>('cod');
  const [confirmedOrderId, setConfirmedOrderId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const totalMarketPrice = cart.reduce(
    (acc, item) => acc + item.product.marketPrice * item.quantity,
    0
  );
  const totalSalonPrice = cart.reduce(
    (acc, item) => acc + item.product.salonPrice * item.quantity,
    0
  );
  const totalSavings = totalMarketPrice - totalSalonPrice;
  const savingsPercent = totalMarketPrice > 0 ? Math.round((totalSavings / totalMarketPrice) * 100) : 0;

  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;
    setStep('checkout');
  };

  const handlePlaceOrder = (viaWhatsApp = false) => {
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      setErrorMsg('Please enter your full name, phone number, and Gorakhpur delivery address.');
      return;
    }

    const orderId = `SNK-GKP-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderId(orderId);

    if (viaWhatsApp) {
      const itemsListText = cart
        .map(
          (c, idx) =>
            `${idx + 1}. ${c.product.name} (${c.product.size}) x ${c.quantity} = ₹${(
              c.product.salonPrice * c.quantity
            ).toLocaleString('en-IN')}`
        )
        .join('\n');

      const message = `🛍️ *NEW GORAKHPUR PRODUCT ORDER - SENRICK SALON*\n` +
        `----------------------------------------\n` +
        `*Order ID:* #${orderId}\n` +
        `*Customer Name:* ${customerName}\n` +
        `*Contact:* ${phone}\n` +
        `*Delivery Address:* ${address}, Landmark: ${landmark || 'N/A'}\n` +
        `*Gorakhpur Area:* ${selectedArea}\n` +
        `*Slot Preference:* ${deliverySlot}\n` +
        `*Payment Method:* ${paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'UPI on Delivery'}\n` +
        `----------------------------------------\n` +
        `*Order Items:*\n${itemsListText}\n` +
        `----------------------------------------\n` +
        `*Market Value:* ₹${totalMarketPrice.toLocaleString('en-IN')}\n` +
        `*Senrick Salon Price:* ₹${totalSalonPrice.toLocaleString('en-IN')}\n` +
        `*Customer Savings:* ₹${totalSavings.toLocaleString('en-IN')} (${savingsPercent}% OFF)\n` +
        `*Delivery:* FREE Same-Day Express in Gorakhpur\n\n` +
        `Please confirm stock & dispatch rider from nearest salon branch!`;

      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/918574003784?text=${encoded}`, '_blank');
    }

    setStep('success');
  };

  const handleReset = () => {
    onClearCart();
    setStep('cart');
    setCustomerName('');
    setPhone('');
    setAddress('');
    setLandmark('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-[#141210] border-l border-[#2C2723] h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#26211D] flex items-center justify-between bg-[#191513]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#C9A96E]/15 text-[#DFCA9F]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-lg text-[#F3EFE9] font-bold">
                {step === 'cart' && 'Gorakhpur Salon Bag'}
                {step === 'checkout' && 'Same-Day Express Checkout'}
                {step === 'success' && 'Order Placed!'}
              </h3>
              <p className="text-[11px] text-[#A5998B] flex items-center gap-1">
                <Truck className="w-3 h-3 text-[#1BD741]" />
                Direct Hub Dispatch in Gorakhpur
              </p>
            </div>
          </div>
          <button
            onClick={step === 'success' ? handleReset : onClose}
            className="p-1.5 rounded-lg text-[#8E8377] hover:text-white hover:bg-[#2A2420] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* STEP 1: CART ITEMS */}
          {step === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="text-center py-16 px-4 space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#1E1A17] border border-[#2E2824] flex items-center justify-center text-[#8E8377]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif-luxury text-lg text-[#EDE7DF]">Your Salon Bag is Empty</h4>
                  <p className="text-xs text-[#9E9285] max-w-xs mx-auto">
                    Explore our salon-exclusive hair care, bridal kits, and luxury serums available at prices cheaper than e-commerce.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-4 px-5 py-2.5 rounded-lg bg-[#C9A96E] text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all"
                  >
                    Browse Salon Products
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Gorakhpur Benefit Pill */}
                  <div className="p-3 rounded-xl bg-[#1C1815] border border-[#352E28] flex items-center justify-between text-xs">
                    <span className="text-[#DFCA9F] font-medium flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
                      Total Gorakhpur Savings:
                    </span>
                    <span className="font-bold text-[#1BD741] px-2 py-0.5 rounded bg-[#1BD741]/10 border border-[#1BD741]/20">
                      ₹{totalSavings.toLocaleString('en-IN')} Saved ({savingsPercent}% OFF)
                    </span>
                  </div>

                  {/* List of items */}
                  <div className="space-y-3">
                    {cart.map((item) => {
                      const itemSavings = (item.product.marketPrice - item.product.salonPrice) * item.quantity;
                      return (
                        <div
                          key={item.product.id}
                          className="p-3.5 rounded-xl bg-[#181513] border border-[#2A2420] flex gap-3.5 relative group"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-18 h-20 object-cover rounded-lg border border-[#2A2420] shrink-0"
                          />
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <div className="text-[10px] uppercase font-bold tracking-wider text-[#C9A96E]">
                                {item.product.brand}
                              </div>
                              <h4 className="text-xs font-semibold text-[#F3EFE9] truncate">
                                {item.product.name}
                              </h4>
                              <div className="text-[11px] text-[#8E8377]">{item.product.size}</div>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-baseline gap-2">
                                <span className="text-sm font-bold text-[#EDE7DF]">
                                  ₹{(item.product.salonPrice * item.quantity).toLocaleString('en-IN')}
                                </span>
                                <span className="text-[11px] text-[#6E645A] line-through">
                                  ₹{(item.product.marketPrice * item.quantity).toLocaleString('en-IN')}
                                </span>
                              </div>

                              {/* Quantity Selector */}
                              <div className="flex items-center gap-1.5 bg-[#221D1A] rounded-lg p-0.5 border border-[#352E28]">
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                  className="w-6 h-6 flex items-center justify-center rounded text-[#C6BBAE] hover:bg-[#302A24] transition-colors"
                                  title="Decrease"
                                >
                                  {item.quantity === 1 ? <Trash2 className="w-3 h-3 text-red-400" /> : <Minus className="w-3 h-3" />}
                                </button>
                                <span className="w-6 text-center text-xs font-semibold text-white">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                  className="w-6 h-6 flex items-center justify-center rounded text-[#C6BBAE] hover:bg-[#302A24] transition-colors"
                                  title="Increase"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Delivery Promise Guarantee */}
                  <div className="p-3.5 rounded-xl bg-[#191513] border border-[#2E2824] space-y-2 text-xs text-[#C6BBAE]">
                    <div className="flex items-center gap-2 text-[#DFCA9F] font-semibold">
                      <Truck className="w-4 h-4 text-[#1BD741]" />
                      <span>Gorakhpur Same-Day Priority Guarantee:</span>
                    </div>
                    <p className="text-[11px] text-[#9A8F83] leading-relaxed">
                      Orders placed are picked directly from our <strong>Betiahata</strong> or <strong>Golghar</strong> flagship salons and hand-delivered within 2-4 hours. No 4-day courier delays!
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 2: CHECKOUT ADDRESS & PAYMENT FORM */}
          {step === 'checkout' && (
            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-[#1C1815] border border-[#352E28] flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase text-[#A5998B] font-semibold">Payable on Delivery</div>
                  <div className="text-base font-bold text-[#DFCA9F]">
                    ₹{totalSalonPrice.toLocaleString('en-IN')}
                  </div>
                </div>
                <button
                  onClick={() => setStep('cart')}
                  className="text-xs text-[#C9A96E] hover:underline"
                >
                  Edit Cart ({cart.length} items)
                </button>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-950/40 border border-red-800 text-red-300 text-xs">
                  {errorMsg}
                </div>
              )}

              {/* Personal Details */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A5998B] font-semibold mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Priya Srivastava"
                    className="w-full bg-[#1A1614] border border-[#352E28] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A5998B] font-semibold mb-1">
                    WhatsApp / Contact Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 98765 43210 (For rider dispatch)"
                    className="w-full bg-[#1A1614] border border-[#352E28] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>

                {/* Gorakhpur Locality Selection */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A5998B] font-semibold mb-1">
                    Select Gorakhpur Area *
                  </label>
                  <div className="relative">
                    <select
                      value={selectedArea}
                      onChange={(e) => setSelectedArea(e.target.value)}
                      className="w-full bg-[#1A1614] border border-[#352E28] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C9A96E] appearance-none"
                    >
                      {GORAKHPUR_AREAS.map((area) => (
                        <option key={area} value={area} className="bg-[#1A1614] text-white">
                          {area} (⚡ Same-Day Delivery)
                        </option>
                      ))}
                    </select>
                    <MapPin className="w-3.5 h-3.5 text-[#C9A96E] absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A5998B] font-semibold mb-1">
                    Complete Address & House / Flat No. *
                  </label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House / Apartment number, Street name..."
                    className="w-full bg-[#1A1614] border border-[#352E28] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A5998B] font-semibold mb-1">
                    Nearby Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="e.g. Near Hanuman Mandir or Mangalam Tower"
                    className="w-full bg-[#1A1614] border border-[#352E28] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>

                {/* Delivery Time Slot */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A5998B] font-semibold mb-1">
                    Delivery Speed & Slot Preference
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      'Express (Within 2-3 Hours Today)',
                      'Evening Slot (5:00 PM – 8:30 PM)',
                      'Tomorrow Morning (10:30 AM – 1:00 PM)',
                    ].map((slot) => (
                      <label
                        key={slot}
                        onClick={() => setDeliverySlot(slot)}
                        className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all ${
                          deliverySlot === slot
                            ? 'bg-[#C9A96E]/15 border-[#C9A96E] text-[#DFCA9F]'
                            : 'bg-[#1A1614] border-[#2A2420] text-[#9E9285]'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5 text-[#C9A96E]" />
                        <span className="font-medium text-xs">{slot}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Payment Option */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A5998B] font-semibold mb-1">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        paymentMethod === 'cod'
                          ? 'bg-[#C9A96E]/15 border-[#C9A96E] text-[#DFCA9F]'
                          : 'bg-[#1A1614] border-[#2A2420] text-[#9E9285]'
                      }`}
                    >
                      <div className="font-bold text-xs">Cash on Delivery</div>
                      <div className="text-[10px] text-[#A5998B]">Pay cash upon delivery</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi_delivery')}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        paymentMethod === 'upi_delivery'
                          ? 'bg-[#C9A96E]/15 border-[#C9A96E] text-[#DFCA9F]'
                          : 'bg-[#1A1614] border-[#2A2420] text-[#9E9285]'
                      }`}
                    >
                      <div className="font-bold text-xs">UPI on Delivery</div>
                      <div className="text-[10px] text-[#A5998B]">GPay / PhonePe / QR to rider</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ORDER SUCCESS */}
          {step === 'success' && (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#1BD741]/15 border border-[#1BD741]/40 flex items-center justify-center text-[#1BD741]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif-luxury text-2xl text-[#F3EFE9]">Order Confirmed!</h4>
              <p className="text-xs text-[#C6BBAE] max-w-xs mx-auto">
                Thank you, <strong className="text-white">{customerName}</strong>. Your salon order has been received at our Betiahata/Golghar dispatch hub.
              </p>

              <div className="p-4 rounded-xl bg-[#1A1614] border border-[#2E2824] text-left text-xs space-y-2 max-w-sm mx-auto">
                <div className="flex justify-between border-b border-[#2A2420] pb-2">
                  <span className="text-[#8E8377]">Order Reference:</span>
                  <span className="font-mono font-bold text-[#DFCA9F]">#{confirmedOrderId}</span>
                </div>
                <div className="flex justify-between border-b border-[#2A2420] pb-2">
                  <span className="text-[#8E8377]">Delivery Area:</span>
                  <span className="font-semibold text-white">{selectedArea}</span>
                </div>
                <div className="flex justify-between border-b border-[#2A2420] pb-2">
                  <span className="text-[#8E8377]">Scheduled Slot:</span>
                  <span className="text-[#1BD741] font-semibold">{deliverySlot}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#8E8377]">Total to Pay on Delivery:</span>
                  <span className="text-base font-bold text-[#DFCA9F]">
                    ₹{totalSalonPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#1F1B18] border border-[#352F29] text-xs text-[#DFCA9F] max-w-sm mx-auto">
                ⚡ Our Gorakhpur delivery executive will call your phone (<strong className="text-white">{phone}</strong>) prior to arrival.
              </div>

              <div className="pt-2 space-y-2 max-w-sm mx-auto">
                <a
                  href={`https://wa.me/918574003784?text=${encodeURIComponent(`Hi Senrick Salon! I placed Order #${confirmedOrderId} for delivery in ${selectedArea}. Please confirm dispatch status!`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#1BD741] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-black" />
                  <span>Chat with Dispatch Desk</span>
                </a>
                <button
                  onClick={handleReset}
                  className="w-full py-2.5 text-xs text-[#9E9285] hover:text-white"
                >
                  Back to Salon Store
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {cart.length > 0 && step !== 'success' && (
          <div className="p-5 border-t border-[#26211D] bg-[#191513] space-y-3">
            {/* Price Tally */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#8E8377]">
                <span>Market / E-com Total:</span>
                <span className="line-through">₹{totalMarketPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#1BD741]">
                <span>Gorakhpur Salon Discount:</span>
                <span>-₹{totalSavings.toLocaleString('en-IN')} ({savingsPercent}% OFF)</span>
              </div>
              <div className="flex justify-between text-[#DFCA9F]">
                <span>Same-Day Express Delivery:</span>
                <span className="font-semibold text-[#1BD741]">FREE</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#F3EFE9] pt-2 border-t border-[#2A2420]">
                <span>Senrick Salon Total:</span>
                <span className="text-[#DFCA9F]">₹{totalSalonPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* CTAs */}
            {step === 'cart' ? (
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#DFCA9F] via-[#C9A96E] to-[#B38F52] text-[#141009] font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-[#C9A96E]/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Gorakhpur Delivery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => handlePlaceOrder(true)}
                  className="w-full py-3 rounded-xl bg-[#1BD741] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#1BD741]/20"
                >
                  <MessageSquare className="w-4 h-4 fill-black" />
                  <span>Confirm Order via WhatsApp (Instant Dispatch)</span>
                </button>
                <button
                  onClick={() => handlePlaceOrder(false)}
                  className="w-full py-2.5 rounded-xl border border-[#352E28] text-[#DFCA9F] hover:bg-[#231E1B] font-semibold text-xs tracking-wider transition-colors"
                >
                  Place Order on Website (Pay on Delivery)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
