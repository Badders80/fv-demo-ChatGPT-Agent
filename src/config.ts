/*
 * Configuration for Futureverse authentication and wagmi integration.
 *
 * This file exports two singletons:
 * - authClient: used by the FutureverseAuthProvider to handle
 *   authentication with the Futureverse Pass. The client ID is
 *   provided via an environment variable defined in `.env.local`.
 * - wagmiConfig: a wagmi configuration generated from the authClient
 *   to enable Web3 wallet support.  Using staging environment and
 *   local redirect URIs makes it easy to test in development. See
 *   README.md for more details on these settings.
 */

import { FutureverseAuthClient } from '@futureverse/auth';
import { createWagmiConfig } from '@futureverse/auth-react/wagmi';

// Instantiate a FutureverseAuthClient using environment variables.  The
// clientId should be set in `.env.local` as VITE_FUTUREVERSE_CLIENT_ID.
export const authClient = new FutureverseAuthClient({
  clientId: import.meta.env.VITE_FUTUREVERSE_CLIENT_ID,
  environment: 'staging',
  redirectUri: 'http://localhost:5173/',
  postLogoutRedirectUri: 'http://localhost:5173/',
});

// Create a wagmi configuration bound to the authClient.  This enables
// Ethereum wallet connectivity when Web3 is needed.  If you encounter
// missing polyfills for Node globals (such as buffer), ensure
// `vite-plugin-node-polyfills` is added to `vite.config.ts`.
export const wagmiConfig = createWagmiConfig({ authClient });