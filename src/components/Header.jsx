import { Sparkles, RotateCcw } from 'lucide-react';

export default function Header({ onLoadSample, onReset }) {
  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-[1920px] mx-auto px-3 sm:px-5 lg:px-7 py-2.5 sm:py-3 flex items-center justify-between">
        {/* Brand & New Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 p-0.5 shadow-md shadow-slate-900/15 overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <img
                src="/logo.png"
                alt="Bio Data Logo"
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-none">
                Bio Data
              </h1>
              <span className="hidden md:inline-block text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/15 to-rose-500/15 text-amber-900 border border-amber-300/60">
                PRO
              </span>
            </div>
            <p className="text-[11px] sm:text-xs font-medium text-slate-400 mt-0.5 hidden xs:block">
              Premium Marriage Profiles
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={onLoadSample}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-bold text-amber-800 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-200/90 rounded-xl transition-all duration-200 shadow-xs hover:shadow-md hover:shadow-amber-500/10 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>Load Sample</span>
          </button>
          
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all duration-200 shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
            title="Reset Form"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
}
