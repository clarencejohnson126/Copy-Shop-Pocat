import { createClient } from '@supabase/supabase-js'

// Get Supabase URL and key from environment variables or use the hardcoded values as fallback
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ehpgkneoswqkhmyohply.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVocGdrbmVvc3dxa2hteW9ocGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MzQ2NDIsImV4cCI6MjA1OTIxMDY0Mn0.8vCIBaPPXhtdEt79o5kj5-kmMF1cCyi6c8wnFUn0W-Q'

// Create Supabase client with explicit auth configuration
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'pocat-auth-storage', // Explicit storage key for clarity
  }
})

// Development check to ensure Supabase connection is working
if (import.meta.env.DEV) {
  console.log('Supabase config initialized with URL:', supabaseUrl)
  
  // Check if Supabase is configured properly
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('Supabase auth event:', event, session)
  })
  
  // Log Supabase connection status
  supabase.auth.getSession().then(({ data, error }) => {
    if (error) {
      console.error('Supabase connection error:', error)
    } else {
      console.log('Supabase connection established', data)
    }
  })
  
  // Test the Supabase connection
  supabase.from('profiles').select('*', { count: 'exact' }).limit(1)
    .then(response => {
      if (response.error) {
        console.error('Supabase test query error:', response.error)
      } else {
        console.log('Supabase test query success, DB connected')
      }
    })
}
