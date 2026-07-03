import React, { useState } from 'react';
import { X, Mail, Lock, User, ShieldCheck, ArrowRight, Share2, Key } from 'lucide-react';
import { getFlagFromCode } from '../utils/flags';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'verify'>('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+',
    password: '',
    verificationCode: '',
    newsletter: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (mode === 'signup') {
        const { data: _data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name,
              phone: formData.phone,
              newsletter: formData.newsletter
            }
          }
        });
        if (error) throw error;
        setMode('verify');
      } else if (mode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });
        if (error) throw error;
        if (data.user) {
          onLogin({
            id: data.user.id,
            name: data.user.user_metadata?.full_name || data.user.email,
            email: data.user.email
          });
        }
        onClose();
      } else if (mode === 'verify') {
        onLogin({
          name: formData.name,
          email: formData.email
        });
        onClose();
      }
    } catch (err: any) {
      alert(err.message || 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-[2.5rem] p-8 md:p-10 shadow-3xl animate-scale-up relative overflow-hidden">
        
        {/* Background Glow Decoration */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center italic font-bold text-xl mx-auto shadow-lg shadow-blue-500/20 mb-4">⚡</div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
            {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Join WHL GROUP' : 'Verify Account'}
          </h2>
          <p className="text-[10px] text-neutral-500 uppercase font-black tracking-[0.2em] mt-1">
            {mode === 'verify' ? 'Check your phone for a 6-digit code' : 'Access your shop dashboard'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {mode === 'signup' && (
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" required placeholder="Full Name" 
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-black border border-neutral-800 rounded-2xl pl-12 pr-4 py-3.5 text-xs text-white focus:border-blue-500 outline-none transition-all"
              />
            </div>
          )}

          {mode !== 'verify' && (
            <>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="email" required placeholder="Email Address" 
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black border border-neutral-800 rounded-2xl pl-12 pr-4 py-3.5 text-xs text-white focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {mode === 'signup' && (
                <div className="relative group flex items-center">
                  <div className="absolute left-4 z-10 flex items-center gap-2 pointer-events-none">
                    <span className="text-lg leading-none">{getFlagFromCode(formData.phone)}</span>
                    <div className="w-px h-4 bg-neutral-800" />
                  </div>
                  <input 
                    type="tel" required 
                    placeholder="Phone (e.g. +265...)" 
                    pattern="^\+.*"
                    title="Phone number must start with a country code (e.g. +265)"
                    value={formData.phone} 
                    onChange={e => {
                      const val = e.target.value;
                      if (val === '' || val === '+') setFormData({...formData, phone: '+'});
                      else if (val.startsWith('+')) setFormData({...formData, phone: val});
                    }}
                    className="w-full bg-black border border-neutral-800 rounded-2xl pl-16 pr-4 py-3.5 text-xs text-white focus:border-blue-500 outline-none transition-all font-mono tracking-wider"
                  />
                </div>
              )}

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="password" required placeholder="Password" 
                  value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-black border border-neutral-800 rounded-2xl pl-12 pr-4 py-3.5 text-xs text-white focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </>
          )}

          {mode === 'verify' && (
            <div className="space-y-6 text-center">
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                <input 
                  type="text" required maxLength={6} placeholder="Enter 6-Digit Code" 
                  value={formData.verificationCode} onChange={e => setFormData({...formData, verificationCode: e.target.value})}
                  className="w-full bg-black border border-neutral-800 rounded-2xl pl-12 pr-4 py-4 text-center text-lg font-black tracking-[0.5em] text-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <p className="text-[10px] text-neutral-600">Didn't receive it? <button type="button" className="text-blue-500 font-bold hover:underline">Resend Code</button></p>
            </div>
          )}

          {mode === 'signup' && (
            <div className="flex items-center gap-3 px-2">
              <input 
                type="checkbox" id="news" 
                checked={formData.newsletter} onChange={e => setFormData({...formData, newsletter: e.target.checked})}
                className="w-4 h-4 rounded border-neutral-800 bg-black text-blue-600 focus:ring-blue-600 focus:ring-offset-neutral-900" 
              />
              <label htmlFor="news" className="text-[10px] text-neutral-500 font-medium cursor-pointer">
                I want to receive WHL newsletters and product discounts.
              </label>
            </div>
          )}

          <button 
            type="submit" disabled={isSubmitting}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Verify & Finish'}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {mode !== 'verify' && (
            <>
              <div className="relative flex items-center justify-center py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-800"></div></div>
                <span className="relative bg-neutral-900 px-3 text-[9px] font-bold text-neutral-600 uppercase tracking-widest">Or Continue With</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="flex items-center justify-center gap-2 py-3 bg-neutral-800/50 hover:bg-neutral-800 rounded-xl transition border border-neutral-800">
                   <Key className="w-4 h-4 text-neutral-400" /> <span className="text-[9px] font-black uppercase">SSO Access</span>
                </button>
                <button type="button" className="flex items-center justify-center gap-2 py-3 bg-neutral-800/50 hover:bg-neutral-800 rounded-xl transition border border-neutral-800">
                   <Share2 className="w-4 h-4 text-neutral-400" /> <span className="text-[9px] font-black uppercase">Social Link</span>
                </button>
              </div>

              <p className="text-center text-[10px] text-neutral-500 font-bold mt-4">
                {mode === 'login' ? "Don't have an account?" : "Already a client?"}
                <button 
                  type="button" 
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-blue-500 ml-2 hover:underline"
                >
                  {mode === 'login' ? 'Register Now' : 'Sign In'}
                </button>
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
