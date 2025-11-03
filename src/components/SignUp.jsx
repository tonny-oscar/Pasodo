import { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../firebase'

const SignUp = ({ onSuccess, onSwitchToSignIn }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleEmailSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      onSuccess()
    } catch (err) {
      let errorMessage = err.message
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists. Please sign in instead.'
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters long.'
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.'
      }
      setError(errorMessage)
    }
    setLoading(false)
  }

  const handleGoogleSignUp = async () => {
    setLoading(true)
    setError('')

    try {
      await signInWithPopup(auth, googleProvider)
      onSuccess()
    } catch (err) {
      let errorMessage = err.message
      if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-up was cancelled. Please try again.'
      } else if (err.code === 'auth/popup-blocked') {
        errorMessage = 'Popup was blocked. Please allow popups and try again.'
      }
      setError(errorMessage)
    }
    setLoading(false)
  }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: '6px'
        }}>
          Join Our Farm
        </h2>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          Create your farm management account
        </p>
      </div>

      <form onSubmit={handleEmailSignUp} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            fontSize: '13px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              padding: '10px 12px',
              fontSize: '14px',
              outline: 'none'
            }}
            placeholder="your@email.com"
            required
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            fontSize: '13px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              padding: '10px 12px',
              fontSize: '14px',
              outline: 'none'
            }}
            placeholder="••••••••"
            required
          />
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>
            Password must be at least 6 characters long
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '13px',
            marginBottom: '16px'
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: loading ? '#9ca3af' : '#16a34a',
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '14px',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        margin: '20px 0',
        textAlign: 'center'
      }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#d1d5db' }}></div>
        <span style={{ padding: '0 12px', color: '#6b7280', fontSize: '13px' }}>or</span>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#d1d5db' }}></div>
      </div>

      <button
        onClick={handleGoogleSignUp}
        disabled={loading}
        style={{
          width: '100%',
          backgroundColor: 'white',
          border: '1px solid #d1d5db',
          color: '#374151',
          padding: '12px',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '14px',
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continue with Google
      </button>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={onSwitchToSignIn}
          style={{
            background: 'none',
            border: 'none',
            color: '#16a34a',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Already have an account? Sign in
        </button>
      </div>
    </div>
  )
}

export default SignUp