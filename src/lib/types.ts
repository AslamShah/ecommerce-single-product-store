export interface Product {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  images?: string[];
  image?: string;
  category?: string;
  features?: string[];
  sku?: string;
  isActive?: boolean;
}

export interface Order {
  _id?: string;
  id?: string;
  orderNumber?: string;
  status: string;
  total: number;
  customer?: { name: string; email: string };
  items?: Array<{ name: string; quantity: number; price: number }>;
  shipping?: { street: string; city: string; state: string; zipCode: string; country: string };
  createdAt?: string;
}

export interface Settings {
  stripePublicKey?: string;
  stripeSecretKey?: string;
  storeName?: string;
  storeEmail?: string;
}

export interface User {
  email: string;
  name: string;
  role: string;
}