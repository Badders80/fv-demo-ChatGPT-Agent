import { NavBar } from '../components/NavBar';
import { Link } from 'react-router-dom';

export function Home() {
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
        maxWidth: 'min(90vw, 1000px)', 
        margin: '0 auto', 
        padding: 'clamp(1rem, 3vw, 2rem) clamp(1rem, 3vw, 2rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(1rem, 2vw, 1.5rem)',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 100px)',
        boxSizing: 'border-box'
      }}>
        <section style={{ 
          width: '100%',
          maxWidth: '800px',
          padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.5rem)', 
          background: '#fff', 
          borderRadius: '12px', 
          border: '1px solid #e9ecef',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: 'clamp(250px, 30vh, 350px)',
          margin: '0 auto'
        }}>
          <h1 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3rem)', 
            fontWeight: '300', 
            color: '#212529', 
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            Home
          </h1>
          <p style={{ 
            fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', 
            color: '#6c757d', 
            marginBottom: '0.75rem',
            fontWeight: '300'
          }}>
            Welcome to Evolution Stables!
          </p>
          <p style={{ 
            fontSize: 'clamp(1rem, 2vw, 1.3rem)', 
            color: '#adb5bd',
            fontWeight: '300'
          }}>
            Discover our community and features.
          </p>
        </section>

        <section style={{ 
          width: '100%',
          maxWidth: '800px',
          padding: 'clamp(1.5rem, 3vw, 2rem)', 
          background: '#fff', 
          borderRadius: '12px', 
          border: '1px solid #e9ecef',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          margin: '0 auto'
        }}>
          <h2 style={{ 
            fontSize: 'clamp(1.3rem, 3vw, 1.6rem)', 
            fontWeight: '400', 
            color: '#212529', 
            marginBottom: '0.8rem',
            letterSpacing: '-0.01em'
          }}>
            About
          </h2>
          <p style={{ 
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', 
            color: '#6c757d', 
            marginBottom: '1.2rem',
            lineHeight: '1.5',
            fontWeight: '300'
          }}>
            Learn more about Evolution Stables - a premier digital horse racing and breeding platform built on the Futureverse ecosystem.
          </p>
          <Link 
            to="/about" 
            style={{ 
              display: 'inline-block',
              padding: '0.75rem 2rem', 
              background: '#f8f9fa', 
              color: '#495057', 
              textDecoration: 'none', 
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: '500',
              border: '1px solid #e9ecef'
            }}
          >
            Learn More
          </Link>
        </section>

        <section style={{ 
          width: '100%',
          maxWidth: '800px',
          padding: 'clamp(1.5rem, 3vw, 2rem)', 
          background: '#fff', 
          borderRadius: '12px', 
          border: '1px solid #e9ecef',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          margin: '0 auto'
        }}>
          <h2 style={{ 
            fontSize: 'clamp(1.3rem, 3vw, 1.6rem)', 
            fontWeight: '400', 
            color: '#212529', 
            marginBottom: '0.8rem',
            letterSpacing: '-0.01em'
          }}>
            MyStable
          </h2>
          <p style={{ 
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', 
            color: '#6c757d', 
            marginBottom: '1.2rem',
            lineHeight: '1.5',
            fontWeight: '300'
          }}>
            Access your personal stable and manage your assets.
          </p>
          <Link to="/mystable">
            <button style={{ 
              padding: '0.75rem 2rem', 
              background: '#495057',
              color: '#fff',
              border: 'none', 
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: '500'
            }}>
              Go to MyStable
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
}
