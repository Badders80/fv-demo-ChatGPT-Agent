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
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <NavBar />
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '4rem 3rem'
      }}>
        <section style={{ 
          padding: '4rem 3rem', 
          background: '#fff', 
          borderRadius: '12px', 
          border: '1px solid #f0f0f0',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: '300', 
            color: '#212529', 
            marginBottom: '3rem',
            letterSpacing: '-0.02em'
          }}>
            My Stable
          </h1>
          <div style={{ 
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {userSession ? (
              <>
                <p style={{ 
                  fontSize: '1.25rem', 
                  color: '#6c757d', 
                  lineHeight: '1.8',
                  marginBottom: '1rem',
                  fontWeight: '300'
                }}>
                  Futurepass: {userSession?.futurepass}
                </p>
                <p style={{ 
                  fontSize: '1.25rem', 
                  color: '#6c757d', 
                  lineHeight: '1.8',
                  marginBottom: '3rem',
                  fontWeight: '300'
                }}>
                  User ID: {userSession?.user?.profile?.sub || 'N/A'}
                </p>
                <div>
                  <h3 style={{ 
                    fontSize: '2rem', 
                    fontWeight: '300', 
                    color: '#212529', 
                    marginBottom: '1.5rem',
                    letterSpacing: '-0.01em'
                  }}>
                    Your Assets
                  </h3>
                  <p style={{ 
                    fontSize: '1.25rem', 
                    color: '#6c757d',
                    lineHeight: '1.8',
                    fontWeight: '300'
                  }}>
                    Asset management features coming soon...
                  </p>
                </div>
              </>
            ) : (
              <>
                <p style={{ 
                  fontSize: '1.25rem', 
                  color: '#6c757d', 
                  lineHeight: '1.8',
                  marginBottom: '3rem',
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
