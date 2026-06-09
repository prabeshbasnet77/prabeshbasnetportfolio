import React, { useState } from 'react';
import { Message } from '../types';

interface AdminContactProps {
  messages: Message[];
  onMarkAsRead: (id: string) => void;
  onReplyMessage: (id: string, replyText: string) => void;
  onDeleteMessage: (id: string) => void;
}

export const AdminContact: React.FC<AdminContactProps> = ({
  messages,
  onMarkAsRead,
  onReplyMessage,
  onDeleteMessage,
}) => {
  const [activeMessage, setActiveMessage] = useState<Message | null>(
    messages.length > 0 ? messages[0] : null
  );
  const [replyText, setReplyText] = useState('');

  const handleSelectMessage = (msg: Message) => {
    setActiveMessage(msg);
    if (msg.isNew) {
      onMarkAsRead(msg.id);
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeMessage) return;

    onReplyMessage(activeMessage.id, replyText);
    
    // Update active screen state locally too
    setActiveMessage({
      ...activeMessage,
      replies: [...activeMessage.replies, replyText]
    });
    setReplyText('');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact message thread permanently?')) {
      onDeleteMessage(id);
      setActiveMessage(null);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[540px] animate-float">
      {/* Left List Pane: Thread Listings */}
      <div className="lg:col-span-5 bg-white/[0.01] border border-white/[0.06] rounded-2xl flex flex-col h-full overflow-hidden">
        <div className="p-4 border-b border-white/[0.04]">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[#cbc3d7]/80 font-mono">
            Contact Messages Inbox
          </h3>
          <p className="text-[10px] text-on-surface-variant font-mono mt-0.5">{messages.length} Threads Registered</p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-white/[0.04]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleSelectMessage(msg)}
              className={`p-4 gap-3 text-left flex items-start cursor-pointer transition-all ${
                activeMessage?.id === msg.id 
                  ? 'bg-primary/5' 
                  : 'hover:bg-white/[0.02]'
              }`}
            >
              {/* Profile Avatar Initials */}
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center font-bold text-xs text-primary shrink-0">
                {msg.avatarSeed}
              </div>

              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className={`text-xs truncate ${msg.isNew ? 'font-bold text-white' : 'font-medium text-white/70'}`}>
                      {msg.name}
                    </span>
                    {msg.isNew && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 animate-pulse"></span>
                    )}
                  </div>
                  <span className="text-[9px] text-[#cbc3d7]/40 font-mono shrink-0">{msg.timestamp}</span>
                </div>

                <div className={`text-[11px] truncate ${msg.isNew ? 'font-semibold text-white/90' : 'text-white/60'}`}>
                  {msg.subject}
                </div>
                <p className="text-[10.5px] text-[#cbc3d7]/60 line-clamp-1 font-light">
                  {msg.message}
                </p>
              </div>
            </div>
          ))}

          {messages.length === 0 && (
            <div className="text-center py-12 text-on-surface-variant font-mono text-xs">
              No messages found in your inbox.
            </div>
          )}
        </div>
      </div>

      {/* Right Detailed Thread View & Conversational Reply */}
      <div className="lg:col-span-7 bg-white/[0.01] border border-white/[0.06] rounded-2xl flex flex-col h-full overflow-hidden">
        {activeMessage ? (
          <div className="flex flex-col h-full justify-between">
            {/* Thread Header */}
            <div className="p-5 border-b border-white/[0.04] flex items-center justify-between">
              <div>
                <h4 className="text-xs font-semibold text-white truncate max-w-[240px] sm:max-w-md">
                  {activeMessage.subject}
                </h4>
                <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[10px] text-on-surface-variant font-mono">
                  <span>From:</span>
                  <span className="text-[#e7e0ed]">{activeMessage.name} &lt;{activeMessage.email}&gt;</span>
                </div>
              </div>

              <button
                onClick={() => handleDelete(activeMessage.id)}
                className="w-8 h-8 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-all cursor-pointer"
                title="Delete this thread"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
              </button>
            </div>

            {/* Scrollable conversation bubble messages */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              {/* Origin Client Message */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center font-bold text-xs text-secondary shrink-0">
                  {activeMessage.avatarSeed}
                </div>
                <div className="space-y-1.5 flex-1 bg-white/[0.03] p-4 rounded-2xl border border-white/[0.04]">
                  <div className="flex items-center justify-between text-[9px] font-mono text-[#cbc3d7]/60">
                    <span>{activeMessage.name}</span>
                    <span>{activeMessage.timestamp}</span>
                  </div>
                  <p className="text-xs text-[#cbc3d7] whitespace-pre-wrap font-light leading-relaxed">
                    {activeMessage.message}
                  </p>
                </div>
              </div>

              {/* Back & Forth replies loops */}
              {activeMessage.replies.map((reply, idx) => (
                <div key={idx} className="flex items-start gap-3 justify-end">
                  <div className="space-y-1.5 flex-1 bg-primary/10 p-4 rounded-2xl border border-primary/15 max-w-[85%] text-left">
                    <div className="flex items-center justify-between text-[9px] font-mono text-primary/70">
                      <span>Administrator (Me)</span>
                      <span>Just now</span>
                    </div>
                    <p className="text-xs text-[#cbc3d7]/95 font-light leading-relaxed">
                      {reply}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-primary/25 border border-primary/20 flex items-center justify-center font-bold text-xs text-primary shrink-0">
                    ME
                  </div>
                </div>
              ))}
            </div>

            {/* Conversational bottom reply bar */}
            <form onSubmit={handleSendReply} className="p-4 border-t border-white/[0.04] bg-black/20 flex gap-2">
              <input
                type="text"
                required
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Formulate reply to ${activeMessage.name}...`}
                className="flex-1 bg-white/[0.03] focus:bg-white/[0.05] border border-white/[0.06] focus:border-primary/45 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/20 outline-none transition-all"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-primary text-black text-xs font-semibold hover:opacity-90 transition-all cursor-pointer flex items-center gap-1 shrink-0"
              >
                <span>Send Reply</span>
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-on-surface-variant font-mono text-xs p-8">
            <span className="material-symbols-outlined text-3xl mb-2 text-[#a078ff]/40">mail</span>
            <span>Select an inbox message thread from the left pane list to activate the detailed thread workspace.</span>
          </div>
        )}
      </div>
    </div>
  );
};
