'use client';

import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Navbar />
        <main>{children}</main>
      </ErrorBoundary>
    </AuthProvider>
  );
}
