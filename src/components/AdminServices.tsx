import React, { useState } from 'react';
import { Service } from '../types';

interface AdminServicesProps {
  services: Service[];
  onAddService: (s: Omit<Service, 'id'>) => void;
  onUpdateService: (s: Service) => void;
  onDeleteService: (id: string) => void;
}

export const AdminServices: React.FC<AdminServicesProps> = ({
  services,
  onAddService,
  onUpdateService,
  onDeleteService,
}) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'web',
    tagsInput: '',
    isActive: true,
  });

  const availableIcons = ['web', 'terminal', 'draw', 'devices', 'brush', 'cloud', 'code', 'bolt', 'star', 'videocam', 'monitoring'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleStartAdd = () => {
    setIsAdding(true);
    setSelectedService(null);
    setFormData({
      title: '',
      description: '',
      icon: 'web',
      tagsInput: 'React, Next.js',
      isActive: true,
    });
  };

  const handleSelectService = (ser: Service) => {
    setSelectedService(ser);
    setIsAdding(false);
    setFormData({
      title: ser.title,
      description: ser.description,
      icon: ser.icon,
      tagsInput: ser.tags.join(', '),
      isActive: ser.isActive,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    // Split tags input string into an array
    const tags = formData.tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const payload = {
      title: formData.title,
      description: formData.description,
      icon: formData.icon,
      tags,
      isActive: formData.isActive,
    };

    if (isAdding) {
      onAddService(payload);
      setIsAdding(false);
    } else if (selectedService) {
      onUpdateService({
        ...selectedService,
        ...payload,
      });
      setSelectedService(null);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this service model?')) {
      onDeleteService(id);
      setSelectedService(null);
      setIsAdding(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-float">
      {/* Services List Pane */}
      <div className="lg:col-span-7 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
          <div>
            <h2 className="text-lg font-geist font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">design_services</span>
              <span>Offered Services</span>
            </h2>
            <p className="text-[10px] text-on-surface-variant font-mono">{services.length} Blueprints Registered</p>
          </div>

          <button
            onClick={handleStartAdd}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-primary text-black hover:opacity-90 active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span>Add Service Blueprint</span>
          </button>
        </div>

        <div className="space-y-3">
          {services.map((ser) => (
            <div
              key={ser.id}
              onClick={() => handleSelectService(ser)}
              className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                selectedService?.id === ser.id 
                  ? 'bg-primary/5 border-primary/30' 
                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-white/[0.02] to-white/[0.04] border border-white/[0.08] flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined font-light">{ser.icon}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-semibold text-white">{ser.title}</h3>
                  <p className="text-[10px] text-[#cbc3d7]/85 line-clamp-1 max-w-[200px] sm:max-w-[340px] mt-0.5 font-light leading-normal">
                    {ser.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pl-4">
                <span className={`px-2 py-0.5 rounded-full text-[8px] uppercase tracking-wider font-extrabold ${
                  ser.isActive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/10 text-white/40'
                }`}>
                  {ser.isActive ? 'ACTIVE' : 'INACTIVE'}
                </span>
                <span className="material-symbols-outlined text-[#cbc3d7]/30 text-lg">chevron_right</span>
              </div>
            </div>
          ))}

          {services.length === 0 && (
            <div className="text-center py-12 text-on-surface-variant font-mono text-xs">
              No service blueprints listed.
            </div>
          )}
        </div>
      </div>

      {/* Services edit right drawer */}
      <div className="lg:col-span-5">
        {(selectedService || isAdding) ? (
          <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-6">
            <div className="pb-3 border-b border-white/[0.04] flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#cbc3d7]/80 font-mono">
                {isAdding ? 'Create Service Protocol' : 'Edit Service Protocol'}
              </h3>

              {!isAdding && selectedService && (
                <button
                  type="button"
                  onClick={() => handleDelete(selectedService.id)}
                  className="w-8 h-8 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-all cursor-pointer"
                  title="Delete service block"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              )}
            </div>

            <div className="space-y-4 text-xs">
              {/* Service Title */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                  Service Title Header
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Front-End Dev"
                  className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/40 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-white outline-none transition-all placeholder-white/20"
                />
              </div>

              {/* Service Description */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-semibold text-[#cbc3d7] tracking-wider">
                  Operational Description
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your capabilities and workflow offerings..."
                  className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/40 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-white outline-none transition-all placeholder-white/20 resize-none"
                />
              </div>

              {/* Icon Material Symbols Selector */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-semibold text-[#cbc3d7] tracking-wider font-mono">
                  Visual Vector Icon Representative
                </label>
                <div className="grid grid-cols-6 gap-2 bg-white/[0.01] p-3 rounded-xl border border-white/[0.04]">
                  {availableIcons.map((ic) => (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon: ic })}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                        formData.icon === ic 
                          ? 'bg-primary/10 border-primary text-primary' 
                          : 'bg-white/[0.02] border-white/[0.04] text-white/50 hover:bg-white/[0.05] hover:text-white'
                      }`}
                      title={ic}
                    >
                      <span className="material-symbols-outlined text-lg leading-none">{ic}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tag keywords input splitters */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-semibold text-[#cbc3d7] tracking-wider font-mono">
                  Associated Keywords (Comma separated)
                </label>
                <input
                  type="text"
                  name="tagsInput"
                  value={formData.tagsInput}
                  onChange={handleInputChange}
                  placeholder="React, Tailwind, TypeScript"
                  className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/40 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-white outline-none transition-all placeholder-white/20"
                />
              </div>

              {/* Active Toggle Switch */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="chk-service-active"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-white/[0.1] bg-white/[0.03] text-primary focus:ring-0 outline-none"
                />
                <label htmlFor="chk-service-active" className="text-xs font-medium text-white select-none cursor-pointer">
                  Activate Offered Service block instantly on live showcase node
                </label>
              </div>
            </div>

            <div className="flex gap-3 border-t border-white/[0.04] pt-5">
              <button
                type="button"
                onClick={() => {
                  setSelectedService(null);
                  setIsAdding(false);
                }}
                className="flex-1 py-2.5 rounded-xl border border-white/[0.08] hover:bg-white/[0.04] text-xs font-semibold text-white transition-all cursor-pointer"
              >
                Cancel Process
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-primary text-black text-xs font-semibold hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_12px_rgba(208,188,255,0.2)]"
              >
                Confirm Setup
              </button>
            </div>
          </form>
        ) : (
          <div className="h-full rounded-2xl border border-dashed border-white/[0.08] p-8 flex flex-col items-center justify-center text-center text-on-surface-variant font-mono text-xs">
            <span className="material-symbols-outlined text-3xl mb-2 text-[#a078ff]/40">design_services</span>
            <span>Tap any active service module card to modify description assets, symbols, tags, or compile a new model.</span>
          </div>
        )}
      </div>
    </div>
  );
};
