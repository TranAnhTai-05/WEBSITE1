export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  isActive?: boolean;
}

export interface PlatformItem {
  id: string;
  name: string;
  description: string;
  logoType: string;
  bestFor: string;
  popularity: number; // 1-5 scale
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface StrengthItem {
  id: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  details: string[];
}

export interface PriceTier {
  id: string;
  name: string;
  price: string;
  badge?: string;
  description: string;
  features: string[];
  isPopular: boolean;
  deliveryTime: string;
  isActive?: boolean;
}

export interface TemplateItem {
  id: string;
  title: string;
  category: "all" | "enterprise" | "ecommerce" | "landing" | "personal" | "booking";
  categoryLabel: string;
  platform: string;
  features: string[];
  imageUrl: string;
  liveUrl?: string;
  isActive?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactSubmission {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  needs: string;
  notes?: string;
  createdAt: string;
  status: "pending" | "contacted" | "consulting" | "completed" | "unsuitable";
  adminNotes?: string;
}

export interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  servicesTitle: string;
  benefitsTitle: string;
  processTitle: string;
  pricingTitle: string;
  faqTitle: string;
  footerCtaTitle: string;
}

export interface ContactSettings {
  brandName: string;
  hotline: string;
  zalo: string;
  email: string;
  address: string;
  facebook: string;
  fanpage: string;
  tiktok: string;
  googleMaps: string;
  footerText: string;
}
