import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bot, Lock, Mail, ArrowRight, Shield, Headset, UserCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '../components/common/Button.jsx';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Distinct Portal Tabs
  const [selectedPortal, setSelectedPortal] = useState('admin'); // 'admin' | 'agent' | 'customer'
  const [email, setEmail] = useState('admin@apex.io');
  const [password, setPassword] = useState('Password123!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const portals = {
    admin: {
      id: 'admin',
      name: 'Admin Console',
      roleTitle: 'Enterprise Administrator',
      defaultEmail: 'admin@apex.io',
      icon: Shield,
      color: 'from-indigo-600 to-brand-600',
      badgeColor: 'bg-brand-500/10 text-brand-300 border-brand-500/30',
      description: 'Manage platform architecture, analytics, Supabase data & AI settings.'
    },
    agent: {
      id: 'agent',
      name: 'Support Agent Desk',
      roleTitle: 'Support Specialist',
      defaultEmail: 'agent@apex.io',
      icon: Headset,
      color: 'from-emerald-600 to-teal-600',
      badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      description: 'Manage customer interactions, resolve support tickets, and post live replies.'
    },
    customer: {
      id: 'customer',
      name: 'Customer Portal',
      roleTitle: 'Customer Account',
      defaultEmail: 'customer@acme.com',
      icon: UserCheck,
      color: 'from-sky-600 to-cyan-600',
      badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      description: 'Access AI customer live chat, deploy cloud solutions, and review orders.'
    }
  };

  const handlePortalSwitch = (portalId) => {
    setSelectedPortal(portalId);
    setEmail(portals[portalId].defaultEmail);
    setPassword('Password123!');
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const current = portals[selectedPortal];
  const CurrentIcon = current.icon;

  return (
    <div className="min-h-screen w-screen flex flex-col justify-center items-center p-4 bg-dark-bg text-slate-100 selection:bg-brand-500">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">
        {/* Brand header */}
        <div className="text-center mb-6">
          <div className="inline-flex h-12 w-12 rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-700 items-center justify-center shadow-xl shadow-brand-500/25 mb-3">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">CX Intelligence</h1>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise AI Customer Experience & Support Platform
          </p>
        </div>

        {/* Portal Selection Tabs (Individual Role Login) */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-400 mb-2 text-center uppercase tracking-wider">
            Select Your Workspace Portal
          </p>
          <div className="grid grid-cols-3 gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-md">
            {Object.values(portals).map((portal) => {
              const Icon = portal.icon;
              const isSelected = selectedPortal === portal.id;
              return (
                <button
                  key={portal.id}
                  type="button"
                  onClick={() => handlePortalSwitch(portal.id)}
                  className={`p-3 rounded-xl text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-800 text-white shadow-md border border-slate-700 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-400 scale-110' : 'text-slate-400'} transition-transform`} />
                  <span className="text-xs">{portal.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Credentials Form for the Selected Portal */}
        <div className="p-7 rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl shadow-2xl">
          {/* Active Portal Header Banner */}
          <div className="mb-5 pb-4 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl bg-gradient-to-br ${current.color} text-white shadow-md`}>
                <CurrentIcon className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">{current.name}</h2>
                <p className="text-[11px] text-slate-400">{current.description}</p>
              </div>
            </div>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${current.badgeColor}`}>
              {current.roleTitle}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Portal Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-slate-300">Password</label>
                <span className="text-[10px] text-brand-400 font-mono">Demo: Password123!</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-xl bg-gradient-to-r ${current.color} hover:brightness-110 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-lg transition-all`}
            >
              {loading ? (
                <span>Authenticating with Supabase...</span>
              ) : (
                <>
                  <span>Sign In as {current.roleTitle}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-slate-800/60 text-center">
            <p className="text-xs text-slate-500">
              Need a new customer account?{' '}
              <Link to="/register" className="text-brand-400 hover:text-brand-300 font-medium">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
