import { NavBar } from '../components/NavBar';
import { useAuth } from '@futureverse/auth-react';

export function About() {
  const { userSession, signIn } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn({ authFlow: 'redirect' });
    } catch (error) {
      console.error('Sign in error:', error);
    }
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 100px)',
        boxSizing: 'border-box',
        gap: '2rem'
      }}>
        {/* Main About Section */}
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
            About Us
          </h1>
          <div style={{ 
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <p style={{ 
              fontSize: 'clamp(1rem, 2.2vw, 1.4rem)', 
              color: '#6c757d', 
              lineHeight: '1.7',
              marginBottom: '1.5rem',
              fontWeight: '300'
            }}>
              Evolution Stables is a platform for digital syndication and RWA tokenization of stables and horses.
            </p>
            <p style={{ 
              fontSize: 'clamp(1rem, 2.2vw, 1.4rem)', 
              color: '#6c757d', 
              lineHeight: '1.7',
              marginBottom: '1.5rem',
              fontWeight: '300'
            }}>
              We combine cutting-edge blockchain technology with immersive gaming experiences to create the ultimate virtual stable management platform.
            </p>
            <p style={{ 
              fontSize: 'clamp(1rem, 2.2vw, 1.4rem)', 
              color: '#6c757d', 
              lineHeight: '1.7',
              fontWeight: '300'
            }}>
              Discover community engagement, ownership opportunities, and more through our innovative platform.
            </p>
          </div>
        </section>

        {/* Assistant Link Section */}
        <section style={{ 
          width: '100%',
          padding: 'clamp(1.5rem, 4vw, 2rem) clamp(1.5rem, 4vw, 2rem)', 
          background: '#fff', 
          borderRadius: '12px', 
          border: '1px solid #e9ecef',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          textAlign: 'center',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          {userSession ? (
            <div>
              <h2 style={{ 
                fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
                fontWeight: '400', 
                color: '#212529', 
                marginBottom: '1rem',
                letterSpacing: '-0.01em'
              }}>
                Evolution Stables Assistant
              </h2>
              <p style={{ 
                fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
                color: '#6c757d', 
                lineHeight: '1.6',
                marginBottom: '1.5rem',
                fontWeight: '300'
              }}>
                Chat with our expert assistant on stables, digital syndication, and RWA tokenization.
              </p>
              <a 
                href="https://chatgpt.com/g/g-RgTQosqdN-evolution-stables-assistant" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <button style={{ 
                  padding: '0.75rem 2rem', 
                  background: '#4f46e5', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  transition: 'background-color 0.2s ease',
                  boxShadow: '0 2px 4px rgba(79, 70, 229, 0.2)'
                }}
                onMouseEnter={(e) => (e.target as HTMLButtonElement).style.background = '#3730a3'}
                onMouseLeave={(e) => (e.target as HTMLButtonElement).style.background = '#4f46e5'}
                >
                  Chat with Assistant
                </button>
              </a>
            </div>
          ) : (
            <div>
              <h2 style={{ 
                fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
                fontWeight: '400', 
                color: '#212529', 
                marginBottom: '1rem',
                letterSpacing: '-0.01em'
              }}>
                Evolution Stables Assistant
              </h2>
              <p style={{ 
                fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
                color: '#6c757d', 
                lineHeight: '1.6',
                marginBottom: '1.5rem',
                fontWeight: '300'
              }}>
                Login to access our Evolution Stables Assistant for expert insights on stables, digital syndication, and tokenization.
              </p>
              <button
                onClick={handleSignIn}
                style={{ 
                  padding: '0.75rem 2rem', 
                  background: '#4f46e5', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(79, 70, 229, 0.2)',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.target as HTMLButtonElement).style.background = '#3730a3'}
                onMouseLeave={(e) => (e.target as HTMLButtonElement).style.background = '#4f46e5'}
              >
                Sign In to Access Assistant
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
