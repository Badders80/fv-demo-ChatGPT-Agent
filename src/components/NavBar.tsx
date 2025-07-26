import { useAuth } from '@futureverse/auth-react';
import { Link } from 'react-router-dom';
import logoSvg from '../assets/Logo-and-Evolution-Gold.svg';

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
    <nav style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '1.5rem 3rem', 
      background: '#fff', 
      borderBottom: '1px solid #f0f0f0',
      minHeight: '80px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', flex: '1' }}>
        <img src={logoSvg} alt="Evolution Stables" style={{ height: '32px' }} />
      </div>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '2rem',
        flex: '1',
        justifyContent: 'center'
      }}>
        <Link to="/" style={{ 
          padding: '0.75rem 1.5rem', 
          background: '#f8f9fa', 
          borderRadius: '8px', 
          textDecoration: 'none', 
          color: '#495057',
          fontSize: '0.95rem',
          fontWeight: '500',
          border: '1px solid #e9ecef',
          transition: 'all 0.2s ease'
        }}>Home</Link>
        <Link to="/about" style={{ 
          padding: '0.75rem 1.5rem', 
          background: '#f8f9fa', 
          borderRadius: '8px', 
          textDecoration: 'none', 
          color: '#495057',
          fontSize: '0.95rem',
          fontWeight: '500',
          border: '1px solid #e9ecef',
          transition: 'all 0.2s ease'
        }}>About</Link>
        <Link to="/mystable" style={{ 
          padding: '0.75rem 1.5rem', 
          background: '#f8f9fa', 
          borderRadius: '8px', 
          textDecoration: 'none', 
          color: '#495057',
          fontSize: '0.95rem',
          fontWeight: '500',
          border: '1px solid #e9ecef',
          transition: 'all 0.2s ease'
        }}>MyStable</Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', flex: '1', justifyContent: 'flex-end' }}>
        {userSession ? (
          <>
            <span style={{ marginRight: '1rem', color: '#6c757d', fontSize: '0.9rem' }}>
              {userSession.futurepass?.slice(0, 6)}...
            </span>
            <button 
              onClick={handleLogout} 
              style={{ 
                padding: '0.75rem 1.5rem', 
                background: '#fff', 
                color: '#dc3545',
                border: '1px solid #e9ecef', 
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '500'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ 
              color: '#495057', 
              fontSize: '0.95rem',
              fontWeight: '500'
            }}>
              Sign in
            </span>
            <button 
              onClick={handleSignIn}
              style={{ 
                padding: '0.75rem 1.5rem', 
                background: '#4f46e5', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '500'
              }}
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
