import { NavBar } from '../components/NavBar';

export function About() {
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
            About Us
          </h1>
          <div style={{ 
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <p style={{ 
              fontSize: '1.25rem', 
              color: '#6c757d', 
              lineHeight: '1.8',
              marginBottom: '2rem',
              fontWeight: '300'
            }}>
              Evolution Stables is a premier digital horse racing and breeding platform built on the Futureverse ecosystem.
            </p>
            <p style={{ 
              fontSize: '1.25rem', 
              color: '#6c757d', 
              lineHeight: '1.8',
              marginBottom: '2rem',
              fontWeight: '300'
            }}>
              We combine cutting-edge blockchain technology with immersive gaming experiences to create the ultimate virtual stable management platform.
            </p>
            <p style={{ 
              fontSize: '1.25rem', 
              color: '#6c757d', 
              lineHeight: '1.8',
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
