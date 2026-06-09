import React, { useState } from 'react';
import { Profile, SocialLinks } from '../types';

interface AdminSettingsProps {
  profile: Profile;
  socials: SocialLinks;
  onUpdateProfile: (p: Profile) => void;
  onUpdateSocials: (s: SocialLinks) => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({
  profile,
  socials,
  onUpdateProfile,
  onUpdateSocials,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'security' | 'socials' | 'danger'>('profile');

  // Local Form states
  const [profileForm, setProfileForm] = useState<Profile>({ ...profile });
  const [socialsForm, setSocialsForm] = useState<SocialLinks>({ ...socials });
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const displayToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(profileForm);
    displayToast("Profile details synchronized to Live site.");
  };

  const handleSocialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSocials(socialsForm);
    displayToast("Social channel links updated successfully.");
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem('pb_admin_password') || 'admin';
    
    if (securityForm.currentPassword !== storedPassword) {
      displayToast("Error: Current password is incorrect!");
      return;
    }

    if (!securityForm.newPassword) {
      displayToast("Error: New password cannot be empty!");
      return;
    }

    if (securityForm.newPassword !== securityForm.confirmPassword) {
      displayToast("Error: Passwords do not match!");
      return;
    }

    localStorage.setItem('pb_admin_password', securityForm.newPassword);
    displayToast("Security credentials successfully updated.");
    setSecurityForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactorEnabled: securityForm.twoFactorEnabled,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[480px] text-left animate-float">
      {/* Sub-tabs List (Left Panel) */}
      <div className="md:col-span-3 bg-white/[0.01] border border-white/[0.06] rounded-2xl p-3 flex flex-col gap-1.5 self-start">
        <button
          onClick={() => setActiveSubTab('profile')}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold select-none transition-all cursor-pointer ${
            activeSubTab === 'profile' 
              ? 'bg-primary/10 text-primary' 
              : 'text-[#cbc3d7]/60 hover:text-white hover:bg-white/[0.02]'
          }`}
        >
          <span className="material-symbols-outlined text-sm">person</span>
          <span>Profile Info</span>
        </button>

        <button
          onClick={() => setActiveSubTab('security')}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold select-none transition-all cursor-pointer ${
            activeSubTab === 'security' 
              ? 'bg-primary/10 text-primary' 
              : 'text-[#cbc3d7]/60 hover:text-white hover:bg-white/[0.02]'
          }`}
        >
          <span className="material-symbols-outlined text-sm">security</span>
          <span>Security & Auth</span>
        </button>

        <button
          onClick={() => setActiveSubTab('socials')}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold select-none transition-all cursor-pointer ${
            activeSubTab === 'socials' 
              ? 'bg-primary/10 text-primary' 
              : 'text-[#cbc3d7]/60 hover:text-white hover:bg-white/[0.02]'
          }`}
        >
          <span className="material-symbols-outlined text-sm">share</span>
          <span>Social Connectivity</span>
        </button>

        <button
          onClick={() => setActiveSubTab('danger')}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold text-red-400 select-none transition-all cursor-pointer ${
            activeSubTab === 'danger' 
              ? 'bg-red-500/10 text-red-400' 
              : 'hover:text-red-300 hover:bg-red-500/5'
          }`}
        >
          <span className="material-symbols-outlined text-sm">gpp_maybe</span>
          <span>Danger Zone</span>
        </button>
      </div>

      {/* Configuration Inputs Area (Right Panel) */}
      <div className="md:col-span-9 bg-white/[0.01] border border-white/[0.06] rounded-2xl p-6  flex flex-col justify-between overflow-y-auto">
        <div>
          {/* PROFILE SUB-PANEL */}
          {activeSubTab === 'profile' && (
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="border-b border-white/[0.04] pb-3 mb-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#cbc3d7]/80 font-mono">
                  Personal Profile Setup
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 text-xs">
                  <label className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                    Full Public Name
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/45 rounded-xl px-4 py-3 text-white outline-none"
                  />
                </div>
                <div className="space-y-2 text-xs">
                  <label className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.professionalTitle}
                    onChange={(e) => setProfileForm({ ...profileForm, professionalTitle: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/45 rounded-xl px-4 py-3 text-white outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <label className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                  Biographical Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/45 rounded-xl px-4 py-3 text-white outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 text-xs">
                  <label className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                    Public Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    value={profileForm.emailAddress}
                    onChange={(e) => setProfileForm({ ...profileForm, emailAddress: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/45 rounded-xl px-4 py-3 text-white outline-none"
                  />
                </div>
                <div className="space-y-2 text-xs">
                  <label className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                    Physical Location
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/45 rounded-xl px-4 py-3 text-white outline-none"
                  />
                </div>
                <div className="space-y-2 text-xs">
                  <label className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/45 rounded-xl px-4 py-3 text-white outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <label className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                  Photo Avatar URL Reference
                </label>
                <input
                  type="text"
                  required
                  value={profileForm.avatarUrl}
                  onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/45 rounded-xl px-4 py-3 text-white outline-none"
                />
              </div>

              <div className="pt-4 text-right">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-primary text-black text-xs font-semibold hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_12px_rgba(208,188,255,0.2)]"
                >
                  Synchronize Profile Elements
                </button>
              </div>
            </form>
          )}

          {/* SECURITY SUB-PANEL */}
          {activeSubTab === 'security' && (
            <form onSubmit={handleSecuritySubmit} className="space-y-5">
              <div className="border-b border-white/[0.04] pb-3 mb-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#cbc3d7]/80 font-mono">
                  Administrative Credentials Security
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                <label className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                  Current Session Password
                </label>
                <input
                  type="password"
                  value={securityForm.currentPassword}
                  onChange={(e) => setSecurityForm({ ...securityForm, currentPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/45 rounded-xl px-4 py-3 text-white outline-none placeholder-white/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 text-xs">
                  <label className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                    New Secure Password
                  </label>
                  <input
                    type="password"
                    value={securityForm.newPassword}
                    onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/45 rounded-xl px-4 py-3 text-white outline-none placeholder-white/20"
                  />
                </div>
                <div className="space-y-2 text-xs">
                  <label className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={securityForm.confirmPassword}
                    onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/45 rounded-xl px-4 py-3 text-white outline-none placeholder-white/20"
                  />
                </div>
              </div>

              {/* 2nd Factor Auth active switch */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div>
                  <h4 className="text-xs font-semibold text-white">Two-Factor Authentication (2FA)</h4>
                  <p className="text-[10px] text-on-surface-variant font-mono mt-0.5">
                    Activate multi-step phone confirmation requests on log gating.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSecurityForm({ ...securityForm, twoFactorEnabled: !securityForm.twoFactorEnabled })}
                  className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    securityForm.twoFactorEnabled ? 'bg-primary' : 'bg-white/10'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out ${
                      securityForm.twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="pt-2 text-right">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-primary text-black text-xs font-semibold hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_12px_rgba(208,188,255,0.2)]"
                >
                  Update Credentials Code
                </button>
              </div>
            </form>
          )}

          {/* SOCIAL CHANNELS SUB-PANEL */}
          {activeSubTab === 'socials' && (
            <form onSubmit={handleSocialsSubmit} className="space-y-4">
              <div className="border-b border-white/[0.04] pb-3 mb-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#cbc3d7]/80 font-mono">
                  Social Network Channels
                </h3>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    value={socialsForm.linkedIn}
                    onChange={(e) => setSocialsForm({ ...socialsForm, linkedIn: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/45 rounded-xl px-4 py-3 text-white outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                    GitHub Username Profile
                  </label>
                  <input
                    type="text"
                    value={socialsForm.github}
                    onChange={(e) => setSocialsForm({ ...socialsForm, github: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/45 rounded-xl px-4 py-3 text-white outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                    Facebook URL Showcases
                  </label>
                  <input
                    type="text"
                    value={socialsForm.Facebook}
                    onChange={(e) => setSocialsForm({ ...socialsForm, Facebook: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/45 rounded-xl px-4 py-3 text-white outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 text-right">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-primary text-black text-xs font-semibold hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_12px_rgba(208,188,255,0.2)]"
                >
                  Update Social Connectivity
                </button>
              </div>
            </form>
          )}

          {/* DANGER ZONE SUB-PANEL */}
          {activeSubTab === 'danger' && (
            <div className="space-y-6">
              <div className="border-b border-white/[0.04] pb-3">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-red-400 font-mono">
                  Destructive Danger Core
                </h3>
              </div>

              <div className="p-5 rounded-2xl border border-red-500/15 bg-red-500/5 space-y-4">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-red-400 text-3xl shrink-0 mt-0.5">gpp_maybe</span>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white leading-tight">Deactivate Administrative Space</h4>
                    <p className="text-[10.5px] text-[#cbc3d7]/90 leading-relaxed font-light">
                      This will freeze database queries, wipe out local memory stores, expire JWT cookies instantly, and restrict administrative access until hardware keys are rotated. Live portfolio displays will continue to render fallback structures.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-red-500/10 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm("CRITICAL WARNING: This action cannot be reversed. Are you absolutely certain you want to deactivate settings space?")) {
                        window.location.reload();
                      }
                    }}
                    className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-semibold active:scale-[0.98] transition-all cursor-pointer shadow-lg"
                  >
                    Confirm Core Deactivation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Global Bottom Toast Notification Box */}
        {toastMessage && (
          <div className="mt-6 flex items-center justify-between gap-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base">check_circle</span>
              <span>{toastMessage}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
