import { NavBar } from '../components/NavBar';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <NavBar />
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '4rem 3rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem'
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
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em'
          }}>
            Home
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#6c757d', 
            marginBottom: '0.75rem',
            fontWeight: '300'
          }}>
            Welcome to Evolution Stables!
          </p>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#adb5bd',
            fontWeight: '300'
          }}>
            Discover our community and features.
          </p>
        </section>

        <section style={{ 
          padding: '3rem', 
          background: '#fff', 
          borderRadius: '12px', 
          border: '1px solid #f0f0f0'
        }}>
          <h2 style={{ 
            fontSize: '1.75rem', 
            fontWeight: '400', 
            color: '#212529', 
            marginBottom: '1.5rem',
            letterSpacing: '-0.01em'
          }}>
            About
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#6c757d', 
            marginBottom: '2.5rem',
            lineHeight: '1.7',
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
          padding: '3rem', 
          background: '#fff', 
          borderRadius: '12px', 
          border: '1px solid #f0f0f0'
        }}>
          <h2 style={{ 
            fontSize: '1.75rem', 
            fontWeight: '400', 
            color: '#212529', 
            marginBottom: '1.5rem',
            letterSpacing: '-0.01em'
          }}>
            MyStable
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#6c757d', 
            marginBottom: '2.5rem',
            lineHeight: '1.7',
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
