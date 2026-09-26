import React, { useState } from 'react';
import { useFulfillment } from '../../context/FulfillmentContext';
import { 
  Building2, 
  ArrowRightLeft, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Plus, 
  PackageCheck,
  Search,
  ShieldAlert
} from 'lucide-react';

export const InventoryManager: React.FC = () => {
  const { inventory, transfers, requestStockTransfer, completeStockTransfer } = useFulfillment();
  const [selectedSku, setSelectedSku] = useState<string>('');
  const [transferQty, setTransferQty] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeTransfers = transfers.filter(t => t.status !== 'completed');
  const completedTransfers = transfers.filter(t => t.status === 'completed');

  const handleCreateTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSku || transferQty <= 0) return;
    requestStockTransfer(selectedSku, transferQty);
    setSelectedSku('');
    setTransferQty(10);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner / Explanation */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Building2 className="h-5 w-5 text-indigo-400" />
            Multi-Warehouse Inventory & Stock Transfer Center
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Orders ship exclusively from the Main Warehouse. When Main Warehouse shelf stock is low or missing, trigger a stock transfer from the Secondary Overflow Warehouse before picking halts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 text-center">
            <p className="text-[10px] uppercase text-slate-400 font-semibold">Active Transfers</p>
            <p className="text-lg font-extrabold text-blue-400">{activeTransfers.length}</p>
          </div>
          <div className="bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 text-center">
            <p className="text-[10px] uppercase text-slate-400 font-semibold">Main Low Stock SKUs</p>
            <p className="text-lg font-extrabold text-amber-400">
              {inventory.filter(i => i.stockMain <= i.reorderLevel).length}
            </p>
          </div>
        </div>
      </div>

      {/* Active Stock Transfers Tracking Queue */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <ArrowRightLeft className="h-4 w-4 text-blue-400" />
          Active Stock Transfer Requests (Overflow ➔ Main Warehouse)
        </h3>

        {activeTransfers.length === 0 ? (
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800/80 text-center text-xs text-slate-400">
            No pending stock transfers in transit.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeTransfers.map(transfer => (
              <div key={transfer.id} className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-indigo-300">{transfer.id}</span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {transfer.status.replace('_', ' ')}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">{transfer.name}</p>
                  <p className="text-xs text-slate-400 font-mono">SKU: {transfer.sku}</p>
                </div>

                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Transfer Quantity:</span>
                    <span className="font-bold text-emerald-400">{transfer.quantity} units</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>From: {transfer.fromLocation}</span>
                    <span>To: {transfer.toLocation}</span>
                  </div>
                </div>

                <button
                  onClick={() => completeStockTransfer(transfer.id)}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-3 rounded-lg text-xs transition shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5"
                >
                  <PackageCheck className="h-4 w-4" />
                  <span>Receive & Replenish Main Warehouse (+{transfer.quantity} Stock)</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Stock Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="text-sm font-bold text-slate-200">Inventory Stock Levels & Bin Locations</h3>
          
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search SKU or Product Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">SKU & Variant</th>
                  <th className="p-3">Main Warehouse Stock</th>
                  <th className="p-3">Overflow Warehouse Stock</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {filteredInventory.map(item => {
                  const isMainOut = item.stockMain === 0;
                  const isMainLow = item.stockMain <= item.reorderLevel;

                  return (
                    <tr key={item.id} className="hover:bg-slate-900/50 transition">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img src={item.imageUrl} alt={item.name} className="h-10 w-10 object-cover rounded bg-slate-800" />
                          <div>
                            <p className="font-semibold text-slate-200">{item.name}</p>
                            <p className="text-[10px] text-slate-400">{item.category} • ${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-3 font-mono">
                        <p className="font-bold text-blue-400">{item.sku}</p>
                        <p className="text-[10px] text-slate-400">
                          {item.variant.color && `${item.variant.color} / `}{item.variant.size}
                        </p>
                      </td>

                      <td className="p-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`font-mono text-sm font-extrabold ${
                              isMainOut ? 'text-red-400' : isMainLow ? 'text-amber-400' : 'text-emerald-400'
                            }`}>
                              {item.stockMain} units
                            </span>

                            {isMainOut && (
                              <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-bold uppercase border border-red-500/40">
                                Out of Stock
                              </span>
                            )}
                            {!isMainOut && isMainLow && (
                              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-bold uppercase border border-amber-500/40">
                                Low Stock
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-500">📍 {item.locationMain}</p>
                        </div>
                      </td>

                      <td className="p-3">
                        <div className="space-y-1">
                          <span className="font-mono text-sm font-bold text-indigo-300">{item.stockOverflow} units</span>
                          <p className="text-[10px] text-slate-500">📍 {item.locationOverflow}</p>
                        </div>
                      </td>

                      <td className="p-3 text-right">
                        <button
                          onClick={() => requestStockTransfer(item.sku, 10)}
                          className="bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 px-3 py-1.5 rounded-lg text-xs font-semibold transition inline-flex items-center gap-1"
                        >
                          <ArrowRightLeft className="h-3.5 w-3.5" />
                          <span>Request +10 Transfer</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};
