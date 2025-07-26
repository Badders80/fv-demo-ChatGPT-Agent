import React, { useEffect, useState } from 'react';
import { useAuth } from '@futureverse/auth-react';

export default function Login() {
  const { authClient, signIn, userSession, isFetchingSession } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsSigningIn(true);
      await signIn({ authFlow: 'redirect' });
    } catch (error) {
      console.error('Sign in error:', error);
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOutPass({ flow: 'redirect' });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (isFetchingSession) {
    return <div>Loading...</div>;
  }

  if (userSession) {
    return (
      <div>
        <h2>Welcome!</h2>
        <p>You are signed in with Pass</p>
        <p>User ID: {userSession.user?.profile?.sub}</p>
        <button onClick={handleSignOut} disabled={isSigningIn}>
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Sign In with Pass</h2>
      <p>Click the button below to sign in using Futureverse Pass</p>
      <button onClick={handleSignIn} disabled={isSigningIn}>
        {isSigningIn ? 'Signing In...' : 'Sign In with Pass'}
      </button>
    </div>
  );
} 