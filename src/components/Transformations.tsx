import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeftRight, CheckCircle } from 'lucide-react';
import { TRANSFORMATIONS } from '../data/salonData';

export const Transformations: React.FC = () => {
  const [activeId, setActiveId] = useState(TRANSFORMATIONS[0].id);
  const [viewMode, setViewMode] = useState<'split' | 'before' | 'after'>('split');

  const currentItem = TRANSFORMATIONS.find((t) => t.id === activeId) || TRANSFORMATIONS[0];

  return (
    <section id="transformations" className="py-24 bg-[#0D0B0A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/20 text-[#DFCA9F] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>Real Client Transformations</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-[#F7F3EE]">
            The Senrick <span className="italic text-[#DFCA9F]">Metamorphosis</span>
          </h2>
          <p className="text-sm sm:text-base text-[#AEA396]">
            Witness the artistry of our senior styling team and master cosmetologists across bridal transformations, restorative hair therapies, and tailored precision grooming.
          </p>
        </div>

        {/* Category selector pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {TRANSFORMATIONS.map((t) => {
            const isSelected = activeId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-all ${
                  isSelected
                    ? 'bg-[#C9A96E] text-black font-semibold shadow-lg shadow-[#C9A96E]/20'
                    : 'bg-[#181513] text-[#A69C90] border border-[#28221D] hover:border-[#3E352E] hover:text-white'
                }`}
              >
                <span>{t.category}</span>
              </button>
            );
          })}
        </div>

        {/* Main Transformation Showcase Card */}
        <div className="rounded-3xl bg-[#141210] border border-[#2B2520] p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Comparison Area */}
            <div className="lg:col-span-7 space-y-4">
              {/* Toggle switch for Before/After view */}
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs uppercase font-semibold tracking-wider text-[#8A7E72]">
                  Interactive View
                </span>
                <div className="flex items-center gap-1 bg-[#1F1A16] p-1 rounded-lg border border-[#2E2823] text-xs">
                  <button
                    onClick={() => setViewMode('split')}
                    className={`px-3 py-1 rounded-md transition-all ${
                      viewMode === 'split' ? 'bg-[#C9A96E] text-black font-semibold' : 'text-[#A69C90]'
                    }`}
                  >
                    Side-by-Side
                  </button>
                  <button
                    onClick={() => setViewMode('before')}
                    className={`px-3 py-1 rounded-md transition-all ${
                      viewMode === 'before' ? 'bg-[#C9A96E] text-black font-semibold' : 'text-[#A69C90]'
                    }`}
                  >
                    Before
                  </button>
                  <button
                    onClick={() => setViewMode('after')}
                    className={`px-3 py-1 rounded-md transition-all ${
                      viewMode === 'after' ? 'bg-[#C9A96E] text-black font-semibold' : 'text-[#A69C90]'
                    }`}
                  >
                    After
                  </button>
                </div>
              </div>

              {/* Photos container */}
              <div className="relative rounded-2xl overflow-hidden bg-[#1D1916] border border-[#332A23]">
                {viewMode === 'split' && (
                  <div className="grid grid-cols-2 divide-x divide-[#332A23] h-[340px] sm:h-[420px]">
                    <div className="relative h-full overflow-hidden">
                      <img
                        src={currentItem.beforeImg}
                        alt="Before treatment"
                        className="w-full h-full object-cover grayscale-[30%] brightness-90"
                      />
                      <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-[#A89E93] text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded">
                        Before
                      </div>
                    </div>
                    <div className="relative h-full overflow-hidden">
                      <img
                        src={currentItem.afterImg}
                        alt="After treatment"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-[#C9A96E] text-black text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded shadow">
                        After Senrick
                      </div>
                    </div>
                  </div>
                )}

                {viewMode === 'before' && (
                  <div className="relative h-[340px] sm:h-[420px]">
                    <img
                      src={currentItem.beforeImg}
                      alt="Before"
                      className="w-full h-full object-cover grayscale-[30%]"
                    />
                    <div className="absolute top-4 left-4 bg-black/80 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">
                      Initial Condition
                    </div>
                  </div>
                )}

                {viewMode === 'after' && (
                  <div className="relative h-[340px] sm:h-[420px]">
                    <img
                      src={currentItem.afterImg}
                      alt="After"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-[#C9A96E] text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded shadow">
                      Result Post-Artistry
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Information Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest font-bold text-[#C9A96E]">
                  Case Study • {currentItem.category}
                </span>
                <h3 className="font-serif-luxury text-3xl font-normal text-[#F7F3EE]">
                  {currentItem.title}
                </h3>
                <p className="text-sm text-[#A89E93] leading-relaxed">
                  {currentItem.description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#191513] border border-[#2C2520] space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-[#8A7E72] font-semibold">
                  Applied Treatment
                </div>
                <div className="text-base text-[#EDE7DF] font-serif-luxury font-medium">
                  {currentItem.treatment}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#DFCA9F] pt-1">
                  <CheckCircle className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span>100% Customized Formulation for Client</span>
                </div>
              </div>

              <div className="text-xs text-[#8A7E72] leading-relaxed">
                *Photographs captured inside our Betiahata & Golghar suites under standard studio lighting without artificial skin filtering.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
