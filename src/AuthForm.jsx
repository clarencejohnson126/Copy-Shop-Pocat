import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient' // Using the main Supabase client
import { useLanguage } from './contexts/LanguageContext'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const { t } = useLanguage()
  
  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (data?.session) {
        console.log('User is already logged in:', data.session)
        setMessage(t('auth.success'))
      }
      if (error) {
        console.error('Session check error:', error)
      }
    }
    
    checkSession()
  }, [t])

  const signUp = async () => {
    if (!email || !password) {
      setError('Email and password are required')
      return
    }
    
    setLoading(true)
    setError('')
    setMessage('')
    
    try {
      console.log('Attempting signup with:', { email })
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            username: email.split('@')[0]
          }
        }
      })
      
      console.log('Sign up response:', { data, error })
      
      if (error) {
        setError(error.message)
        console.error('Sign up error:', error)
      } else {
        if (data?.user?.identities?.length === 0) {
          setError(t('auth.email_in_use'))
        } else if (data?.user?.confirmed_at) {
          setMessage(t('auth.already_confirmed'))
        } else {
          console.log('Sign up successful:', data)
          setMessage(t('auth.check_inbox'))
          
          if (import.meta.env.DEV) {
            setTimeout(() => {
              setMessage(t('auth.check_inbox') + ' ' + t('auth.dev_signin_option'))
            }, 3000)
          }
        }
      }
    } catch (err) {
      setError(t('auth.error.unexpected'))
      console.error('Unexpected error during sign up:', err)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async () => {
    if (!email || !password) {
      setError('Email and password are required')
      return
    }
    
    setLoading(true)
    setError('')
    setMessage('')
    
    try {
      console.log('Attempting login with:', { email })
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      console.log('Sign in response:', { data, error })
      
      if (error) {
        setError(error.message)
        console.error('Sign in error:', error)
      } else {
        setMessage(t('auth.success'))
        console.log('Logged in successfully:', data)
        
        // You could redirect or update UI state here
        setTimeout(() => {
          window.location.href = '/'
        }, 1500)
      }
    } catch (err) {
      setError(t('auth.error.unexpected'))
      console.error('Unexpected error during sign in:', err)
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode)
    setError('')
    setMessage('')
  }

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {message}
        </div>
      )}
      
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={t('auth.email')}
        className="border p-3 rounded"
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder={t('auth.password')}
        type="password"
        className="border p-3 rounded"
      />
      
      {isRegisterMode ? (
        <>
          <button 
            onClick={signUp} 
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded font-medium"
            disabled={loading}
          >
            {loading ? t('auth.loading') : t('auth.signup')}
          </button>
          <div className="text-center mt-2">
            <button 
              onClick={toggleMode}
              className="text-sm text-blue-600 hover:underline"
            >
              {t('auth.switch_to_login')}
            </button>
          </div>
        </>
      ) : (
        <>
          <button 
            onClick={signIn} 
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-medium"
            disabled={loading}
          >
            {loading ? t('auth.loading') : t('auth.signin')}
          </button>
          <div className="text-center mt-2">
            <button 
              onClick={toggleMode}
              className="text-sm text-green-600 hover:underline"
            >
              {t('auth.switch_to_register')}
            </button>
          </div>
        </>
      )}
      
      <div className="text-center mt-4 text-sm text-gray-600">
        <p>{t('auth.test_note')}</p>
        <p>{t('auth.ui_note')}</p>
      </div>
    </div>
  )
}
