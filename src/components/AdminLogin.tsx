import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Profile } from '../types';
import { code } from 'motion/react-client';

interface AdminLoginProps {
  profile: Profile;
  onLoginSuccess: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ profile, onLoginSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem('pb_admin_password') || '056560410'; // Default passcode for development/testing

    if (password === storedPassword) {
      setError(null);
      // Trigger success flow
      onLoginSuccess();
    } else {
      setError('Invalid system credentials. Access denied.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Dynamic Ambient Backlighting Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-container/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 left-1/3 w-[250px] h-[250px] bg-secondary-container/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        className={`w-full max-w-md bg-[#15121bd9]/90 backdrop-blur-3xl border border-white/[0.08] rounded-3xl p-8 relative shadow-[0_24px_64px_rgba(0,0,0,0.8)] ${
          isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''
        }`}
      >
        {/* Top Rim Light Reflection */}
        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

        {/* Personalized Admin Avatar with Glowing Ring */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-5 group">
            {/* Spinning/pulsating glow rings behind avatar */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-secondary to-primary-container opacity-60 blur-md group-hover:opacity-80 transition duration-1000 group-hover:duration-200 animate-spin-[20s_linear_infinite]" />
            <div className="absolute -inset-0.5 rounded-full bg-surface-dim" />
            
            <img
              src={profile.avatarUrl}
              alt={profile.fullName}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-full object-cover relative border-2 border-white/10"
            />
            {/* Overlay lock indicator */}
            <span className="absolute bottom-0 right-0 bg-primary text-black rounded-full p-1.5 shadow-lg border border-black/10 flex items-center justify-center aspect-square select-none leading-none">
              <span className="material-symbols-outlined text-[13px] font-bold">lock</span>
            </span>
          </div>

          <span className="text-[10px] text-primary font-mono uppercase tracking-widest font-bold">
            Administrative Space Gate
          </span>
          <h2 className="text-xl font-geist font-extrabold text-white mt-1">
            Unlock {profile.fullName}
          </h2>
          <p className="text-xs text-on-surface-variant max-w-[280px] mt-1.5 font-light leading-relaxed">
            Please authenticate using your administrative passcode to access the Control Center.
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider font-mono">
                System Passcode
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[10.5px] font-mono text-primary/70 hover:text-primary transition-all cursor-pointer flex items-center gap-1 focus:outline-none"
              >
                <span className="material-symbols-outlined text-xs leading-none">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
                <span>{showPassword ? 'Hide Key' : 'Show Key'}</span>
              </button>
            </div>

            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-base">
                password
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                required
                autoFocus
                placeholder="Enter passcode"
                className={`w-full bg-white/[0.03] border rounded-2xl pl-11 pr-5 py-3.5 text-sm text-white placeholder-white/20 outline-none transition-all ${
                  error 
                    ? 'border-red-500/50 bg-red-500/[0.02] focus:border-red-500' 
                    : 'border-white/[0.08] focus:border-primary/40 focus:bg-white/[0.05]'
                }`}
              />
            </div>
          </div>

          {/* Error feedback */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono leading-none"
              >
                <span className="material-symbols-outlined text-sm shrink-0">gpp_maybe</span>
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Cta */}
          <button
            type="submit"
            className="w-full mt-2 py-4 rounded-2xl bg-primary text-black text-xs font-extrabold hover:opacity-95 transition-all focus:ring-2 focus:ring-primary/40 text-center active:scale-[0.98] cursor-pointer shadow-[0_8px_20px_rgba(208,188,255,0.25)] flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm leading-none font-bold">vpn_key</span>
            <span>Decrypt & Authenticate</span>
          </button>
        </form>

        {/* Back navigation footer */}
        <div className="mt-6 pt-5 border-t border-white/[0.04] text-center">
          <button
            onClick={onCancel}
            className="text-xs font-semibold text-on-surface-variant hover:text-white hover:underline transition-all cursor-pointer flex items-center justify-center gap-1 mx-auto"
          >
            <span className="material-symbols-outlined text-sm leading-none">arrow_back</span>
            <span>Return to Live Portfolio</span>
          </button>
        </div>

        {/* Key Hint Box */}
        {/* <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-6 p-4 rounded-2xl bg-white/[0.02]/30 border border-white/[0.04] text-left relative overflow-hidden"
            > */}
              {/* Close pin */}
              {/* <button
                onClick={() => setShowHint(false)}
                className="absolute top-3 right-3 text-[#cbc3d7]/30 hover:text-white/60 transition-all cursor-pointer outline-none"
              >
                <span className="material-symbols-outlined text-xs">close</span>
              </button> */}

              {/* <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">info</span>
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-white tracking-wider font-mono">
                    Development Credentials Note
                  </h4>
                  <p className="text-[10.5px] text-[#cbc3d7]/60 font-mono mt-1 leading-normal">
                    The passcode is currently securely matched against local storage.
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-[9.5px] text-[#cbc3d7]/50 font-mono">Passcode:</span>
                    <code className="text-[10px] font-bold font-mono text-primary">admin</code>
                  </div>
                </div>
              </div> */}
            {/* </motion.div>
          )}
        </AnimatePresence> */}
      </motion.div>

      {/* Shake Keyframe animations embedded directly */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 65% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
};
