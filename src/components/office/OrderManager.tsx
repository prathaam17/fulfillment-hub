import React, { useState } from 'react';
import { useFulfillment } from '../../context/FulfillmentContext';
import { Order, OrderPriority, OrderStatus } from '../../types';
import { 
  Clock, 
  AlertTriangle, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  Package, 
  Search, 
  ShieldAlert, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const OrderManager: React.FC = () => {
  const { orders, couriers, assignCourier, requestStockTransfer, inventory } = useFulfillment();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Helper to format SLA countdown
  const getSLAStatus = (deadlineStr: string) => {
    const deadline = new Date(deadlineStr).getTime();
    const now = new Date().getTime();
    const diffMins = Math.floor((deadline - now) / (1000 * 60));

    if (diffMins <= 0) {
      return { text: 'SLA BREACHED', color: 'bg-red-500/20 text-red-400 border-red-500/50 animate-pulse' };
    } else if (diffMins <= 120) {
      const hrs = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      return { text: `${hrs}h ${mins}m left`, color: 'bg-amber-500/20 text-amber-400 border-amber-500/50 font-bold' };
    } else {
      const hrs = Math.floor(diffMins / 60);
      return { text: `${hrs}h remaining`, color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterStatus === 'all') return true;
    if (filterStatus === 'priority') return order.priority === 'same_day';
    if (filterStatus === 'exception') return order.status === 'exception';
    return order.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search order #, customer, or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {[
            { id: 'all', label: 'All Orders', count: orders.length },
            { id: 'priority', label: 'Same-Day Priority', count: orders.filter(o => o.priority === 'same_day').length, badge: 'bg-red-500/20 text-red-300' },
            { id: 'received', label: 'Unprocessed', count: orders.filter(o => o.status === 'received').length },
            { id: 'picking', label: 'In Picking', count: orders.filter(o => o.status === 'picking').length },
            { id: 'staged', label: 'Staged', count: orders.filter(o => o.status === 'staged').length },
            { id: 'exception', label: 'Exceptions', count: orders.filter(o => o.status === 'exception').length, badge: 'bg-amber-500/20 text-amber-300' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                filterStatus === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${tab.badge || 'bg-slate-800 text-slate-300'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

      </div>

      {/* Orders Table Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-slate-950 p-12 rounded-xl border border-slate-800 text-center space-y-3">
            <Package className="h-12 w-12 text-slate-600 mx-auto" />
            <h3 className="text-slate-300 font-semibold text-sm">No matching orders found</h3>
            <p className="text-slate-500 text-xs">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          filteredOrders.map(order => {
            const sla = getSLAStatus(order.slaDeadline);

            return (
              <div 
                key={order.id} 
                className={`bg-slate-950 rounded-xl border transition-all hover:border-slate-700 ${
                  order.priority === 'same_day' 
                    ? 'border-l-4 border-l-red-500 border-slate-800' 
                    : 'border-slate-800'
                }`}
              >
                <div className="p-5 space-y-4">
                  
                  {/* Order Top Line */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-900">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-blue-400 text-base">{order.orderNumber}</span>
                      
                      {/* Priority Badge */}
                      {order.priority === 'same_day' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                          <AlertTriangle className="h-3 w-3" />
                          Same-Day Priority
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                          Standard
                        </span>
                      )}

                      {/* Sales Channel */}
                      <span className="text-[10px] text-slate-400 font-medium px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                        {order.channel}
                      </span>
                    </div>

                    {/* Status & SLA */}
                    <div className="flex items-center gap-3">
                      {/* SLA Timer */}
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-mono ${sla.color}`}>
                        <Clock className="h-3.5 w-3.5" />
                        <span>SLA: {sla.text}</span>
                      </div>

                      {/* Status Badge */}
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                        order.status === 'received' ? 'bg-slate-800 text-slate-300' :
                        order.status === 'picking' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        order.status === 'staged' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                        order.status === 'shipped' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        'bg-red-500/20 text-red-300 border border-red-500/40'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Order Details Body */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Customer & Shipping Info */}
                    <div className="space-y-2 text-xs">
                      <p className="text-slate-400 font-medium uppercase text-[10px] tracking-wider">Customer & Delivery</p>
                      <p className="font-semibold text-slate-200">{order.customerName}</p>
                      <p className="text-slate-400 flex items-start gap-1">
                        <MapPin className="h-3.5 w-3.5 text-slate-500 shrink-0 mt-0.5" />
                        <span>{order.shippingAddress}</span>
                      </p>
                    </div>

                    {/* Order Items & Bin Locations */}
                    <div className="space-y-2">
                      <p className="text-slate-400 font-medium uppercase text-[10px] tracking-wider">Ordered Items & Shelf Bins</p>
                      <div className="space-y-2">
                        {order.items.map(item => {
                          const invMatch = inventory.find(i => i.sku === item.sku);
                          const isLowStock = invMatch && invMatch.stockMain < item.quantity;

                          return (
                            <div key={item.id} className="flex items-center gap-3 bg-slate-900 p-2 rounded-lg border border-slate-800">
                              <img src={item.imageUrl} alt={item.name} className="h-10 w-10 object-cover rounded bg-slate-800 shrink-0" />
                              <div className="flex-1 min-w-0 text-xs">
                                <p className="font-medium text-slate-200 truncate">{item.name}</p>
                                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                                  <span>SKU: {item.sku}</span>
                                  {item.variant.color && <span className="text-slate-500">({item.variant.color}, {item.variant.size})</span>}
                                  <span className="font-bold text-blue-400">x{item.quantity}</span>
                                </div>
                                <p className="text-[10px] text-emerald-400 font-mono mt-0.5 flex items-center gap-1">
                                  <span>📍 {item.location.aisle} • {item.location.shelf} • {item.location.bin}</span>
                                </p>
                              </div>

                              {/* Warning if stock low in Main WH */}
                              {isLowStock && (
                                <button
                                  onClick={() => requestStockTransfer(item.sku, 10)}
                                  className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-1 rounded hover:bg-amber-500/30 transition flex items-center gap-1 shrink-0"
                                  title="Main Warehouse empty! Click to request stock transfer from Secondary Warehouse"
                                >
                                  <AlertTriangle className="h-3 w-3 text-amber-400" />
                                  <span>Transfer Stock</span>
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Courier Assignment & Actions */}
                    <div className="space-y-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 flex flex-col justify-between">
                      <div className="space-y-2">
                        <p className="text-slate-400 font-medium uppercase text-[10px] tracking-wider flex items-center gap-1">
                          <Truck className="h-3.5 w-3.5 text-blue-400" />
                          Shipping Courier Selection
                        </p>

                        {order.courierName ? (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold text-slate-200">{order.courierName}</span>
                              <span className="text-blue-400 font-mono font-bold">${order.shippingCost?.toFixed(2)}</span>
                            </div>
                            {order.trackingNumber && (
                              <p className="text-[10px] text-slate-500 font-mono">Trk: {order.trackingNumber}</p>
                            )}
                            {order.stagingBay && (
                              <p className="text-[10px] text-emerald-400 font-semibold">Staged in: {order.stagingBay}</p>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <label className="text-[11px] text-slate-400 block">Select optimal courier:</label>
                            <select
                              onChange={(e) => assignCourier(order.id, e.target.value)}
                              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                              defaultValue=""
                            >
                              <option value="" disabled>Choose courier...</option>
                              {couriers.map(c => (
                                <option key={c.id} value={c.id}>
                                  {c.name} — ${c.baseRate.toFixed(2)} ({c.estimatedDelivery})
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>

                      {/* Exception Note if any */}
                      {order.exceptionReason && (
                        <div className="bg-red-950/50 border border-red-500/30 p-2 rounded text-[11px] text-red-300 flex items-start gap-2">
                          <ShieldAlert className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                          <span>{order.exceptionReason}</span>
                        </div>
                      )}

                    </div>

                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
