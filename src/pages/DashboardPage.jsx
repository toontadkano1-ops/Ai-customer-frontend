import React, { useState, useEffect } from 'react';
import {
  Users,
  MessageSquare,
  Ticket,
  Clock,
  CheckCircle,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Bot,
  Zap,
  Activity,
  Layers,
  ChevronRight,
  Send,
  Database
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { StatCard } from '../components/common/StatCard.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { Button } from '../components/common/Button.jsx';
import { SentimentIndicator } from '../components/common/SentimentIndicator.jsx';
import { analyticsService } from '../services/analyticsService.js';
import { ticketService } from '../services/ticketService.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';

export const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [range, setRange] = useState('30d');
  const [overview, setOverview] = useState(null);
  const [sentiment, setSentiment] = useState(null);
  const [trends, setTrends] = useState([]);
  const [supportData, setSupportData] = useState(null);
  const [recentTickets, setRecentTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [ovRes, sentRes, trRes, supRes, tickRes] = await Promise.all([
          analyticsService.getOverview(range),
          analyticsService.getSentiment(),
          analyticsService.getEngagement(),
          analyticsService.getSupport(),
          ticketService.list()
        ]);

        if (ovRes.success) setOverview(ovRes.data);
        if (sentRes.success) setSentiment(sentRes.data);
        if (trRes.success) setTrends(trRes.data);
        if (supRes.success) setSupportData(supRes.data);
        if (tickRes.success) setRecentTickets(tickRes.data.slice(0, 4));
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [range]);

  const handleLaunchLiveChat = () => {
    window.dispatchEvent(new CustomEvent('open-customer-live-chat'));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* High-Tech Welcome Hero with Live Telemetry */}
      <div className="relative overflow-hidden rounded-3xl p-7 border border-slate-800/80 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 backdrop-blur-xl shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Gemini 3.8 Flash Hybrid Engine Active
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Latency: 18ms
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-white via-slate-200 to-brand-300 bg-clip-text text-transparent">{user?.full_name || 'Team Member'}</span>!
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Real-time customer experience intelligence, autonomous AI resolutions, and high-priority support escalation metrics.
            </p>

            {/* Quick Action Shortcuts */}
            <div className="flex flex-wrap items-center gap-2.5 mt-5">
              <button
                onClick={handleLaunchLiveChat}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 hover:scale-105 active:scale-95 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Launch Customer Live Chat</span>
              </button>

              <Link
                to="/tickets"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-xs font-medium hover:scale-105 transition-all"
              >
                <Ticket className="w-3.5 h-3.5 text-amber-400" />
                <span>Support Tickets ({overview?.openTickets || 0})</span>
              </Link>

              <Link
                to="/recommendations"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-xs font-medium hover:scale-105 transition-all"
              >
                <Layers className="w-3.5 h-3.5 text-brand-400" />
                <span>Deploy Solutions</span>
              </Link>

              <Link
                to="/knowledge"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-xs font-medium hover:scale-105 transition-all"
              >
                <Database className="w-3.5 h-3.5 text-cyan-400" />
                <span>Knowledge Base</span>
              </Link>
            </div>
          </div>

          {/* Date Filter selector */}
          <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 p-1.5 rounded-xl self-start lg:self-center shadow-inner">
            {['7d', '30d', '90d'].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-all ${
                  range === r
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                Last {r.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-hover">
          <StatCard
            title="Total Customers"
            value={overview?.totalCustomers ?? '--'}
            change="+14.2%"
            isPositive={true}
            icon={Users}
            description="Active accounts in organization"
          />
        </div>
        <div className="card-hover">
          <StatCard
            title="AI Deflection Rate"
            value={overview ? `${overview.deflectionRatePercent}%` : '--'}
            change="+6.5%"
            isPositive={true}
            icon={Bot}
            description="Resolved without human escalation"
          />
        </div>
        <div className="card-hover">
          <StatCard
            title="Avg First Response"
            value={overview ? `${overview.avgFirstResponseMin}m` : '--'}
            change="-42%"
            isPositive={true}
            icon={Clock}
            description="Automated immediate response"
          />
        </div>
        <div className="card-hover">
          <StatCard
            title="Customer Satisfaction (CSAT)"
            value={overview ? `${overview.csatScore} / 5.0` : '--'}
            change="+0.3"
            isPositive={true}
            icon={CheckCircle}
            description="Based on customer feedback surveys"
          />
        </div>
      </div>

      {/* Visual Analytics Grid: Engagement Trends & Sentiment Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Engagement Trend Chart (2 columns) */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-brand-400" />
                Customer Interaction & AI Resolution Trends
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Daily inquiry traffic vs autonomous AI grounding answers</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-500" /> Total Inquiries
              </span>
              <span className="flex items-center gap-1.5 text-slate-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> AI Resolved
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#475569" fontSize={11} tickLine={false} />
                <YAxis stroke="#475569" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#1E293B',
                    borderRadius: '0.75rem',
                    color: '#F8FAFC',
                    fontSize: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
                  }}
                />
                <Area type="monotone" dataKey="conversations" stroke="#6366F1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorConv)" name="Total Inquiries" />
                <Area type="monotone" dataKey="aiResolved" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRes)" name="AI Resolved" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sentiment Health Breakdown (1 column) */}
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-md shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Sentiment Intelligence
              </h2>
              <Badge variant="success" size="sm">
                Score {sentiment?.sentimentHealthScore ?? 92}%
              </Badge>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Real-time emotion & intent detection from live chats
            </p>

            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentiment?.distribution || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="count"
                  >
                    {(sentiment?.distribution || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderColor: '#1E293B',
                      borderRadius: '0.5rem',
                      color: '#F8FAFC',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            {(sentiment?.distribution || []).map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-300 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                  {item.name}
                </span>
                <span className="font-semibold text-slate-100 font-mono">
                  {item.percentage}% ({item.count})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent High Priority Support Tickets & Common Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Support Tickets Queue Preview */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Ticket className="w-4 h-4 text-amber-400" />
                Active Support Tickets
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Escalated issues requiring agent resolution</p>
            </div>
            <Link to="/tickets">
              <Button variant="ghost" size="sm" icon={ArrowRight}>
                View All
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {recentTickets.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No active tickets.</p>
            ) : (
              recentTickets.map((t) => (
                <div
                  key={t.id}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all card-hover flex items-center justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-slate-400">#{t.id.slice(0, 8)}</span>
                      <Badge
                        variant={
                          t.priority === 'urgent'
                            ? 'danger'
                            : t.priority === 'high'
                            ? 'warning'
                            : 'default'
                        }
                        size="sm"
                      >
                        {t.priority}
                      </Badge>
                      <span className="text-[11px] text-slate-400">• {t.category}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-200 truncate">{t.subject}</p>
                    <p className="text-xs text-slate-400 mt-1 truncate">
                      Customer: <span className="text-slate-300 font-medium">{t.customer_name}</span> | Agent:{' '}
                      <span className="text-brand-300 font-medium">{t.assigned_agent_name}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant={t.status === 'open' ? 'warning' : 'primary'} size="sm">
                      {t.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Support Category Distribution */}
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-md shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Inquiry Categories
            </h2>
            <p className="text-xs text-slate-400 mb-4">Volume distribution by business domain</p>

            <div className="space-y-3.5">
              {(supportData?.categoryBreakdown || []).map((cat, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{cat.category}</span>
                    <span className="text-slate-400 font-mono font-semibold">{cat.count} tickets</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden p-0.5">
                    <div
                      className="bg-gradient-to-r from-brand-500 to-indigo-500 h-1.5 rounded-full"
                      style={{
                        width: `${Math.min((cat.count / Math.max(supportData?.totalTickets || 1, 1)) * 100, 100)}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between text-xs text-slate-400">
            <span>Total Logged Tickets:</span>
            <span className="font-bold text-white font-mono text-sm">{supportData?.totalTickets || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
