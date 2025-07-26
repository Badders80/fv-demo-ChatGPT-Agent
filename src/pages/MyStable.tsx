import { NavBar } from '../components/NavBar';
import { useAuth } from '@futureverse/auth-react';

export function MyStable() {
  const { userSession } = useAuth();

  return (
    <div>
      <NavBar />
      <section style={{ padding: '2rem' }}>
        <h1>My Stable</h1>
        <p>Welcome to your personal stable!</p>
        <p>Futurepass: {userSession?.futurepass}</p>
        <p>User ID: {userSession?.user?.profile?.sub}</p>
        <div style={{ marginTop: '2rem' }}>
          <h3>Your Assets</h3>
          <p>Asset management features coming soon...</p>
        </div>
      </section>
    </div>
  );
}
