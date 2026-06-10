export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
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
  needs: string;
  notes?: string;
  createdAt: string;
  status: "pending" | "contacted" | "completed";
}
