import React, { useState } from 'react';
import { Skill } from '../types';

interface AdminSkillsProps {
  skills: Skill[];
  onAddSkill: (s: Omit<Skill, 'id'>) => void;
  onUpdateSkill: (s: Skill) => void;
  onDeleteSkill: (id: string) => void;
}

export const AdminSkills: React.FC<AdminSkillsProps> = ({
  skills,
  onAddSkill,
  onUpdateSkill,
  onDeleteSkill,
}) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend Engineering',
    proficiency: 85,
  });

  const expertCount = skills.filter(s => s.proficiency >= 90).length;
  const inProgressCount = skills.filter(s => s.proficiency < 80).length;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'range' ? parseInt(e.target.value, 10) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleStartAdd = () => {
    setIsAdding(true);
    setSelectedSkill(null);
    setFormData({
      name: '',
      category: 'Frontend Engineering',
      proficiency: 80,
    });
  };

  const handleSelectSkill = (sk: Skill) => {
    setSelectedSkill(sk);
    setIsAdding(false);
    setFormData({
      name: sk.name,
      category: sk.category,
      proficiency: sk.proficiency,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    if (isAdding) {
      onAddSkill(formData);
      setIsAdding(false);
    } else if (selectedSkill) {
      onUpdateSkill({
        ...selectedSkill,
        ...formData,
      });
      setSelectedSkill(null);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this active skill from your portfolio?')) {
      onDeleteSkill(id);
      setSelectedSkill(null);
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-8 animate-float">
      {/* Bento Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
          <span className="text-[10px] uppercase font-semibold font-mono text-[#cbc3d7]/65">Expert Mastery ({'>'}=90)</span>
          <div className="text-4xl font-geist font-extrabold text-primary">{expertCount}</div>
          <p className="text-[10px] text-on-surface-variant font-mono">Top-level active specialties</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
          <span className="text-[10px] uppercase font-semibold font-mono text-[#cbc3d7]/65">Total Cataloged</span>
          <div className="text-4xl font-geist font-extrabold text-secondary">{skills.length}</div>
          <p className="text-[10px] text-on-surface-variant font-mono">Active technical markers</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
          <span className="text-[10px] uppercase font-semibold font-mono text-[#cbc3d7]/65">In Growth Stage ({'<'}80)</span>
          <div className="text-4xl font-geist font-extrabold text-tertiary">{inProgressCount}</div>
          <p className="text-[10px] text-on-surface-variant font-mono">Active development milestones</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Category Blocks and Lists */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
            <div>
              <h3 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">construction</span>
                <span>Active Arsenal Modules</span>
              </h3>
            </div>

            <button
              onClick={handleStartAdd}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-primary text-black hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>Add Skill Badge</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((sk) => (
              <div
                key={sk.id}
                onClick={() => handleSelectSkill(sk)}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedSkill?.id === sk.id 
                    ? 'bg-primary/5 border-primary/30' 
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                }`}
              >
                <div className="space-y-1 min-w-0 pr-2">
                  <div className="text-xs font-bold text-white truncate">{sk.name}</div>
                  <div className="text-[9px] uppercase tracking-wide font-mono text-on-surface-variant truncate">
                    {sk.category}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-semibold text-secondary">
                    {sk.proficiency}%
                  </span>
                  <span className="material-symbols-outlined text-[#cbc3d7]/30 text-base">chevron_right</span>
                </div>
              </div>
            ))}

            {skills.length === 0 && (
              <div className="col-span-2 text-center py-12 text-on-surface-variant font-mono text-xs border border-dashed border-white/[0.08] rounded-2xl">
                No active skills recorded in catalog.
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Edit Panel */}
        <div className="lg:col-span-5">
          {(selectedSkill || isAdding) ? (
            <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-6">
              <div className="pb-3 border-b border-white/[0.04] flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-[#cbc3d7]/80 font-mono">
                  {isAdding ? 'Register Skill Core' : 'Modify Skill Module'}
                </h4>

                {!isAdding && selectedSkill && (
                  <button
                    type="button"
                    onClick={() => handleDelete(selectedSkill.id)}
                    className="w-8 h-8 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-all cursor-pointer"
                    title="Delete Skill module"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                )}
              </div>

              <div className="space-y-5 text-xs">
                {/* Skill Name */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                    Core Asset Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Three.js"
                    className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/40 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-white outline-none transition-all placeholder-white/20"
                  />
                </div>

                {/* Skill Category select/text */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-semibold text-[#cbc3d7] tracking-wider">
                    Creative/Technical Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/40 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-white outline-none transition-all"
                  >
                    <option value="Frontend Engineering" className="bg-[#15121b] text-white">Frontend Engineering</option>
                    <option value="3D Graphics" className="bg-[#15121b] text-white">3D Graphics</option>
                    <option value="Visual Architecture" className="bg-[#15121b] text-white">Visual Architecture</option>
                    <option value="Backend Systems" className="bg-[#15121b] text-white">Backend Systems</option>
                    <option value="Utility Framework" className="bg-[#15121b] text-white">Utility Framework</option>
                    <option value="Video Editing" className="bg-[#15121b] text-white">Video Editing</option>
                    <option value="Typed Logic" className="bg-[#15121b] text-white">Typed Logic</option>
                    <option value="General" className="bg-[#15121b] text-white">General</option>
                  </select>
                </div>

                {/* Proficiency slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] uppercase font-semibold text-[#cbc3d7] tracking-wider font-mono">
                      Proficiency Calibration
                    </label>
                    <span className="text-secondary font-mono font-bold">{formData.proficiency}%</span>
                  </div>
                  <input
                    type="range"
                    name="proficiency"
                    min="10"
                    max="100"
                    value={formData.proficiency}
                    onChange={handleInputChange}
                    className="w-full h-1 bg-white/15 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-on-surface-variant font-bold">
                    <span>GROWTH (10%)</span>
                    <span>ADEPT (50%)</span>
                    <span>MASTER (100%)</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 border-t border-white/[0.04] pt-5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSkill(null);
                    setIsAdding(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-white/[0.08] hover:bg-white/[0.04] text-xs font-semibold text-white transition-all cursor-pointer"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-primary text-black text-xs font-semibold hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_12px_rgba(208,188,255,0.2)]"
                >
                  Calibrate Active
                </button>
              </div>
            </form>
          ) : (
            <div className="h-full rounded-2xl border border-dashed border-white/[0.08] p-8 flex flex-col items-center justify-center text-center text-on-surface-variant font-mono text-xs">
              <span className="material-symbols-outlined text-3xl mb-2 text-primary/40">construction</span>
              <span>Tap a skill module badge to modify its expert indicators or create a new active register.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
