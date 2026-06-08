'use client';

import { useRouter } from 'next/navigation';
import MissingLocations from '@/components/MissingLocations';

export default function MissingLocationsPage() {
  const router = useRouter();

  return (
    <div className="missing-locations-page-wrapper" style={{ padding: '20px', minHeight: 'calc(100vh - 80px)' }}>
      <div style={{ marginBottom: '20px' }}>
        <button
          className="admin-button"
          onClick={() => router.push('/profile/admin')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          ← Vissza az Admin felületre
        </button>
      </div>

      <MissingLocations />
    </div>
  );
}