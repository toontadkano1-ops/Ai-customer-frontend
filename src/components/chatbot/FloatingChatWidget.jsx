import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Minus, Sparkles, Bot, ShieldCheck, Send } from 'lucide-react';
import { ChatWindow } from './ChatWindow.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsMinimized(false);
    };

    window.addEventListener('open-customer-live-chat', handleOpen);
    return () => window.removeEventListener('open-customer-live-chat', handleOpen);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Chat Box */}
      {isOpen && !isMinimized && (
        <div className="w-[420px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-6rem)] mb-4 rounded-2xl border border-slate-700/80 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/60 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/30">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900"></span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Customer Live Chat
                  <span className="text-[10px] px-1.5 py-0.2 bg-brand-500/20 text-brand-300 rounded font-normal border border-brand-500/30">
                    Gemini 3.8
                  </span>
                </h3>
                <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live Support Online
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
                title="Minimize"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Embedded Chat Engine */}
          <div className="flex-1 overflow-hidden p-2">
            <ChatWindow />
          </div>
        </div>
      )}

      {/* Minimized / Closed Launcher Button */}
      {(!isOpen || isMinimized) && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-700 text-white shadow-xl shadow-brand-500/30 hover:shadow-brand-500/50 hover:scale-105 active:scale-95 transition-all duration-200 border border-brand-400/30"
        >
          {/* Pulsing glow ring */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900"></span>
          </span>

          <div className="p-1.5 bg-white/10 rounded-full">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div className="text-left pr-1">
            <span className="text-xs font-bold block leading-none">Customer Live Chat</span>
            <span className="text-[10px] text-brand-200 font-medium leading-tight flex items-center gap-1 mt-0.5">
              <Sparkles className="w-2.5 h-2.5 text-amber-300" />
              Ask AI or Live Support
            </span>
          </div>
        </button>
      )}
    </div>
  );
};
