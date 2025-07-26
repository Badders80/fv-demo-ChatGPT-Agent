import { useAuth } from '@futureverse/auth-react';
import { Link } from 'react-router-dom';

export function NavBar() {
  const { userSession, authClient, signIn } = useAuth();
  
  const handleLogout = async () => {
    try {
      await authClient.signOutPass({ flow: 'redirect' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSignIn = async () => {
    try {
      await signIn({ authFlow: 'redirect' });
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f0f0f0' }}>
      <div>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
        {userSession && <> | <Link to="/mystable">MyStable</Link></>}
      </div>
      <div>
        {userSession ? (
          <>
            <span>Wallet: {userSession.futurepass?.slice(0, 6)}...</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <span style={{ marginRight: '1rem' }}>Sign up/Login to unlock MyStable</span>
            <button onClick={handleSignIn}>Login</button>
          </>
        )}
      </div>
    </nav>
  );
}
