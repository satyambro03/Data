import { ClipboardList, Eye } from 'lucide-react';

export default function MobileNav({ mobileTab, setMobileTab, activeTemplateName }) {
  return (
    <div className="lg:hidden sticky top-[57px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3 py-2 shadow-xs">
      <div className="flex gap-2 max-w-md mx-auto">
        <button
          onClick={() => setMobileTab('form')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
            mobileTab === 'form'
              ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md shadow-rose-500/25'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>Edit Form</span>
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
            mobileTab === 'preview'
              ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md shadow-rose-500/25'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Preview & PDF</span>
          {activeTemplateName && (
            <span className="text-[10px] font-normal opacity-90 hidden sm:inline">
              ({activeTemplateName})
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
