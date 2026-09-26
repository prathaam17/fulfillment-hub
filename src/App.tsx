import React, { useState } from 'react';
import { FulfillmentProvider, useFulfillment } from './context/FulfillmentContext';
import { Navbar } from './components/Navbar';
import { OfficeDashboard } from './components/office/OfficeDashboard';
import { WarehouseKiosk } from './components/warehouse/WarehouseKiosk';
import { AIUsageModal } from './components/modals/AIUsageModal';
import { VideoScriptModal } from './components/modals/VideoScriptModal';

const MainContent: React.FC<{
  onOpenAIModal: () => void;
  onOpenVideoModal: () => void;
}> = ({ onOpenAIModal, onOpenVideoModal }) => {
  const { activeRole } = useFulfillment();

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans">
      <Navbar onOpenAIModal={onOpenAIModal} onOpenVideoModal={onOpenVideoModal} />
      
      <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
        {activeRole === 'office' ? (
          <OfficeDashboard />
        ) : (
          <WarehouseKiosk />
        )}
      </main>

      {/* App Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-4 text-center text-xs text-slate-500">
        <p>XYZ Fulfillment Hub — Built for E-Commerce Operational Excellence</p>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  const [showAIModal, setShowAIModal] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);

  return (
    <FulfillmentProvider>
      <MainContent
        onOpenAIModal={() => setShowAIModal(true)}
        onOpenVideoModal={() => setShowVideoModal(true)}
      />

      {showAIModal && <AIUsageModal onClose={() => setShowAIModal(false)} />}
      {showVideoModal && <VideoScriptModal onClose={() => setShowVideoModal(false)} />}
    </FulfillmentProvider>
  );
};

export default App;
