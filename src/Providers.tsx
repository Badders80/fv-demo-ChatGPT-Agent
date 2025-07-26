/*
 * Global providers for the Evolution Stables app.
 *
 * This component wraps your React tree with all the necessary
 * context providers: TanStack Query for data fetching, wagmi for
 * Web3, Futureverse authentication for Pass login, the Auth UI
 * provider for ready‑made auth components, and React Router.
 */

import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  FutureverseAuthProvider,
} from '@futureverse/auth-react';
import { WagmiProvider, type Config } from 'wagmi';
import { BrowserRouter as Router } from 'react-router-dom';
import { authClient, wagmiConfig } from './config';

// Create a single TanStack Query client.  This should live for the
// lifetime of the application to ensure query deduplication and
// caching works as expected.
const queryClient = new QueryClient();

/**
 * Providers component wraps children in all required context providers.
 *
 * Usage:
 *
 * ```tsx
 * <Providers>
 *   <App />
 * </Providers>
 * ```
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    wagmiConfig.then(setConfig);
  }, []);

  if (!config) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <FutureverseAuthProvider authClient={authClient}>
          <Router>{children}</Router>
        </FutureverseAuthProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}