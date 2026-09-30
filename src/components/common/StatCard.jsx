import React from 'react';

export const StatCard = ({ title, value, change, isPositive, icon: Icon, description, trendLabel }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-md hover:border-brand-500/40 transition-all duration-300 group">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-display">{title}</p>
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 group-hover:scale-110 group-hover:border-brand-500/40 transition-all duration-200">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      {/* Main Metric Value */}
      <div className="mt-3 flex items-baseline gap-2.5">
        <p className="text-3xl font-extrabold tracking-tight text-white font-display tabular-nums">
          {value}
        </p>
        {change !== undefined && (
          <span
            className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold border ${
              isPositive 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}
          >
            {isPositive ? '↑' : '↓'} {change}
          </span>
        )}
      </div>

      {/* Subtitle / Description */}
      {(description || trendLabel) && (
        <p className="mt-1.5 text-xs text-slate-400 font-medium leading-relaxed">
          {description || trendLabel}
        </p>
      )}
    </div>
  );
};
