'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
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
import { updateProfile } from 'firebase/auth';
import { useAuth } from '@/context/AuthContext';
import { normalizeFirebaseError } from '@/lib/firebaseError';

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8;
};

const getAuthErrorMessage = (errorCode) => {
  const errorMap = {
    'auth/invalid-email': 'Please enter a valid email address',
    'auth/user-disabled': 'This account has been disabled',
    'auth/user-not-found': 'No account found with this email',
    'auth/wrong-password': 'Incorrect password',
    'auth/too-many-requests': 'Too many attempts. Try again later.',
    'auth/invalid-credential': 'Invalid credentials provided',
    'auth/network-request-failed': 'Network error. Please check your connection.',
  };
  return errorMap[errorCode] || 'Unable to sign in. Please check your credentials.';
};

const getFirestoreProfileWriteErrorMessage = (error) => {
  const normalized = normalizeFirebaseError(error, 'Profile sync failed');
  if (normalized.code === 'permission-denied') {
    return 'Authentication succeeded, but Firestore blocked profile write. Check users collection rules.';
  }
  return `Authentication succeeded, but profile sync failed: ${normalized.details}`;
};
export default function LoginPage() {
  const router = useRouter();
  const { setRole: setGlobalRole } = useAuth();
  const [role, setRole] = useState('NGO Staff');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState(null);
  const [resetMessage, setResetMessage] = useState('');
  const [showCreatePrompt, setShowCreatePrompt] = useState(false);

  // Rate limiting clear effect
  useEffect(() => {
    let timer;
    if (lockoutUntil) {
      const timeRemaining = lockoutUntil - Date.now();
      if (timeRemaining > 0) {
        timer = setTimeout(() => {
          setLockoutUntil(null);
          setFailedAttempts(0);
        }, timeRemaining);
      } else {
        setLockoutUntil(null);
        setFailedAttempts(0);
      }
    }
    return () => clearTimeout(timer);
  }, [lockoutUntil]);

  const handleRoleRedirect = async (selectedRole) => {
    // Store role in global context and localStorage
    setGlobalRole(selectedRole);
    localStorage.setItem('userRole', selectedRole);
    
    // Small delay to ensure state is synced
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (selectedRole === 'Volunteer') {
      router.push('/volunteer/dashboard');
    } else {
      router.push('/dashboard');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (lockoutUntil && Date.now() < lockoutUntil) {
      setErrorMsg(`Too many failed attempts. Try again in ${Math.ceil((lockoutUntil - Date.now()) / 1000)} seconds.`);
      return;
    }

    let isValid = true;
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    }

    if (!isValid) return;

    setLoading('email');
    setErrorMsg('');
    setResetMessage('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      setFailedAttempts(0);
      await handleRoleRedirect(role);
    } catch (error) {
      const msg = getAuthErrorMessage(error.code);

      // If account not found, prompt user to create one
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        setShowCreatePrompt(true);
        setErrorMsg('No account found with this email. Would you like to create one?');
      } else {
        setErrorMsg(msg);
      }

      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      if (newAttempts >= 5) {
        setLockoutUntil(Date.now() + 30000);
      }
    } finally {
      setLoading(null);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading('google');
    setErrorMsg('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Set displayName to role so protected layout can read it
      await updateProfile(result.user, { displayName: role });
      
      // Ensure user document exists in Firestore for role persistence
      try {
        await setDoc(doc(db, 'users', result.user.uid), {
          email: result.user.email || '',
          username: result.user.displayName || result.user.email?.split('@')[0] || '',
          phone: '',
          bio: '',
          role: role,
          createdAt: serverTimestamp(),
          auth_provider: 'google'
        }, { merge: true }); // Use merge: true to avoid overwriting existing data if they've signed in before
      } catch (fsError) {
        throw fsError;
      }
      
      await handleRoleRedirect(role);
    } catch (error) {
      if (error?.code?.startsWith('auth/')) {
        setErrorMsg(getAuthErrorMessage(error.code));
      } else {
        setErrorMsg(getFirestoreProfileWriteErrorMessage(error));
      }
    } finally {
      setLoading(null);
    }
  };

  const handleSignUp = async (e) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please enter an email and password to sign up.");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }

    setLoading('signup');
    setErrorMsg('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Set displayName to role so protected layout can read it
      await updateProfile(userCredential.user, { displayName: role });
      // Also store user data in Firestore for reference
      try {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: email,
          username: userCredential.user.displayName || email.split('@')[0] || '',
          phone: '',
          bio: '',
          role: role,
          createdAt: serverTimestamp()
        }, { merge: true });
      } catch (fsError) {
        throw fsError;
      }
      await handleRoleRedirect(role);
    } catch (error) {
      if (error?.code?.startsWith('auth/')) {
        setErrorMsg(getAuthErrorMessage(error.code));
      } else {
        setErrorMsg(getFirestoreProfileWriteErrorMessage(error));
      }
    } finally {
      setLoading(null);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setEmailError('Please enter your email address to reset password');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage('Password reset link sent to your email.');
      setErrorMsg('');
    } catch (error) {
      setErrorMsg(getAuthErrorMessage(error.code));
    }
  };

  const isFormDisabled = loading !== null || (lockoutUntil && Date.now() < lockoutUntil);

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
      `}} />

      {/* Left Panel - Brand & Visuals */}
      <div className="hidden lg:flex flex-col flex-[0.6] relative p-16 overflow-hidden border-r border-white/[0.05]">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/[0.07] via-transparent to-transparent"></div>
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-indigo-600/[0.03] rounded-full blur-[120px]"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}></div>

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
                  <div className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-indigo-400 border border-white/[0.05]">
                    <item.icon size={16} />
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-20 border-t border-white/[0.05]">
            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">Intelligence Platform v2.0</p>
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/5 blur-[100px] opacity-20 pointer-events-none"></div>

        <div className="w-full max-w-[400px] relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-zinc-500 text-sm">Enter your credentials to access RELIX</p>
          </div>

          {/* Role Selector */}
          <div className="flex p-1.5 bg-[#0a0a0a] border border-white/[0.08] rounded-2xl mb-8">
            {['NGO Staff', 'Volunteer'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                disabled={isFormDisabled}
                className={`flex-1 text-[11px] font-bold py-2.5 rounded-xl transition-all uppercase tracking-wider ${role === r
                    ? 'bg-zinc-800 text-white border border-white/10 shadow-lg'
                    : 'text-zinc-500 hover:text-zinc-300'
                  } ${isFormDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
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

          {showCreatePrompt && (
            <div className="mb-6 p-4 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm rounded-xl flex items-center justify-between animate-slide-down">
              <span>No account found. Would you like to create one?</span>
              <button
                type="button"
                onClick={handleSignUp}
                disabled={isFormDisabled}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-all disabled:opacity-50"
              >
                Create Account
              </button>
            </div>
          )}

          {resetMessage && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 size={18} />
              <p>{resetMessage}</p>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-6">
            <fieldset disabled={isFormDisabled} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@organization.org"
                  className={`w-full bg-[#0a0a0a] border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-1 transition-all text-white ${emailError ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20 animate-shake' : 'border-white/[0.08] focus:border-indigo-500/50 focus:ring-indigo-500/20'
                    }`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                    if (errorMsg) setErrorMsg('');
                    if (showCreatePrompt) setShowCreatePrompt(false);
                  }}
                />
                {emailError && <p className="text-red-400 text-xs mt-1 ml-1">{emailError}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Password</label>
                  <button
                    type="button"
                    onClick={handlePasswordReset}
                    className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest"
                  >
                    Reset?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className={`w-full bg-[#0a0a0a] border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-1 transition-all pr-12 text-white ${passwordError ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20 animate-shake' : 'border-white/[0.08] focus:border-indigo-500/50 focus:ring-indigo-500/20'
                      }`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) setPasswordError('');
                      if (errorMsg) setErrorMsg('');
                      if (showCreatePrompt) setShowCreatePrompt(false);
                    }}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {passwordError && <p className="text-red-400 text-xs mt-1 ml-1">{passwordError}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {loading === 'email' ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </fieldset>
          </form>

          <div className="relative my-10 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.05]"></div>
            </div>
            <span className="relative z-10 bg-[#0a0a0a] px-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
              Or continue with
            </span>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isFormDisabled}
            aria-label="Sign in with Google"
            className="w-full flex items-center justify-center gap-3 bg-zinc-900/[0.5] border border-white/[0.05] hover:border-white/10 text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-50"
          >
            {loading === 'google' ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" opacity="0.8" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22v-.01z" fill="currentColor" opacity="0.6" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor" opacity="0.4" />
                </svg>
                <span className="text-sm">Google Account</span>
              </>
            )}
          </button>

          <p className="mt-12 text-center text-xs font-medium text-zinc-500">
            Authorized personnel only. <button type="button" onClick={handleSignUp} disabled={isFormDisabled} className="text-indigo-400 font-bold hover:underline disabled:opacity-50">Sign Up Instead</button>
          </p>
        </div>
      </div>
    </div>
  );
}
