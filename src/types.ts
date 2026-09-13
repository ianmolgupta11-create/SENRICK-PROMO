export interface Branch {
  id: string;
  name: string;
  tagline: string;
  address: string;
  landmark: string;
  phone: string;
  whatsapp: string;
  hours: string;
  mapQuery: string;
  image: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: 'hair' | 'bridal' | 'skin' | 'men' | 'nails' | 'spa';
  description: string;
  price: string;
  priceNum: number;
  duration: string;
  popular?: boolean;
  image: string;
  benefits: string[];
  recommendedFor?: string;
}

export interface BridalPackage {
  id: string;
  title: string;
  tier: 'Gold' | 'Diamond' | 'Royal Senrick Signature';
  price: string;
  priceNum: number;
  description: string;
  features: string[];
  popular?: boolean;
  image: string;
}

export interface AcademyCourse {
  id: string;
  title: string;
  duration: string;
  level: 'Beginner' | 'Advanced' | 'Masterclass';
  description: string;
  highlights: string[];
  certification: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
  branch: string;
  avatar: string;
}

export interface TransformationItem {
  id: string;
  title: string;
  category: string;
  beforeImg: string;
  afterImg: string;
  description: string;
  treatment: string;
}

export interface BookingState {
  branchId: string;
  serviceIds: string[];
  date: string;
  time: string;
  fullName: string;
  phone: string;
  email?: string;
  notes?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  brand: string;
  category: 'haircare' | 'skincare' | 'serums' | 'styling' | 'mens' | 'combos';
  marketPrice: number; // MRP / Typical E-commerce price (Nykaa / Amazon)
  salonPrice: number;  // Senrick exclusive discounted price
  size: string;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  description: string;
  benefits: string[];
  salonTip: string;
  howToUse: string;
  inStock: boolean;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface GorakhpurOrder {
  orderId: string;
  items: CartItem[];
  customerName: string;
  phone: string;
  address: string;
  landmark: string;
  area: string;
  pincode: string;
  deliverySlot: string;
  paymentMethod: 'cod' | 'upi_delivery' | 'whatsapp';
  totalAmount: number;
  totalSavings: number;
  createdAt: string;
}
