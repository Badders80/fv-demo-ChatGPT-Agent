import { useAuth } from '@futureverse/auth-react';

interface AuthenticationRequiredProps {
  onClose: () => void;
}

export function AuthenticationRequired({ onClose }: AuthenticationRequiredProps) {
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn({ authFlow: 'redirect' });
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff',
        padding: '4rem 3rem',
        borderRadius: '12px',
        border: '1px solid #f0f0f0',
        textAlign: 'center',
        maxWidth: '500px',
        width: '90%',
        position: 'relative'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#6c757d',
            padding: '0.5rem',
            borderRadius: '8px',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '300'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#f8f9fa';
            e.currentTarget.style.color = '#212529';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#6c757d';
          }}
        >
          ×
        </button>
        <h2 style={{ 
          margin: '0 0 2rem 0', 
          fontSize: '2.5rem', 
          fontWeight: '300',
          color: '#212529',
          letterSpacing: '-0.02em'
        }}>
          Authentication Required
        </h2>
        <p style={{ 
          margin: '0 0 3rem 0', 
          color: '#6c757d',
          lineHeight: '1.8',
          fontSize: '1.25rem',
          fontWeight: '300'
        }}>
          Please sign in to view your stable and manage your assets.
        </p>
        <button 
          onClick={handleSignIn}
          style={{
            background: '#212529',
            color: '#fff',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: '400',
            letterSpacing: '0.02em'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#343a40'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#212529'}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
