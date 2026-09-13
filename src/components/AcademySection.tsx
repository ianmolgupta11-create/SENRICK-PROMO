import React, { useState } from 'react';
import { GraduationCap, Award, BookOpen, Clock, Check, ArrowRight, MessageSquare, Phone, Send } from 'lucide-react';
import { ACADEMY_COURSES } from '../data/salonData';

export const AcademySection: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState(ACADEMY_COURSES[0].title);
  const [submitted, setSubmitted] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.startsWith('91') && val.length > 10) {
      val = val.slice(2);
    } else if (val.startsWith('0') && val.length > 10) {
      val = val.slice(1);
    }
    setInquiryPhone(val.slice(0, 10));
    if (phoneError) setPhoneError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim()) return;
    if (inquiryPhone.length !== 10) {
      setPhoneError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="academy" className="py-24 bg-[#110F0D] border-t border-[#26211D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-[#DFCA9F] text-xs font-semibold uppercase tracking-widest">
            <GraduationCap className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>Senrick Academy of Cosmetology & Artistry</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-[#F7F3EE]">
            Launch Your Career as a <span className="italic text-[#DFCA9F]">Master Stylist</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A89E93]">
            Located on the 2nd Floor, Betiahata, Gorakhpur. Our certified faculty equips students with real client salon experience, international product chemistry, and ISO-recognized professional certification.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {ACADEMY_COURSES.map((course) => (
            <div
              key={course.id}
              className="rounded-3xl overflow-hidden bg-[#161311] border border-[#2B241E] hover:border-[#C9A96E]/50 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161311] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-[#0D0B0A]/85 text-[#DFCA9F] border border-[#3A322C] text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#C9A96E]" />
                  <span>{course.duration}</span>
                </div>
                <div className="absolute top-3 right-3 bg-[#C9A96E] text-black text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  {course.level}
                </div>
              </div>

              {/* Course Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#F7F3EE] font-normal mb-2 leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#A89E93] leading-relaxed mb-4">
                    {course.description}
                  </p>

                  <div className="space-y-2 border-t border-[#231F1C] pt-3">
                    <div className="text-[11px] uppercase tracking-wider text-[#8A7E72] font-semibold">
                      Curriculum Highlights
                    </div>
                    {course.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#C6BBAE]">
                        <Check className="w-3.5 h-3.5 text-[#C9A96E] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#231F1C] space-y-3">
                  <div className="text-xs text-[#DFCA9F] flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#C9A96E] shrink-0" />
                    <span className="font-medium text-[11px]">{course.certification}</span>
                  </div>

                  <a
                    href={`https://wa.me/918574003784?text=Hello%20Senrick%20Academy,%20I%20am%20interested%20in%20enrolling%20for%20${encodeURIComponent(course.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold text-[#EDE7DF] bg-[#221D1A] hover:bg-[#2C2521] border border-[#3A322C] flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Download Syllabus / Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C9A96E]" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Admission Inquiry Box */}
        <div className="rounded-3xl bg-[#171411] border border-[#352D25] p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-[#C9A96E]">
                Admissions Open 2026 Batch
              </span>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#F7F3EE] font-normal">
                Visit the Academy Campus in Betiahata
              </h3>
              <p className="text-sm text-[#A89E93] leading-relaxed">
                Meet our faculty director, tour the practical demonstration suites, and get free career counseling on opening your own high-revenue beauty lounge.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2 text-xs text-[#C6BBAE]">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C9A96E]" />
                  <span>100% Placement Assistance</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#C9A96E]" />
                  <span>Complete Vanity Kit Included</span>
                </div>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="lg:col-span-6 bg-[#110F0D] border border-[#2B241E] rounded-2xl p-6">
              {submitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#C9A96E]/20 text-[#DFCA9F] flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif-luxury text-2xl text-white">Inquiry Received!</h4>
                  <p className="text-xs text-[#A89E93]">
                    Our Senior Counselor from the Betiahata Academy will call you shortly at <span className="text-[#DFCA9F] font-semibold">+91 {inquiryPhone}</span> with syllabus and fee details.
                  </p>
                  <a
                    href={`https://wa.me/918574003784?text=${encodeURIComponent(`Hi Senrick Academy! I am ${inquiryName.trim()} (+91 ${inquiryPhone}). I just submitted an inquiry for ${selectedCourse}. Please share syllabus and fee structure.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-[#DFCA9F] hover:underline pt-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Or Connect on WhatsApp Instantly</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#DFCA9F] mb-1">
                    Request Prospectus & Fee Structure
                  </div>
                  <div>
                    <label className="text-[11px] text-[#8E8377] uppercase tracking-wider block mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Kashyap"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg text-xs bg-[#191513] border border-[#2E2822] text-[#EDE7DF] placeholder-[#6E6357] focus:outline-none focus:border-[#C9A96E]"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] text-[#8E8377] uppercase tracking-wider block">
                        WhatsApp / Mobile Number *
                      </label>
                      <span className={`text-[10px] ${inquiryPhone.length === 10 ? 'text-[#34D399] font-medium' : 'text-[#8E8377]'}`}>
                        {inquiryPhone.length}/10 digits
                      </span>
                    </div>
                    <div className="flex rounded-lg border border-[#2E2822] focus-within:border-[#C9A96E] bg-[#191513] overflow-hidden transition-all">
                      <div className="flex items-center gap-1.5 px-3 bg-[#221C18] border-r border-[#2E2822] text-xs font-semibold text-[#DFCA9F] select-none shrink-0">
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
                        value={inquiryPhone}
                        onChange={handlePhoneChange}
                        className="w-full px-3 py-2.5 text-xs bg-transparent text-[#EDE7DF] placeholder-[#6E6357] focus:outline-none"
                      />
                    </div>
                    {phoneError && (
                      <p className="text-[10px] text-[#E07A5F] mt-1">{phoneError}</p>
                    )}
                    {inquiryPhone.length > 0 && inquiryPhone.length < 10 && !phoneError && (
                      <p className="text-[10px] text-[#DFCA9F] mt-1">
                        Enter 10-digit mobile number ({10 - inquiryPhone.length} more needed)
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-[11px] text-[#8E8377] uppercase tracking-wider block mb-1">
                      Preferred Course
                    </label>
                    <select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg text-xs bg-[#191513] border border-[#2E2822] text-[#EDE7DF] focus:outline-none focus:border-[#C9A96E]"
                    >
                      {ACADEMY_COURSES.map((c) => (
                        <option key={c.id} value={c.title} className="bg-[#191513] text-[#EDE7DF]">
                          {c.title} ({c.duration})
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-widest text-[#141009] bg-gradient-to-r from-[#DFCA9F] to-[#C9A96E] hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Academy Application</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
