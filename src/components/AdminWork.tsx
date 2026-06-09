import React, { useState } from 'react';
import { Project } from '../types';

interface AdminWorkProps {
  projects: Project[];
  onAddProject: (p: Omit<Project, 'id' | 'dateAdded'>) => void;
  onUpdateProject: (p: Project) => void;
  onDeleteProject: (id: string) => void;
}

export const AdminWork: React.FC<AdminWorkProps> = ({
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Design',
    description: '',
    imageUrl: '',
    liveLink: '',
    isPublic: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSelectProject = (proj: Project) => {
    setSelectedProject(proj);
    setIsAdding(false);
    setFormData({
      title: proj.title,
      category: proj.category,
      description: proj.description,
      imageUrl: proj.imageUrl,
      liveLink: proj.liveLink,
      isPublic: proj.isPublic,
    });
  };

  const handleStartAdd = () => {
    setIsAdding(true);
    setSelectedProject(null);
    setFormData({
      title: '',
      category: 'Web Design',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
      liveLink: '',
      isPublic: true,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    if (isAdding) {
      onAddProject(formData);
      setIsAdding(false);
    } else if (selectedProject) {
      onUpdateProject({
        ...selectedProject,
        ...formData,
      });
      setSelectedProject(null);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      onDeleteProject(id);
      setSelectedProject(null);
      setIsAdding(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-float">
      {/* Left List Pane */}
      <div className={`lg:col-span-7 space-y-4`}>
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
          <div>
            <h2 className="text-lg font-geist font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">work</span>
              <span>Portfolio Items</span>
            </h2>
            <p className="text-[10px] text-on-surface-variant font-mono">{projects.length} Works Cataloged</p>
          </div>

          <button
            onClick={handleStartAdd}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-primary text-black hover:opacity-90 active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span>Add Project Case</span>
          </button>
        </div>

        <div className="space-y-3">
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => handleSelectProject(proj)}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                selectedProject?.id === proj.id 
                  ? 'bg-primary/5 border-primary/30 shadow-[0_4px_20px_rgba(208,188,255,0.05)]' 
                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={proj.imageUrl}
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-xl object-cover border border-white/[0.08]"
                />
                <div className="min-w-0">
                  <h3 className="text-xs font-semibold text-white truncate">{proj.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-white/[0.04] text-on-surface-variant font-medium">
                      {proj.category}
                    </span>
                    <span className="text-[9px] text-on-surface-variant font-mono">
                      {proj.dateAdded}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pl-4">
                <span className={`px-2 py-0.5 rounded-full text-[8px] uppercase tracking-wider font-extrabold ${
                  proj.isPublic ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/10 text-white/40'
                }`}>
                  {proj.isPublic ? 'PUBLIC' : 'PRIVATE'}
                </span>
                <span className="material-symbols-outlined text-[#cbc3d7]/30 text-lg">chevron_right</span>
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="text-center py-12 text-on-surface-variant font-mono text-xs">
              No project listings cataloged.
            </div>
          )}
        </div>
      </div>

      {/* Right Drawer Panel */}
      <div className="lg:col-span-5">
        {(selectedProject || isAdding) ? (
          <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-6">
            <div className="pb-3 border-b border-white/[0.04] flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#cbc3d7]/80 font-mono">
                {isAdding ? 'Create Project Record' : 'Edit Project Record'}
              </h3>

              {!isAdding && selectedProject && (
                <button
                  type="button"
                  onClick={() => handleDelete(selectedProject.id)}
                  className="w-8 h-8 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-all cursor-pointer"
                  title="Delete Project Case"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              )}
            </div>

            <div className="space-y-4 text-xs">
              {/* Case Title */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                  Project Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Luxe Interio"
                  className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/40 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-white outline-none transition-all placeholder-white/20"
                />
              </div>

              {/* Category Select */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                  Work Category Type
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/40 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-white outline-none transition-all"
                >
                  <option value="Web Design" className="bg-[#15121b] text-white">Web Design</option>
                  <option value="UI/UX" className="bg-[#15121b] text-white">UI/UX</option>
                  <option value="Dev" className="bg-[#15121b] text-white">Dev</option>
                </select>
              </div>

              {/* Case Image URL */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-semibold text-[#cbc3d7] tracking-wider">
                  Visual Cover Image Link
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  required
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/40 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-white outline-none transition-all placeholder-white/20"
                />
              </div>

              {/* Case Live Link */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-semibold text-[#cbc3d7] tracking-wider">
                  Live Website Link (URL)
                </label>
                <input
                  type="text"
                  name="liveLink"
                  value={formData.liveLink}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/40 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-white outline-none transition-all placeholder-white/20"
                />
              </div>

              {/* Short description text */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-semibold text-[#cbc3d7] tracking-wider">
                  Case Study Description
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Summarize the core deliverables and creative process..."
                  className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/40 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-white outline-none transition-all placeholder-white/20 resize-none"
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="chk-public"
                  name="isPublic"
                  checked={formData.isPublic}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-white/[0.1] bg-white/[0.03] text-primary focus:ring-0 outline-none"
                />
                <label htmlFor="chk-public" className="text-xs font-medium text-white select-none cursor-pointer">
                  Publish to Live Portfolio Site immediately
                </label>
              </div>
            </div>

            <div className="flex gap-3 border-t border-white/[0.04] pt-5">
              <button
                type="button"
                onClick={() => {
                  setSelectedProject(null);
                  setIsAdding(false);
                }}
                className="flex-1 py-2.5 rounded-xl border border-white/[0.08] hover:bg-white/[0.04] text-xs font-semibold text-white transition-all cursor-pointer"
              >
                Discard Change
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-primary text-black text-xs font-semibold hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_12px_rgba(208,188,255,0.2)]"
              >
                Apply Details
              </button>
            </div>
          </form>
        ) : (
          <div className="h-full rounded-2xl border border-dashed border-white/[0.08] p-8 flex flex-col items-center justify-center text-center text-on-surface-variant font-mono text-xs">
            <span className="material-symbols-outlined text-3xl mb-2 text-[#a078ff]/45">draw</span>
            <span>Select a project card to edit layout metadata or press "Add Project Case" to open the creation canvas.</span>
          </div>
        )}
      </div>
    </div>
  );
};
