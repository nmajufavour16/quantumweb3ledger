'use client';

import dynamic from 'next/dynamic';

// Dynamically import the SimpleGoogleTranslate component with no SSR
const SimpleGoogleTranslate = dynamic(() => import('./SimpleGoogleTranslate'), {
  ssr: false,
  loading: () => (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center gap-2 bg-black/70 text-white px-4 py-2 rounded-full">
        <span className="text-sm">Loading translator...</span>
      </div>
    </div>
  ),
});

const ClientGoogleTranslate = () => {
  return <SimpleGoogleTranslate />;
};

export default ClientGoogleTranslate; 