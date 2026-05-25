import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate('/dashboard')
    })
  }, [navigate])

  const handleSignIn = async () => {
    setIsLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else navigate('/dashboard')
    setIsLoading(false)
  }

  const handleSignUp = async () => {
    setIsLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setError(error.message)
    else navigate('/dashboard')
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-2xl mb-4">
            <span className="text-3xl">🎙️</span>
          </div>
          <h1 className="text-2xl font-bold text-indigo-600">MeetingMind</h1>
          <p className="text-gray-500 text-sm mt-1">Your AI-powered meeting companion</p>
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          onClick={handleSignIn}
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg mb-2 hover:bg-indigo-700 disabled:opacity-50 font-medium text-sm"
        >
          {isLoading ? 'Loading...' : 'Sign In'}
        </button>

        <button
          onClick={handleSignUp}
          disabled={isLoading}
          className="w-full bg-white text-indigo-600 py-2 rounded-lg border border-indigo-600 hover:bg-indigo-50 disabled:opacity-50 font-medium text-sm"
        >
          {isLoading ? 'Loading...' : 'Create Account'}
        </button>

        <p className="text-gray-400 text-xs text-center mt-6">
          No installation required. Works in your browser.
        </p>
      </div>
    </div>
  )
}