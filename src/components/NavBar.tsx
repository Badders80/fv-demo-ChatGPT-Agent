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
      justifyContent: 'center',
      padding: '1.5rem clamp(1rem, 4vw, 3rem)', 
      background: '#fff', 
      borderBottom: '1px solid #f0f0f0',
      minHeight: '80px',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1200px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', flex: '1' }}>
          <img src={logoSvg} alt="Evolution Stables" style={{ height: '48px' }} />
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 'clamp(1rem, 2vw, 1.5rem)',
          flex: '2',
          justifyContent: 'center'
        }}>
        <Link to="/" style={{ 
          padding: '0.6rem 1.2rem', 
          background: '#f8f9fa', 
          borderRadius: '8px', 
          textDecoration: 'none', 
          color: '#495057',
          fontSize: '0.9rem',
          fontWeight: '500',
          border: '1px solid #e9ecef',
          transition: 'all 0.2s ease'
        }}>Home</Link>
        <Link to="/about" style={{ 
          padding: '0.6rem 1.2rem', 
          background: '#f8f9fa', 
          borderRadius: '8px', 
          textDecoration: 'none', 
          color: '#495057',
          fontSize: '0.9rem',
          fontWeight: '500',
          border: '1px solid #e9ecef',
          transition: 'all 0.2s ease'
        }}>About</Link>
        <Link to="/mystable" style={{ 
          padding: '0.6rem 1.2rem', 
          background: '#f8f9fa', 
          borderRadius: '8px', 
          textDecoration: 'none', 
          color: '#495057',
          fontSize: '0.9rem',
          fontWeight: '500',
          border: '1px solid #e9ecef',
          transition: 'all 0.2s ease'
        }}>MyStable</Link>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          flex: '1', 
          justifyContent: 'flex-end' 
        }}>
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
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'clamp(0.4rem, 1.5vw, 0.7rem)',
            padding: 'clamp(0.4rem, 1.2vw, 0.6rem) clamp(0.8rem, 2.5vw, 1.2rem)',
            border: '1px solid #000',
            borderRadius: '10px',
            background: '#fff',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}>
            <button
              onClick={handleSignIn}
              style={{ 
                color: '#495057', 
                fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)',
                fontWeight: '500',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0'
              }}
            >
              Sign in
            </button>
            <button 
              onClick={handleSignIn}
              style={{ 
                padding: 'clamp(0.4rem, 1.2vw, 0.6rem) clamp(0.8rem, 2.5vw, 1.2rem)', 
                background: '#4f46e5', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '7px',
                cursor: 'pointer',
                fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)',
                fontWeight: '500',
                whiteSpace: 'nowrap'
              }}
            >
              Get Started
            </button>
          </div>
        )}
      </div>
      </div>
    </nav>
  );
}
