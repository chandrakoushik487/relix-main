'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import {
  CheckCircle2,
  Shield,
  RadioTower,
  Eye,
  EyeOff,
  Activity,
  ArrowRight,
  Globe,
  Lock,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { normalizeFirebaseError } from '@/lib/firebaseError';

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading, setRole: updateGlobalRole } = useAuth();
  
  // Sync mode with URL parameter ?mode=signup or ?mode=login
  const [mode, setMode] = useState('login');
  const [role, setRole] = useState('NGO Staff');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(null); // 'email', 'google', 'reset'
  const [error, setError] = useState(null);

  // Synchronize mode from URL
  useEffect(() => {
    const urlMode = searchParams.get('mode');
    if (urlMode === 'signup') setMode('signup');
    else if (urlMode === 'login') setMode('login');
  }, [searchParams]);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      handleRoleRedirect(user);
    }
  }, [user, authLoading]);

  const handleRoleRedirect = async (currentUser) => {
    try {
      // Priority 1: Firestore
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      let finalRole = 'NGO Staff';
      
      if (userDoc.exists()) {
        finalRole = userDoc.data().role;
      } else {
        // Priority 2: localStorage
        finalRole = localStorage.getItem('userRole') || 'NGO Staff';
      }

      updateGlobalRole(finalRole);
      localStorage.setItem('userRole', finalRole);

      if (finalRole === 'Volunteer') {
        router.push('/volunteer/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error("Redirect logic failed:", err);
      router.push('/dashboard'); // Safe fallback
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError({ message: 'Please enter a valid email address.' });
      return;
    }
    
    setLoading('email');
    setError(null);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Sign in successful:", userCredential.user.uid);
      // Redirect will be handled by useEffect
    } catch (err) {
      console.error("Sign in error object:", err);
      const normalized = normalizeFirebaseError(err, 'Unable to sign in. Please check your credentials.');
      console.error("Normalized error:", normalized);
      setError(normalized);
      setLoading(null);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError({ message: 'Please enter a valid email address.' });
      return;
    }
    if (password.length < 6) {
      setError({ message: 'Password must be at least 6 characters.' });
      return;
    }

    setLoading('email');
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Create user profile in Firestore
      await setDoc(doc(db, 'users', newUser.uid), {
        email: newUser.email,
        role: role,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        displayName: email.split('@')[0]
      });

      localStorage.setItem('userRole', role);
      // Redirect will be handled by useEffect
    } catch (err) {
      console.error("Sign up error:", err);
      setError(normalizeFirebaseError(err, 'Unable to create account.'));
      setLoading(null);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading('google');
    setError(null);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        // New user from Google - use the currently selected role in the UI
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          role: role,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        localStorage.setItem('userRole', role);
      } else {
        // Existing user - sync localStorage with Firestore role
        const existingRole = userDoc.data().role;
        localStorage.setItem('userRole', existingRole);
      }
      // Redirect handled by useEffect
    } catch (err) {
      console.error("Google sign in error:", err);
      setError(normalizeFirebaseError(err, 'Google authentication failed.'));
      setLoading(null);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError({ message: 'Please enter your email address first.' });
      return;
    }
    setLoading('reset');
    try {
      await sendPasswordResetEmail(auth, email);
      setError({ message: 'Password reset email sent!', isSuccess: true });
    } catch (err) {
      setError(normalizeFirebaseError(err, 'Unable to send reset email.'));
    } finally {
      setLoading(null);
    }
  };

  const isFormDisabled = loading !== null || authLoading;

  return (
    <div className="flex min-h-screen bg-[#030303] text-white overflow-hidden selection:bg-indigo-500/30">
      {/* Left Panel - Brand & Visuals */}
      <div className="hidden lg:flex flex-col flex-[0.6] relative p-16 overflow-hidden border-r border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(79,70,229,0.15),transparent_70%)]"></div>
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] animate-pulse"></div>
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-24 group cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)] group-hover:scale-110 transition-transform">
              <Activity className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tighter font-display">RELIX</span>
          </div>

          <div className="max-w-xl">
            <h1 className="text-6xl font-bold tracking-tight leading-[0.9] mb-10 font-display">
              The Command Center<br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">for Human Resilience.</span>
            </h1>
            
            <div className="space-y-6">
              {[
                { icon: Shield, text: 'Enterprise-grade security for field operations' },
                { icon: RadioTower, text: 'Real-time synchronization across teams' },
                { icon: Globe, text: 'Multi-region disaster response coordination' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-zinc-400 group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-indigo-400 border border-white/5 group-hover:border-indigo-500/50 transition-colors">
                    <item.icon size={16} />
                  </div>
                  <span className="text-sm font-medium group-hover:text-zinc-200 transition-colors">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-20 border-t border-white/5">
            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Core Resilience Protocol Active</p>
            <div className="flex gap-4">
              <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-ping"></div>
                System Operational
              </div>
              <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-500 uppercase tracking-wider">
                v2.4.0-PRO
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] opacity-20 pointer-events-none"></div>
        
        <div className="w-full max-w-[400px] relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-display mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-zinc-500 text-sm">
              {mode === 'login' 
                ? 'Enter your credentials to access RELIX' 
                : 'Join the global network of resilience teams'}
            </p>
          </div>

          {/* Role Selector */}
          <div className="flex p-1.5 bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl mb-8">
            {['NGO Staff', 'Volunteer'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                disabled={isFormDisabled && mode === 'login'} // Allow role change during signup if not loading
                className={`flex-1 text-[11px] font-bold py-2.5 rounded-xl transition-all uppercase tracking-wider ${
                  role === r
                    ? 'bg-zinc-800 text-white border border-white/10 shadow-lg'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {error && (
            <div className={`mb-6 p-4 rounded-xl border flex items-start gap-3 animate-in fade-in slide-in-from-top-2 ${
              error.isSuccess 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                : 'bg-red-500/10 border-red-500/20 text-red-500'
            }`}>
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <p className="text-sm font-medium">
                {error.message}
                {error.code && <span className="block text-[10px] opacity-70 mt-1 uppercase tracking-tighter">Error Code: {error.code}</span>}
              </p>
            </div>
          )}

          <form onSubmit={mode === 'login' ? handleSignIn : handleSignUp} className="space-y-6">
            <fieldset disabled={isFormDisabled} className="space-y-6 border-none p-0 m-0">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@organization.org"
                  required
                  autoComplete="email"
                  className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all disabled:opacity-50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Password</label>
                  {mode === 'login' && (
                    <button 
                      type="button"
                      onClick={handleResetPassword}
                      className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest transition-colors"
                    >
                      Reset?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all pr-12 disabled:opacity-50"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 group disabled:opacity-50 disabled:hover:bg-white"
              >
                {loading === 'email' ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Access Protocol' : 'Initialize Account'}</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </fieldset>
          </form>

          <div className="relative my-10 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <span className="relative z-10 bg-[#030303] px-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
              Or continue with
            </span>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isFormDisabled}
            className="w-full flex items-center justify-center gap-3 bg-zinc-900/50 border border-white/5 hover:border-white/10 text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-50"
          >
            {loading === 'google' ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" opacity="0.8" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor" opacity="0.6" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor" opacity="0.4" />
                </svg>
                <span className="text-sm">Google Account</span>
              </>
            )}
          </button>

          <p className="mt-12 text-center text-xs font-medium text-zinc-500">
            {mode === 'login' ? (
              <>
                New to the platform?{' '}
                <button 
                  onClick={() => setMode('signup')}
                  className="text-indigo-400 font-bold hover:underline ml-1"
                >
                  Create Account
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button 
                  onClick={() => setMode('login')}
                  className="text-indigo-400 font-bold hover:underline ml-1"
                >
                  Sign In
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className='min-h-screen bg-[#0a0a0a] flex items-center justify-center text-zinc-500 font-bold uppercase tracking-widest animate-pulse'>
        Initializing Security Protocol...
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
