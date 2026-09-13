import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Check, 
  Sparkles, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Scissors, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { BRANCHES, SERVICES } from '../data/salonData';
import { ServiceItem } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string;
  preSelectedBranchId?: string;
}

const TIME_SLOTS = [
  '10:30 AM',
  '11:30 AM',
  '12:30 PM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM',
  '06:30 PM',
  '07:30 PM',
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedServiceId,
  preSelectedBranchId,
}) => {
  const [step, setStep] = useState<number>(1);
  const [branchId, setBranchId] = useState<string>(preSelectedBranchId || BRANCHES[0].id);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(
    preSelectedServiceId ? [preSelectedServiceId] : [SERVICES[0].id]
  );
  
  // Date selection (default today or tomorrow)
  const todayStr = new Date().toISOString().split('T')[0];
  const [bookingDate, setBookingDate] = useState<string>(todayStr);
  const [selectedTime, setSelectedTime] = useState<string>('02:00 PM');
  const [stylistPreference, setStylistPreference] = useState<string>('Any Senior Stylist');

  // Client info
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoApplied, setPromoApplied] = useState<boolean>(false);

  // Completed reservation state
  const [bookingCode, setBookingCode] = useState<string>('');

  if (!isOpen) return null;

  const currentBranch = BRANCHES.find((b) => b.id === branchId) || BRANCHES[0];
  const selectedServices = SERVICES.filter((s) => selectedServiceIds.includes(s.id));

  const totalRawPrice = selectedServices.reduce((acc, s) => acc + s.priceNum, 0);
  const discountAmount = promoApplied ? Math.round(totalRawPrice * 0.1) : 0;
  const finalPrice = Math.max(0, totalRawPrice - discountAmount);

  const toggleService = (id: string) => {
    if (selectedServiceIds.includes(id)) {
      if (selectedServiceIds.length > 1) {
        setSelectedServiceIds(selectedServiceIds.filter((item) => item !== id));
      }
    } else {
      setSelectedServiceIds([...selectedServiceIds, id]);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.startsWith('91') && val.length > 10) {
      val = val.slice(2);
    } else if (val.startsWith('0') && val.length > 10) {
      val = val.slice(1);
    }
    setPhone(val.slice(0, 10));
    if (phoneError) setPhoneError(null);
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'SENRICKGLAM') {
      setPromoApplied(true);
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;
    if (phone.length !== 10) {
      setPhoneError('Please enter a valid 10-digit mobile number.');
      return;
    }
    const code = `SRK-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingCode(code);
    setStep(5); // Step 5 is confirmation view
  };

  const generateWhatsAppUrl = () => {
    const serviceList = selectedServices.map((s) => s.name).join(', ');
    const text = encodeURIComponent(
      `*New Appointment Booking Request*\n` +
      `Booking ID: ${bookingCode}\n` +
      `Client Name: ${fullName}\n` +
      `Phone: +91 ${phone}\n` +
      `Branch: ${currentBranch.name}\n` +
      `Date: ${bookingDate}\n` +
      `Time Slot: ${selectedTime}\n` +
      `Services: ${serviceList}\n` +
      `Est. Total: ₹${finalPrice.toLocaleString('en-IN')}\n` +
      (notes ? `Special Notes: ${notes}\n` : '') +
      `Please confirm my slot.`
    );
    return `https://wa.me/${currentBranch.whatsapp}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#141210] border border-[#2E2822] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#231F1C] flex items-center justify-between bg-[#191513]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C9A96E]">
              Senrick Concierge
            </span>
            <h3 className="font-serif-luxury text-2xl text-[#F7F3EE]">
              {step === 5 ? 'Appointment Confirmed' : 'Reserve Your Experience'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#8E8377] hover:text-white hover:bg-[#28221D] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step progress indicators (steps 1-4) */}
        {step < 5 && (
          <div className="px-6 py-3 bg-[#110F0D] border-b border-[#201B17] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                  step >= 1 ? 'bg-[#C9A96E] text-black' : 'bg-[#26201B] text-[#8E8377]'
                }`}
              >
                1
              </span>
              <span className={step === 1 ? 'text-[#EDE7DF] font-semibold' : 'text-[#8E8377]'}>Branch</span>
            </div>
            <div className="w-6 h-[1px] bg-[#2E2721]" />
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                  step >= 2 ? 'bg-[#C9A96E] text-black' : 'bg-[#26201B] text-[#8E8377]'
                }`}
              >
                2
              </span>
              <span className={step === 2 ? 'text-[#EDE7DF] font-semibold' : 'text-[#8E8377]'}>Services</span>
            </div>
            <div className="w-6 h-[1px] bg-[#2E2721]" />
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                  step >= 3 ? 'bg-[#C9A96E] text-black' : 'bg-[#26201B] text-[#8E8377]'
                }`}
              >
                3
              </span>
              <span className={step === 3 ? 'text-[#EDE7DF] font-semibold' : 'text-[#8E8377]'}>Date & Time</span>
            </div>
            <div className="w-6 h-[1px] bg-[#2E2721]" />
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                  step >= 4 ? 'bg-[#C9A96E] text-black' : 'bg-[#26201B] text-[#8E8377]'
                }`}
              >
                4
              </span>
              <span className={step === 4 ? 'text-[#EDE7DF] font-semibold' : 'text-[#8E8377]'}>Details</span>
            </div>
          </div>
        )}

        {/* Modal Body Container */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* STEP 1: Select Branch */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-xs text-[#A89E93]">
                Select which Senrick Salon studio in Gorakhpur you would like to visit:
              </p>
              <div className="space-y-3">
                {BRANCHES.map((b) => {
                  const isCurrent = branchId === b.id;
                  return (
                    <div
                      key={b.id}
                      onClick={() => setBranchId(b.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                        isCurrent
                          ? 'bg-[#221C18] border-[#C9A96E] shadow-md shadow-[#C9A96E]/10'
                          : 'bg-[#171412] border-[#29221D] hover:border-[#3D332B]'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif-luxury text-xl text-[#F7F3EE] font-medium">
                            {b.name}
                          </h4>
                          <span className="text-[10px] uppercase tracking-wider text-[#DFCA9F] px-2 py-0.5 rounded bg-[#0D0B0A] border border-[#352D26]">
                            {b.tagline}
                          </span>
                        </div>
                        <p className="text-xs text-[#A89E93]">{b.address}</p>
                        <p className="text-xs text-[#C9A96E] flex items-center gap-1 pt-1">
                          <Phone className="w-3 h-3" />
                          <span>{b.phone}</span>
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border mt-1 ${
                          isCurrent
                            ? 'bg-[#C9A96E] border-[#C9A96E] text-black'
                            : 'border-[#42372E]'
                        }`}
                      >
                        {isCurrent && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Select Services */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-[#A89E93]">
                  Choose one or multiple services for your visit:
                </p>
                <span className="text-xs text-[#DFCA9F] font-semibold">
                  {selectedServiceIds.length} selected
                </span>
              </div>

              <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                {SERVICES.map((s) => {
                  const isChecked = selectedServiceIds.includes(s.id);
                  return (
                    <div
                      key={s.id}
                      onClick={() => toggleService(s.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                        isChecked
                          ? 'bg-[#221C18] border-[#C9A96E] text-white'
                          : 'bg-[#171412] border-[#29221D] text-[#A69C90] hover:border-[#3E342C]'
                      }`}
                    >
                      <div className="flex items-center gap-3 pr-2">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                            isChecked
                              ? 'bg-[#C9A96E] border-[#C9A96E] text-black'
                              : 'border-[#4A4037]'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="font-medium text-[#EDE7DF] text-sm font-serif-luxury">
                            {s.name}
                          </div>
                          <div className="text-[11px] text-[#8E8377] flex items-center gap-2">
                            <span>{s.duration}</span>
                            <span>•</span>
                            <span className="capitalize">{s.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-sm font-semibold text-[#DFCA9F] block">
                          {s.price}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Running summary */}
              <div className="p-3 rounded-xl bg-[#181512] border border-[#2B231D] flex items-center justify-between text-xs">
                <span className="text-[#A89E93]">Estimated Total:</span>
                <span className="font-serif-luxury text-xl font-bold text-[#F7F3EE]">
                  ₹{totalRawPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: Date, Time & Stylist */}
          {step === 3 && (
            <div className="space-y-5">
              {/* Date Input */}
              <div>
                <label className="text-xs uppercase font-semibold text-[#8E8377] tracking-wider block mb-2">
                  Select Preferred Date
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-xs bg-[#181512] border border-[#2E2721] text-[#EDE7DF] focus:outline-none focus:border-[#C9A96E]"
                />
              </div>

              {/* Time Slots Grid */}
              <div>
                <label className="text-xs uppercase font-semibold text-[#8E8377] tracking-wider block mb-2">
                  Select Time Slot (Open 10 AM – 9 PM)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TIME_SLOTS.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold tracking-wider transition-all border ${
                          isSelected
                            ? 'bg-[#C9A96E] text-black border-[#C9A96E] shadow'
                            : 'bg-[#181512] text-[#A89E93] border-[#29221D] hover:border-[#3D332B] hover:text-white'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stylist preference */}
              <div>
                <label className="text-xs uppercase font-semibold text-[#8E8377] tracking-wider block mb-2">
                  Stylist / Artiste Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {['Any Senior Stylist', 'Bridal Master Artiste', 'Hair Chemical Director'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setStylistPreference(item)}
                      className={`p-2.5 rounded-lg text-xs transition-all border text-left ${
                        stylistPreference === item
                          ? 'bg-[#221C18] border-[#C9A96E] text-[#DFCA9F] font-semibold'
                          : 'bg-[#181512] border-[#29221D] text-[#8E8377]'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Personal Details & Promo */}
          {step === 4 && (
            <form id="booking-form" onSubmit={handleConfirmBooking} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#8E8377] uppercase tracking-wider block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shalini Agarwal"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#181512] border border-[#2E2721] text-[#EDE7DF] placeholder-[#6E6357] focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] text-[#8E8377] uppercase tracking-wider block">
                      Mobile / WhatsApp Number *
                    </label>
                    <span className={`text-[10px] ${phone.length === 10 ? 'text-[#34D399] font-medium' : 'text-[#8E8377]'}`}>
                      {phone.length}/10 digits
                    </span>
                  </div>
                  <div className="flex rounded-xl border border-[#2E2721] focus-within:border-[#C9A96E] bg-[#181512] overflow-hidden transition-all">
                    <div className="flex items-center gap-1.5 px-3.5 bg-[#201B17] border-r border-[#2E2721] text-xs font-semibold text-[#DFCA9F] select-none shrink-0">
                      <span>🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      required
                      placeholder="98765 43210"
                      value={phone}
                      onChange={handlePhoneChange}
                      className="w-full px-3 py-2.5 text-xs bg-transparent text-[#EDE7DF] placeholder-[#6E6357] focus:outline-none"
                    />
                  </div>
                  {phoneError && (
                    <p className="text-[10px] text-[#E07A5F] mt-1">{phoneError}</p>
                  )}
                  {phone.length > 0 && phone.length < 10 && !phoneError && (
                    <p className="text-[10px] text-[#DFCA9F] mt-1">
                      Enter 10-digit mobile number ({10 - phone.length} more needed)
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-[11px] text-[#8E8377] uppercase tracking-wider block mb-1">
                  Special Notes or Bridal Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Bringing jewelry for drape, hair length below waist..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#181512] border border-[#2E2721] text-[#EDE7DF] placeholder-[#6E6357] focus:outline-none focus:border-[#C9A96E]"
                />
              </div>

              {/* Promo Code section */}
              <div className="p-3.5 rounded-xl bg-[#181512] border border-[#2B231D] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#DFCA9F]">
                    <Tag className="w-3.5 h-3.5 text-[#C9A96E]" />
                    <span className="font-semibold">Have a Promo Voucher?</span>
                  </div>
                  <span className="text-[10px] text-[#8E8377]">
                    Try code: <strong className="text-[#DFCA9F] cursor-pointer" onClick={() => setPromoCode('SENRICKGLAM')}>SENRICKGLAM</strong>
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Code (e.g. SENRICKGLAM)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg text-xs uppercase bg-[#110F0D] border border-[#2A231D] text-[#EDE7DF] focus:outline-none focus:border-[#C9A96E]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#26201B] hover:bg-[#332A23] text-[#DFCA9F] border border-[#3E342B]"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-[11px] text-[#34D399] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Special 10% Welcome Discount applied (-₹{discountAmount.toLocaleString('en-IN')})</span>
                  </p>
                )}
              </div>

              {/* Final Summary Card */}
              <div className="p-4 rounded-xl bg-[#1B1714] border border-[#362D24] space-y-2 text-xs">
                <div className="flex justify-between text-[#8E8377]">
                  <span>Branch:</span>
                  <span className="text-[#EDE7DF] font-medium">{currentBranch.name}</span>
                </div>
                <div className="flex justify-between text-[#8E8377]">
                  <span>Date & Slot:</span>
                  <span className="text-[#EDE7DF] font-medium">{bookingDate} at {selectedTime}</span>
                </div>
                <div className="flex justify-between text-[#8E8377]">
                  <span>Services ({selectedServices.length}):</span>
                  <span className="text-[#EDE7DF] font-medium truncate max-w-[200px]">
                    {selectedServices.map((s) => s.name).join(', ')}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#29221D] flex justify-between items-baseline">
                  <span className="text-sm font-medium text-[#EDE7DF]">Net Payable at Salon:</span>
                  <span className="font-serif-luxury text-2xl font-bold text-[#DFCA9F]">
                    ₹{finalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </form>
          )}

          {/* STEP 5: CONFIRMATION SUCCESS VIEW */}
          {step === 5 && (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#C9A96E]/20 text-[#DFCA9F] flex items-center justify-center mx-auto border border-[#C9A96E]/40">
                <Sparkles className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-widest text-[#C9A96E]">
                  Reservation Voucher Generated
                </span>
                <h4 className="font-serif-luxury text-3xl text-white font-normal">
                  Thank You, {fullName}!
                </h4>
                <p className="text-xs text-[#A89E93] max-w-md mx-auto">
                  Your provisional appointment request has been recorded. Our front desk at <strong className="text-[#DFCA9F]">{currentBranch.name}</strong> will hold your chair.
                </p>
              </div>

              {/* Voucher Box */}
              <div className="p-5 rounded-2xl bg-[#181512] border border-[#3A3025] max-w-md mx-auto text-left space-y-3">
                <div className="flex justify-between items-center border-b border-[#29221D] pb-3">
                  <span className="text-xs text-[#8E8377] uppercase tracking-wider">Booking Ref:</span>
                  <span className="font-mono text-sm font-bold text-[#DFCA9F] bg-[#221B16] px-2 py-0.5 rounded border border-[#3E3326]">
                    {bookingCode}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-[#C6BBAE]">
                  <div className="flex justify-between">
                    <span className="text-[#8E8377]">Date & Time:</span>
                    <span className="font-semibold text-white">{bookingDate} • {selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8E8377]">Branch:</span>
                    <span className="font-semibold text-white">{currentBranch.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8E8377]">Client Mobile:</span>
                    <span className="font-semibold text-[#DFCA9F]">+91 {phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8E8377]">Direct Phone:</span>
                    <a href={`tel:${currentBranch.phone.replace(/\s+/g, '')}`} className="text-[#DFCA9F]">
                      {currentBranch.phone}
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8E8377]">Total Est.:</span>
                    <span className="font-semibold text-[#DFCA9F]">₹{finalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Confirm Button */}
              <div className="space-y-3 max-w-md mx-auto">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl text-xs uppercase font-bold tracking-widest text-[#141009] bg-[#34D399] hover:bg-[#2BB782] shadow-lg shadow-[#34D399]/20 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Send Confirmation to WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-xs uppercase tracking-wider font-semibold text-[#8E8377] hover:text-white transition-colors"
                >
                  Done & Return to Website
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls (steps 1-4) */}
        {step < 5 && (
          <div className="px-6 py-4 bg-[#191513] border-t border-[#231F1C] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#A89E93] hover:text-white border border-[#2E2721]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest text-[#141009] bg-gradient-to-r from-[#DFCA9F] to-[#C9A96E] hover:brightness-110 shadow"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                form="booking-form"
                className="inline-flex items-center gap-1.5 px-7 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest text-[#141009] bg-gradient-to-r from-[#DFCA9F] to-[#C9A96E] hover:brightness-110 shadow-lg shadow-[#C9A96E]/20"
              >
                <Check className="w-4 h-4" />
                <span>Confirm & Generate Voucher</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
