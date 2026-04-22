import { useState } from 'react'
import { supabase } from "../supabase"
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, LogIn, Sparkles, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    if (profile?.role !== 'admin') {
      alert('Access denied')
      await supabase.auth.signOut()
      setLoading(false)
      return
    }

    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0a0a1a]">
      <div className="w-full max-w-md relative">

        {/* Glow border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9] rounded-2xl blur opacity-40" />

        {/* Card */}
        <div className="relative bg-white/3 backdrop-blur-xl border border-white/8 rounded-2xl p-8 space-y-7">

          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-blue-300 text-xs font-medium">
                Admin Portal
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white">
              Welcome Back
            </h1>

            <p className="text-gray-400 text-sm">
              Sign in to manage your portfolio
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 uppercase tracking-wider">
                Email
              </label>

              <div className="flex items-center bg-white/3 border border-white/8 rounded-xl overflow-hidden focus-within:border-blue-500/60 transition-colors">
                <Mail className="w-4 h-4 text-gray-500 ml-4" />
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent px-3 py-3 text-white placeholder-gray-500 text-sm outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 uppercase tracking-wider">
                Password
              </label>

              <div className="flex items-center bg-white/3 border border-white/8 rounded-xl overflow-hidden focus-within:border-blue-500/60 transition-colors">
                <Lock className="w-4 h-4 text-gray-500 ml-4" />

                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent px-3 py-3 text-white placeholder-gray-500 text-sm outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="mr-4 text-gray-500 hover:text-white transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full mt-2 group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9] rounded-xl blur opacity-70 group-hover:opacity-100 transition" />

              <div className="relative h-11 bg-[#0a0a1a] rounded-xl border border-white/8 flex items-center justify-center gap-2 overflow-hidden">
                <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-blue-500/10" />

                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="text-sm font-medium text-white">
                      Sign In
                    </span>
                    <LogIn className="w-4 h-4 text-white group-hover:translate-x-1 transition" />
                  </>
                )}
              </div>
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}
