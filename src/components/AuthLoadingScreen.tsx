import { NavBar } from './NavBar';

export function AuthLoadingScreen() {
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
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem',
        width: '100%'
      }}>
        <div style={{ 
          background: '#fff', 
          borderRadius: '12px', 
          padding: '3rem 2rem',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          maxWidth: '400px',
          width: '100%'
        }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #4f46e5',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1.5rem auto'
          }}></div>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '400', 
            color: '#212529', 
            marginBottom: '0.5rem',
            fontFamily: 'Arial, sans-serif'
          }}>
            Authenticating...
          </h2>
          <p style={{ 
            fontSize: '1rem', 
            color: '#6c757d', 
            lineHeight: '1.5',
            margin: 0,
            fontFamily: 'Arial, sans-serif'
          }}>
            Please wait while we verify your credentials
          </p>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      </div>
    </div>
  );
}
