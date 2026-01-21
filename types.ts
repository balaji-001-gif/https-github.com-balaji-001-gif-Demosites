export interface DemoSite {
  id: string;
  name: string;
  subdomain: string;
  url: string;
  category: DemoCategory;
  description: string;
  imageUrl: string;
}

export enum DemoCategory {
  ALL = 'All',
  POS = 'Point of Sale',
  FINANCE = 'Finance & Legal',
  MANAGEMENT = 'Management & LMS',
  OTHER = 'Other',
}

export interface AIInsightResponse {
  summary: string;
  features: string[];
}