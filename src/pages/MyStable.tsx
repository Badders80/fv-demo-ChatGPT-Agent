import { NavBar } from '../components/NavBar';
import { AuthenticationRequired } from '../components/AuthenticationRequired';
import { useAuth } from '@futureverse/auth-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function MyStable() {
  const { userSession } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  // Show the modal when user visits MyStable page without being logged in
  useEffect(() => {
    if (!userSession) {
      setShowAuthModal(true);
    }
  }, [userSession]);

  const handleCloseAuth = () => {
    setShowAuthModal(false);
    // Redirect to home page when closing the modal without authenticating
    navigate('/');
  };

  const handleShowAuth = () => {
    setShowAuthModal(true);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f1f3f4', 
      display: 'flex', 
      flexDirection: 'column',
      width: '100%'
    }}>
      <NavBar />
      <div style={{ 
        flex: 1,
        width: '100%',
        maxWidth: 'min(90vw, 800px)', 
        margin: '0 auto', 
        padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 4vw, 2rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 100px)',
        boxSizing: 'border-box'
      }}>
        <section style={{ 
          width: '100%',
          padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.5rem)', 
          background: '#fff', 
          borderRadius: '12px', 
          border: '1px solid #e9ecef',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          textAlign: 'center',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          <h1 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3rem)', 
            fontWeight: '300', 
            color: '#212529', 
            marginBottom: '2rem',
            letterSpacing: '-0.02em'
          }}>
            My Stable
          </h1>
          <div style={{ 
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {userSession ? (
              <>
                <p style={{ 
                  fontSize: 'clamp(0.95rem, 2vw, 1.2rem)', 
                  color: '#6c757d', 
                  lineHeight: '1.6',
                  marginBottom: '0.8rem',
                  fontWeight: '300'
                }}>
                  Futurepass: {userSession?.futurepass}
                </p>
                <p style={{ 
                  fontSize: 'clamp(0.95rem, 2vw, 1.2rem)', 
                  color: '#6c757d', 
                  lineHeight: '1.6',
                  marginBottom: '2rem',
                  fontWeight: '300'
                }}>
                  User ID: {userSession?.user?.profile?.sub || 'N/A'}
                </p>
                <div>
                  <h3 style={{ 
                    fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', 
                    fontWeight: '300', 
                    color: '#212529', 
                    marginBottom: '1rem',
                    letterSpacing: '-0.01em'
                  }}>
                    Your Assets
                  </h3>
                  <p style={{ 
                    fontSize: 'clamp(0.95rem, 2vw, 1.2rem)', 
                    color: '#6c757d',
                    lineHeight: '1.6',
                    fontWeight: '300'
                  }}>
                    Asset management features coming soon...
                  </p>
                </div>
              </>
            ) : (
              <>
                <p style={{ 
                  fontSize: 'clamp(1rem, 2.2vw, 1.4rem)', 
                  color: '#6c757d', 
                  lineHeight: '1.7',
                  marginBottom: '2rem',
                  fontWeight: '300'
                }}>
                  Please sign in to view your stable and manage your assets.
                </p>
                <button 
                  onClick={handleShowAuth}
                  style={{
                    padding: '1rem 2rem',
                    background: '#212529',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '400',
                    letterSpacing: '0.02em'
                  }}
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </section>
      </div>
      {!userSession && showAuthModal && <AuthenticationRequired onClose={handleCloseAuth} />}
    </div>
  );
}
