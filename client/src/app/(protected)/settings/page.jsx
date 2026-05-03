'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Shield, 
  Bell, 
  Save, 
  Lock,
  Smartphone,
  AlertTriangle,
  Loader2,
  CheckCircle2,
  Trash2,
  Calendar,
  LogOut
} from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { saveUserProfile } from '@/services/userService';
import { changeUserPassword, deleteUserAccount } from '@/services/authService';
import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
  const router = useRouter();
  const { signOut } = useAuth();
  const { profile, loading, error, refetch } = useUserProfile();
  
  const [formValues, setFormValues] = useState({
    username: '',
    phone: '',
    bio: '',
    language: 'English (Global)'
  });
  
  const [passwordState, setPasswordState] = useState({
    newPassword: '',
    confirmPassword: '',
    saving: false,
    message: '',
    error: ''
  });

  const [status, setStatus] = useState({ saving: false, message: '', error: '' });
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormValues({
        username: profile.username || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
        language: profile.language || 'English (Global)'
      });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setStatus({ saving: true, message: '', error: '' });
    try {
      await saveUserProfile({
        username: formValues.username,
        phone: formValues.phone,
        bio: formValues.bio,
        language: formValues.language
      });
      await refetch();
      setStatus({ saving: false, message: 'Profile updated successfully!', error: '' });
      setTimeout(() => setStatus(prev => ({ ...prev, message: '' })), 3000);
    } catch (err) {
      setStatus({ saving: false, message: '', error: err.message || 'Failed to save profile' });
    }
  };

  const handlePasswordChange = async () => {
    if (passwordState.newPassword !== passwordState.confirmPassword) {
      setPasswordState(prev => ({ ...prev, error: 'Passwords do not match' }));
      return;
    }
    if (passwordState.newPassword.length < 8) {
      setPasswordState(prev => ({ ...prev, error: 'Password must be at least 8 characters' }));
      return;
    }

    setPasswordState(prev => ({ ...prev, saving: true, error: '', message: '' }));
    try {
      await changeUserPassword(passwordState.newPassword);
      setPasswordState({
        newPassword: '',
        confirmPassword: '',
        saving: false,
        message: 'Password updated successfully!',
        error: ''
      });
      setTimeout(() => setPasswordState(prev => ({ ...prev, message: '' })), 3000);
    } catch (err) {
      setPasswordState(prev => ({ 
        ...prev, 
        saving: false, 
        error: err.message === 'AUTH_REAUTH_REQUIRED' 
          ? 'Please sign in again to change your password.' 
          : err.message 
      }));
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you absolutely sure? This will permanently delete your account and all associated data.')) {
      return;
    }
    setDeleteLoading(true);
    try {
      await deleteUserAccount();
      router.push('/login');
    } catch (err) {
      setDeleteLoading(false);
      alert(err.message === 'AUTH_REAUTH_REQUIRED' ? 'Please sign in again to delete your account.' : err.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  if (loading && !profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12 animate-in fade-in duration-500 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold font-display text-white tracking-tight">Account Settings</h2>
          <p className="text-zinc-500 text-sm">Update your profile, security, and notification preferences.</p>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold hover:bg-red-500 hover:text-white transition-all"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>

      <div className="space-y-16">
        {/* Profile Section */}
        <section id="profile" className="space-y-8">
          <div className="flex items-center gap-4 text-white">
            <User size={24} className="text-indigo-400" />
            <h3 className="text-2xl font-bold">Public Profile</h3>
          </div>
          
          <div className="glass-card p-8 space-y-8">
            <div className="flex items-center gap-6 pb-8 border-b border-white/5">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl">
                  <span className="text-3xl font-bold text-white">
                    {(formValues.username || profile?.email || 'U')[0].toUpperCase()}
                  </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">{formValues.username || 'User'}</h3>
                <p className="text-sm text-zinc-500">{profile?.role || 'Staff'} • {profile?.email}</p>
                {profile?.createdAt && (
                  <div className="flex items-center gap-2 text-xs text-zinc-600">
                    <Calendar size={12} />
                    <span>Member since {
                      profile.createdAt?.toDate 
                        ? profile.createdAt.toDate().toLocaleDateString() 
                        : new Date(profile.createdAt).toLocaleDateString()
                    }</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Full Name / Username</label>
                <input 
                  type="text" 
                  name="username"
                  value={formValues.username} 
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Work Email (Read Only)</label>
                <input 
                  type="email" 
                  value={profile?.email || ''} 
                  disabled
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-500 cursor-not-allowed" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Phone Number</label>
                <input 
                  type="text" 
                  name="phone"
                  value={formValues.phone} 
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Preferred Language</label>
                <select 
                  name="language"
                  value={formValues.language}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 appearance-none transition-all"
                >
                  <option value="English (Global)">English (Global)</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Telugu">Telugu</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Bio / Role Description</label>
                <textarea 
                  name="bio"
                  value={formValues.bio} 
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about your operational role..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all resize-none" 
                />
              </div>
            </div>

            {status.error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
                <AlertTriangle size={18} />
                {status.error}
              </div>
            )}

            {status.message && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-3">
                <CheckCircle2 size={18} />
                {status.message}
              </div>
            )}

            <div className="flex justify-end gap-4 pt-4">
              <button 
                onClick={() => refetch()}
                className="px-6 py-3 rounded-xl border border-white/5 text-sm font-bold text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
              >
                Discard
              </button>
              <button 
                onClick={handleSaveProfile}
                disabled={status.saving}
                className="px-8 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status.saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                {status.saving ? 'Saving...' : 'Save Profile Changes'}
              </button>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section id="security" className="space-y-8">
          <div className="flex items-center gap-4 text-white">
            <Shield size={24} className="text-indigo-400" />
            <h3 className="text-2xl font-bold">Security & Authentication</h3>
          </div>

          <div className="glass-card p-8 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white mb-2">
                <Lock size={20} className="text-zinc-400" />
                <h4 className="text-lg font-bold">Update Password</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">New Password</label>
                  <input 
                    type="password" 
                    value={passwordState.newPassword}
                    onChange={(e) => setPasswordState(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="Min. 8 characters"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Confirm Password</label>
                  <input 
                    type="password" 
                    value={passwordState.confirmPassword}
                    onChange={(e) => setPasswordState(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all" 
                  />
                </div>
              </div>

              {passwordState.error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                  {passwordState.error}
                </div>
              )}
              {passwordState.message && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                  {passwordState.message}
                </div>
              )}

              <button 
                onClick={handlePasswordChange}
                disabled={passwordState.saving || !passwordState.newPassword}
                className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-zinc-400 hover:text-white hover:bg-indigo-600 transition-all disabled:opacity-50"
              >
                {passwordState.saving ? 'Updating...' : 'Update Password'}
              </button>
            </div>

            <div className="h-px bg-white/5 w-full" />

            <div className="space-y-4">
              <div className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Two-Factor Authentication</p>
                    <p className="text-xs text-zinc-500">Secure your account with SMS or Authenticator app.</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest">Active</span>
              </div>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section id="danger" className="space-y-8">
          <div className="flex items-center gap-4 text-red-400">
            <AlertTriangle size={24} />
            <h3 className="text-2xl font-bold">Danger Zone</h3>
          </div>

          <div className="glass-card p-8 border-red-500/20 bg-red-500/5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="space-y-2">
                  <p className="text-lg font-bold text-white">Delete Account Permanentally</p>
                  <p className="text-sm text-zinc-500">Once you delete your account, there is no going back. All your reports and profile data will be purged.</p>
               </div>
               <button 
                onClick={handleDeleteAccount}
                disabled={deleteLoading}
                className="px-8 py-4 rounded-2xl bg-red-600 text-white font-bold hover:bg-red-500 transition-all shadow-[0_0_30px_rgba(220,38,38,0.2)] flex items-center gap-3 whitespace-nowrap"
               >
                 {deleteLoading ? <Loader2 className="animate-spin" size={20} /> : <Trash2 size={20} />}
                 Delete Account
               </button>
            </div>
          </div>
        </section>

        {/* Notifications Section */}
        <section id="notifications" className="space-y-8">
          <div className="flex items-center gap-4 text-white">
            <Bell size={24} className="text-indigo-400" />
            <h3 className="text-2xl font-bold">Notification Preferences</h3>
          </div>

          <div className="glass-card p-8 space-y-8">
            <div className="space-y-6">
              {[
                { label: 'Critical Incident Alerts', desc: 'Real-time push notifications for life-threatening situations.' },
                { label: 'Daily Operations Digest', desc: 'Summary of team performance and incident resolutions.' }
              ].map((pref, i) => (
                <div key={i} className="flex items-center justify-between pb-6 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">{pref.label}</p>
                    <p className="text-xs text-zinc-500">{pref.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 p-1 rounded-xl">
                     <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest">ON</button>
                     <button className="px-4 py-2 rounded-lg text-zinc-600 text-[10px] font-bold uppercase tracking-widest">OFF</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}



