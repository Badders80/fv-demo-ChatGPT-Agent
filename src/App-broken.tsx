/*
 * Top‑level application routes for Ev/**
 * Protected "MyStable" page.  Displays the user's wallet address and
 * provides a logout button once authenticated.  You can extend this
 * component later to show owned assets using the asset management
 * SDK.
 */
function MyStable() {
  const { userSession, signOut } = useAuth();
  return (
    <div style={{ padding: '2rem' }}>
      <h1>MyStable</h1>
      <p>Wallet: {userSession?.futurepass}</p>
      <button onClick={signOut}>Logout</button>
    </div>
  );
}
 *
 * This component defines a minimal UI with a home page, a protected
 * “MyStable” page that requires authentication, and a callback route
 * used by the Futureverse Pass login flow.  The design is kept
 * intentionally simple to focus on functionality—more elaborate
 * styling can be added later once all SDK integrations are
 * operational.
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@futureverse/auth-react';

/**
 * Route guard that redirects unauthenticated users to the home page.
 * You can enhance this component to display a loading state or
 * different fallback UI if desired.
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { userSession } = useAuth();
  return userSession ? <>{children}</> : <Navigate to="/" />;
}

/**
 * Home page with a login button.  This uses the login function
 * from useAuth() to trigger a Pass sign‑in.
 */
function Home() {
  const { signIn } = useAuth();
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Home</h1>
      <p>Welcome to Evolution Stables!</p>
      <button onClick={() => signIn({})}>Login</button>
    </div>
  );
}

/**
 * Protected “MyStable” page.  Displays the user’s wallet address and
 * provides a logout button once authenticated.  You can extend this
 * component later to show owned assets using the asset management
 * SDK.
 */
function MyStable() {
  const { userSession, logout } = useAuth();
  return (
    <div style={{ padding: '2rem' }}>
      <h1>MyStable</h1>
      <p>Wallet: {userSession?.address}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

/**
 * Application entry point.  Defines our routes and delegates to
 * individual page components.  The callback route is used by
 * Futureverse Pass to complete the redirect flow.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/mystable"
        element={<ProtectedRoute><MyStable /></ProtectedRoute>}
      />
      <Route path="/callback" element={<div>Authenticating...</div>} />
    </Routes>
  );
}