import { useState } from 'react';
import { Download, FileText, Image as ImageIcon, X, CheckCircle2, Layers } from 'lucide-react';

export default function DownloadModal({
  isOpen,
  onClose,
  totalPages,
  onDownload,
  isGenerating,
}) {
  const [selectedPage, setSelectedPage] = useState('all'); // 'all' | '1' | '2' | '3'...
  const [selectedFormat, setSelectedFormat] = useState('pdf'); // 'pdf' | 'image'

  if (!isOpen) return null;

  const handleConfirm = () => {
    onDownload(selectedPage, selectedFormat);
  };

  // Generate list of page options
  const pagesCount = Math.max(1, totalPages || 1);
  const pageNumbers = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-7 border border-slate-100 fade-in z-10 overflow-hidden">
        {/* Top Glow Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-500/20 text-white">
            <Download className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Download Bio-Data
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose pages and format to download
            </p>
          </div>
        </div>

        {/* 1. Page Selection Section */}
        <div className="space-y-2.5 mb-5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Select Pages to Download:
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* All Pages Option */}
            <div
              onClick={() => setSelectedPage('all')}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative flex items-start gap-3 ${
                selectedPage === 'all'
                  ? 'border-slate-900 bg-slate-50 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className={`p-2 rounded-xl ${selectedPage === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}>
                <Layers className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <span>All Pages</span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                    {pagesCount}P
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Complete bio-data in one file
                </p>
              </div>
              {selectedPage === 'all' && (
                <CheckCircle2 className="w-4 h-4 text-slate-900 flex-shrink-0" />
              )}
            </div>

            {/* Individual Page Options */}
            {pageNumbers.map(num => (
              <div
                key={num}
                onClick={() => setSelectedPage(String(num))}
                className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative flex items-start gap-3 ${
                  selectedPage === String(num)
                    ? 'border-slate-900 bg-slate-50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className={`p-2 rounded-xl ${selectedPage === String(num) ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900">
                    Page {num} Only
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {num === 1 ? 'Personal & summary page' : `Page ${num} details`}
                  </p>
                </div>
                {selectedPage === String(num) && (
                  <CheckCircle2 className="w-4 h-4 text-slate-900 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Format Selection Section */}
        <div className="space-y-2 mb-6">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            File Format:
          </label>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedFormat('pdf')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                selectedFormat === 'pdf'
                  ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4 text-rose-600" />
              <span>PDF Document</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedFormat('image')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                selectedFormat === 'image'
                  ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-blue-600" />
              <span>PNG Image</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            disabled={isGenerating}
            className="flex-1 py-3 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isGenerating}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold text-white bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 hover:from-rose-700 hover:to-amber-700 rounded-xl shadow-lg shadow-rose-600/25 transition-all cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            <span>
              {isGenerating ? 'Generating...' : `Download ${selectedPage === 'all' ? 'All' : `Page ${selectedPage}`}`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
