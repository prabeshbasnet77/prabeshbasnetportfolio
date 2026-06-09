import React, { useState } from 'react';
import { Testimonial } from '../types';

interface AdminTestimonialsProps {
  testimonials: Testimonial[];
  onUpdateTestimonialStatus: (id: string, status: Testimonial['status']) => void;
  onDeleteTestimonial: (id: string) => void;
  onAddTestimonial: (t: Omit<Testimonial, 'id'>) => void;
}

export const AdminTestimonials: React.FC<AdminTestimonialsProps> = ({
  testimonials,
  onUpdateTestimonialStatus,
  onDeleteTestimonial,
  onAddTestimonial,
}) => {
  const [isAdding, setIsAdding] = useState(false);

  // Form states for manual registration
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    rating: 5,
    quote: '',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    status: 'Approved' as Testimonial['status'],
  });

  const totalReviewsCount = testimonials.length;
  const approvedCount = testimonials.filter(t => t.status === 'Approved').length;
  const pendingCount = testimonials.filter(t => t.status === 'Pending').length;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.name === 'rating' ? parseInt(e.target.value, 10) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.quote) return;

    onAddTestimonial(formData);
    setIsAdding(false);
    // Reset
    setFormData({
      name: '',
      title: '',
      company: '',
      rating: 5,
      quote: '',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      status: 'Approved',
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      onDeleteTestimonial(id);
    }
  };

  return (
    <div className="space-y-8 animate-float">
      {/* Bento analytics stats summaries */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
          <span className="text-[10px] uppercase font-semibold font-mono text-[#cbc3d7]/65">Total Review Logs</span>
          <div className="text-4xl font-geist font-extrabold text-white">{totalReviewsCount}</div>
          <p className="text-[10px] text-on-surface-variant font-mono">Feedback nodes received</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
          <span className="text-[10px] uppercase font-semibold font-mono text-[#cbc3d7]/65">Approved & Live</span>
          <div className="text-4xl font-geist font-extrabold text-emerald-400">{approvedCount}</div>
          <p className="text-[10px] text-on-surface-variant font-mono">Currently shining on showcase</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
          <span className="text-[10px] uppercase font-semibold font-mono text-[#cbc3d7]/65">In Review Queue</span>
          <div className="text-4xl font-geist font-extrabold text-amber-400">{pendingCount}</div>
          <p className="text-[10px] text-on-surface-variant font-mono">Awaiting publishing authorization</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left pane: Testimonial moderation view */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
            <h3 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base font-bold">reviews</span>
              <span>Client Review Moderation Deck</span>
            </h3>

            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-primary text-black hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>Create Review Card</span>
            </button>
          </div>

          <div className="space-y-4">
            {testimonials.map((t) => (
              <div
                key={t.id}
                id={`moderator-card-${t.id}`}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatarUrl}
                      alt={t.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-white/[0.08]"
                    />
                    <div>
                      <h4 className="text-xs font-semibold text-white">{t.name}</h4>
                      <p className="text-[10px] text-[#cbc3d7] font-mono leading-none mt-1">
                        {t.title}, {t.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[8.5px] font-mono uppercase font-bold ${
                      t.status === 'Approved' 
                        ? 'bg-emerald-500/15 text-emerald-400' 
                        : t.status === 'Pending' 
                        ? 'bg-amber-500/15 text-amber-400' 
                        : 'bg-white/10 text-white/50'
                    }`}>
                      {t.status}
                    </span>

                    {/* Quick status actions */}
                    <div className="flex items-center gap-1 bg-black/30 p-0.5 rounded-lg border border-white/[0.04]">
                      {t.status !== 'Approved' && (
                        <button
                          onClick={() => onUpdateTestimonialStatus(t.id, 'Approved')}
                          className="px-2 py-1 rounded text-[9px] font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-all cursor-pointer"
                          title="Publish Approve"
                        >
                          Approve
                        </button>
                      )}
                      {t.status !== 'Draft' && (
                        <button
                          onClick={() => onUpdateTestimonialStatus(t.id, 'Draft')}
                          className="px-2 py-1 rounded text-[9px] font-semibold bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                          title="Set back to Draft"
                        >
                          Draft
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="w-6 h-6 rounded flex items-center justify-center text-red-400 hover:bg-red-500/15 transition-all cursor-pointer"
                        title="Delete card"
                      >
                        <span className="material-symbols-outlined text-[14px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="ps-0 sm:ps-13 space-y-2">
                  <div className="flex items-center text-amber-400 gap-0.5">
                    {Array.from({ length: 5 }).map((_, isIdx) => (
                      <span
                        key={isIdx}
                        className={`material-symbols-outlined text-xs ${isIdx < t.rating ? 'material-filled' : ''}`}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-[#cbc3d7]/90 leading-relaxed font-light italic">
                    "{t.quote}"
                  </p>
                </div>
              </div>
            ))}

            {testimonials.length === 0 && (
              <div className="text-center py-12 text-on-surface-variant font-mono text-xs border border-dashed border-white/[0.08] rounded-2xl">
                No testimonial entries registered.
              </div>
            )}
          </div>
        </div>

        {/* Right drawer: Addition form panels */}
        <div className="lg:col-span-5">
          {isAdding ? (
            <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-6">
              <div className="pb-3 border-b border-white/[0.04] flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#cbc3d7]/80 font-mono">
                  Register Testimonial Node
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>

              <div className="space-y-4 text-xs">
                {/* Client Name */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                    Client's Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Elena Vost"
                    className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/40 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-white outline-none transition-all placeholder-white/20"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Client title */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                      Designation Role Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Lead Dev / CTO"
                      className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/40 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-white outline-none transition-all placeholder-white/20"
                    />
                  </div>
                  {/* Client company */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                      Company Brand Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Lumos HQ"
                      className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/40 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-white outline-none transition-all placeholder-white/20"
                    />
                  </div>
                </div>

                {/* Rating select stars list */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-semibold text-[#cbc3d7] tracking-wider font-mono">
                    Aesthetic Service Rating Stars
                  </label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/40 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-white outline-none transition-all"
                  >
                    <option value={5} className="bg-[#15121b] text-white">★★★★★ (5 Stars)</option>
                    <option value={4} className="bg-[#15121b] text-white">★★★★☆ (4 Stars)</option>
                    <option value={3} className="bg-[#15121b] text-white">★★★☆☆ (3 Stars)</option>
                  </select>
                </div>

                {/* Client Quote body */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-semibold text-[#cbc3d7] tracking-wider">
                    Detailed Review Quote Content
                  </label>
                  <textarea
                    name="quote"
                    required
                    rows={4}
                    value={formData.quote}
                    onChange={handleInputChange}
                    placeholder="Describe their feedback or review statements..."
                    className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/40 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-white outline-none transition-all placeholder-white/20 resize-none"
                  />
                </div>

                {/* Client Avatar Link */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-semibold text-[#cbc3d7] tracking-wider">
                    Client Photo Avatar Link
                  </label>
                  <input
                    type="text"
                    name="avatarUrl"
                    required
                    value={formData.avatarUrl}
                    onChange={handleInputChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-primary/40 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-3 text-white outline-none transition-all placeholder-white/20"
                  />
                </div>
              </div>

              <div className="flex gap-3 border-t border-white/[0.04] pt-5">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 py-2.5 rounded-xl border border-white/[0.08] hover:bg-white/[0.04] text-xs font-semibold text-white transition-all cursor-pointer"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-primary text-black text-xs font-semibold hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_12px_rgba(208,188,255,0.2)]"
                >
                  Confirm Review
                </button>
              </div>
            </form>
          ) : (
            <div className="h-full rounded-2xl border border-dashed border-white/[0.08] p-8 flex flex-col items-center justify-center text-center text-on-surface-variant font-mono text-xs">
              <span className="material-symbols-outlined text-3xl mb-2 text-primary/40">reviews</span>
              <span>Register new review cards manually on the left using "Create Review Card" control block.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
