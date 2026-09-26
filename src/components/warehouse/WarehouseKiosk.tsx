import React, { useState } from 'react';
import { useFulfillment } from '../../context/FulfillmentContext';
import { Order, OrderItem } from '../../types';
import confetti from 'canvas-confetti';
import { 
  PackageCheck, 
  MapPin, 
  CheckSquare, 
  AlertTriangle, 
  Sparkles, 
  Clock, 
  ArrowLeft, 
  Box, 
  Send, 
  CheckCircle,
  ShieldAlert,
  ThumbsUp
} from 'lucide-react';

export const WarehouseKiosk: React.FC = () => {
  const { 
    orders, 
    stagingBays, 
    startPicking, 
    verifyItem, 
    completePacking, 
    reportException 
  } = useFulfillment();

  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [selectedBay, setSelectedBay] = useState<string>(stagingBays[0]?.id || '');
  const [showExceptionModal, setShowExceptionModal] = useState<boolean>(false);
  const [exceptionReason, setExceptionReason] = useState<string>('');
  const [targetItemForIssue, setTargetItemForIssue] = useState<OrderItem | null>(null);

  // Orders queue sorted by priority (Same-Day first) and SLA deadline
  const pickableOrders = orders
    .filter(o => o.status === 'received' || o.status === 'picking')
    .sort((a, b) => {
      if (a.priority === 'same_day' && b.priority !== 'same_day') return -1;
      if (a.priority !== 'same_day' && b.priority === 'same_day') return 1;
      return new Date(a.slaDeadline).getTime() - new Date(b.slaDeadline).getTime();
    });

  const currentOrder = orders.find(o => o.id === activeOrderId);

  const handleStartPick = (order: Order) => {
    setActiveOrderId(order.id);
    if (order.status === 'received') {
      startPicking(order.id, 'Marcus (Warehouse Worker)');
    }
  };

  const handleFinishPacking = () => {
    if (!currentOrder) return;
    
    // Trigger celebratory confetti for warehouse worker feedback!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    completePacking(currentOrder.id, 'Marcus (Warehouse Worker)', selectedBay);
    setActiveOrderId(null);
  };

  const handleReportIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrder || !exceptionReason) return;

    reportException(
      currentOrder.id,
      targetItemForIssue?.sku || 'GENERAL',
      targetItemForIssue?.name || 'Order Item',
      'missing_stock',
      `[Warehouse Kiosk] ${exceptionReason}`
    );

    setShowExceptionModal(false);
    setExceptionReason('');
    setTargetItemForIssue(null);
    setActiveOrderId(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Kiosk Header */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white tracking-tight">Warehouse Touch Kiosk</h2>
            <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase border border-emerald-500/30">
              Pick & Verify Mode
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">High-contrast, large buttons tailored for quick shelf picking and barcode verification.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 text-center">
            <p className="text-[10px] uppercase text-slate-400 font-bold">Pick Queue</p>
            <p className="text-xl font-black text-amber-400">{pickableOrders.length}</p>
          </div>
        </div>
      </div>

      {/* Main View: Pick Queue vs Guided Pick Wizard */}
      {!currentOrder ? (
        
        /* Queue View */
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-400" />
            Pick Queue — Next Up (Sorted by Priority & SLA)
          </h3>

          {pickableOrders.length === 0 ? (
            <div className="bg-slate-950 p-12 rounded-2xl border border-slate-800 text-center space-y-3">
              <CheckCircle className="h-14 w-14 text-emerald-400 mx-auto" />
              <h4 className="text-white font-bold text-lg">Pick Queue Clear!</h4>
              <p className="text-slate-400 text-xs">All orders have been picked and staged for shipping.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pickableOrders.map(order => (
                <div
                  key={order.id}
                  className={`bg-slate-950 p-6 rounded-2xl border transition-all space-y-4 ${
                    order.priority === 'same_day'
                      ? 'border-2 border-red-500 bg-gradient-to-br from-slate-950 via-slate-950 to-red-950/20 shadow-lg shadow-red-500/10'
                      : 'border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xl font-black text-blue-400">{order.orderNumber}</span>
                      <p className="text-xs text-slate-400 font-medium">{order.items.length} item(s) to pick</p>
                    </div>

                    {order.priority === 'same_day' && (
                      <span className="bg-red-500 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1 animate-pulse">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        Same-Day Priority
                      </span>
                    )}
                  </div>

                  {/* Items Preview */}
                  <div className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img src={item.imageUrl} alt={item.name} className="h-10 w-10 object-cover rounded bg-slate-800" />
                        <div className="text-xs">
                          <p className="font-bold text-slate-200">{item.name}</p>
                          <p className="text-emerald-400 font-mono text-[11px]">📍 {item.location.aisle} • {item.location.bin}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Big Touch Button */}
                  <button
                    onClick={() => handleStartPick(order)}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base rounded-xl transition shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
                  >
                    <PackageCheck className="h-6 w-6" />
                    <span>START PICKING THIS ORDER</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      ) : (

        /* Active Guided Pick Step-by-Step Wizard */
        <div className="space-y-6">
          
          {/* Back & Order Header */}
          <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveOrderId(null)}
              className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Pick Queue
            </button>

            <span className="font-mono text-base font-extrabold text-blue-400">
              Order: {currentOrder.orderNumber} ({currentOrder.priority === 'same_day' ? 'PRIORITY' : 'STANDARD'})
            </span>
          </div>

          {/* Guided Item Pick List */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Step 1: Collect Items from Shelves & Tap to Verify</h3>

            <div className="space-y-4">
              {currentOrder.items.map((item, idx) => {
                const isVerified = item.verified;

                return (
                  <div
                    key={item.id}
                    className={`bg-slate-950 p-6 rounded-2xl border transition-all ${
                      isVerified
                        ? 'border-emerald-500/50 bg-emerald-950/10'
                        : 'border-slate-800 shadow-md'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      
                      {/* Product Image & Bin Location */}
                      <div className="flex items-center gap-6 w-full md:w-auto">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-24 w-24 object-cover rounded-xl border border-slate-700 bg-slate-900 shrink-0"
                        />

                        <div className="space-y-2">
                          {/* BIN COORDINATES (EXTRA LARGE FOR WAREHOUSE WORKERS) */}
                          <div className="inline-flex items-center gap-2 bg-blue-600 text-white font-mono font-black text-sm px-3 py-1 rounded-lg">
                            <MapPin className="h-4 w-4" />
                            <span>{item.location.aisle} • {item.location.shelf} • {item.location.bin}</span>
                          </div>

                          <h4 className="text-lg font-extrabold text-white">{item.name}</h4>
                          
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-mono font-bold text-slate-400">SKU: {item.sku}</span>
                            {item.variant.color && (
                              <span className="bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded font-semibold border border-slate-700">
                                Color: {item.variant.color} | Size: {item.variant.size}
                              </span>
                            )}
                          </div>

                          <p className="text-sm text-slate-300 font-bold">
                            Quantity needed: <span className="text-emerald-400 font-extrabold text-base">{item.quantity} unit(s)</span>
                          </p>
                        </div>
                      </div>

                      {/* Verification Checkbox & Issue Button */}
                      <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                        <button
                          onClick={() => verifyItem(currentOrder.id, item.id)}
                          className={`w-full sm:w-auto py-3 px-6 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 ${
                            isVerified
                              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                          }`}
                        >
                          <CheckSquare className={`h-5 w-5 ${isVerified ? 'text-white' : 'text-slate-400'}`} />
                          <span>{isVerified ? 'VERIFIED MATCH' : 'TAP TO VERIFY SKU'}</span>
                        </button>

                        <button
                          onClick={() => {
                            setTargetItemForIssue(item);
                            setShowExceptionModal(true);
                          }}
                          className="w-full sm:w-auto py-3 px-4 bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-500/40 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5"
                          title="Report missing shelf stock or damaged item"
                        >
                          <ShieldAlert className="h-4 w-4 text-red-400" />
                          <span>Missing Stock?</span>
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Staging Bay & Pack */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Box className="h-5 w-5 text-blue-400" />
              Step 2: Attach Label & Assign Staging Bay
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {stagingBays.map(bay => (
                <button
                  key={bay.id}
                  onClick={() => setSelectedBay(bay.id)}
                  className={`p-4 rounded-xl border text-left transition ${
                    selectedBay === bay.id
                      ? 'border-blue-500 bg-blue-950/40 text-white shadow-md'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <p className="font-bold text-xs text-slate-200">{bay.name}</p>
                  <p className="text-[11px] text-slate-400 mt-1">Courier: {bay.courierName}</p>
                  <p className="text-[10px] text-emerald-400 font-mono mt-1">Pickup Cutoff: {bay.pickupTime}</p>
                </button>
              ))}
            </div>

            {/* Complete Packing Button */}
            <button
              onClick={handleFinishPacking}
              disabled={!currentOrder.items.every(i => i.verified)}
              className={`w-full py-5 rounded-2xl font-extrabold text-lg transition flex items-center justify-center gap-3 ${
                currentOrder.items.every(i => i.verified)
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <ThumbsUp className="h-6 w-6" />
              <span>
                {currentOrder.items.every(i => i.verified)
                  ? 'COMPLETE PACKING & STAGE BOX'
                  : 'VERIFY ALL ITEMS ABOVE TO COMPLETE PACKING'}
              </span>
            </button>
          </div>

        </div>
      )}

      {/* Exception Reporter Modal */}
      {showExceptionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full space-y-4">
            <div className="flex items-center gap-2 text-red-400">
              <ShieldAlert className="h-6 w-6" />
              <h3 className="font-bold text-lg">Report Warehouse Issue</h3>
            </div>

            <p className="text-xs text-slate-300">
              Item: <span className="font-bold text-white">{targetItemForIssue?.name}</span> ({targetItemForIssue?.sku})
            </p>

            <form onSubmit={handleReportIssue} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Issue Details:</label>
                <select
                  value={exceptionReason}
                  onChange={(e) => setExceptionReason(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
                  required
                >
                  <option value="" disabled>Select reason...</option>
                  <option value="Main warehouse bin was empty / 0 stock found">Main warehouse bin empty (Out of stock)</option>
                  <option value="Item damaged or packaging broken">Item damaged or torn</option>
                  <option value="Wrong size/color label on bin shelf">Wrong variant in shelf bin</option>
                  <option value="Other shelf issue">Other issue</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowExceptionModal(false)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs transition shadow-md shadow-red-600/30"
                >
                  Submit Issue to Office Desk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
