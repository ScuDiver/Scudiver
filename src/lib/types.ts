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

export interface Brand {
  slug: string;
  /** Display name, as it should appear in headings and metadata. */
  name: string;
  /**
   * Every value of `Product.brand` that belongs to this brand. The product
   * catalogue predates the brand pages and uses inconsistent casing, so the
   * mapping is listed explicitly rather than derived from the name.
   */
  productBrands: string[];
  /** Manufacturer logo, on transparent or white background. */
  logo: string;
  /** 16:9 catalogue photo — desktop brand hero and OpenGraph image. */
  imageWide: string;
  imageWideSm: string;
  /** 4:5 catalogue photo — brand cards and the mobile brand hero. */
  imagePortrait: string;
  imagePortraitSm: string;
  imageAlt: string;
  tagline: string;
  origin: string;
  founded?: string;
  /** One or two sentences, reused on cards and as the meta description base. */
  summary: string;
  /** Brand story, one string per paragraph. */
  description: string[];
  specialties: string[];
  categorySlugs: string[];
  /** Manufacturer colour, used for the accent rule on cards and the hero. */
  accent: string;
  featured?: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
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
