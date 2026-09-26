import React from 'react';
import { Video, X, Clock, Play, CheckCircle } from 'lucide-react';

export const VideoScriptModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 text-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-indigo-400">
            <Video className="h-6 w-6" />
            <h2 className="text-lg font-bold text-white">Video Walkthrough Script (Deliverable #2 — Max 5 Min)</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Presentation Timed Breakdown */}
        <div className="space-y-4 text-xs">
          
          <p className="text-slate-300 italic bg-slate-950 p-3 rounded-xl border border-slate-800">
            Use this exact script and screen recording agenda to present the application in under 5 minutes.
          </p>

          {/* Timestamp 1 */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-bold text-indigo-400">
              <span>1. Problem Understanding</span>
              <span className="text-[10px] font-mono bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
                0:00 - 1:00
              </span>
            </div>
            <p className="text-slate-300">
              "Hi everyone! Today I'm presenting <strong>XYZ Fulfillment Hub</strong>. XYZ grows quickly with 200-300 orders/day, but spreadsheets cause 5 critical failures: priority orders miss deadlines, wrong variants ship, missing stock stalls picking, packed boxes get misplaced, and problems are forgotten. Here is how our app fixes every single one of those."
            </p>
          </div>

          {/* Timestamp 2 */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-bold text-indigo-400">
              <span>2. Solution Overview & Dual-Role Design</span>
              <span className="text-[10px] font-mono bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
                1:00 - 2:00
              </span>
            </div>
            <p className="text-slate-300">
              "Instead of forcing non-tech warehouse workers into a complex dashboard, we split the application into two tailored environments:
              1) <strong>Office Command Desk</strong> for 1-2 office admins managing SLAs, couriers, stock transfers, and exceptions.
              2) <strong>Warehouse Touch Kiosk</strong> for 2-3 warehouse workers with giant touch targets, visual bin guidance, and 1-tap item verification."
            </p>
          </div>

          {/* Timestamp 3 */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-bold text-indigo-400">
              <span>3. Demo: Office Desk, SLA Cutoffs & Stock Transfer</span>
              <span className="text-[10px] font-mono bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
                2:00 - 3:30
              </span>
            </div>
            <p className="text-slate-300">
              "In the Office View, notice the real-time SLA countdown timers. Same-day priority orders automatically float to the top with red warning badges. When Main Warehouse shelf stock drops to zero, admins can click <em>'Request +10 Transfer'</em> to move stock from the Secondary Overflow Warehouse, replenishing inventory before pickers hit a bottleneck."
            </p>
          </div>

          {/* Timestamp 4 */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-bold text-indigo-400">
              <span>4. Demo: Warehouse Kiosk & Mis-Pick Prevention</span>
              <span className="text-[10px] font-mono bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
                3:30 - 4:30
              </span>
            </div>
            <p className="text-slate-300">
              "Switching to the Warehouse Kiosk: notice the large bin locator (<code className="text-blue-400">Aisle A • Shelf 2 • Bin 04</code>) and product thumbnails. Workers click <em>'Tap to Verify'</em> to ensure the right size/color is packed, eliminating wrong variant shipments. If an item is missing on shelf, 1-tap <em>'Missing Stock'</em> immediately sends an alert to the Office Exception Desk."
            </p>
          </div>

          {/* Timestamp 5 */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-bold text-indigo-400">
              <span>5. Why We Made These Choices & AI Synthesis</span>
              <span className="text-[10px] font-mono bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
                4:30 - 5:00
              </span>
            </div>
            <p className="text-slate-300">
              "We chose this approach to maximize practicality. We rejected complex 3D warehouse maps in favor of clean bin labels for low-tech staff, and built an automated exception desk to replace verbal notes. Thank you!"
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition"
          >
            Close Video Script
          </button>
        </div>

      </div>
    </div>
  );
};
