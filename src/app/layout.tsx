'use client';

import { useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in');
      } else {
        console.log('User is signed out');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}