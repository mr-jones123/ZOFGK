'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { Button } from './ui/button';

export function AuthButton() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return auth.currentUser ? (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-700">{auth.currentUser.email}</span>
      <Button
        variant="outline"
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </div>
  ) : (
    <Button
      onClick={handleSignIn}
      disabled={loading}
      className="bg-blue-600 text-white hover:bg-blue-700"
    >
      {loading ? 'Signing in...' : 'Sign in with Google'}
    </Button>
  );
}