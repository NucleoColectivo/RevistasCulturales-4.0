import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_MAGAZINES } from '../constants';
import { ArrowLeft, ZoomIn, Download, Share2, Sparkles, Book, Calendar, MapPin, Grid, Layers, ChevronRight, ChevronLeft, Layout, Maximize2, Minimize2 } from 'lucide-react';
import { analyzeMagazine } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '../contexts/LanguageContext';

export const DocumentViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const magazine = MOCK_MAGAZINES.find(m => m.id === id);
  const { language, t } = useLanguage();
  
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'metadata' | 'analysis'>('metadata');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('single');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Reset state when ID changes
  useEffect(() => {
    setAnalysis(null);
    setActiveTab('metadata');
    setCurrentPage(1);
    setViewMode('single');
    setIsImageLoading(true);
  }, [id]);

  // Keyboard Navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!magazine) return;
    if (e.key === 'ArrowRight') {
      setCurrentPage(prev => Math.min(magazine.pageCount, prev + 1));
    } else if (e.key === 'ArrowLeft') {
      setCurrentPage(prev => Math.max(1, prev - 1));
    } else if (e.key === 'Escape') {
      setIsFullscreen(false);
    }
  }, [magazine]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!magazine) {
    return <div className="p-10 text-center text-white">Documento no encontrado</div>;
  }

  const handleAIAnalysis = async () => {
    setLoading(true);
    setActiveTab('analysis');
    const result = await analyzeMagazine(magazine);
    setAnalysis(result);
    setLoading(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        setIsFullscreen(true);
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    }
  };

  return (
    <div className={`bg-[#121212] flex flex-col text-gray-200 transition-all duration-500 ${isFullscreen ? 'fixed inset-0 z-[100]' : 'h-[calc(100vh-64px)]'}`}>
      {/* Top Bar - Glassmorphism */}
      <div className="bg-[#1a1a1a]/80 backdrop-blur-md border-b border-white/10 px-6 py-3 flex items-center justify-between shadow-lg z-20">
        <div className="flex items-center gap-4">
            {!isFullscreen && (
                <>
                    <Link to="/catalogo" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> {t('doc.back')}
                    </Link>
                    <div className="h-6 w-px bg-white/10"></div>
                </>
            )}
            <div>
                <h1 className="font-serif font-bold text-gray-100 text-lg tracking-tight">{magazine.title}</h1>
                <span className="text-xs text-amber-500 font-mono tracking-wider uppercase">{magazine.year} • {magazine.city}</span>
            </div>
        </div>
        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/5">
            <button 
                onClick={() => setViewMode(viewMode === 'single' ? 'grid' : 'single')}
                className={`p-2 rounded-md transition-all duration-300 ${viewMode === 'grid' ? 'text-amber-400 bg-white/10 shadow-inner' : 'text-gray-400 hover:text-white hover:bg-white/5'}`} 
                title={viewMode === 'single' ? "Vista de Cuadrícula" : "Vista Individual"}
            >
                {viewMode === 'single' ? <Grid size={18} /> : <Layout size={18} />}
            </button>
            <div className="h-4 w-px bg-white/10 mx-1"></div>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors" title="Zoom">
                <ZoomIn size={18} />
            </button>
            <button onClick={toggleFullscreen} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors" title="Fullscreen">
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
            <button className="p-2 text-gray-400 hover:text-accent hover:bg-white/5 rounded-md transition-colors" title="Descargar PDF">
                <Download size={18} />
            </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Viewing Area */}
        <div className="flex-1 relative flex flex-col bg-[#0a0a0a]">
            
            {viewMode === 'single' ? (
                <>
                    <div className="flex-1 flex items-center justify-center overflow-hidden relative p-4 md:p-10 group">
                        {/* Simulated Canvas */}
                        <div className="relative shadow-2xl transition-all duration-500 ease-out transform">
                            {/* Loading State */}
                            {isImageLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a] z-10">
                                    <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                            
                            <img 
                                key={currentPage} // Forces re-render for animation
                                src={magazine.coverUrl} 
                                alt={`Page ${currentPage}`} 
                                onLoad={() => setIsImageLoading(false)}
                                className="max-h-[70vh] max-w-full object-contain bg-white shadow-black/80 shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-fade-in-up"
                            />

                            {/* Navigation Arrows (Floating) */}
                            <button 
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="absolute top-1/2 -left-12 md:-left-20 transform -translate-y-1/2 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all disabled:opacity-0"
                            >
                                <ChevronLeft size={32} />
                            </button>
                            <button 
                                onClick={() => setCurrentPage(Math.min(magazine.pageCount, currentPage + 1))}
                                disabled={currentPage === magazine.pageCount}
                                className="absolute top-1/2 -right-12 md:-right-20 transform -translate-y-1/2 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all disabled:opacity-0"
                            >
                                <ChevronRight size={32} />
                            </button>
                        </div>
                    </div>

                    {/* Filmstrip / Bottom Thumbnails */}
                    <div className="h-24 md:h-28 bg-[#121212]/90 backdrop-blur border-t border-white/5 flex items-center px-4 gap-3 overflow-x-auto custom-scrollbar z-20">
                        {Array.from({ length: Math.min(10, magazine.pageCount) }).map((_, i) => (
                            <div 
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`h-16 w-12 md:h-20 md:w-14 shrink-0 cursor-pointer transition-all duration-300 border relative group rounded-sm overflow-hidden ${currentPage === i + 1 ? 'border-amber-500 ring-2 ring-amber-500/20 scale-105 opacity-100' : 'border-white/10 opacity-50 hover:opacity-100'}`}
                            >
                                <div className="w-full h-full bg-white flex items-center justify-center text-[10px] text-gray-400">
                                     {i === 0 ? <img src={magazine.coverUrl} className="w-full h-full object-cover" /> : (
                                        <div className="flex flex-col items-center gap-0.5 opacity-20">
                                            <div className="w-full h-px bg-black"></div>
                                            <div className="w-full h-px bg-black"></div>
                                            <div className="w-full h-px bg-black"></div>
                                        </div>
                                     )}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-1">
                                    <span className="text-[9px] font-mono text-white">{i + 1}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                /* Grid View with Entrance Animation */
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#0f0f0f]">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                         {Array.from({ length: Math.min(12, magazine.pageCount) }).map((_, i) => (
                            <div 
                                key={i}
                                onClick={() => { setCurrentPage(i+1); setViewMode('single'); }}
                                className="aspect-[3/4] bg-white cursor-pointer hover:ring-4 ring-amber-500/50 transition-all duration-300 rounded-sm shadow-xl flex items-center justify-center relative group animate-fade-in-up"
                                style={{ animationDelay: `${i * 50}ms` }}
                            >
                                 {i === 0 ? (
                                     <img src={magazine.coverUrl} className="w-full h-full object-cover" />
                                 ) : (
                                     <span className="text-gray-200 font-serif text-3xl font-bold opacity-20">{i+1}</span>
                                 )}
                                 
                                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                     <span className="bg-black/70 text-white text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm">
                                        Ir a pág {i+1}
                                     </span>
                                 </div>
                            </div>
                         ))}
                    </div>
                </div>
            )}

            {/* Overlay Info (Single Mode only) */}
            {viewMode === 'single' && (
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black/60 text-gray-200 pl-3 pr-4 py-1.5 rounded-full text-xs font-mono backdrop-blur-md pointer-events-none border border-white/10 shadow-xl flex items-center gap-2">
                    <Book size={12} className="text-amber-500"/>
                    <span>{t('doc.page')} <span className="text-white font-bold">{currentPage}</span> <span className="text-gray-500">/</span> {magazine.pageCount}</span>
                </div>
            )}
        </div>

        {/* Right Sidebar (Metadata/AI) - Collapsible/Hidden in Fullscreen */}
        {!isFullscreen && (
            <div className="w-80 md:w-96 bg-white border-l border-gray-200 flex flex-col shadow-xl z-30 text-gray-800">
                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                    <button 
                        onClick={() => setActiveTab('metadata')}
                        className={`flex-1 py-4 text-xs font-bold uppercase tracking-wide transition-all ${activeTab === 'metadata' ? 'text-amber-600 border-b-2 border-amber-600 bg-amber-50/50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                    >
                        {t('doc.tab_metadata')}
                    </button>
                    <button 
                        onClick={() => setActiveTab('analysis')}
                        className={`flex-1 py-4 text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all ${activeTab === 'analysis' ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50/50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Sparkles size={14} /> {t('doc.tab_analysis')}
                    </button>
                </div>

                {/* Sidebar Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-[#fdfbf7]">
                    {activeTab === 'metadata' ? (
                        <div className="space-y-8 animate-fade-in">
                            <div>
                                <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-4 border-b border-gray-200 pb-2">{t('doc.general_info')}</h3>
                                <div className="space-y-4">
                                    <div className="flex gap-4 group">
                                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                                            <Book size={14} />
                                        </div>
                                        <div>
                                            <span className="block text-[10px] uppercase text-gray-400 font-bold">{t('doc.publisher')}</span>
                                            <span className="text-gray-900 font-serif font-medium leading-tight">{magazine.publisher}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 group">
                                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                                            <MapPin size={14} />
                                        </div>
                                        <div>
                                            <span className="block text-[10px] uppercase text-gray-400 font-bold">{t('doc.place')}</span>
                                            <span className="text-gray-900 font-serif font-medium leading-tight">{magazine.city}, {magazine.country}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 group">
                                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                                            <Calendar size={14} />
                                        </div>
                                        <div>
                                            <span className="block text-[10px] uppercase text-gray-400 font-bold">{t('doc.date')}</span>
                                            <span className="text-gray-900 font-serif font-medium leading-tight">{magazine.year} - {magazine.yearEnd || '...'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-4 border-b border-gray-200 pb-2">{t('doc.description')}</h3>
                                <p className="text-sm text-gray-600 leading-7 font-serif text-justify">
                                    {magazine.description[language]}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-4 border-b border-gray-200 pb-2">{t('doc.topics')}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {magazine.topics.map(topic => (
                                        <span key={topic} className="px-3 py-1 bg-white text-gray-600 text-xs font-medium rounded-full border border-gray-200 shadow-sm hover:border-amber-400 hover:text-amber-700 hover:shadow transition-all cursor-default">
                                            #{topic}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col animate-fade-in">
                            {!analysis && !loading && (
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                                    <div className="relative mb-6 group">
                                        <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                        <div className="relative bg-gradient-to-br from-purple-100 to-indigo-50 p-6 rounded-full shadow-inner border border-white/50">
                                            <Sparkles className="w-10 h-10 text-purple-600" />
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2 text-lg">{t('doc.ai_title')}</h3>
                                    <p className="text-sm text-gray-500 mb-8 leading-relaxed max-w-[200px]">
                                        {t('doc.ai_desc')}
                                    </p>
                                    <button 
                                        onClick={handleAIAnalysis}
                                        className="bg-[#1e293b] hover:bg-black text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 text-sm"
                                    >
                                        <Sparkles size={16} className="text-purple-400" /> {t('doc.ai_btn')}
                                    </button>
                                </div>
                            )}

                            {loading && (
                                <div className="flex-1 flex flex-col items-center justify-center">
                                    <div className="animate-spin rounded-full h-10 w-10 border-2 border-purple-600 border-t-transparent mb-4"></div>
                                    <p className="text-sm text-purple-800 font-medium animate-pulse">{t('doc.ai_analyzing')}</p>
                                </div>
                            )}

                            {analysis && (
                                <div className="prose prose-sm prose-slate max-w-none">
                                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-3 rounded-lg border border-purple-100 mb-6 text-xs text-purple-800 flex items-center gap-2 font-medium">
                                        <Sparkles size={14} /> Análisis generado por Gemini AI
                                    </div>
                                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 leading-relaxed text-gray-700">
                                        <ReactMarkdown>{analysis}</ReactMarkdown>
                                    </div>
                                    <div className="mt-6 text-[10px] text-gray-400 text-center uppercase tracking-wide">
                                        {t('doc.ai_disclaimer')}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        )}
    </div>
  );
};