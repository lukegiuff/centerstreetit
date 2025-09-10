'use client';

import { useEffect } from 'react';

export default function AdminPage() {
  useEffect(() => {
    // Redirect to the static admin page
    window.location.href = '/admin/index.html';
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'system-ui, sans-serif' 
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Loading CMS...</h1>
        <p>Redirecting to admin panel...</p>
      </div>
    </div>
  );
}
