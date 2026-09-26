import React, { useState } from 'react';
import { useFulfillment } from '../../context/FulfillmentContext';
import { OrderManager } from './OrderManager';
import { InventoryManager } from './InventoryManager';
import { ExceptionCenter } from './ExceptionCenter';
import { 
  Boxes, 
  Clock, 
  AlertCircle, 
  ShieldAlert, 
  Truck, 
  Package, 
  Building2, 
  ArrowRightLeft 
} from 'lucide-react';

export const OfficeDashboard: React.FC = () => {
  const { orders, inventory, exceptions, stagingBays } = useFulfillment();
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'exceptions'>('orders');

  const pendingPriority = orders.filter(o => o.priority === 'same_day' && o.status !== 'shipped').length;
  const openExceptionsCount = exceptions.filter(e => e.status === 'open').length;
  const stagedCount = orders.filter(o => o.status === 'staged').length;

  return (
    <div className="space-y-6">
      
      {/* KPI Metric Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Same-Day Priority Card */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Priority Queue</span>
            <Clock className="h-4 w-4 text-red-400" />
          </div>
          <p className="text-2xl font-extrabold text-red-400">{pendingPriority}</p>
          <p className="text-[10px] text-slate-500">Same-Day cutoff pending</p>
        </div>

        {/* Staged Packages */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Staged & Ready</span>
            <Package className="h-4 w-4 text-blue-400" />
          </div>
          <p className="text-2xl font-extrabold text-blue-400">{stagedCount}</p>
          <p className="text-[10px] text-slate-500">Awaiting courier pickup</p>
        </div>

        {/* Low Stock SKUs */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Main Stock Low</span>
            <Building2 className="h-4 w-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-amber-400">
            {inventory.filter(i => i.stockMain <= i.reorderLevel).length}
          </p>
          <p className="text-[10px] text-slate-500">Stock transfers suggested</p>
        </div>

        {/* Open Exceptions */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Open Exceptions</span>
            <ShieldAlert className="h-4 w-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-amber-400">{openExceptionsCount}</p>
          <p className="text-[10px] text-slate-500">Reported by warehouse</p>
        </div>

      </div>

      {/* Main Content Tabs */}
      <div className="border-b border-slate-800 flex items-center gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition ${
            activeTab === 'orders'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Boxes className="h-4 w-4" />
          <span>Orders & Dispatcher</span>
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition ${
            activeTab === 'inventory'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ArrowRightLeft className="h-4 w-4" />
          <span>Inventory & Stock Transfers</span>
        </button>

        <button
          onClick={() => setActiveTab('exceptions')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition ${
            activeTab === 'exceptions'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldAlert className="h-4 w-4" />
          <span>Exception Desk</span>
          {openExceptionsCount > 0 && (
            <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-full">
              {openExceptionsCount}
            </span>
          )}
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'orders' && <OrderManager />}
      {activeTab === 'inventory' && <InventoryManager />}
      {activeTab === 'exceptions' && <ExceptionCenter />}

    </div>
  );
};
