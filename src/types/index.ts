export type OrderPriority = 'same_day' | 'standard';

export type OrderStatus = 
  | 'received' 
  | 'picking' 
  | 'packed' 
  | 'staged' 
  | 'shipped' 
  | 'exception';

export interface OrderItem {
  id: string;
  sku: string;
  name: string;
  variant: {
    color?: string;
    size?: string;
  };
  quantity: number;
  location: {
    aisle: string;
    shelf: string;
    bin: string;
  };
  imageUrl: string;
  pickedQty: number;
  verified: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  shippingAddress: string;
  channel: 'Shopify' | 'Amazon' | 'WooCommerce' | 'Manual';
  priority: OrderPriority;
  status: OrderStatus;
  createdAt: string; // ISO String
  slaDeadline: string; // ISO String
  courierId?: string;
  courierName?: string;
  trackingNumber?: string;
  shippingCost?: number;
  items: OrderItem[];
  totalAmount: number;
  stagingBay?: string;
  exceptionReason?: string;
  exceptionType?: 'missing_stock' | 'damaged_item' | 'address_issue' | 'courier_delay';
  pickedBy?: string;
  packedBy?: string;
  notes?: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  variant: {
    color?: string;
    size?: string;
  };
  locationMain: string; // e.g. "Aisle A - Shelf 2 - Bin 14"
  stockMain: number;
  locationOverflow: string; // e.g. "Overflow B - Bin 03"
  stockOverflow: number;
  reorderLevel: number;
  price: number;
  imageUrl: string;
}

export interface Courier {
  id: string;
  name: string;
  code: string;
  cutoffTime: string; // e.g., "16:00"
  baseRate: number;
  perKgRate: number;
  estimatedDelivery: string;
  reliability: number; // Percentage, e.g. 98
  badgeText?: string;
}

export interface StockTransfer {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  fromLocation: string;
  toLocation: string;
  requestedBy: string;
  requestedAt: string;
  status: 'pending' | 'in_transit' | 'completed';
}

export interface ExceptionReport {
  id: string;
  orderId: string;
  orderNumber: string;
  sku?: string;
  itemName?: string;
  reportedBy: string;
  issueType: 'missing_stock' | 'damaged' | 'wrong_variant' | 'missed_pickup' | 'other';
  reportedAt: string;
  status: 'open' | 'in_progress' | 'resolved';
  notes: string;
  resolution?: string;
}

export interface StagingBay {
  id: string;
  name: string;
  courierId?: string;
  courierName: string;
  capacity: number;
  currentCount: number;
  pickupTime: string;
}
