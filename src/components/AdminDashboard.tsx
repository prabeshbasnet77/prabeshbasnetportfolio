import React from 'react';
import { Project, Skill, Message, Testimonial } from '../types';

interface AdminDashboardProps {
  projects: Project[];
  skills: Skill[];
  messages: Message[];
  testimonials: Testimonial[];
  onUpdateProjectPublic: (id: string, isPublic: boolean) => void;
  onNavigateToTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  projects,
  skills,
  messages,
  testimonials,
  onUpdateProjectPublic,
  onNavigateToTab,
}) => {
  const totalViews = 12450;
  const newMessagesCount = messages.filter(m => m.isNew).length;
  const activeSkillsCount = skills.length;
  const pendingTestimonialsCount = testimonials.filter(t => t.status === 'Pending').length;

  return (
    <div className="space-y-8 animate-float">
      {/* Intro Greetings */}
      <div className="space-y-1">
        <h2 className="text-2xl font-geist font-extrabold text-white">Console Control Center</h2>
        <p className="text-xs text-on-surface-variant">Real-time stats monitor and administrative access gates.</p>
      </div>

      {/* Analytics Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat 1 */}
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-widest text-[#cbc3d7]/70 font-semibold font-mono">Platform Views</span>
            <div className="text-3xl font-geist font-extrabold text-white">{(totalViews).toLocaleString()}</div>
            <span className="text-[10px] text-emerald-400 font-mono font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px] leading-none">trending_up</span>
              <span>+18.4% monthly velocity</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">visibility</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div
          onClick={() => onNavigateToTab('contact')}
          className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between cursor-pointer hover:border-primary/20 transition-all"
        >
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-widest text-[#cbc3d7]/70 font-semibold font-mono">Contact Inquiries</span>
            <div className="text-3xl font-geist font-extrabold text-white">{messages.length}</div>
            <span className="text-[10px] text-secondary font-mono font-medium">
              {newMessagesCount} unread message threads
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/15 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-2xl">inbox</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div
          onClick={() => onNavigateToTab('skills')}
          className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between cursor-pointer hover:border-primary/20 transition-all"
        >
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-widest text-[#cbc3d7]/70 font-semibold font-mono">Expertise Skills</span>
            <div className="text-3xl font-geist font-extrabold text-white">{activeSkillsCount}</div>
            <span className="text-[10px] text-accent font-mono font-medium">
              Comprehensive catalog listed
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center text-accent">
            <span className="material-symbols-outlined text-2xl">construction</span>
          </div>
        </div>

        {/* Stat 4 */}
        <div
          onClick={() => onNavigateToTab('testimonials')}
          className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between cursor-pointer hover:border-primary/20 transition-all"
        >
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-widest text-[#cbc3d7]/70 font-semibold font-mono">Client Reviews</span>
            <div className="text-3xl font-geist font-extrabold text-white">{testimonials.length}</div>
            <span className="text-[10px] text-tertiary font-mono font-medium">
              {pendingTestimonialsCount} pending review drafts
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-tertiary/10 border border-tertiary/15 flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-2xl">reviews</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Project Visibility controller */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
          <div className="border-b border-white/[0.04] pb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">visibility</span>
              <span>Project Visibility</span>
            </h3>
            <span className="text-[9px] uppercase tracking-widest text-on-surface-variant font-mono">Live Toggle</span>
          </div>

          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="min-w-0 pr-2">
                  <div className="text-xs font-semibold text-white truncate">{proj.title}</div>
                  <div className="text-[9px] text-[#cbc3d7] font-mono mt-0.5">{proj.category}</div>
                </div>

                <button
                  onClick={() => onUpdateProjectPublic(proj.id, !proj.isPublic)}
                  className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    proj.isPublic ? 'bg-primary' : 'bg-white/10'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out ${
                      proj.isPublic ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Live Recent Inquiries list */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
          <div className="border-b border-white/[0.04] pb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">inbox</span>
              <span>Recent Contact Inquiries</span>
            </h3>

            <button
              onClick={() => onNavigateToTab('contact')}
              className="text-[10px] font-mono text-primary hover:underline"
            >
              View Full Inbox
            </button>
          </div>

          <div className="divide-y divide-white/[0.04] max-h-[350px] overflow-y-auto pr-1">
            {messages.slice(0, 4).map((msg) => (
              <div key={msg.id} className="py-3 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center font-bold text-xs font-mono text-primary mt-0.5">
                    {msg.avatarSeed}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">{msg.name}</span>
                      {msg.isNew && (
                        <span className="bg-primary/15 text-primary text-[8px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded-full">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-white/80 font-medium truncate max-w-[280px] sm:max-w-[400px] mt-0.5">{msg.subject}</p>
                    <p className="text-[10.5px] text-[#cbc3d7]/90 line-clamp-1 max-w-[280px] sm:max-w-[400px] mt-0.5 font-light">{msg.message}</p>
                  </div>
                </div>

                <div className="text-right whitespace-nowrap">
                  <span className="text-[9px] text-on-surface-variant font-mono">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {messages.length === 0 && (
              <div className="text-center py-12 text-on-surface-variant font-mono text-xs">
                No inquiries registered yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
