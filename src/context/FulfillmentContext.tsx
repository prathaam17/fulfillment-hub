import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Order, 
  InventoryItem, 
  Courier, 
  StockTransfer, 
  ExceptionReport, 
  StagingBay, 
  OrderStatus 
} from '../types';
import { 
  INITIAL_ORDERS, 
  INITIAL_INVENTORY, 
  INITIAL_COUERS, 
  INITIAL_STAGING_BAYS, 
  INITIAL_TRANSFERS, 
  INITIAL_EXCEPTIONS 
} from '../data/mockData';

interface FulfillmentContextType {
  orders: Order[];
  inventory: InventoryItem[];
  couriers: Courier[];
  stagingBays: StagingBay[];
  transfers: StockTransfer[];
  exceptions: ExceptionReport[];
  activeRole: 'office' | 'warehouse';
  setActiveRole: (role: 'office' | 'warehouse') => void;
  assignCourier: (orderId: string, courierId: string) => void;
  startPicking: (orderId: string, workerName: string) => void;
  verifyItem: (orderId: string, itemId: string) => void;
  completePacking: (orderId: string, workerName: string, stagingBayId: string) => void;
  markShipped: (orderId: string) => void;
  reportException: (orderId: string, sku: string, itemName: string, issueType: ExceptionReport['issueType'], notes: string) => void;
  resolveException: (exceptionId: string, resolutionAction: string) => void;
  requestStockTransfer: (sku: string, qty: number) => void;
  completeStockTransfer: (transferId: string) => void;
  simulateIncomingOrder: () => void;
  resetDemoData: () => void;
}

const FulfillmentContext = createContext<FulfillmentContextType | undefined>(undefined);

export const FulfillmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const local = localStorage.getItem('xyz_fulfillment_orders');
    return local ? JSON.parse(local) : INITIAL_ORDERS;
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const local = localStorage.getItem('xyz_fulfillment_inventory');
    return local ? JSON.parse(local) : INITIAL_INVENTORY;
  });

  const [couriers] = useState<Courier[]>(INITIAL_COUERS);

  const [stagingBays, setStagingBays] = useState<StagingBay[]>(() => {
    const local = localStorage.getItem('xyz_fulfillment_bays');
    return local ? JSON.parse(local) : INITIAL_STAGING_BAYS;
  });

  const [transfers, setTransfers] = useState<StockTransfer[]>(() => {
    const local = localStorage.getItem('xyz_fulfillment_transfers');
    return local ? JSON.parse(local) : INITIAL_TRANSFERS;
  });

  const [exceptions, setExceptions] = useState<ExceptionReport[]>(() => {
    const local = localStorage.getItem('xyz_fulfillment_exceptions');
    return local ? JSON.parse(local) : INITIAL_EXCEPTIONS;
  });

  const [activeRole, setActiveRole] = useState<'office' | 'warehouse'>('office');

  // Persist state updates to LocalStorage
  useEffect(() => {
    localStorage.setItem('xyz_fulfillment_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('xyz_fulfillment_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('xyz_fulfillment_bays', JSON.stringify(stagingBays));
  }, [stagingBays]);

  useEffect(() => {
    localStorage.setItem('xyz_fulfillment_transfers', JSON.stringify(transfers));
  }, [transfers]);

  useEffect(() => {
    localStorage.setItem('xyz_fulfillment_exceptions', JSON.stringify(exceptions));
  }, [exceptions]);

  const assignCourier = (orderId: string, courierId: string) => {
    const courier = couriers.find(c => c.id === courierId);
    if (!courier) return;

    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;
      return {
        ...order,
        courierId: courier.id,
        courierName: courier.name,
        shippingCost: courier.baseRate,
        trackingNumber: `TRK-${courier.code}-${Math.floor(10000 + Math.random() * 90000)}`
      };
    }));
  };

  const startPicking = (orderId: string, workerName: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;
      return {
        ...order,
        status: 'picking',
        pickedBy: workerName
      };
    }));
  };

  const verifyItem = (orderId: string, itemId: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;
      const updatedItems = order.items.map(item => {
        if (item.id !== itemId) return item;
        return {
          ...item,
          verified: !item.verified,
          pickedQty: !item.verified ? item.quantity : 0
        };
      });
      return {
        ...order,
        items: updatedItems
      };
    }));
  };

  const completePacking = (orderId: string, workerName: string, stagingBayId: string) => {
    const bay = stagingBays.find(b => b.id === stagingBayId);
    
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;
      
      // Deduct inventory stock from main warehouse
      order.items.forEach(item => {
        setInventory(invPrev => invPrev.map(invItem => {
          if (invItem.sku === item.sku) {
            return {
              ...invItem,
              stockMain: Math.max(0, invItem.stockMain - item.quantity)
            };
          }
          return invItem;
        }));
      });

      return {
        ...order,
        status: 'staged',
        packedBy: workerName,
        stagingBay: bay ? bay.name : 'General Staging Shelf'
      };
    }));

    if (bay) {
      setStagingBays(prev => prev.map(b => {
        if (b.id !== bay.id) return b;
        return { ...b, currentCount: b.currentCount + 1 };
      }));
    }
  };

  const markShipped = (orderId: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;
      return {
        ...order,
        status: 'shipped'
      };
    }));
  };

  const reportException = (
    orderId: string, 
    sku: string, 
    itemName: string, 
    issueType: ExceptionReport['issueType'], 
    notes: string
  ) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) return;

    // Create exception report entry
    const newReport: ExceptionReport = {
      id: `exp-${Date.now()}`,
      orderId,
      orderNumber: targetOrder.orderNumber,
      sku,
      itemName,
      reportedBy: activeRole === 'warehouse' ? 'Warehouse Worker' : 'Office Admin',
      issueType,
      reportedAt: new Date().toISOString(),
      status: 'open',
      notes
    };

    setExceptions(prev => [newReport, ...prev]);

    // Update order status to exception
    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;
      return {
        ...order,
        status: 'exception',
        exceptionReason: notes,
        exceptionType: issueType === 'missing_stock' ? 'missing_stock' : 'damaged_item'
      };
    }));
  };

  const resolveException = (exceptionId: string, resolutionAction: string) => {
    const report = exceptions.find(e => e.id === exceptionId);
    if (!report) return;

    setExceptions(prev => prev.map(e => {
      if (e.id !== exceptionId) return e;
      return {
        ...e,
        status: 'resolved',
        resolution: resolutionAction
      };
    }));

    // Reset order status back to 'received' or 'picking' so warehouse can re-process
    setOrders(prev => prev.map(order => {
      if (order.id !== report.orderId) return order;
      return {
        ...order,
        status: 'received',
        exceptionReason: undefined,
        exceptionType: undefined
      };
    }));
  };

  const requestStockTransfer = (sku: string, qty: number) => {
    const item = inventory.find(i => i.sku === sku);
    if (!item) return;

    const newTransfer: StockTransfer = {
      id: `trf-${Date.now()}`,
      sku,
      name: item.name,
      quantity: qty,
      fromLocation: item.locationOverflow,
      toLocation: item.locationMain,
      requestedBy: 'Office Admin',
      requestedAt: new Date().toISOString(),
      status: 'pending'
    };

    setTransfers(prev => [newTransfer, ...prev]);
  };

  const completeStockTransfer = (transferId: string) => {
    const transfer = transfers.find(t => t.id === transferId);
    if (!transfer) return;

    // Move stock from Overflow -> Main
    setInventory(prev => prev.map(item => {
      if (item.sku !== transfer.sku) return item;
      return {
        ...item,
        stockMain: item.stockMain + transfer.quantity,
        stockOverflow: Math.max(0, item.stockOverflow - transfer.quantity)
      };
    }));

    // Mark transfer as completed
    setTransfers(prev => prev.map(t => {
      if (t.id !== transferId) return t;
      return { ...t, status: 'completed' };
    }));
  };

  const simulateIncomingOrder = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const isPriority = Math.random() > 0.4; // 60% priority for demo
    const sampleItems = [inventory[0], inventory[1], inventory[3]];
    const selectedItem = sampleItems[Math.floor(Math.random() * sampleItems.length)];

    const newOrder: Order = {
      id: `ord-sim-${Date.now()}`,
      orderNumber: `XYZ-${randomNum}`,
      customerName: `Customer #${randomNum}`,
      shippingAddress: '100 Innovation Way, Austin, TX',
      channel: 'Shopify',
      priority: isPriority ? 'same_day' : 'standard',
      status: 'received',
      createdAt: new Date().toISOString(),
      slaDeadline: new Date(Date.now() + (isPriority ? 3 : 24) * 60 * 60 * 1000).toISOString(),
      courierId: 'c1',
      courierName: 'SwiftPost Express',
      shippingCost: 12.50,
      totalAmount: selectedItem.price,
      items: [
        {
          id: `item-sim-${Date.now()}`,
          sku: selectedItem.sku,
          name: selectedItem.name,
          variant: selectedItem.variant,
          quantity: 1,
          location: { aisle: 'Aisle A', shelf: 'Shelf 2', bin: 'Bin 04' },
          imageUrl: selectedItem.imageUrl,
          pickedQty: 0,
          verified: false
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
  };

  const resetDemoData = () => {
    setOrders(INITIAL_ORDERS);
    setInventory(INITIAL_INVENTORY);
    setStagingBays(INITIAL_STAGING_BAYS);
    setTransfers(INITIAL_TRANSFERS);
    setExceptions(INITIAL_EXCEPTIONS);
    localStorage.clear();
  };

  return (
    <FulfillmentContext.Provider value={{
      orders,
      inventory,
      couriers,
      stagingBays,
      transfers,
      exceptions,
      activeRole,
      setActiveRole,
      assignCourier,
      startPicking,
      verifyItem,
      completePacking,
      markShipped,
      reportException,
      resolveException,
      requestStockTransfer,
      completeStockTransfer,
      simulateIncomingOrder,
      resetDemoData
    }}>
      {children}
    </FulfillmentContext.Provider>
  );
};

export const useFulfillment = () => {
  const context = useContext(FulfillmentContext);
  if (!context) throw new Error('useFulfillment must be used within FulfillmentProvider');
  return context;
};
