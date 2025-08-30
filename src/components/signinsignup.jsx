import React, { useEffect, useState } from 'react'
import { auth } from './firebase'
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  signOut
} from 'firebase/auth'

const SignInSignUp = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    return onAuthStateChanged(auth, setUser)
  }, [])

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' })
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAuth = async (e) => {
    e.preventDefault()

      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match')
        }
        const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
        if (formData.name.trim()) {
          await updateProfile(user, { displayName: formData.name.trim() })
        }
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password)
      }
      resetForm()
  }

  const handleSignOut = async () => {
      await signOut(auth)
  }
   
  const toggleMode = () => {
    setIsSignUp(!isSignUp)
  }

  const inputClass = 'h-11 w-full rounded-xl border border-slate-800 bg-black/40 px-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-slate-600'

  if (user) {
    return (
      <div className="my-1 bg-slate-900 rounded-3xl">
        <div className="w-full text-white  shadow-xl p-10 ">
          <h2 className="text-2xl font-bold mb-6">Account</h2>
          <div className="space-y-4">
            <div className="bg-gray-700 rounded-2xl p-4">
              <div className="text-lg font-semibold">{user.displayName || 'User'}</div>
              <div className="text-slate-300 text-sm">{user.email}</div>
            </div>
            <button onClick={handleSignOut} disabled={loading} className='w-full h-10 rounded-full border border-gray-800 bg-gradient-to-r from-gray-900 to-blue-900 text-gray-200 font-medium transition-opacity disabled:opacity-60 hover:opacity-90'>
              {loading ? 'Signing out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="my-1 bg-slate-900">
      <div className="w-full text-white bg-white/5 shadow-xl p-10 rounded-3xl">
        <div className="flex items-center gap-10 mb-6">
          <h2 className="text-2xl font-bold">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
          <button onClick={toggleMode} className="text-sm underline text-slate-300 hover:text-white">
            {isSignUp ? 'Have an account? Sign in' : 'Create account'}
          </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block mb-2 text-sm text-slate-300">Name</label>
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className={inputClass}
                placeholder="Your name"
              />
            </div>
          )}
          
          <div>
            <label className="block mb-2 text-sm text-slate-300">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm text-slate-300">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className={inputClass}
              placeholder="Enter your password"
            />
          </div>
          
          {isSignUp && (
            <div >
              <label className="block mb-2 text-sm text-slate-300">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className={inputClass}
                placeholder="Confirm your password"
              />
            </div>
          )}

          <button type="submit" disabled={loading} className='w-full h-10 rounded-full  bg-gradient-to-l from-gray-900 to-blue-900 text-gray-200  hover:opacity-80'>
            {loading 
              ? (isSignUp ? 'Creating account...' : 'Signing in...') 
              : (isSignUp ? 'Sign Up' : 'Sign In')
            }
          </button>
        </form>
      </div>
    </div>
  )
}
export default SignInSignUp


