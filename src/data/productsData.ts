import { ProductItem } from '../types';

export interface GorakhpurAreaInfo {
  name: string;
  pincode: string;
  estTime: string;
}

export const GORAKHPUR_AREA_DETAILS: GorakhpurAreaInfo[] = [
  { name: 'Betiahata', pincode: '273001', estTime: '1-2 Hours (Main Hub)' },
  { name: 'Golghar', pincode: '273001', estTime: '1-2 Hours (Flagship Hub)' },
  { name: 'Civil Lines & Park Road', pincode: '273001', estTime: '2 Hours' },
  { name: 'Bank Road', pincode: '273001', estTime: '2 Hours' },
  { name: 'Alinagar & Urdu Bazar', pincode: '273001', estTime: '2-3 Hours' },
  { name: 'Gorakhnath', pincode: '273002', estTime: '2-3 Hours' },
  { name: 'Basharatpur', pincode: '273003', estTime: '2-3 Hours' },
  { name: 'Shahpur / Geeta Vatika', pincode: '273004', estTime: '2-3 Hours' },
  { name: 'Arogya Mandir', pincode: '273005', estTime: '2-3 Hours' },
  { name: 'Bichhia', pincode: '273006', estTime: '2-3 Hours' },
  { name: 'Asuran Chowk', pincode: '273006', estTime: '2-3 Hours' },
  { name: 'Fertilizer Township', pincode: '273007', estTime: '3 Hours' },
  { name: 'Mohaddipur', pincode: '273008', estTime: '2 Hours' },
  { name: 'Kunraghat', pincode: '273009', estTime: '2-3 Hours' },
  { name: 'Khorabar & Deoria Road', pincode: '273010', estTime: '3 Hours' },
  { name: 'Railway Colony & Station Area', pincode: '273012', estTime: '2 Hours' },
  { name: 'Medical College Road', pincode: '273013', estTime: '2-3 Hours' },
  { name: 'Rustampur', pincode: '273014', estTime: '2 Hours' },
  { name: 'Taramandal', pincode: '273014', estTime: '2 Hours' },
  { name: 'Padri Bazar', pincode: '273014', estTime: '2-3 Hours' },
  { name: 'Rapti Nagar (Phase 1-4)', pincode: '273015', estTime: '2-3 Hours' },
  { name: 'Daudpur', pincode: '273016', estTime: '2 Hours' },
  { name: 'Surajkund', pincode: '273016', estTime: '2-3 Hours' },
  { name: 'GIDA & Sahjanwa', pincode: '273017', estTime: 'Same-Day Express' },
  { name: 'Pipraich Road', pincode: '273209', estTime: 'Same-Day Delivery' },
  { name: 'Bhathat Road', pincode: '273212', estTime: 'Same-Day Delivery' },
];

export const GORAKHPUR_AREAS: string[] = GORAKHPUR_AREA_DETAILS.map((a) => a.name);

export const GORAKHPUR_PINCODES: string[] = [
  '273001', // Gorakhpur Main, Golghar, Betiahata, Bank Road, Civil Lines, Park Road, Alinagar
  '273002', // Gorakhnath
  '273003', // Basharatpur
  '273004', // Shahpur, Geeta Vatika
  '273005', // Arogya Mandir
  '273006', // Bichhia, Asuran Chowk
  '273007', // Fertilizer Factory / Township
  '273008', // Mohaddipur, Kasia Road
  '273009', // Kunraghat
  '273010', // Khorabar, Deoria Road
  '273011', // Gorakhpur City
  '273012', // Railway Colony, Railway Station
  '273013', // BRD Medical College, Medical College Road
  '273014', // Rustampur, Taramandal, Padri Bazar
  '273015', // Rapti Nagar (Phase 1-4)
  '273016', // Daudpur, Surajkund
  '273017', // GIDA & Sahjanwa
  '273152', // Sahjanwa Town
  '273209', // Pipraich
  '273212', // Bhathat
];

export const getAreaByPincode = (pincode: string): GorakhpurAreaInfo | undefined => {
  return GORAKHPUR_AREA_DETAILS.find((item) => item.pincode === pincode.trim());
};

export const getPincodeByArea = (areaName: string): string => {
  const match = GORAKHPUR_AREA_DETAILS.find((item) => item.name.toLowerCase() === areaName.toLowerCase());
  return match ? match.pincode : '273001';
};

export const isGorakhpurPincodeDeliverable = (pincode: string): boolean => {
  const clean = pincode.trim();
  if (GORAKHPUR_PINCODES.includes(clean)) return true;
  // Also deliverable across all Gorakhpur district pin codes (starts with 273 and 6 digits)
  if (/^273\d{3}$/.test(clean)) return true;
  return false;
};

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'Serie Expert Absolut Repair Gold Quinoa Shampoo + Mask Combo',
    brand: "L'Oréal Professionnel",
    category: 'combos',
    marketPrice: 2150,
    salonPrice: 1699,
    size: '300 ml + 250 ml',
    rating: 4.9,
    reviewsCount: 142,
    badge: 'Mega Saver Combo',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80',
    description: 'Instant resurfacing shampoo & creamy golden mask powered by Wheat Protein and Gold Quinoa. Deeply repairs damaged, chemically treated, or colored hair.',
    benefits: [
      '77% less fiber surface damage after 5 washes',
      '7x shinier hair with zero residue weight',
      'Essential salon aftercare for Botoplex & Nanoplastia',
      '100% Sealed salon distributor pack'
    ],
    salonTip: 'Use the mask twice a week in place of conditioner, leaving it for 4 minutes wrapped in a warm damp towel for salon-level smoothness.',
    howToUse: 'Apply shampoo to wet scalp, lather, rinse thoroughly. Follow with Absolut Repair mask on mid-lengths and ends.',
    inStock: true,
  },
  {
    id: 'prod-2',
    name: 'No. 3 Hair Perfector Bond Repair Treatment',
    brand: 'Olaplex',
    category: 'haircare',
    marketPrice: 3200,
    salonPrice: 2490,
    size: '100 ml',
    rating: 4.9,
    reviewsCount: 98,
    badge: 'Salon Bestseller',
    image: 'https://images.unsplash.com/photo-1608248597359-00977a417539?auto=format&fit=crop&w=800&q=80',
    description: 'The world-famous pre-shampoo treatment that relinks broken disulfide bonds caused by heat, bleach, and pollution. Restores hair structure from the core.',
    benefits: [
      'Rebuilds damaged chemical and thermal bonds',
      'Reduces breakage and visibly strengthens hair shaft',
      'Safe for all bleached, colored, and straightened hair',
      'Direct salon batch with tamper-proof seal'
    ],
    salonTip: 'Dampen hair, apply liberally from roots to ends, and leave on for at least 20 minutes before normal shampooing.',
    howToUse: 'Apply to damp, towel-dried hair prior to shampooing. Comb through and leave on for 15-30 minutes. Rinse, then shampoo & condition.',
    inStock: true,
  },
  {
    id: 'prod-3',
    name: 'Moroccanoil Treatment Original with Argan Oil',
    brand: 'Moroccanoil',
    category: 'serums',
    marketPrice: 3420,
    salonPrice: 2690,
    size: '100 ml with Pump',
    rating: 5.0,
    reviewsCount: 167,
    badge: 'Luxury Stylist Pick',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80',
    description: 'Infused with antioxidant-rich Argan oil and shine-boosting vitamins. Detangles, speeds up blow-drying time, and boosts shine by up to 118%.',
    benefits: [
      'Controls frizz and humidity-induced flyaways in Gorakhpur weather',
      'Velvety, non-greasy fast absorption',
      'Protects against heat up to 230°C',
      'Signature luxury Mediterranean amber fragrance'
    ],
    salonTip: 'Rub 1-2 pumps between palms and rake through towel-dried damp hair before blow-drying, or smooth over dry ends for instant gloss.',
    howToUse: 'Dispense 1-2 pumps on towel-dried hair from mid-lengths to ends. Blow-dry or let dry naturally.',
    inStock: true,
  },
  {
    id: 'prod-4',
    name: 'Professional Bridal Facial Kit (Meladerm & Glow Booster)',
    brand: 'O3+ Professional',
    category: 'skincare',
    marketPrice: 3850,
    salonPrice: 2899,
    size: 'Single Multi-Step Kit',
    rating: 4.8,
    reviewsCount: 114,
    badge: 'Bridal Must-Have',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    description: 'The exact professional bridal glow kit used in Senrick bridal suites. Clarifies uneven pigmentation, removes stubborn sun-tan, and delivers a glass-skin bridal radiance.',
    benefits: [
      'Targets dark spots, pigmentation and hyper-melanin patches',
      'Infused with Glycolic & Vitamin C active derma complexes',
      'Includes specialized Peel-Off rubberizing mask',
      'Equivalent to an expensive salon sitting in the comfort of home'
    ],
    salonTip: 'Perform this facial 3-4 days prior to any wedding or festive function for peak photogenic radiance.',
    howToUse: 'Follow steps 1 through 7 labeled on each sachet inside: Cleanser -> Scrub -> Massage Cream -> Serum -> Peel-Off Rubber Mask -> Whitening Cream.',
    inStock: true,
  },
  {
    id: 'prod-5',
    name: 'Nutritive Bain Satin & Masquintense Hair Bath Regime',
    brand: 'Kérastase Paris',
    category: 'haircare',
    marketPrice: 5600,
    salonPrice: 4299,
    size: '250 ml + 200 ml',
    rating: 4.9,
    reviewsCount: 84,
    badge: 'Ultra Prestige',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Exceptional French nutrition for dry, sensitized hair. Formulated with Plant-Based Proteins and Niacinamide to deeply nourish from root to tip.',
    benefits: [
      '+58% immediate deep hydration and moisture lock',
      '+85% nutrition replenishment without heaviness',
      'Silky touch and radiant French fragrance trail',
      'Guaranteed authentic barcode verified stock'
    ],
    salonTip: 'Emulsify shampoo thoroughly between palms before applying directly onto scalp. Follow with Masquintense for ultimate touchable softness.',
    howToUse: 'Wet hair thoroughly, massage shampoo into scalp and lengths, rinse. Apply masque to mid-lengths, leave for 5-10 minutes and rinse cleanly.',
    inStock: true,
  },
  {
    id: 'prod-6',
    name: 'X-Tenso Care Pro-Keratin Anti-Dryness Hair Serum',
    brand: "L'Oréal Professionnel",
    category: 'serums',
    marketPrice: 850,
    salonPrice: 650,
    size: '50 ml',
    rating: 4.8,
    reviewsCount: 210,
    badge: 'Pocket Favorite',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    description: 'Specifically engineered for straightened, relaxed, and rebonded hair. Blended with Pro-Keratin and Incell technology to preserve sleek mirror finish.',
    benefits: [
      'Preserves chemical straightening and keratin results up to 3x longer',
      'Anti-frizz moisture barrier in humid weather',
      'Featherlight non-sticky texture',
      'Best everyday daily serum for Gorakhpur college & working women'
    ],
    salonTip: 'Apply 2 drops on damp hair before combing out tangles. Keeps hair straight and prevents frizz all day.',
    howToUse: 'Pump small quantity onto palm, distribute evenly through mid-lengths and ends of dry or damp hair.',
    inStock: true,
  },
  {
    id: 'prod-7',
    name: 'Gentlemen’s Royal Beard & Hair Styling Grooming Vault',
    brand: 'Senrick Barber Lounge Exclusive',
    category: 'mens',
    marketPrice: 1950,
    salonPrice: 1390,
    size: '3-Piece Set (Wash, Oil, Wax)',
    rating: 4.9,
    reviewsCount: 76,
    badge: "Men's Top Seller",
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    description: 'Complete male grooming trio: Cedarwood & Tea Tree Beard Wash (100ml), Argan Beard Growth & Sheen Elixir (50ml), and Matte Texture Clay Wax (80g).',
    benefits: [
      'Tames coarse beard bristles and stops skin itchiness underneath',
      'Strong all-day matte hairstyle hold with zero dandruff flakes',
      'Enriched with Rosemary and Biotin active growth stimulants',
      'Masculine smoky oud and bergamot aroma'
    ],
    salonTip: 'Warm the matte clay between fingers until transparent before working into dry hair for effortless modern pompadours and fades.',
    howToUse: 'Cleanse beard with wash, apply 3 drops of oil down to the roots, and shape hair with a dime-sized amount of matte clay.',
    inStock: true,
  },
  {
    id: 'prod-8',
    name: 'Bonacure Peptide Repair Rescue Sealed Ends Treatment',
    brand: 'Schwarzkopf Professional',
    category: 'haircare',
    marketPrice: 1250,
    salonPrice: 950,
    size: '100 ml',
    rating: 4.7,
    reviewsCount: 89,
    badge: 'Split Ends Eraser',
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80',
    description: 'An intensive leave-in cream serum that seals up to 90% of split ends while preventing future hair breakage and heat damage.',
    benefits: [
      'Seals split ends immediately without needing a scissor trim',
      'Cell Equalizer technology rebuilds keratin hair cortex',
      'Heat protection up to 210°C during daily ironing',
      'Smooths dry, crunchy ends'
    ],
    salonTip: 'Focus strictly on the bottom 2 inches of hair where friction and split ends occur.',
    howToUse: 'Work a small drop gently into towel-dried ends. Do not rinse out.',
    inStock: true,
  },
  {
    id: 'prod-9',
    name: 'Derma Glow 2% Salicylic + Glycolic Acid Clarifying Toner',
    brand: 'The Derma Co Professional',
    category: 'skincare',
    marketPrice: 699,
    salonPrice: 499,
    size: '150 ml',
    rating: 4.8,
    reviewsCount: 132,
    badge: 'Acne & Pore Hero',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    description: 'Micro-exfoliating derma tonic that melts blackheads, minimizes enlarged open pores, and controls oil production in Gorakhpur heat.',
    benefits: [
      'Unclogs stubborn sebum and reduces active acne within 7 days',
      'Gentle chemical exfoliation for smooth makeup application',
      'Alcohol-free, fragrance-free, dermatologically tested',
      'Ideal for humid summer skin'
    ],
    salonTip: 'Use at night on a cotton pad 3-4 times a week, followed by a light hydrating moisturizer.',
    howToUse: 'Pour onto a cotton pad and sweep across cleansed face and neck, avoiding the immediate eye area.',
    inStock: true,
  },
  {
    id: 'prod-10',
    name: 'Mythic Oil Original Nourishing Hair Oil with Avocado',
    brand: "L'Oréal Professionnel",
    category: 'serums',
    marketPrice: 1550,
    salonPrice: 1199,
    size: '100 ml',
    rating: 4.9,
    reviewsCount: 104,
    badge: 'Weightless Gloss',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    description: 'Enriched with natural Argan and Cranberry oils. Provides 48-hour anti-humidity protection while imparting ethereal suppleness and glow.',
    benefits: [
      'Ultra-fine spray pump for featherlight misting',
      'Never weighs down fine or low-density Indian hair',
      'Instant mirror-like glaze finish',
      'Protects hair color vibrancy'
    ],
    salonTip: 'Can be mixed with your hair mask for an elevated deep-conditioning home spa ritual.',
    howToUse: 'Warm 1-2 pumps in palms and distribute evenly through towel-dried or dry lengths.',
    inStock: true,
  },
  {
    id: 'prod-11',
    name: 'D-Tan Professional Radiance Cream Pack',
    brand: 'O3+ Professional',
    category: 'skincare',
    marketPrice: 1650,
    salonPrice: 1250,
    size: '300 g Mega Salon Tub',
    rating: 4.9,
    reviewsCount: 175,
    badge: 'Gorakhpur Summer Favorite',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    description: 'Formulated with Mint and Eucalyptus leaf extracts. Instant tan removal solution that brightens sun-damaged skin without stripping natural barrier oils.',
    benefits: [
      'Instantly removes two-wheeler sun tan and pollution darkening',
      'Cooling mint sensation calms inflamed skin',
      'Safe for face, arms, neck, and back',
      'Up to 15-20 full-face home applications'
    ],
    salonTip: 'Apply a thick even layer after sun exposure, leave for 12 minutes, and wipe off with a cold damp cloth.',
    howToUse: 'Cleanse skin, apply an even layer avoiding eyes. Leave on for 10-12 minutes. Emulsify with water and wipe gently.',
    inStock: true,
  },
  {
    id: 'prod-12',
    name: 'The Ultimate Bridal Glow & Hair Restoration Hamper',
    brand: 'Senrick Couture Collection',
    category: 'combos',
    marketPrice: 8900,
    salonPrice: 6490,
    size: '5 Premium Products + Luxury Velvet Pouch',
    rating: 5.0,
    reviewsCount: 63,
    badge: 'Mega Bridal Gift Box',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    description: 'All-inclusive pre-wedding trousseau kit: O3+ Bridal Glow Kit, Olaplex No. 3, Moroccanoil 25ml, Satin Silk Pillowcase, and Senrick VIP Gold Salon Card (worth ₹1000).',
    benefits: [
      'Save over ₹2,400 compared to individual e-commerce purchases',
      'Packed in handcrafted Senrick luxury magnetic gold-foil gift box',
      'Includes complimentary 30-min personalized stylist consultation call',
      'Guaranteed same-day priority VIP delivery in Gorakhpur'
    ],
    salonTip: 'The ultimate gift for upcoming brides, bridesmaids, or anniversary celebrations.',
    howToUse: 'Includes step-by-step personalized 14-day bridal preparation calendar inside the box.',
    inStock: true,
  }
];
