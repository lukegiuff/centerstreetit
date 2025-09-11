'use client';

import { useEffect } from 'react';

export default function AdminPage() {
  useEffect(() => {
    // Redirect to the actual CMS
    window.location.replace('/admin/index.html');
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: '#333', marginBottom: '1rem' }}>Loading CMS...</h1>
        <p style={{ color: '#666' }}>Redirecting to admin panel...</p>
      </div>
    </div>
  );
}
