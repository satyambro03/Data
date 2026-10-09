import { useState, useCallback, useRef, useEffect } from 'react';
import { DEFAULT_DATA, DEFAULT_VISIBILITY, SAMPLE_DATA, TEMPLATES } from './data/constants';
import FormPanel from './components/FormPanel';
import PreviewPanel from './components/PreviewPanel';
import Header from './components/Header';
import MobileNav from './components/MobileNav';
import ResetModal from './components/ResetModal';
import toast from 'react-hot-toast';
import Lenis from 'lenis';
import { sanitizeInput, sanitizeFormData } from './utils/security';

export default function App() {
  const [formData, setFormData] = useState({ ...DEFAULT_DATA });
  const [visibility, setVisibility] = useState({ ...DEFAULT_VISIBILITY });
  const [activeTemplate, setActiveTemplate] = useState('golden_filigree');
  const [selectedFontId, setSelectedFontId] = useState('default');
  const [inlineEditMode, setInlineEditMode] = useState(false);
  const [mobileTab, setMobileTab] = useState('form'); // 'form' | 'preview'
  const [showResetModal, setShowResetModal] = useState(false);
  const previewRef = useRef(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const template = TEMPLATES.find(t => t.id === activeTemplate) || TEMPLATES[0];

  const updateField = useCallback((field, value) => {
    if (field === '__proto__' || field === 'constructor' || field === 'prototype') return;
    const cleanValue =
      field === 'profilePhoto' && typeof value === 'string' && value.startsWith('data:image/')
        ? value
        : sanitizeInput(value);
    setFormData(prev => ({ ...prev, [field]: cleanValue }));
  }, []);

  const toggleVisibility = useCallback((field) => {
    if (field === '__proto__' || field === 'constructor' || field === 'prototype') return;
    setVisibility(prev => ({ ...prev, [field]: !prev[field] }));
  }, []);

  const loadSampleData = useCallback(() => {
    setFormData(sanitizeFormData(SAMPLE_DATA));
    toast.success('Sample data loaded successfully!');
  }, []);

  const resetForm = useCallback(() => {
    setFormData({ ...DEFAULT_DATA });
    setVisibility({ ...DEFAULT_VISIBILITY });
    setShowResetModal(false);
    toast.success('Form has been reset');
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 relative font-inter text-slate-800 selection:bg-rose-500 selection:text-white">
      {/* Subtle modern mesh gradient backdrop */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[25%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-rose-200/25 via-amber-200/20 to-transparent blur-3xl" />
        <div className="absolute top-[35%] -right-[15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-bl from-blue-200/20 via-indigo-100/15 to-transparent blur-3xl" />
        <div className="absolute -bottom-[20%] left-[20%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-t from-emerald-100/20 via-teal-100/15 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10">
        <Header
          onLoadSample={loadSampleData}
          onReset={() => setShowResetModal(true)}
        />

        {/* Mobile Tab Nav */}
        <MobileNav
          mobileTab={mobileTab}
          setMobileTab={setMobileTab}
          activeTemplateName={template.name}
        />

        <main className="max-w-[1920px] mx-auto px-3 sm:px-5 lg:px-7 pb-16">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-7 items-start">
            {/* Left: Form Panel */}
            <div className={`w-full lg:w-[46%] xl:w-[42%] ${mobileTab !== 'form' ? 'hidden lg:block' : ''}`}>
              <FormPanel
                formData={formData}
                updateField={updateField}
                visibility={visibility}
                toggleVisibility={toggleVisibility}
              />
            </div>

            {/* Right: Preview Panel */}
            <div className={`w-full lg:w-[54%] xl:w-[58%] ${mobileTab !== 'preview' ? 'hidden lg:block' : ''}`}>
              <PreviewPanel
                formData={formData}
                updateField={updateField}
                visibility={visibility}
                template={template}
                activeTemplate={activeTemplate}
                setActiveTemplate={setActiveTemplate}
                inlineEditMode={inlineEditMode}
                setInlineEditMode={setInlineEditMode}
                selectedFontId={selectedFontId}
                setSelectedFontId={setSelectedFontId}
                previewRef={previewRef}
              />
            </div>
          </div>
        </main>

        {/* Mobile floating preview jump button */}
        {mobileTab === 'form' && (
          <div className="lg:hidden fixed bottom-5 right-5 z-40 fade-in">
            <button
              onClick={() => setMobileTab('preview')}
              className="flex items-center gap-2 px-5 py-3.5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-full shadow-2xl shadow-slate-900/40 text-xs font-bold tracking-wide active:scale-95 transition-all border border-slate-700/60 cursor-pointer"
            >
              <span>👁️ View Live Bio-Data</span>
            </button>
          </div>
        )}

        {showResetModal && (
          <ResetModal
            onConfirm={resetForm}
            onCancel={() => setShowResetModal(false)}
          />
        )}
      </div>
    </div>
  );
}
