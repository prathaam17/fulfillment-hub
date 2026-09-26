import React from 'react';
import { useFulfillment } from '../context/FulfillmentContext';
import { Package, ShieldAlert, Video, Sparkles, RefreshCw, PlusCircle, Monitor, Smartphone } from 'lucide-react';

interface NavbarProps {
  onOpenAIModal: () => void;
  onOpenVideoModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAIModal, onOpenVideoModal }) => {
  const { activeRole, setActiveRole, simulateIncomingOrder, resetDemoData, exceptions } = useFulfillment();

  const openExceptionsCount = exceptions.filter(e => e.status === 'open').length;

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 px-4 lg:px-8 py-3">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg text-white tracking-tight">XYZ Fulfillment Hub</h1>
                <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Live Operations
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Office & Warehouse Unified Operations Platform</p>
            </div>
          </div>

          {/* Quick Exception Indicator for Mobile */}
          {openExceptionsCount > 0 && (
            <span className="md:hidden inline-flex items-center gap-1 text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-1 rounded-full">
              <ShieldAlert className="h-3.5 w-3.5" />
              {openExceptionsCount} Alert{openExceptionsCount > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Role Switcher Pill */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 shadow-inner">
          <button
            onClick={() => setActiveRole('office')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeRole === 'office'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Monitor className="h-4 w-4" />
            <span>Office Command Desk</span>
          </button>

          <button
            onClick={() => setActiveRole('warehouse')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeRole === 'warehouse'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            <span>Warehouse Kiosk</span>
            <span className="bg-emerald-950 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded uppercase font-extrabold border border-emerald-500/30">
              Low-Tech UX
            </span>
          </button>
        </div>

        {/* Action Controls & Deliverable Modals */}
        <div className="flex items-center gap-2 flex-wrap justify-end w-full md:w-auto">
          <button
            onClick={simulateIncomingOrder}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
            title="Simulate a new customer order entering the system"
          >
            <PlusCircle className="h-3.5 w-3.5 text-blue-400" />
            <span>+ Sim Order</span>
          </button>

          <button
            onClick={resetDemoData}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs border border-slate-700 transition"
            title="Reset dataset to initial state"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>

          {/* Submission Deliverables */}
          <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />

          <button
            onClick={onOpenVideoModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 text-xs font-semibold border border-indigo-500/40 transition"
          >
            <Video className="h-3.5 w-3.5 text-indigo-400" />
            <span>Video Walkthrough (5m)</span>
          </button>

          <button
            onClick={onOpenAIModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 text-xs font-semibold border border-purple-500/40 transition"
          >
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span>AI Usage Note</span>
          </button>
        </div>

      </div>
    </header>
  );
};
