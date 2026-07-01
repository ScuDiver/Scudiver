export interface Product {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  brand: string;
  sku: string;
  description: string;
  specs: Record<string, string>;
  cpvCode: string;
  cpvDescription: string;
  priceIndicative?: number;
  imageAlt: string;
  image?: string;
  featured?: boolean;
  tags?: string[];
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  cpvCode: string;
  cpvDescription: string;
  icon: string;
  image?: string;
  productCount?: number;
}

export interface QuoteRequest {
  company: string;
  contactName: string;
  email: string;
  phone: string;
  products: string;
  message: string;
  gdprConsent: boolean;
}

export interface ComplaintRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  gdprConsent: boolean;
}
