import { useState, useRef, useCallback, useEffect } from 'react';
import {
  Download, Image as ImageIcon, Pencil, PencilOff, Type,
  Maximize2, ZoomIn, ZoomOut, Minimize2, FileText, Check, ChevronDown,
} from 'lucide-react';
import { TEMPLATES, FONT_OPTIONS } from '../data/constants';
import BiodataSheet from './BiodataSheet';
import DownloadModal from './DownloadModal';
import toast from 'react-hot-toast';

export default function PreviewPanel({
  formData, updateField, visibility, template, activeTemplate,
  setActiveTemplate, inlineEditMode, setInlineEditMode,
  selectedFontId, setSelectedFontId,
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [autoFit, setAutoFit] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [estimatedPages, setEstimatedPages] = useState(1);
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const sheetRef = useRef(null);
  const containerRef = useRef(null);

  const selectedFont = FONT_OPTIONS.find(f => f.id === selectedFontId) || FONT_OPTIONS[0];

  // Calculate Auto-fit scale on resize or container change
  const recalculateScale = useCallback(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.clientWidth - 28; // padding
    if (containerWidth <= 0) return;

    if (autoFit) {
      if (containerWidth < 794) {
        const scale = Math.max(0.35, Math.min(1, containerWidth / 794));
        setZoomScale(scale);
      } else {
        setZoomScale(1);
      }
    }

    // Estimate pages based on sheet height
    if (sheetRef.current) {
      const h = sheetRef.current.offsetHeight;
      const pages = Math.max(1, Math.ceil(h / 1120));
      setEstimatedPages(pages);
    }
  }, [autoFit]);

  useEffect(() => {
    recalculateScale();
    window.addEventListener('resize', recalculateScale);
    return () => window.removeEventListener('resize', recalculateScale);
  }, [recalculateScale, formData, template, compactMode]);

  // Execute Download based on user's choice: 'all', '1', '2' and format: 'pdf' | 'image'
  const handleExecuteDownload = useCallback(async (pageChoice, format) => {
    const el = sheetRef.current;
    if (!el) return;
    setIsGenerating(true);
    const loadingToast = toast.loading('Preparing your download...');

    try {
      const html2canvas = (await import('html2canvas')).default;

      // Render full canvas at high resolution
      const canvas = await html2canvas(el, {
        scale: 2.2,
        useCORS: true,
        logging: false,
        backgroundColor: template.colors.bg,
        windowWidth: 1200,
      });

      const imgWidthMm = 210; // A4 mm
      const pageHeightMm = 297; // A4 mm
      const pxPerMm = canvas.width / imgWidthMm;
      const pageHeightPx = Math.floor(pageHeightMm * pxPerMm);
      const totalPages = Math.max(1, Math.ceil(canvas.height / pageHeightPx));

      // Secure sanitized filename: removes illegal filesystem characters and path traversal tokens
      const safeName = (formData.fullName || '')
        .trim()
        .replace(/[/\\?%*:|"<>]/g, '')
        .replace(/\s+/g, '_')
        .slice(0, 50);
      const nameBase = safeName || 'Marriage';

      // Helper to slice canvas for specific page (0-indexed)
      const getPageSliceCanvas = (pageIndex) => {
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = pageHeightPx;
        const ctx = pageCanvas.getContext('2d');

        // Fill background color
        ctx.fillStyle = template.colors.bg;
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

        // Slice source rect
        const sY = pageIndex * pageHeightPx;
        const sH = Math.min(pageHeightPx, canvas.height - sY);

        ctx.drawImage(
          canvas,
          0, sY, canvas.width, sH, // source
          0, 0, canvas.width, sH   // destination
        );

        return pageCanvas;
      };

      if (format === 'image') {
        if (pageChoice === 'all') {
          if (totalPages === 1) {
            const link = document.createElement('a');
            link.download = `${nameBase}_Biodata.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
          } else {
            // Download each page slice as PNG
            for (let i = 0; i < totalPages; i++) {
              const slice = getPageSliceCanvas(i);
              const link = document.createElement('a');
              link.download = `${nameBase}_Biodata_Page_${i + 1}.png`;
              link.href = slice.toDataURL('image/png');
              link.click();
            }
          }
        } else {
          // Specific page
          const pIdx = Math.min(totalPages - 1, Math.max(0, parseInt(pageChoice) - 1));
          const slice = getPageSliceCanvas(pIdx);
          const link = document.createElement('a');
          link.download = `${nameBase}_Biodata_Page_${pIdx + 1}.png`;
          link.href = slice.toDataURL('image/png');
          link.click();
        }
        toast.success('Image downloaded successfully!', { id: loadingToast });
      } else {
        // PDF format
        const { jsPDF } = await import('jspdf');
        const pdf = new jsPDF('p', 'mm', 'a4');

        if (pageChoice === 'all') {
          for (let i = 0; i < totalPages; i++) {
            if (i > 0) pdf.addPage('a4', 'p');
            const slice = getPageSliceCanvas(i);
            const pageData = slice.toDataURL('image/jpeg', 0.95);
            pdf.addImage(pageData, 'JPEG', 0, 0, imgWidthMm, pageHeightMm);
          }
          pdf.save(`${nameBase}_Biodata_Full.pdf`);
          toast.success(`Complete PDF (${totalPages} pages) downloaded!`, { id: loadingToast });
        } else {
          // Specific page only
          const pIdx = Math.min(totalPages - 1, Math.max(0, parseInt(pageChoice) - 1));
          const slice = getPageSliceCanvas(pIdx);
          const pageData = slice.toDataURL('image/jpeg', 0.95);
          pdf.addImage(pageData, 'JPEG', 0, 0, imgWidthMm, pageHeightMm);
          pdf.save(`${nameBase}_Biodata_Page_${pIdx + 1}.pdf`);
          toast.success(`Page ${pIdx + 1} PDF downloaded!`, { id: loadingToast });
        }
      }
    } catch (err) {
      console.error('Download error:', err);
      toast.error('Download failed. Please try again.', { id: loadingToast });
    } finally {
      setIsGenerating(false);
      setShowDownloadModal(false);
    }
  }, [formData.fullName, template.colors.bg]);

  return (
    <div className="flex flex-col gap-3.5 pt-2 lg:pt-4">
      {/* ── Top Control & Action Bar ── */}
      <div className="glass-panel rounded-2xl p-4 space-y-3.5">
        {/* Row 1: Templates Ribbon */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>🎨 Wedding Theme</span>
              <span className="text-[10px] font-normal text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
                {TEMPLATES.length} Styles
              </span>
            </span>
            <div className="flex items-center gap-2">
              {/* Estimated pages pill */}
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/60">
                <FileText className="w-3 h-3" />
                {estimatedPages} {estimatedPages === 1 ? 'Page' : 'Pages'} A4
              </span>
              {/* Compact Mode Toggle */}
              <button
                onClick={() => setCompactMode(!compactMode)}
                className={`text-[11px] font-medium px-2 py-0.5 rounded-md transition-colors cursor-pointer border ${
                  compactMode
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
                title="Squeeze vertical margins to fit on 1 page"
              >
                {compactMode ? '✓ Compact Spacing' : 'Compact Spacing'}
              </button>
            </div>
          </div>

          {/* Template pills (Horizontal Scroll) */}
          <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-300">
            {TEMPLATES.map(t => {
              const isActive = activeTemplate === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTemplate(t.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 ring-2 ring-slate-900/30'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/90'
                  }`}
                >
                  <span className="text-base leading-none">{t.preview}</span>
                  <div className="text-left">
                    <div className="font-bold leading-tight">{t.name}</div>
                  </div>
                  <div
                    className="w-2.5 h-2.5 rounded-full border border-white/40 ml-0.5"
                    style={{ backgroundColor: t.colors.primary }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Font Selector & Inline Edit & Downloads */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Font Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFontMenu(!showFontMenu)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all cursor-pointer"
              >
                <Type className="w-3.5 h-3.5 text-blue-500" />
                <span className="max-w-[130px] truncate">{selectedFont.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showFontMenu && (
                <div
                  className="absolute left-0 top-full mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 fade-in"
                  onMouseLeave={() => setShowFontMenu(false)}
                >
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Font Pairing
                  </div>
                  {FONT_OPTIONS.map(font => (
                    <button
                      key={font.id}
                      onClick={() => {
                        setSelectedFontId(font.id);
                        setShowFontMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors cursor-pointer ${
                        selectedFontId === font.id
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{font.name}</span>
                      {selectedFontId === font.id && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Inline Edit Toggle */}
            <button
              onClick={() => {
                setInlineEditMode(!inlineEditMode);
                toast(inlineEditMode ? 'Inline editing disabled' : 'Click any text on sheet to edit directly!', {
                  icon: inlineEditMode ? '🔒' : '✏️',
                });
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                inlineEditMode
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {inlineEditMode ? <PencilOff className="w-3.5 h-3.5" /> : <Pencil className="w-3.5 h-3.5" />}
              <span>{inlineEditMode ? 'Done' : 'Inline Edit'}</span>
            </button>
          </div>

          {/* Action Buttons: Opens Download Options Modal */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDownloadModal(true)}
              disabled={isGenerating}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 hover:from-rose-700 hover:to-amber-700 shadow-md shadow-rose-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download ({estimatedPages} {estimatedPages === 1 ? 'Page' : 'Pages'})</span>
            </button>
          </div>
        </div>

        {/* Row 3: Mobile & Device Friendly Zoom Controls */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100/80">
          <span className="text-[11px] text-slate-400">
            A4 Canvas (794px × 1123px)
          </span>

          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
            <button
              onClick={() => {
                setAutoFit(false);
                setZoomScale(prev => Math.max(0.3, prev - 0.1));
              }}
              className="p-1 hover:bg-white rounded transition-colors cursor-pointer text-slate-600"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-[11px] font-semibold text-slate-700 min-w-[42px] text-center">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              onClick={() => {
                setAutoFit(false);
                setZoomScale(prev => Math.min(1.5, prev + 0.1));
              }}
              className="p-1 hover:bg-white rounded transition-colors cursor-pointer text-slate-600"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setAutoFit(true);
                recalculateScale();
              }}
              className={`px-2 py-0.5 text-[10px] font-semibold rounded transition-colors cursor-pointer ${
                autoFit ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:bg-white/60'
              }`}
              title="Fit to Screen Width"
            >
              Fit
            </button>
          </div>
        </div>
      </div>

      {/* ── Interactive Preview Viewport (Responsive & Zoomable) ── */}
      <div
        ref={containerRef}
        className="rounded-2xl bg-slate-200/60 p-2 sm:p-4 lg:p-6 overflow-x-auto overflow-y-auto max-h-[calc(100vh-210px)] min-h-[450px] flex justify-center items-start shadow-inner"
      >
        <div
          style={{
            width: '794px',
            transform: `scale(${zoomScale})`,
            transformOrigin: 'top center',
            marginBottom: `${Math.max(0, (794 * zoomScale * 1.414) - (794 * 1.414))}px`,
            transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          className="shadow-2xl rounded-sm"
        >
          <BiodataSheet
            ref={sheetRef}
            formData={formData}
            updateField={updateField}
            visibility={visibility}
            template={template}
            inlineEditMode={inlineEditMode}
            selectedFont={selectedFont}
            compactMode={compactMode}
          />
        </div>
      </div>

      {/* ── Download Options Modal (1 Page, 2 Page, All Pages) ── */}
      <DownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        totalPages={estimatedPages}
        onDownload={handleExecuteDownload}
        isGenerating={isGenerating}
      />
    </div>
  );
}
