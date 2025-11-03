import { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'

const AuthModal = ({ isOpen, onClose, onSuccess, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login')

  const handleSuccess = () => {
    onSuccess()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '350px',
        width: '100%',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#9ca3af'
          }}
        >
          ✕
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: '#dcfce7',
            padding: '12px',
            borderRadius: '50%',
            marginBottom: '12px'
          }}>
            <span style={{ fontSize: '24px' }}>🥑</span>
          </div>
        </div>

        {isLogin ? (
          <SignIn 
            onSuccess={handleSuccess}
            onSwitchToSignUp={() => setIsLogin(false)}
          />
        ) : (
          <SignUp 
            onSuccess={handleSuccess}
            onSwitchToSignIn={() => setIsLogin(true)}
          />
        )}
      </div>
    </div>
  )
}

export default AuthModal