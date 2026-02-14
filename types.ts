export interface ProductSize {
  label: string;
  price: number;
  weightKg: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  notes: string[];
  sizes: ProductSize[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: ProductSize;
  cartItemId: string; // Unique identifier (id + size)
}

export interface ShippingZone {
  id: string;
  name: string;
  baseRate: number;
  ratePerKg: number;
  estimatedDays: string;
}

export interface ShippingRate {
  id: string;
  carrier: string;
  serviceName: string;
  price: number;
  currency: string;
  estimatedDelivery: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}