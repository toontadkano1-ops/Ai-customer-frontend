import React from 'react';
import { Search, LogOut, Shield, Headset, UserCheck, MessageSquare, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getRoleBadge = () => {
    switch (user?.role) {
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/30">
            <Shield className="w-3.5 h-3.5 text-brand-400" />
            Admin Console
          </span>
        );
      case 'agent':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Headset className="w-3.5 h-3.5 text-emerald-400" />
            Support Agent
          </span>
        );
      case 'customer':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
            Customer Account
          </span>
        );
    }
  };

  const handleOpenLiveChat = () => {
    // If floating chat exists, trigger open event, or navigate to chat
    window.dispatchEvent(new CustomEvent('open-customer-live-chat'));
    navigate('/assistant');
  };

  return (
    <header className="h-16 bg-dark-surface border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Search Input */}
      <div className="relative w-72 max-w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search tickets, knowledge base..."
          className="w-full bg-slate-900/90 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
        />
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        {/* Customer Live Chat Quick Launcher Button */}
        <button
          onClick={handleOpenLiveChat}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600/20 to-teal-600/20 hover:from-emerald-600/30 hover:to-teal-600/30 border border-emerald-500/30 text-emerald-300 text-xs font-medium transition-all shadow-sm group"
          title="Open Customer Live Chat"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <MessageSquare className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
          <span>Customer Live Chat</span>
        </button>

        {/* User Role Badge (Clean display of single logged-in role) */}
        <div className="hidden sm:block">
          {getRoleBadge()}
        </div>

        {/* User profile dropdown / logout */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
          <div className="h-8 w-8 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 flex items-center justify-center font-bold text-xs">
            {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-slate-200 truncate max-w-[130px]">
              {user?.full_name || 'User'}
            </p>
            <p className="text-[10px] text-slate-400 truncate max-w-[130px]">{user?.email}</p>
          </div>

          <button
            onClick={logout}
            title="Log out"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors ml-1 font-medium border border-transparent hover:border-slate-700"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
