import { Order, InventoryItem, Courier, StockTransfer, ExceptionReport, StagingBay } from '../types';

export const INITIAL_COUERS: Courier[] = [
  {
    id: 'c1',
    name: 'SwiftPost Express',
    code: 'SWIFT',
    cutoffTime: '17:00',
    baseRate: 12.50,
    perKgRate: 2.10,
    estimatedDelivery: 'Same Day / Next Morning',
    reliability: 99,
    badgeText: 'Fastest Priority'
  },
  {
    id: 'c2',
    name: 'Metro Logistics',
    code: 'METRO',
    cutoffTime: '16:00',
    baseRate: 8.75,
    perKgRate: 1.50,
    estimatedDelivery: '1 - 2 Business Days',
    reliability: 95,
    badgeText: 'Best Value'
  },
  {
    id: 'c3',
    name: 'EcoFreight Ground',
    code: 'ECO',
    cutoffTime: '15:00',
    baseRate: 6.20,
    perKgRate: 0.90,
    estimatedDelivery: '2 - 4 Business Days',
    reliability: 92,
    badgeText: 'Economy & Eco'
  }
];

export const INITIAL_STAGING_BAYS: StagingBay[] = [
  {
    id: 'bay-1',
    name: 'Bay A (SwiftPost Priority)',
    courierId: 'c1',
    courierName: 'SwiftPost Express',
    capacity: 25,
    currentCount: 8,
    pickupTime: '17:30'
  },
  {
    id: 'bay-2',
    name: 'Bay B (Metro Standard)',
    courierId: 'c2',
    courierName: 'Metro Logistics',
    capacity: 40,
    currentCount: 19,
    pickupTime: '16:30'
  },
  {
    id: 'bay-3',
    name: 'Bay C (EcoFreight Bulk)',
    courierId: 'c3',
    courierName: 'EcoFreight Ground',
    capacity: 50,
    currentCount: 14,
    pickupTime: '15:30'
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-1',
    sku: 'TSHIRT-BLK-L',
    name: 'Organic Cotton Crewneck',
    category: 'Apparel',
    variant: { color: 'Matte Black', size: 'L' },
    locationMain: 'Aisle A - Shelf 2 - Bin 04',
    stockMain: 3,
    locationOverflow: 'Overflow Storage - Rack B - Box 11',
    stockOverflow: 45,
    reorderLevel: 10,
    price: 34.00,
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&q=80'
  },
  {
    id: 'inv-2',
    sku: 'TSHIRT-WHT-M',
    name: 'Organic Cotton Crewneck',
    category: 'Apparel',
    variant: { color: 'Crisp White', size: 'M' },
    locationMain: 'Aisle A - Shelf 2 - Bin 05',
    stockMain: 18,
    locationOverflow: 'Overflow Storage - Rack B - Box 12',
    stockOverflow: 60,
    reorderLevel: 15,
    price: 34.00,
    imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&q=80'
  },
  {
    id: 'inv-3',
    sku: 'HOODIE-NVY-XL',
    name: 'Heavyweight Fleece Hoodie',
    category: 'Apparel',
    variant: { color: 'Navy Blue', size: 'XL' },
    locationMain: 'Aisle B - Shelf 1 - Bin 02',
    stockMain: 0, // OUT OF STOCK IN MAIN WAREHOUSE!
    locationOverflow: 'Overflow Storage - Rack A - Box 04',
    stockOverflow: 22,
    reorderLevel: 5,
    price: 78.00,
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&q=80'
  },
  {
    id: 'inv-4',
    sku: 'BOTTL-SS-750',
    name: 'Insulated Stainless Flask 750ml',
    category: 'Accessories',
    variant: { color: 'Brushed Steel', size: '750ml' },
    locationMain: 'Aisle C - Shelf 4 - Bin 18',
    stockMain: 28,
    locationOverflow: 'Overflow Storage - Rack C - Box 01',
    stockOverflow: 80,
    reorderLevel: 20,
    price: 29.50,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&q=80'
  },
  {
    id: 'inv-5',
    sku: 'MUG-CER-MAT',
    name: 'Artisan Ceramic Coffee Mug',
    category: 'Homeware',
    variant: { color: 'Terracotta', size: '350ml' },
    locationMain: 'Aisle C - Shelf 2 - Bin 09',
    stockMain: 14,
    locationOverflow: 'Overflow Storage - Rack D - Box 08',
    stockOverflow: 30,
    reorderLevel: 10,
    price: 22.00,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&q=80'
  },
  {
    id: 'inv-6',
    sku: 'CAP-BASE-BLK',
    name: 'Minimalist Embroidered Cap',
    category: 'Accessories',
    variant: { color: 'Black', size: 'One Size' },
    locationMain: 'Aisle A - Shelf 4 - Bin 22',
    stockMain: 2,
    locationOverflow: 'Overflow Storage - Rack A - Box 09',
    stockOverflow: 50,
    reorderLevel: 10,
    price: 26.00,
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&q=80'
  }
];

const now = new Date();
const hoursFromNow = (h: number) => new Date(now.getTime() + h * 60 * 60 * 1000).toISOString();
const hoursAgo = (h: number) => new Date(now.getTime() - h * 60 * 60 * 1000).toISOString();

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'XYZ-9821',
    customerName: 'Sarah Jenkins',
    shippingAddress: '742 Evergreen Terrace, Springfield, OR',
    channel: 'Shopify',
    priority: 'same_day',
    status: 'received',
    createdAt: hoursAgo(1.5),
    slaDeadline: hoursFromNow(2.5), // Express 2.5 hours remaining!
    courierId: 'c1',
    courierName: 'SwiftPost Express',
    shippingCost: 12.50,
    totalAmount: 112.00,
    items: [
      {
        id: 'item-101-1',
        sku: 'TSHIRT-BLK-L',
        name: 'Organic Cotton Crewneck',
        variant: { color: 'Matte Black', size: 'L' },
        quantity: 2,
        location: { aisle: 'Aisle A', shelf: 'Shelf 2', bin: 'Bin 04' },
        imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&q=80',
        pickedQty: 0,
        verified: false
      },
      {
        id: 'item-101-2',
        sku: 'BOTTL-SS-750',
        name: 'Insulated Stainless Flask 750ml',
        variant: { color: 'Brushed Steel', size: '750ml' },
        quantity: 1,
        location: { aisle: 'Aisle C', shelf: 'Shelf 4', bin: 'Bin 18' },
        imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&q=80',
        pickedQty: 0,
        verified: false
      }
    ]
  },
  {
    id: 'ord-102',
    orderNumber: 'XYZ-9822',
    customerName: 'Michael Chang',
    shippingAddress: '1088 Howard St, San Francisco, CA',
    channel: 'Amazon',
    priority: 'same_day',
    status: 'picking',
    createdAt: hoursAgo(2.0),
    slaDeadline: hoursFromNow(1.0), // CRITICAL SLA!
    courierId: 'c1',
    courierName: 'SwiftPost Express',
    shippingCost: 12.50,
    totalAmount: 78.00,
    pickedBy: 'Marcus (WH)',
    items: [
      {
        id: 'item-102-1',
        sku: 'HOODIE-NVY-XL',
        name: 'Heavyweight Fleece Hoodie',
        variant: { color: 'Navy Blue', size: 'XL' },
        quantity: 1,
        location: { aisle: 'Aisle B', shelf: 'Shelf 1', bin: 'Bin 02' },
        imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&q=80',
        pickedQty: 0,
        verified: false
      }
    ]
  },
  {
    id: 'ord-103',
    orderNumber: 'XYZ-9823',
    customerName: 'Elena Rostova',
    shippingAddress: '450 W 33rd St, New York, NY',
    channel: 'Shopify',
    priority: 'standard',
    status: 'packed',
    createdAt: hoursAgo(4),
    slaDeadline: hoursFromNow(18),
    courierId: 'c2',
    courierName: 'Metro Logistics',
    shippingCost: 8.75,
    totalAmount: 56.00,
    stagingBay: 'Bay B (Metro Standard)',
    pickedBy: 'Marcus (WH)',
    packedBy: 'Dave (WH)',
    items: [
      {
        id: 'item-103-1',
        sku: 'TSHIRT-WHT-M',
        name: 'Organic Cotton Crewneck',
        variant: { color: 'Crisp White', size: 'M' },
        quantity: 1,
        location: { aisle: 'Aisle A', shelf: 'Shelf 2', bin: 'Bin 05' },
        imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&q=80',
        pickedQty: 1,
        verified: true
      },
      {
        id: 'item-103-2',
        sku: 'MUG-CER-MAT',
        name: 'Artisan Ceramic Coffee Mug',
        variant: { color: 'Terracotta', size: '350ml' },
        quantity: 1,
        location: { aisle: 'Aisle C', shelf: 'Shelf 2', bin: 'Bin 09' },
        imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&q=80',
        pickedQty: 1,
        verified: true
      }
    ]
  },
  {
    id: 'ord-104',
    orderNumber: 'XYZ-9824',
    customerName: 'David Miller',
    shippingAddress: '1200 Market St, Denver, CO',
    channel: 'WooCommerce',
    priority: 'standard',
    status: 'exception',
    createdAt: hoursAgo(5),
    slaDeadline: hoursFromNow(12),
    exceptionReason: 'Item missing on shelf Bin 02 (Navy Hoodie stock discrepancy)',
    exceptionType: 'missing_stock',
    totalAmount: 78.00,
    items: [
      {
        id: 'item-104-1',
        sku: 'HOODIE-NVY-XL',
        name: 'Heavyweight Fleece Hoodie',
        variant: { color: 'Navy Blue', size: 'XL' },
        quantity: 1,
        location: { aisle: 'Aisle B', shelf: 'Shelf 1', bin: 'Bin 02' },
        imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&q=80',
        pickedQty: 0,
        verified: false
      }
    ]
  },
  {
    id: 'ord-105',
    orderNumber: 'XYZ-9825',
    customerName: 'Amanda Hayes',
    shippingAddress: '88 Michigan Ave, Chicago, IL',
    channel: 'Shopify',
    priority: 'same_day',
    status: 'staged',
    createdAt: hoursAgo(3),
    slaDeadline: hoursFromNow(3),
    courierId: 'c1',
    courierName: 'SwiftPost Express',
    trackingNumber: 'TRK-SWIFT-99482',
    shippingCost: 12.50,
    stagingBay: 'Bay A (SwiftPost Priority)',
    totalAmount: 60.00,
    pickedBy: 'Marcus (WH)',
    packedBy: 'Dave (WH)',
    items: [
      {
        id: 'item-105-1',
        sku: 'CAP-BASE-BLK',
        name: 'Minimalist Embroidered Cap',
        variant: { color: 'Black', size: 'One Size' },
        quantity: 1,
        location: { aisle: 'Aisle A', shelf: 'Shelf 4', bin: 'Bin 22' },
        imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&q=80',
        pickedQty: 1,
        verified: true
      },
      {
        id: 'item-105-2',
        sku: 'TSHIRT-BLK-L',
        name: 'Organic Cotton Crewneck',
        variant: { color: 'Matte Black', size: 'L' },
        quantity: 1,
        location: { aisle: 'Aisle A', shelf: 'Shelf 2', bin: 'Bin 04' },
        imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&q=80',
        pickedQty: 1,
        verified: true
      }
    ]
  }
];

export const INITIAL_TRANSFERS: StockTransfer[] = [
  {
    id: 'trf-01',
    sku: 'HOODIE-NVY-XL',
    name: 'Heavyweight Fleece Hoodie (Navy XL)',
    quantity: 10,
    fromLocation: 'Overflow Storage (Rack A)',
    toLocation: 'Main Warehouse (Aisle B - Bin 02)',
    requestedBy: 'Office (Auto Low Stock Alert)',
    requestedAt: hoursAgo(1),
    status: 'in_transit'
  }
];

export const INITIAL_EXCEPTIONS: ExceptionReport[] = [
  {
    id: 'exp-01',
    orderId: 'ord-104',
    orderNumber: 'XYZ-9824',
    sku: 'HOODIE-NVY-XL',
    itemName: 'Heavyweight Fleece Hoodie',
    reportedBy: 'Marcus (Warehouse)',
    issueType: 'missing_stock',
    reportedAt: hoursAgo(2),
    status: 'open',
    notes: 'Bin 02 in Main Warehouse was empty. Spreadsheet recorded 2 units. Transfer requested from Overflow.'
  }
];
