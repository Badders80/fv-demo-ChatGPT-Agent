import { NavBar } from '../components/NavBar';
import { useAuth } from '@futureverse/auth-react';

export function Home() {
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn({ authFlow: 'redirect' });
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <section style={{ padding: '2rem' }}>
        <h1>Welcome to Evolution Stables</h1>
        <p>Discover our community and features.</p>
      </section>
      <section style={{ padding: '2rem' }}>
        <h2>Teaser: Your Stable</h2>
        <p>Login to access personalized assets and more.</p>
        <button onClick={handleSignIn}>Login with Futureverse Pass</button>
      </section>
    </div>
  );
}
