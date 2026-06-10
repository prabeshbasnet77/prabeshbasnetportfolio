import { useState, useEffect } from 'react';
import { Project, Skill, Service, Testimonial, Message, Profile, SocialLinks } from './types';
import { ShaderBackground } from './components/ShaderBackground';
import { LivePortfolio } from './components/LivePortfolio';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminWork } from './components/AdminWork';
import { AdminSkills } from './components/AdminSkills';
import { AdminServices } from './components/AdminServices';
import { AdminTestimonials } from './components/AdminTestimonials';
import { AdminContact } from './components/AdminContact';
import { AdminSettings } from './components/AdminSettings';
import { AdminLogin } from './components/AdminLogin';
import { supabase } from '../supabaseClient.js'; // Ensure this matches your exact filename

import {
  INITIAL_PROFILE,
  INITIAL_SOCIALS,
  INITIAL_SKILLS,
  INITIAL_SERVICES,
  INITIAL_TESTIMONIALS,
  INITIAL_MESSAGES,
} from './initialData';

export default function App() {
  // Global switcher
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminTab, setAdminTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('pb_admin_logged_in') === 'true');

  // Application unified states
  const [profile, setProfile] = useState<Profile>(INITIAL_PROFILE);
  const [socials, setSocials] = useState<SocialLinks>(INITIAL_SOCIALS);
  
  // Real-time Database state for projects
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);

  // 1. Core Supabase Fetch Function
  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('id', { ascending: true });
    
    if (!error && data) {
      setProjects(data as Project[]);
    }
    setLoading(false);
  };

  // 2. Real-time Database Sync and LocalStorage Fallback Hooks
  useEffect(() => {
    // A. Run initial fetch from your Supabase table
    fetchProjects();

    // B. Create the WebSocket pipeline to broadcast changes across all devices
    const channel = supabase
      .channel('portfolio-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'projects' },
        () => {
          fetchProjects(); // Triggers re-fetch across all viewing devices automatically
        }
      )
      .subscribe();

    // C. Keep your other local storage initializers intact
    const savedProfile = localStorage.getItem('pb_profile');
    if (savedProfile) setProfile(JSON.parse(savedProfile));

    const savedSocials = localStorage.getItem('pb_socials');
    if (savedSocials) setSocials(JSON.parse(savedSocials));

    const savedSkills = localStorage.getItem('pb_skills');
    if (savedSkills) setSkills(JSON.parse(savedSkills));

    const savedServices = localStorage.getItem('pb_services');
    if (savedServices) setServices(JSON.parse(savedServices));

    const savedTestimonials = localStorage.getItem('pb_testimonials');
    if (savedTestimonials) setTestimonials(JSON.parse(savedTestimonials));

    const savedMessages = localStorage.getItem('pb_messages');
    if (savedMessages) setMessages(JSON.parse(savedMessages));

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Sync state helpers to localStorage on mutations
  const syncProfile = (p: Profile) => {
    setProfile(p);
    localStorage.setItem('pb_profile', JSON.stringify(p));
  };

  const syncSocials = (s: SocialLinks) => {
    setSocials(s);
    localStorage.setItem('pb_socials', JSON.stringify(s));
  };

  const syncSkills = (sk: Skill[]) => {
    setSkills(sk);
    localStorage.setItem('pb_skills', JSON.stringify(sk));
  };

  const syncServices = (sr: Service[]) => {
    setServices(sr);
    localStorage.setItem('pb_services', JSON.stringify(sr));
  };

  const syncTestimonials = (ts: Testimonial[]) => {
    setTestimonials(ts);
    localStorage.setItem('pb_testimonials', JSON.stringify(ts));
  };

  const syncMessages = (ms: Message[]) => {
    setMessages(ms);
    localStorage.setItem('pb_messages', JSON.stringify(ms));
  };

  // State mutation actions
  // Projects mutations (Updated to write back changes directly to Supabase!)
  const handleUpdateProjectPublic = async (id: string, isPublic: boolean) => {
    const { error } = await supabase
      .from('projects')
      .update({ isPublic })
      .eq('id', id);
    if (error) console.error("Error updating visibility:", error);
  };

  const handleAddProject = async (p: Omit<Project, 'id' | 'dateAdded'>) => {
    const newProject = {
      ...p,
      dateAdded: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    };

    const { error } = await supabase
      .from('projects')
      .insert([newProject]);

    if (error) console.error("Error inserting project:", error);
  };

  const handleUpdateProject = async (p: Project) => {
    const { error } = await supabase
      .from('projects')
      .update(p)
      .eq('id', p.id);
      
    if (error) console.error("Error updating project:", error);
  };

  const handleDeleteProject = async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) console.error("Error deleting project:", error);
  };

  // Skills mutations
  const handleAddSkill = (s: Omit<Skill, 'id'>) => {
    const newSkill: Skill = {
      ...s,
      id: `sk_${Date.now()}`,
    };
    syncSkills([newSkill, ...skills]);
  };

  const handleUpdateSkill = (s: Skill) => {
    const list = skills.map(item => item.id === s.id ? s : item);
    syncSkills(list);
  };

  const handleDeleteSkill = (id: string) => {
    const list = skills.filter(s => s.id !== id);
    syncSkills(list);
  };

  // Services mutations
  const handleAddService = (s: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...s,
      id: `ser_${Date.now()}`,
    };
    syncServices([...services, newService]);
  };

  const handleUpdateService = (s: Service) => {
    const list = services.map(item => item.id === s.id ? s : item);
    syncServices(list);
  };

  const handleDeleteService = (id: string) => {
    const list = services.filter(s => s.id !== id);
    syncServices(list);
  };

  // Testimonials mutations
  const handleUpdateTestimonialStatus = (id: string, status: Testimonial['status']) => {
    const list = testimonials.map(t => t.id === id ? { ...t, status } : t);
    syncTestimonials(list);
  };

  const handleDeleteTestimonial = (id: string) => {
    const list = testimonials.filter(t => t.id !== id);
    syncTestimonials(list);
  };

  const handleAddTestimonial = (t: Omit<Testimonial, 'id'>) => {
    const newTest: Testimonial = {
      ...t,
      id: `test_${Date.now()}`,
    };
    syncTestimonials([newTest, ...testimonials]);
  };

  // Inbox & Messages mutations
  const handleMarkMessageRead = (id: string) => {
    const list = messages.map(m => m.id === id ? { ...m, isNew: false } : m);
    syncMessages(list);
  };

  const handleReplyMessage = (id: string, replyText: string) => {
    const list = messages.map(m => m.id === id ? { ...m, isNew: false, replies: [...m.replies, replyText] } : m);
    syncMessages(list);
  };

  const handleDeleteMessage = (id: string) => {
    const list = messages.filter(m => m.id !== id);
    syncMessages(list);
  };

  const handleContactSubmit = (name: string, email: string, subject: string, message: string) => {
    const initial = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'CL';
    const newInquiry: Message = {
      id: `msg_${Date.now()}`,
      name,
      email,
      subject,
      message,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      isNew: true,
      replies: [],
      avatarSeed: initial,
    };
    syncMessages([newInquiry, ...messages]);
  };

  const unreadMessagesCount = messages.filter(m => m.isNew).length;

  // Render basic loader shell while initial table elements resolve
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white/50 font-mono text-xs">
        Connecting to Database Engine...
      </div>
    );
  }

  return (
    <>
      <ShaderBackground />

      {isAdmin ? (
        !isLoggedIn ? (
          <AdminLogin
            profile={profile}
            onLoginSuccess={() => {
              setIsLoggedIn(true);
              localStorage.setItem('pb_admin_logged_in', 'true');
            }}
            onCancel={() => {
              setIsAdmin(false);
            }}
          />
        ) : (
          <div className="min-h-screen flex flex-col md:flex-row font-sans text-on-background select-none overflow-x-hidden">
            <aside className="w-full md:w-64 bg-[#15121bd9] backdrop-blur-3xl border-r md:border-b-0 border-white/[0.06] flex flex-col justify-between p-4 gap-6 shrink-0">
              <div className="space-y-6">
                <div className="flex items-center gap-3 p-2 border-b border-white/[0.04]">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.fullName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-[#a078ff]"
                  />
                  <div className="min-w-0">
                    <h1 className="text-xs font-bold text-white truncate">{profile.fullName}</h1>
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-[#a078ff] flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[10px] leading-none text-emerald-400">gpp_good</span>
                      <span>Admin Session Active</span>
                    </span>
                  </div>
                </div>

                <nav className="space-y-1.5 text-xs text-left" id="admin-sidebar-navigation">
                  <button
                    onClick={() => setAdminTab('dashboard')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold select-none transition-all cursor-pointer ${
                      adminTab === 'dashboard' ? 'bg-primary/10 text-primary' : 'text-[#cbc3d7]/60 hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">dashboard</span>
                    <span>Control Center</span>
                  </button>

                  <button
                    onClick={() => setAdminTab('work')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold select-none transition-all cursor-pointer ${
                      adminTab === 'work' ? 'bg-primary/10 text-primary' : 'text-[#cbc3d7]/60 hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">work</span>
                    <span>Manage Projects</span>
                  </button>

                  <button
                    onClick={() => setAdminTab('skills')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold select-none transition-all cursor-pointer ${
                      adminTab === 'skills' ? 'bg-primary/10 text-primary' : 'text-[#cbc3d7]/60 hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">construction</span>
                    <span>Manage Skillsets</span>
                  </button>

                  <button
                    onClick={() => setAdminTab('services')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold select-none transition-all cursor-pointer ${
                      adminTab === 'services' ? 'bg-primary/10 text-primary' : 'text-[#cbc3d7]/60 hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">design_services</span>
                    <span>Manage Services</span>
                  </button>

                  <button
                    onClick={() => setAdminTab('contact')}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold select-none transition-all cursor-pointer ${
                      adminTab === 'contact' ? 'bg-primary/10 text-primary' : 'text-[#cbc3d7]/60 hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-sm">mail</span>
                      <span>Direct Inbox</span>
                    </div>
                    {unreadMessagesCount > 0 && (
                      <span className="bg-primary/15 text-primary text-[9px] font-bold font-mono px-2 py-0.5 rounded-full">
                        {unreadMessagesCount}
                    </span>
                    )}
                  </button>

                  <button
                    onClick={() => setAdminTab('testimonials')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold select-none transition-all cursor-pointer ${
                      adminTab === 'testimonials' ? 'bg-primary/10 text-primary' : 'text-[#cbc3d7]/60 hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">reviews</span>
                    <span>Feedback Moderator</span>
                  </button>

                  <button
                    onClick={() => setAdminTab('settings')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold select-none transition-all cursor-pointer ${
                      adminTab === 'settings' ? 'bg-primary/10 text-primary' : 'text-[#cbc3d7]/60 hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">settings</span>
                    <span>System Settings</span>
                  </button>
                </nav>
              </div>

              <div className="pt-4 border-t border-white/[0.04] space-y-2">
                <button
                  onClick={() => setIsAdmin(false)}
                  className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-white border border-white/[0.08] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                  <span>View Live Site</span>
                </button>

                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    localStorage.removeItem('pb_admin_logged_in');
                  }}
                  className="w-full py-2.5 rounded-xl bg-red-400/5 hover:bg-red-500/15 text-red-400 border border-red-500/15 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <span className="material-symbols-outlined text-sm">lock</span>
                  <span>Lock Console</span>
                </button>
              </div>
            </aside>

            <main className="flex-1 bg-black/40 backdrop-blur-md p-6 md:p-10 flex flex-col justify-between gap-12 overflow-y-auto">
              <header className="flex items-center justify-between border-b border-white/[0.04] pb-4 shrink-0">
                <div className="text-left">
                  <span className="text-[10px] text-primary font-bold uppercase tracking-widest font-mono">
                    Prabesh Workspace / {adminTab}
                  </span>
                  <h1 className="text-xl font-geist font-extrabold text-white capitalize mt-0.5">
                    {adminTab === 'contact' ? 'Inbox Messages' : adminTab === 'testimonials' ? 'Testimonials Moderation' : adminTab}
                  </h1>
                </div>

                <button
                  onClick={() => setIsAdmin(false)}
                  className="px-4 py-2 rounded-xl bg-primary text-black text-xs font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  <span>Live Site</span>
                </button>
              </header>

              <div className="flex-1">
                {adminTab === 'dashboard' && (
                  <AdminDashboard
                    projects={projects}
                    skills={skills}
                    messages={messages}
                    testimonials={testimonials}
                    onUpdateProjectPublic={handleUpdateProjectPublic}
                    onNavigateToTab={(tab) => setAdminTab(tab)}
                  />
                )}

                {adminTab === 'work' && (
                  <AdminWork
                    projects={projects}
                    onAddProject={handleAddProject}
                    onUpdateProject={handleUpdateProject}
                    onDeleteProject={handleDeleteProject}
                  />
                )}

                {adminTab === 'skills' && (
                  <AdminSkills
                    skills={skills}
                    onAddSkill={handleAddSkill}
                    onUpdateSkill={handleUpdateSkill}
                    onDeleteSkill={handleDeleteSkill}
                  />
                )}

                {adminTab === 'services' && (
                  <AdminServices
                    services={services}
                    onAddService={handleAddService}
                    onUpdateService={handleUpdateService}
                    onDeleteService={handleDeleteService}
                  />
                )}

                {adminTab === 'contact' && (
                  <AdminContact
                    messages={messages}
                    onMarkAsRead={handleMarkMessageRead}
                    onReplyMessage={handleReplyMessage}
                    onDeleteMessage={handleDeleteMessage}
                  />
                )}

                {adminTab === 'testimonials' && (
                  <AdminTestimonials
                    testimonials={testimonials}
                    onUpdateTestimonialStatus={handleUpdateTestimonialStatus}
                    onDeleteTestimonial={handleDeleteTestimonial}
                    onAddTestimonial={handleAddTestimonial}
                  />
                )}

                {adminTab === 'settings' && (
                  <AdminSettings
                    profile={profile}
                    socials={socials}
                    onUpdateProfile={syncProfile}
                    onUpdateSocials={syncSocials}
                  />
                )}
              </div>

              <footer className="border-t border-white/[0.04] pt-4 font-mono text-[9px] text-[#cbc3d7]/40 text-left shrink-0">
                Workspace terminal instance synced in Supabase Realtime Engine. Node 18.2 Web Engine.
              </footer>
            </main>
          </div>
        )
      ) : (
        <LivePortfolio
          profile={profile}
          socials={socials}
          projects={projects}
          skills={skills}
          services={services}
          testimonials={testimonials}
          onContactSubmit={handleContactSubmit}
          onNavigateToAdmin={() => {
            setIsAdmin(true);
            setAdminTab('dashboard');
          }}
        />
      )}

      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => {
            if (isAdmin) {
              setIsAdmin(false);
            } else {
              setIsAdmin(true);
              setAdminTab('dashboard');
            }
          }}
          className="flex items-center gap-1.5 px-4 py-3 rounded-full bg-black/90 hover:bg-black text-xs font-semibold border border-white/[0.08] hover:border-primary/50 text-white shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title={isAdmin ? "Switch to Live Site" : "Switch to Admin Control Panel"}
        >
          <span className="material-symbols-outlined text-base">
            {isAdmin ? 'open_in_browser' : 'admin_panel_settings'}
          </span>
          <span>{isAdmin ? 'Go Live Site' : 'Control Center'}</span>
        </button>
      </div>
    </>
  );
}