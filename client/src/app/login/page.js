'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, createUserWithEmailAndPassword } from 'firebase/auth';
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
      await signInWithEmailAndPassword(auth, email, password);
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
    <div className="flex min-h-screen bg-[#030303] text-white overflow-hidden font-sans">
      
      {/* Left Panel - Brand & Visuals */}
      <div className="hidden lg:flex flex-col flex-[0.6] relative p-16 overflow-hidden border-r border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-transparent"></div>
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px]"></div>
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-24">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Activity className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tighter">RELIX</span>
          </div>

          <div className="max-w-xl">
            <h1 className="text-6xl font-bold tracking-tight leading-[0.9] mb-10">
              The Command Center<br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">for Human Resilience.</span>
            </h1>
            
            <div className="space-y-6">
              {[
                { icon: Shield, text: 'Enterprise-grade security for field operations' },
                { icon: RadioTower, text: 'Real-time synchronization across teams' },
                { icon: Globe, text: 'Multi-region disaster response coordination' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-zinc-400">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-indigo-400 border border-white/5">
                    <item.icon size={16} />
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-20 border-t border-white/5">
            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Intelligence Platform v2.0</p>
            <div className="flex gap-8 opacity-40 grayscale contrast-125">
              <div className="h-4 w-20 bg-zinc-800 rounded"></div>
              <div className="h-4 w-20 bg-zinc-800 rounded"></div>
              <div className="h-4 w-20 bg-zinc-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] opacity-20 pointer-events-none"></div>
        
        <div className="w-full max-w-[400px] relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-zinc-500 text-sm">Enter your credentials to access RELIX</p>
          </div>

          {/* Role Selector */}
          <div className="flex p-1.5 bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl mb-8">
            {['NGO Staff', 'Volunteer', 'Admin'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
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

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={18} />
              <p>{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="name@organization.org"
                className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Password</label>
                <button type="button" className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest">Reset?</button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all pr-12 text-white"
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
              disabled={loading}
              className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
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
            className="w-full flex items-center justify-center gap-3 bg-zinc-900/50 border border-white/5 hover:border-white/10 text-white font-bold py-3.5 rounded-xl transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" opacity="0.8" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor" opacity="0.6" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor" opacity="0.4" />
            </svg>
            <span className="text-sm">Google Account</span>
          </button>

          <p className="mt-12 text-center text-xs font-medium text-zinc-500">
            Authorized personnel only. <button type="button" onClick={handleSignUp} className="text-indigo-400 font-bold hover:underline">Sign Up Instead</button>
          </p>
        </div>
      </div>
    </div>
  );
}
