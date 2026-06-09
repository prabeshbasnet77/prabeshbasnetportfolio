import React, { useState, useEffect } from 'react';
import { Project, Skill, Service, Testimonial, Profile, SocialLinks } from '../types';
// @ts-ignore
import PrabeshCV from '../assets/images/Prabesh_Basnet_CV.pdf';
// Do not include "public" or "src" or any dots/relative paths. 
// Vite serves the public folder from the root domain directly.
image: "/fagfyugaf.png"
image: "/ppp.webp"

interface LivePortfolioProps {
  profile: Profile;
  socials: SocialLinks;
  projects: Project[];
  skills: Skill[];
  services: Service[];
  testimonials: Testimonial[];
  onContactSubmit: (name: string, email: string, subject: string, message: string) => void;
  onNavigateToAdmin: () => void;
}

export const LivePortfolio: React.FC<LivePortfolioProps> = ({
  profile,
  socials,
  projects,
  skills,
  services,
  testimonials,
  onContactSubmit,
  onNavigateToAdmin,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [portfolioPage, setPortfolioPage] = useState<number>(1);
  const [pageView, setPageView] = useState<'home' | 'portfolio'>('home');
  const [typedTitle, setTypedTitle] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Contact form submission state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Typewriter effect for professional title
  useEffect(() => {
    const titles = [profile.professionalTitle, "Creative Director", "Figma Wizard", "React Architect"];
    let currentTitleIdx = 0;
    let currentCharIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const handleType = () => {
      const currentFullText = titles[currentTitleIdx];
      if (isDeleting) {
        setTypedTitle(currentFullText.substring(0, currentCharIdx - 1));
        currentCharIdx--;
        typingSpeed = 50;
      } else {
        setTypedTitle(currentFullText.substring(0, currentCharIdx + 1));
        currentCharIdx++;
        typingSpeed = 100;
      }

      if (!isDeleting && currentCharIdx === currentFullText.length) {
        typingSpeed = 2000; // Pause at end of text
        isDeleting = true;
      } else if (isDeleting && currentCharIdx === 0) {
        isDeleting = false;
        currentTitleIdx = (currentTitleIdx + 1) % titles.length;
        typingSpeed = 500; // Pause before typing next
      }

      setTimeout(handleType, typingSpeed);
    };

    const timeoutId = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timeoutId);
  }, [profile.professionalTitle]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;
    onContactSubmit(formData.name, formData.email, formData.subject, formData.message);
    setFormSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setFormSubmitted(false), 5000); // Clears positive response dialog
  };

  const publicProjects = projects.filter(p => p.isPublic);
  const rawCategories = Array.from(new Set(publicProjects.map(p => (p.category || '').toString().trim()).filter(Boolean)));
  const categories = ['All', ...rawCategories];
  const filteredProjects = selectedCategory === 'All'
    ? publicProjects
    : publicProjects.filter(p => (p.category || '').toString().trim() === selectedCategory.toString().trim());

  const featuredProjects = filteredProjects.slice(0, 4);
  const portfolioProjects = filteredProjects.slice(4);
  const portfolioPageSize = 6;
  const portfolioPageCount = Math.max(1, Math.ceil(portfolioProjects.length / portfolioPageSize));
  const visiblePortfolioProjects = portfolioProjects.slice((portfolioPage - 1) * portfolioPageSize, portfolioPage * portfolioPageSize);

  useEffect(() => {
    setPortfolioPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    if (portfolioPage > portfolioPageCount) {
      setPortfolioPage(portfolioPageCount);
    }
  }, [portfolioPageCount, portfolioPage]);

  const approvedTestimonials = testimonials.filter(t => t.status === 'Approved');

  // Skill categorization
  const skillCategories = Array.from(new Set(skills.map(s => s.category)));
  const skillCategoryDescriptions: Record<string, string> = {
    'Frontend Engineering': 'Modern web interfaces built with React, reusable components, and responsive UI architecture.',
    '3D Graphics': 'Immersive 3D scenes, visual motion, and interactive experiences using Three.js workflows.',
    'Visual Architecture': 'Polished UI systems with clean typography, layout hierarchy, and brand-led styling.',
    'Backend Systems': 'Server-side logic, APIs, and scalable application workflows for fast data handling.',
    'Communication': 'Clear, concise, and timely communication to keep projects aligned and stakeholders informed.',
    'Video Editing': 'High-fidelity post-production, dynamic color grading, and seamless pacing for production-ready content.',
    'Artificial Intelligence': 'Machine learning models, neural networks, and AI-driven solutions for automated decision-making.',
    'General': 'Problem solving, process thinking, and the soft skills that keep every project on track.'
  };

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    if (id === 'portfolio') {
      setPageView('portfolio');
      setActiveTab('portfolio');
      return;
    }

    setPageView('home');
    setActiveTab(id);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  function downloadCV(fullName: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="relative min-h-screen font-sans select-none overflow-x-hidden">
      {/* Dynamic Background Grid Elements */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      {/* Primary Floating Header */}
      <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3 bg-[#15121bd9] backdrop-blur-xl border-b border-white/[0.06] transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr flex items-center justify-center font-geist font-bold text-black text-sm">
              <img src="/fagfyugaf.png" alt="" />
            </span>
            <span className="font-geist font-bold tracking-tight text-white hidden sm:inline-block">
              {profile.fullName}
            </span>
          </div>

          {/* Desktop Nav Actions */}
          <nav className="hidden md:flex items-center gap-1">
            {['home', 'about', 'work', 'portfolio', 'services', 'skills', 'testimonials', 'contact'].map((section) => (
              <button
                key={section}
                id={`nav-${section}`}
                onClick={() => scrollToSection(section)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest transition-all ${activeTab === section
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-on-surface-variant hover:text-white hover:bg-white/[0.04]'
                  }`}
              >
                {section === 'home' ? 'Home' : section === 'portfolio' ? 'Library' : section}
              </button>
            ))}
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            <button
              id="header-admin-cta"
              onClick={onNavigateToAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.05] hover:bg-white/[0.1] text-accent border border-white/[0.08] transition-all"
            >
              <span className="material-symbols-outlined text-sm leading-none">dashboard</span>
              <span>Admin Center</span>
            </button>
            <button
              id="header-hire-cta"
              onClick={() => scrollToSection('contact')}
              className="px-4 py-1.5 rounded-full text-xs font-semibold bg-primary text-black hover:scale-105 active:scale-95 transition-all shadow-[0_4px_12px_rgba(208,188,255,0.3)] cursor-pointer"
            >
              Hire Me
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-4 space-y-24">
        {pageView === 'home' && (
          <>
            {/* HERO SECTION */}
            <section id="home" className="pt-16 pb-8 md:pt-24 scroll-mt-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Content Column */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.1] backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 absolute"></span>
                    <span className="text-[10px] uppercase tracking-widest text-[#cbc3d7] font-semibold pl-2">
                      Available for Work
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold tracking-tight text-white leading-none">
                    Hello, I'm <br />
                    <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">{profile.fullName}</span>
                  </h1>

                  <div className="h-8 flex items-center text-lg sm:text-xl font-mono text-[#cbc3d7]">
                    <span>I am a&nbsp;</span>
                    <span className="text-primary font-bold">{typedTitle}</span>
                    <span className="w-1.5 h-5 ml-1 bg-primary animate-pulse-slow"></span>
                  </div>

                  <p className="text-sm sm:text-base text-[#cbc3d7]/90 leading-relaxed max-w-2xl font-light">
                    {profile.bio}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <button
                      id="hero-work-cta"
                      onClick={() => scrollToSection('about')}
                      className="px-6 py-3 rounded-xl font-medium text-xs uppercase tracking-widest bg-primary text-black hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 shadow-[0_10px_25px_-12px_rgba(208,188,255,0.4)] cursor-pointer"
                    >
                      <span>View Portfolio</span>
                      <span className="material-symbols-outlined text-sm font-bold">arrow_downward</span>
                    </button>
                    <button>
                      
                      <a
                        href={PrabeshCV}
                        download="Prabesh_Basnet_CV.pdf"
                        className="px-6 py-3 rounded-xl font-medium text-xs uppercase tracking-widest hover:bg-white/[0.08] text-white border border-white/[0.1] active:scale-95 transition-all flex items-center gap-2 cursor-pointer no-underline"
                      >
                        <span>Download CV</span>
                        <span className="material-symbols-outlined text-sm">download</span>
                      </a>



                    </button>
                  </div>
                </div>

                {/* Right Image Column */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end">
                  <div id="hero-person-image-card" className="relative group max-w-[380px] w-full aspect-square rounded-3xl p-2 bg-gradient-to-tr from-white/[0.04] to-white/[0.12] border border-white/[0.1] shadow-[0_24px_48px_rgba(0,0,0,0.6)]">
                    {/* Background glow effects */}
                    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-primary/30 to-secondary/30 opacity-60 blur-xl group-hover:opacity-85 transition duration-700 pointer-events-none" />

                    {/* Image element within rounded design frame */}
                    <div className="w-full h-full rounded-[22px] overflow-hidden relative bg-black/50">
                      <img
                        src={profile.avatarUrl}
                        alt={profile.fullName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                      />
                      {/* Outer atmospheric edge lighting overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* METRICS & ABOUT */}
            <section id="about" className="py-8 scroll-mt-24">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                {/* Tall Person Image Section (Left Column) */}
                <div className="md:col-span-5 relative group h-[480px] rounded-3xl p-2 bg-gradient-to-tr from-white/[0.04] to-white/[0.12] border border-white/[0.1] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                  {/* Background glow effects */}
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#4cd7f6]/10 to-primary/10 opacity-40 blur-lg pointer-events-none" />

                  <div className="w-full h-full rounded-[22px] overflow-hidden relative bg-black/50">
                    <img
                      src="/coatprofile1.png"
                      alt="Crafting Digital Experiences"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 brightness-90 grayscale-[5%]"
                    />

                    {/* Edge shading overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                    {/* Floating Capsule Badge Overlay */}
                    <div id="about-role-student-badge" className="absolute bottom-6 left-6">
                      <div className="p-4 rounded-2xl bg-[#15121bd9]/80 border border-white/[0.1] backdrop-blur-md flex flex-col items-start leading-none min-w-[150px]">
                        <span className="text-2xl font-geist font-extrabold text-primary">3rd</span>
                        <span className="text-[9px] font-mono tracking-wider text-[#cbc3d7]/80 uppercase font-bold mt-1">
                          Year BIM Student
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About text detailing personality & workflow (Right Column) */}
                <div className="md:col-span-7 space-y-6 text-left">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-primary uppercase tracking-widest font-mono">
                      About Me
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-geist font-extrabold text-white leading-tight">
                      Crafting Digital Experiences with Precision.
                    </h2>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm">
                    <p className="font-light text-[#cbc3d7]/90 leading-relaxed">
                      I am a passionate UI/UX Designer and Front-End Developer currently pursuing my Bachelor's in Information Management (BIM). I bridge the gap between aesthetic beauty and functional code, ensuring every pixel serves a purpose. My approach combines technical mastery with an editorial eye for detail.
                    </p>
                    <p className="font-light text-[#cbc3d7]/90 leading-relaxed">
                      I operate at the intersection of aesthetic design and logical systems. Whether creating bespoke landing pages, managing complex responsive layouts, or formulating smooth layout animations, I write every module aiming to satisfy strict functional limits.
                    </p>
                  </div>

                  {/* Verified Badges */}
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.03] text-[#cbc3d7] text-[10px] font-medium rounded-lg border border-white/[0.06]">
                      <span className="material-symbols-outlined text-[11px] text-teal-400">verified</span>
                      <span>UI/UX & Frontend</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.03] text-[#cbc3d7] text-[10px] font-medium rounded-lg border border-white/[0.06]">
                      <span className="material-symbols-outlined text-[11px] text-[#4cd7f6]">code_blocks</span>
                      <span>BIM Discipline</span>
                    </span>
                  </div>

                  {/* Statistics Grid */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.06]">
                    <div className="space-y-1">
                      <span className="text-3xl font-geist font-extrabold text-primary">30</span>
                      <span className="block text-[10px] uppercase tracking-widest text-[#cbc3d7]/60 font-semibold font-mono">
                        Projects Done
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-3xl font-geist font-extrabold text-[#4cd7f6]">20+</span>
                      <span className="block text-[10px] uppercase tracking-widest text-[#cbc3d7]/60 font-semibold font-mono">
                        Happy Clients
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-3xl font-geist font-extrabold text-tertiary">12</span>
                      <span className="block text-[10px] uppercase tracking-widest text-[#cbc3d7]/60 font-semibold font-mono">
                        Technologies
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* WORK / PROJECTS */}
            <section id="work" className="py-8 scroll-mt-24 space-y-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-primary uppercase tracking-widest font-mono">My Portfolio</span>
                  <h2 className="text-3xl font-geist font-extrabold text-white">Featured Project Cases</h2>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-baseline gap-3">
                    <label htmlFor="work-category-select" className="text-[10px] uppercase tracking-widest text-[#cbc3d7] font-semibold">
                      Category
                    </label>

                  </div>

                  <div className="relative">
                    <select
                      id="work-category-select"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="bg-white/[0.04] border border-white/[0.1] text-sm text-white rounded-xl px-3 py-2 pr-8 outline-none focus:border-primary/80 transition-all appearance-none"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}
                          className="bg-[#0C0816] text-white"
                        >{cat}</option>
                      ))}
                    </select>
                    <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#cbc3d7]" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Grid Layout of featured cases */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredProjects.map((p) => (
                  <div
                    key={p.id}
                    id={`project-card-${p.id}`}
                    onClick={() => setSelectedProject(p)}
                    className="group relative rounded-2xl overflow-hidden glass-card aspect-[4/3] cursor-pointer"
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 opacity-60 group-hover:opacity-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"></div>

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-black/60 text-secondary border border-white/[0.08] backdrop-blur-md uppercase tracking-widest">
                        {p.category}
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 space-y-2">
                      <h3 className="text-xl font-geist font-bold text-white group-hover:text-primary transition-all flex items-center gap-1.5">
                        <span>{p.title}</span>
                        <span className="material-symbols-outlined text-lg leading-none opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                          arrow_outward
                        </span>
                      </h3>
                      <p className="text-xs text-[#cbc3d7] line-clamp-2 font-light">
                        {p.description}
                      </p>
                    </div>
                  </div>
                ))}

                {featuredProjects.length === 0 && (
                  <div className="col-span-2 text-center py-12 text-on-surface-variant font-mono text-sm border border-dashed border-white/[0.08] rounded-2xl">
                    No public featured projects cataloged in this category.
                  </div>
                )}
              </div>

              {filteredProjects.length > featuredProjects.length && (
                <div className="flex justify-center pt-6">
                  <button
                    onClick={() => scrollToSection('portfolio')}
                    className="px-5 py-3 rounded-full text-xs uppercase tracking-widest bg-primary text-black font-semibold hover:opacity-90 active:scale-95 transition-all"
                  >
                    Browse the full project
                  </button>
                </div>
              )}
            </section>

            {/* SERVICES SECTION */}
            <section id="services" className="py-8 scroll-mt-24 space-y-8">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#4cd7f6] uppercase tracking-widest font-mono">Services Blueprint</span>
                <h2 className="text-3xl font-geist font-extrabold text-white">What I Do Best</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.filter(s => s.isActive).map((ser) => (
                  <div
                    key={ser.id}
                    id={`service-card-${ser.id}`}
                    className="p-6 rounded-2xl glass-card transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#1d1a23] to-[#2c2832] border border-white/[0.1] flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-2xl font-light">
                          {ser.icon}
                        </span>
                      </div>
                      <h3 className="text-lg font-geist font-bold text-white tracking-tight">{ser.title}</h3>
                      <p className="text-xs text-[#cbc3d7]/95 font-light leading-relaxed">
                        {ser.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-6 border-t border-white/[0.04] pt-4">
                      {ser.tags.map((tag, idx) => (
                        <span key={idx} className="text-[9px] uppercase tracking-widest text-[#cbc3d7] font-semibold bg-white/[0.04] px-2 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SKILLS SECTION */}
            <section id="skills" className="py-8 scroll-mt-24 space-y-8">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#ffb869] uppercase tracking-widest font-mono font-bold">Creative Power</span>
                <h2 className="text-3xl font-geist font-extrabold text-white">Technical Arsenal</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skillCategories.map((cat, idx) => {
                  const categorySkills = skills.filter(s => s.category === cat);
                  return (
                    <div key={idx} className="p-6 rounded-2xl glass-panel space-y-6">
                      <h3 className="text-sm uppercase tracking-widest text-primary font-bold border-b border-white/[0.06] pb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">bolt</span>
                        <span>{cat}</span>
                      </h3>
                      <p className="text-xs text-[#cbc3d7] leading-relaxed font-light">
                        {skillCategoryDescriptions[cat] ?? 'A strong blend of core skills for modern product and interface development.'}
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                        {categorySkills.map((sk) => {
                          // Custom math parameters for the circular gauge node SVG
                          const size = 80;
                          const strokeWidth = 4;
                          const radius = (size - strokeWidth) / 2;
                          const circumference = radius * 2 * Math.PI;
                          const strokeDashoffset = circumference - (sk.proficiency / 100) * circumference;

                          return (
                            <div key={sk.id} className="flex flex-col items-center text-center space-y-2 group">
                              {/* Circular SVG Gauge Node */}
                              <div className="relative w-20 h-20 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                  <circle
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={radius}
                                    className="stroke-white/[0.03] fill-transparent"
                                    strokeWidth={strokeWidth}
                                  />
                                  <circle
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={radius}
                                    className="stroke-primary fill-transparent transition-all duration-1000 ease-out group-hover:stroke-secondary"
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                  />
                                </svg>
                                <span className="absolute text-xs font-mono font-medium text-[#e7e0ed] group-hover:text-secondary group-hover:font-semibold transition-all">
                                  {sk.proficiency}%
                                </span>
                              </div>

                              <span className="text-xs font-geist font-medium text-[#cbc3d7] tracking-tight group-hover:text-white transition-all">
                                {sk.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* TESTIMONIALS SECTION */}
            <section id="testimonials" className="py-8 scroll-mt-24 space-y-8">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-primary uppercase tracking-widest font-mono">Client Testimonials</span>
                <h2 className="text-3xl font-geist font-extrabold text-white">Trust from Innovation Leaders</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {approvedTestimonials.map((t) => (
                  <div
                    key={t.id}
                    id={`testimonial-card-${t.id}`}
                    className="p-6 rounded-2xl glass-card flex flex-col justify-between gap-6"
                  >
                    <div className="space-y-4">
                      {/* Rating Stars SVG controls */}
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: 5 }).map((_, isIdx) => (
                          <span
                            key={isIdx}
                            className={`material-symbols-outlined text-sm ${isIdx < t.rating ? 'material-filled' : ''
                              }`}
                          >
                            star
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-[#cbc3d7] font-light leading-relaxed italic">
                        "{t.quote}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 border-t border-white/[0.04] pt-4">
                      <img
                        src={t.avatarUrl}
                        alt={t.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover border border-white/[0.1]"
                      />
                      <div>
                        <h4 className="text-xs font-semibold text-white">{t.name}</h4>
                        <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">
                          {t.title}, {t.company}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {approvedTestimonials.length === 0 && (
                  <div className="col-span-3 text-center py-12 text-on-surface-variant font-mono text-sm border border-dashed border-white/[0.08] rounded-2xl">
                    No approved testimonials cataloged yet.
                  </div>
                )}
              </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="py-8 scroll-mt-24 space-y-8">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-secondary uppercase tracking-widest font-mono">Contact Portal</span>
                <h2 className="text-3xl font-geist font-extrabold text-white">Let's Construct Something Iconic</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Quick Stats Panel */}
                <div className="md:col-span-4 p-6 rounded-2xl glass-panel flex flex-col justify-between gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-geist font-bold text-white tracking-tight">Direct Connections</h3>
                    <p className="text-xs text-[#cbc3d7]/90 leading-relaxed font-light">
                      Have a mission-critical platform to launch, an audit requirement, or a contract proposal? Standard inbox is monitored 24/7.
                    </p>
                  </div>

                  <div className="space-y-4 font-mono text-xs">
                    <div className="flex items-center gap-3 text-[#cbc3d7] hover:text-white transition-all">
                      <span className="material-symbols-outlined text-primary text-lg">mail</span>
                      <span>{profile.emailAddress}</span>
                    </div>

                    <div className="flex items-center gap-3 text-[#cbc3d7] hover:text-white transition-all">
                      <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                      <span>{profile.location}</span>
                    </div>

                    <div className="flex items-center gap-3 text-[#cbc3d7] hover:text-white transition-all">
                      <span className="material-symbols-outlined text-primary text-lg">phone</span>
                      <span>{profile.phone}</span>
                    </div>
                  </div>

                  {/* Social Link badges */}
                  <div className="flex gap-2.5 border-t border-white/[0.06] pt-5">
                    {socials.github && (
                      <a
                        href={`https://${socials.github}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-sm hover:text-primary transition-all"
                      >
                        <i className="ri-github-fill"></i>
                      </a>
                    )}
                    {socials.linkedIn && (
                      <a
                        href={`https://${socials.linkedIn}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-sm hover:text-primary transition-all"
                      >
                        <i className="ri-linkedin-fill"></i>
                      </a>
                    )}
                    {socials.Facebook && (
                      <a
                        href={`https://${socials.Facebook}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-sm hover:text-primary transition-all"
                      >
                        <i className="ri-facebook-fill"></i>
                      </a>
                    )}
                    {socials.instagram && (
                      <a
                        href={`https://${socials.instagram}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-sm hover:text-primary transition-all"
                      >
                        <i className="ri-instagram-line"></i>
                      </a>
                    )}
                    {socials.youtube && (
                      <a
                        href={`https://${socials.youtube}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-sm hover:text-primary transition-all"
                      >
                        <i className="ri-youtube-fill"></i>
                      </a>
                    )}

                  </div>
                </div>

                {/* Live Interactive Form Panel */}
                <div className="md:col-span-8 p-8 rounded-2xl glass-panel border border-white/[0.06]">
                  {formSubmitted ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">check_circle</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-geist font-bold text-white">Transmission Received</h4>
                        <p className="text-xs text-on-surface-variant font-medium mt-1">
                          Your inquiry has been stored securely in my Administrative Inbox. Check the Admin Control Center to verify.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleFormChange}
                            placeholder="John Doe"
                            className="w-full text-xs bg-white/[0.03] focus:bg-white/[0.06] border border-white/[0.08] focus:border-primary/40 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleFormChange}
                            placeholder="john@example.com"
                            className="w-full text-xs bg-white/[0.03] focus:bg-white/[0.06] border border-white/[0.08] focus:border-primary/40 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                          Subject Matter
                        </label>
                        <input
                          type="text"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleFormChange}
                          placeholder="Collaboration opportunity..."
                          className="w-full text-xs bg-white/[0.03] focus:bg-white/[0.06] border border-white/[0.08] focus:border-primary/40 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                          Message Body
                        </label>
                        <textarea
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleFormChange}
                          placeholder="Hi Prabesh, we are interested in..."
                          className="w-full text-xs bg-white/[0.03] focus:bg-white/[0.06] border border-white/[0.08] focus:border-primary/40 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        id="submit-message-cta"
                        className="w-full py-3 rounded-xl bg-primary text-black text-xs uppercase tracking-widest font-semibold hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer shadow-[0_4px_16px_rgba(208,188,255,0.2)]"
                      >
                        Send Platform Transmission
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </section>
          </>
        )}

        {pageView === 'portfolio' && (
          <section id="portfolio" className="py-8 scroll-mt-24 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-primary uppercase tracking-widest font-mono">Portfolio Archive</span>
                <h2 className="text-3xl font-geist font-extrabold text-white">Complete Case Library</h2>
              </div>
              <button
                type="button"
                onClick={() => setPageView('home')}
                className="px-4 py-2 rounded-full text-xs uppercase tracking-widest bg-white/[0.06] border border-white/[0.08] text-[#cbc3d7] hover:bg-white/[0.1] transition-all"
              >
                Back to Home
              </button>
            </div>
            {/* <div className="flex items-center gap-3">
              <label htmlFor="portfolio-category-select" className="text-[10px] uppercase tracking-widest text-[#cbc3d7] font-semibold">
                Filter
              </label>
              <span className="text-sm text-[#cbc3d7] font-medium">{selectedCategory}</span>

              <div className="relative">
                <select
                  id="portfolio-category-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white/[0.04] border border-white/[0.1] text-sm text-white rounded-xl px-3 py-2 pr-8 outline-none focus:border-primary/80 transition-all appearance-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#0C0816] text-white">{cat}</option>
                  ))}
                </select>
                <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#cbc3d7]" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div> */}

            <div className="text-sm text-[#cbc3d7]">
              {portfolioProjects.length > 0 ? (
                <>Showing {portfolioProjects.length} additional {portfolioProjects.length === 1 ? 'project' : 'projects'} in the archive.</>
              ) : (
                <>All selected projects are featured above. Add more projects to populate the full portfolio.</>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visiblePortfolioProjects.map((p) => (
                <div
                  key={p.id}
                  id={`portfolio-card-${p.id}`}
                  onClick={() => setSelectedProject(p)}
                  className="group relative rounded-2xl overflow-hidden glass-card aspect-[4/3] cursor-pointer"
                >
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 opacity-60 group-hover:opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-black/60 text-secondary border border-white/[0.08] backdrop-blur-md uppercase tracking-widest">
                      {p.category}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 space-y-2">
                    <h3 className="text-xl font-geist font-bold text-white group-hover:text-primary transition-all flex items-center gap-1.5">
                      <span>{p.title}</span>
                      <span className="material-symbols-outlined text-lg leading-none opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        arrow_outward
                      </span>
                    </h3>
                    <p className="text-xs text-[#cbc3d7] line-clamp-2 font-light">
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}

              {portfolioProjects.length === 0 && (
                <div className="col-span-2 text-center py-12 text-on-surface-variant font-mono text-sm border border-dashed border-white/[0.08] rounded-2xl">
                  No additional projects available for this filter. All live items are available above.
                </div>
              )}
            </div>

            {portfolioPageCount > 1 && (
              <div className="flex flex-wrap items-center justify-between gap-3 pt-6">
                <div className="text-sm text-[#cbc3d7]">
                  Page {portfolioPage} of {portfolioPageCount}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    disabled={portfolioPage === 1}
                    onClick={() => setPortfolioPage((page) => Math.max(page - 1, 1))}
                    className="px-4 py-2 rounded-full text-[11px] uppercase tracking-widest bg-white/[0.06] border border-white/[0.08] text-[#cbc3d7] hover:bg-white/[0.1] disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                  >
                    Previous
                  </button>
                  {Array.from({ length: portfolioPageCount }, (_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPortfolioPage(idx + 1)}
                      className={`px-3 py-2 rounded-full text-[11px] uppercase tracking-widest transition-all ${portfolioPage === idx + 1 ? 'bg-primary text-black' : 'bg-white/[0.05] text-[#cbc3d7] hover:bg-white/[0.1]'
                        }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    type="button"
                    disabled={portfolioPage === portfolioPageCount}
                    onClick={() => setPortfolioPage((page) => Math.min(page + 1, portfolioPageCount))}
                    className="px-4 py-2 rounded-full text-[11px] uppercase tracking-widest bg-white/[0.06] border border-white/[0.08] text-[#cbc3d7] hover:bg-white/[0.1] disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="border-t border-white/[0.06] bg-black/40 backdrop-blur-md py-8 text-center px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-on-surface-variant">
          <span>&copy; {new Date().getFullYear()} {profile.fullName}. All rights reserved.</span>
          <span>Crafted with pure structural aesthetics.</span>
        </div>
      </footer>

      {/* PORTFOLIO WORK LIGHTBOX OVERLAY */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
          <div
            id="lightbox-container"
            className="w-full max-w-3xl rounded-2xl overflow-hidden glass-panel border border-white/[0.1] shadow-2xl animate-float"
          >
            {/* Aspect image preview */}
            <div className="relative aspect-video w-full bg-black">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all border border-white/[0.1]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Information container */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#a078ff] font-semibold">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-geist font-bold text-white mt-1">
                    {selectedProject.title}
                  </h3>
                </div>

                <a
                  href={selectedProject.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-primary text-black hover:opacity-95 flex items-center gap-1.5 transition-all shadow-[0_4px_12px_rgba(208,188,255,0.2)]"
                >
                  <span>Launch Live Site</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>

              <p className="text-sm font-light text-[#cbc3d7] leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="flex items-center gap-2 border-t border-white/[0.04] pt-4 font-mono text-[10px] text-on-surface-variant">
                <span>Date Published:</span>
                <span className="text-[#e7e0ed]">{selectedProject.dateAdded}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
