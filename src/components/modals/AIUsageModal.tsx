import React from 'react';
import { Sparkles, X, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';

export const AIUsageModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 text-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-purple-400">
            <Sparkles className="h-6 w-6" />
            <h2 className="text-lg font-bold text-white">AI Usage Note (Submission Deliverable #3)</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 text-xs leading-relaxed">
          
          {/* Section 1: Tools & Roles */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-purple-300 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-purple-400" />
              1. AI Tools Used & Operational Workflow
            </h3>
            <p className="text-slate-300">
              We leveraged <strong>Google Antigravity AI Agent (Gemini 3.6 Flash)</strong> as an agentic pair-programmer throughout the development lifecycle:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li><strong>Domain & Scenario Analysis</strong>: Deconstructed XYZ's fulfillment bottlenecks (priority order SLA misses, mis-picks, stock discrepancies, and lost boxes).</li>
              <li><strong>Architecture & UX Prototyping</strong>: Designed a dual-role architecture separating high-level Office control from simplified, high-contrast Warehouse Kiosk workflows.</li>
              <li><strong>Interactive Data & State Engine</strong>: Generated realistic sample data (SLA timers, multi-warehouse stock, staging bays, couriers) and state handlers.</li>
            </ul>
          </div>

          {/* Section 2: Disagreements & Human Judgement */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              2. Key Disagreements & AI Recommendations Overruled
            </h3>

            <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-3">
              <div>
                <p className="font-bold text-amber-400">Disagreement #1: AI Suggested a Complex WMS Layout & 3D Mapping</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  <em>AI Proposal</em>: A 3D interactive grid map of the entire warehouse with coordinate pathing algorithms.
                  <br />
                  <em>Human Decision</em>: Overruled. The prompt explicitly states warehouse staff are <strong>"not very comfortable with technology."</strong> A 3D map adds cognitive fatigue. We simplified to a <strong>high-contrast 3-badge visual locator</strong> (e.g. <code className="bg-slate-800 text-blue-300 px-1 rounded">Aisle A • Shelf 2 • Bin 04</code>) and required 1-tap SKU verification.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-900">
                <p className="font-bold text-amber-400">Disagreement #2: Silent Auto-Correction of Missing Stock</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  <em>AI Proposal</em>: Automatically deduct stock from Overflow without notifying office staff when stock isn't found.
                  <br />
                  <em>Human Decision</em>: Overruled. Informal, unrecorded fixes are why XYZ had stock discrepancies in spreadsheets! We introduced a mandatory <strong>1-Tap Exception Reporter</strong> that logs an audit trail to the Office Exception Desk.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Value Added */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-1.5">
              <Lightbulb className="h-4 w-4 text-emerald-400" />
              3. Human Judgement & Strategic Synthesis
            </h3>
            <p className="text-slate-300">
              While AI provided rapid scaffolding and component code, human operational judgement ensured the app addressed true business ROI: prioritizing same-day SLA cutoffs, protecting courier pickup schedules, and providing celebratory visual feedback (confetti/haptics) for non-tech warehouse staff.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs transition"
          >
            Close AI Note
          </button>
        </div>

      </div>
    </div>
  );
};
