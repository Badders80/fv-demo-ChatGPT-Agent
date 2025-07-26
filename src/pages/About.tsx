import { NavBar } from '../components/NavBar';

export function About() {
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
              Evolution Stables is a premier digital horse racing and breeding platform built on the Futureverse ecosystem.
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
              Join our community and experience the future of digital horse racing!
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
