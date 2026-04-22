'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { CheckCircle2, Shield, RadioTower, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState('NGO Staff');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Optional: Store role temporarily in displayName (Firebase standard practice for simple role storage)
      await updateProfile(userCredential.user, {
        displayName: role
      });
      router.push('/dashboard');
    } catch (error) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please enter an email and password to sign up.");
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: role
      });
      router.push('/dashboard');
    } catch (error) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen font-sans overflow-hidden">
      
      {/* Left Panel - 60% */}
      <div className="hidden lg:flex flex-col flex-[0.6] bg-sidebar text-white relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
        {/* Subtle Map Illustration Placeholder */}
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-primary opacity-20 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10 flex flex-col h-full p-12">
          <div className="flex items-center gap-2 mb-auto">
            <span className="text-3xl font-extrabold tracking-tight">RELIX</span>
          </div>

          <div className="mx-auto max-w-lg mt-10">
            <h1 className="text-5xl font-extrabold tracking-tight leading-snug mb-8">
              Intelligence<br /> for Relief Operations
            </h1>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/10 px-4 py-2 rounded-full text-sm font-medium">
                <CheckCircle2 size={16} className="text-low" /> Trusted by 40+ NGOs
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/10 px-4 py-2 rounded-full text-sm font-medium">
                <RadioTower size={16} className="text-primary" /> Real-time field data
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/10 px-4 py-2 rounded-full text-sm font-medium">
                <Shield size={16} className="text-emerald-400" /> Secure & encrypted
              </div>
            </div>
          </div>
          <div className="mt-auto"></div>
        </div>
      </div>

      {/* Right Panel - 40% */}
      <div className="flex flex-col flex-1 lg:flex-[0.4] bg-bg items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-sm bg-card p-8 rounded-2xl shadow-card border border-slate-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-sidebar mb-1">Welcome back</h2>
            <p className="text-sm text-text-light">Sign in to your RELIX account</p>
          </div>

          {/* Role Selector Tabs */}
          <div className="flex p-1 bg-slate-100 rounded-lg mb-6">
            {['NGO Staff', 'Volunteer', 'Admin'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 text-xs font-bold py-2 rounded-md transition-all ${
                  role === r
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 text-critical text-sm rounded-lg text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email address</label>
              <input
                type="email"
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">Password</label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pb-2 mt-2">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-600">
                <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                Remember me
              </label>
              <a href="#" className="font-semibold text-primary hover:text-primary-hover">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-2.5 rounded-lg transition-all shadow-md active:scale-[0.98] disabled:opacity-70 flex justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <span className="relative z-10 bg-white px-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
              Or continue with
            </span>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-2.5 rounded-lg transition-colors active:scale-[0.98]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>

          <p className="mt-8 text-center text-sm font-medium text-slate-500">
            Don't have an account?{' '}
            <button type="button" onClick={handleSignUp} className="font-bold text-primary hover:text-primary-hover">Sign Up Instead &rarr;</button>
          </p>
        </div>
      </div>
    </div>
  );
}
