import React from 'react';
import { useFulfillment } from '../../context/FulfillmentContext';
import { ShieldAlert, CheckCircle2, Clock, User, Package, AlertTriangle, ArrowRight } from 'lucide-react';

export const ExceptionCenter: React.FC = () => {
  const { exceptions, resolveException, requestStockTransfer } = useFulfillment();

  const openExceptions = exceptions.filter(e => e.status === 'open');
  const resolvedExceptions = exceptions.filter(e => e.status === 'resolved');

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/30 p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-amber-400" />
            Fulfillment Exception & Problem Desk
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Replaces informal spoken notes and forgotten spreadsheet flags. Issues logged by warehouse workers appear here immediately for office resolution.
          </p>
        </div>

        <div className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-4 py-2 rounded-xl text-center">
          <p className="text-[10px] uppercase font-bold tracking-wider">Unresolved Issues</p>
          <p className="text-xl font-extrabold">{openExceptions.length}</p>
        </div>
      </div>

      {/* Open Exceptions List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-200">Open Exceptions Requiring Action</h3>

        {openExceptions.length === 0 ? (
          <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 text-center space-y-2">
            <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
            <p className="text-slate-300 font-semibold text-sm">All exceptions resolved!</p>
            <p className="text-slate-500 text-xs">No pending issues reported from warehouse workers.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {openExceptions.map(item => (
              <div key={item.id} className="bg-slate-950 p-5 rounded-xl border border-amber-500/30 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-900">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-amber-400 text-sm">{item.orderNumber}</span>
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {item.issueType.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Reported: {new Date(item.reportedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <p className="text-slate-400 font-medium">Issue Description:</p>
                    <p className="text-slate-200 bg-slate-900 p-3 rounded-lg border border-slate-800 font-sans">
                      "{item.notes}"
                    </p>
                    <p className="text-[10px] text-slate-500 flex items-center gap-1">
                      <User className="h-3 w-3" /> Reported by: {item.reportedBy}
                    </p>
                  </div>

                  <div className="space-y-2 bg-slate-900/60 p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
                    <div>
                      <p className="text-slate-400 font-medium text-[11px] mb-1">Recommended Resolution:</p>
                      <p className="text-slate-300 text-xs">
                        Trigger an emergency stock transfer from Overflow storage and return order to processing queue.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => {
                          if (item.sku) requestStockTransfer(item.sku, 5);
                          resolveException(item.id, 'Triggered Overflow Transfer and re-queued order');
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-3 rounded-lg text-xs transition flex items-center justify-center gap-1"
                      >
                        <span>Transfer Stock & Re-queue</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>

                      <button
                        onClick={() => resolveException(item.id, 'Manually located item and marked resolved')}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2 px-3 rounded-lg text-xs border border-slate-700 transition"
                      >
                        Mark Fixed
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resolved Audit Log */}
      {resolvedExceptions.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-slate-900">
          <h3 className="text-sm font-bold text-slate-400">Resolved Exceptions History</h3>
          <div className="bg-slate-950 rounded-xl border border-slate-900 divide-y divide-slate-900">
            {resolvedExceptions.map(res => (
              <div key={res.id} className="p-3 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-mono text-slate-200 font-bold mr-2">{res.orderNumber}</span>
                    <span>{res.notes}</span>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                  {res.resolution}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
