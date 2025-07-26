import { FutureverseAuthClient } from '@futureverse/auth';
import { createWagmiConfig } from '@futureverse/auth-react/wagmi';

export const authClient = new FutureverseAuthClient({
  clientId: import.meta.env.VITE_FUTUREVERSE_CLIENT_ID,
  environment: 'staging',
  redirectUri: 'http://localhost:5173/callback',
  postLogoutRedirectUri: 'http://localhost:5173',
});

export const wagmiConfig = createWagmiConfig({ authClient });