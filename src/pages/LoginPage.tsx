import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { user, signInWithEmail, signUpWithEmail } = useAuthContext()
  const navigate = useNavigate()

  if (user) {
    navigate('/dashboard')
    return null
  }

  const handleSignIn = async () => {
    setIsLoading(true)
    setError('')
    try {
      await signInWithEmail(email, password)
    } catch (err: any) {
      setError(err.message || 'Sign in failed')
    }
    setIsLoading(false)
  }

  const handleSignUp = async () => {
    setIsLoading(true)
    setError('')
    try {
      await signUpWithEmail(email, password)
    } catch (err: any) {
      setError(err.message || 'Sign up failed')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-indigo-100 rounded-lg mb-4">
            <span className="text-3xl">🎙️</span>
          </div>
          <h1 className="text-3xl font-bold text-indigo-600">MeetingMind</h1>
          <p className="text-gray-600 mt-2">Your AI-powered meeting companion</p>
        </div>
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        
        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
        
        <button
          onClick={handleSignIn}
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg mb-3 hover:bg-indigo-700 disabled:opacity-50 font-medium"
        >
          {isLoading ? 'Loading...' : 'Sign In'}
        </button>
        
        <button
          onClick={handleSignUp}
          disabled={isLoading}
          className="w-full bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 disabled:opacity-50 font-medium"
        >
          {isLoading ? 'Loading...' : 'Create Account'}
        </button>

        <p className="text-gray-600 text-center text-sm mt-4">No installation required. Works in your browser.</p>
      </div>
    </div>
  )
}