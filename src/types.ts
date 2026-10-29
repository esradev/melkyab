export type DealType = 'buy' | 'rent';

export type PropertyType = 'apartment' | 'villa' | 'penthouse' | 'office' | 'commercial';

export interface Property {
  id: string;
  title: string;
  slug: string;
  dealType: DealType;
  propertyType: PropertyType;
  price: {
    totalPrice?: number; // Toman (for buy)
    pricePerMeter?: number; // Toman
    mortgage?: number; // ودیعه (for rent)
    rent?: number; // اجاره ماهیانه (for rent)
    isConvertible?: boolean; // قابل تبدیل
  };
  area: number; // متر مربع
  bedrooms: number;
  floor: number;
  totalFloors: number;
  unitsPerFloor?: number;
  yearBuilt: number; // سال ساخت هجری شمسی (مثلا ۱۴۰۱)
  city: string;
  neighborhood: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  images: string[];
  amenities: string[];
  description: string;
  isFeatured?: boolean;
  isUrgent?: boolean;
  documentType: 'سند تک‌برگ' | 'سند منگوله‌دار' | 'وکالتی' | 'قولنامه‌ای' | 'سرقفلی';
  consultantId: string;
  createdAt: string;
  viewsCount: number;
  savesCount: number;
}

export interface Consultant {
  id: string;
  name: string;
  agencyName: string;
  avatar: string;
  phone: string;
  licenseCode: string; // شماره پروانه تخصصی کسب
  rating: number; // میانگین کل
  reviewCount: number;
  verifiedBadge: boolean;
  experienceYears: number;
  activeListingsCount: number;
  specialtyAreas: string[];
  bio: string;
}

export interface Review {
  id: string;
  consultantId: string;
  authorName: string;
  authorPhoneMasked: string; // ۰۹۱۲***۴۵۶۷
  date: string;
  ratingCategories: {
    knowledge: number; // اطلاعات منطقه
    punctuality: number; // وقت‌شناسی و پیگیری
    negotiation: number; // قدرت چانه‌زنی و قیمت
    honesty: number; // صداقت و شفافیت
  };
  overallRating: number;
  comment: string;
  verifiedDeal: boolean; // معامله تایید شده
  helpfulCount: number;
}

export interface BookingVisit {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  consultantId: string;
  consultantName: string;
  applicantName: string;
  applicantPhone: string;
  date: string;
  timeSlot: string; // e.g. "۱۶:۰۰ الی ۱۸:۰۰"
  visitType: 'in_person' | 'video_call';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderType: 'buyer' | 'consultant';
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyPrice: string;
  propertyImage: string;
  participantUser: {
    id: string;
    name: string;
    phone: string;
  };
  consultant: {
    id: string;
    name: string;
    agency: string;
    avatar: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface ViolationReport {
  id: string;
  propertyId?: string;
  consultantId?: string;
  targetTitle: string;
  reasonCategory: string;
  description: string;
  reporterPhone: string;
  trackingCode: string;
  status: 'submitted' | 'under_review' | 'resolved';
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  role: 'user' | 'consultant';
  agencyName?: string;
  licenseCode?: string;
  avatar?: string;
  isVerified: boolean;
  savedPropertyIds: string[];
}

export interface SearchFilters {
  dealType: 'all' | DealType;
  propertyType: 'all' | PropertyType;
  city: string;
  neighborhood: string;
  minPrice: number;
  maxPrice: number;
  minMortgage: number;
  maxMortgage: number;
  minRent: number;
  maxRent: number;
  minArea: number;
  maxArea: number;
  bedrooms: number | 'all';
  amenities: string[];
  sort: 'newest' | 'cheapest' | 'expensive' | 'largest';
  hasImagesOnly?: boolean;
  urgentOnly?: boolean;
}
