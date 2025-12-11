import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_MAGAZINES } from '../constants';
import { ArrowLeft, ZoomIn, Download, Share2, Sparkles, Book, Calendar, MapPin, Grid, Layers, ChevronRight, ChevronLeft, Layout } from 'lucide-react';
import { analyzeMagazine } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '../contexts/LanguageContext';

const DocumentViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const magazine = MOCK_MAGAZINES.find(m => m.id === id);
  const { language, t } = useLanguage();
  
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'metadata' | 'analysis'>('metadata');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('single');

  // Reset state when ID changes
  useEffect(() => {
    setAnalysis(null);
    setActiveTab('metadata');
    setCurrentPage(1);
    setViewMode('single');
  }, [id]);

  if (!magazine) {
    return <div className="p-10 text-center">Documento no encontrado</div>;
  }

  const handleAIAnalysis = async () => {
    setLoading(true);
    setActiveTab('analysis');
    const result = await analyzeMagazine(magazine);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="bg-[#1a1a1a] h-[calc(100vh-64px)] flex flex-col text-gray-200">
      {/* Top Bar */}
      <div className="bg-[#2a2a2a] border-b border-[#333] px-4 py-2 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-4">
            <Link to="/catalogo" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-sm font-medium">
                <ArrowLeft size={16} /> {t('doc.back')}
            </Link>
            <div className="h-6 w-px bg-[#444]"></div>
            <h1 className="font-serif font-bold text-gray-100 truncate max-w-md">{magazine.title} ({magazine.year})</h1>
        </div>
        <div className="flex items-center gap-2">
            <button 
                onClick={() => setViewMode(viewMode === 'single' ? 'grid' : 'single')}
                className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'text-amber-500 bg-[#333]' : 'text-gray-400 hover:text-white hover:bg-[#333]'}`} 
                title={viewMode === 'single' ? "Vista de Cuadrícula" : "Vista Individual"}
            >
                {viewMode === 'single' ? <Grid size={18} /> : <Layout size={18} />}
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-[#333] rounded transition-colors" title="Capas">
                <Layers size={18} />
            </button>
            <div className="h-6 w-px bg-[#444] mx-1"></div>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-[#333] rounded transition-colors" title="Zoom">
                <ZoomIn size={18} />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-[#333] rounded transition-colors" title="Descargar PDF">
                <Download size={18} />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-[#333] rounded transition-colors" title="Citar">
                <Share2 size={18} />
            </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Viewing Area */}
        <div className="flex-1 relative flex flex-col bg-[#111]">
            
            {viewMode === 'single' ? (
                <>
                    <div className="flex-1 flex items-center justify-center overflow-hidden relative p-8">
                        {/* Simulated Canvas */}
                        <div className="shadow-2xl relative group transition-transform duration-300">
                            <img 
                                src={magazine.coverUrl} 
                                alt={magazine.title} 
                                className="max-h-[65vh] object-contain bg-white shadow-black/50 shadow-2xl"
                            />
                            {/* Page Navigation Overlay */}
                            <button 
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="absolute top-1/2 -left-16 transform -translate-y-1/2 p-3 bg-black/40 hover:bg-amber-600 text-white rounded-full transition-all disabled:opacity-0 backdrop-blur-sm"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button 
                                onClick={() => setCurrentPage(Math.min(magazine.pageCount, currentPage + 1))}
                                disabled={currentPage === magazine.pageCount}
                                className="absolute top-1/2 -right-16 transform -translate-y-1/2 p-3 bg-black/40 hover:bg-amber-600 text-white rounded-full transition-all disabled:opacity-0 backdrop-blur-sm"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Filmstrip / Bottom Thumbnails */}
                    <div className="h-32 bg-[#1a1a1a] border-t border-[#333] flex items-center px-4 gap-4 overflow-x-auto custom-scrollbar shadow-inner">
                        {Array.from({ length: Math.min(10, magazine.pageCount) }).map((_, i) => (
                            <div 
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`h-20 w-14 shrink-0 cursor-pointer transition-all border-2 relative group ${currentPage === i + 1 ? 'border-amber-500 scale-105 shadow-lg shadow-amber-900/20' : 'border-transparent opacity-60 hover:opacity-100'}`}
                            >
                                <div className="w-full h-full bg-white flex items-center justify-center text-[10px] text-gray-400 overflow-hidden">
                                     {i === 0 ? <img src={magazine.coverUrl} className="w-full h-full object-cover" /> : (
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="w-8 h-px bg-gray-200"></div>
                                            <div className="w-8 h-px bg-gray-200"></div>
                                            <div className="w-8 h-px bg-gray-200"></div>
                                        </div>
                                     )}
                                </div>
                                <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-[9px] text-gray-500 font-mono group-hover:text-white transition-colors">
                                    {i + 1}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                /* Grid / Light Table View */
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                         {Array.from({ length: Math.min(12, magazine.pageCount) }).map((_, i) => (
                            <div 
                                key={i}
                                onClick={() => { setCurrentPage(i+1); setViewMode('single'); }}
                                className="aspect-[3/4] bg-white cursor-pointer hover:ring-2 ring-amber-500 transition-all rounded-sm shadow-lg flex items-center justify-center relative group"
                            >
                                 {i === 0 ? (
                                     <img src={magazine.coverUrl} className="w-full h-full object-cover" />
                                 ) : (
                                     <div className="text-gray-200 text-4xl font-serif opacity-20">{i+1}</div>
                                 )}
                                 <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                     p.{i+1}
                                 </div>
                            </div>
                         ))}
                    </div>
                </div>
            )}

            {/* Overlay Info (Single Mode only) */}
            {viewMode === 'single' && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-gray-200 px-4 py-1 rounded-full text-xs font-mono backdrop-blur-sm pointer-events-none border border-white/10 shadow-xl">
                    {t('doc.page')} <span className="text-amber-400 font-bold">{currentPage}</span> / {magazine.pageCount}
                </div>
            )}
        </div>

        {/* Right Sidebar (Metadata/AI) */}
        <div className="w-96 bg-white border-l border-gray-200 flex flex-col shadow-xl z-20 text-gray-800">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <button 
                    onClick={() => setActiveTab('metadata')}
                    className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === 'metadata' ? 'text-amber-600 border-b-2 border-amber-600 bg-amber-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                >
                    {t('doc.tab_metadata')}
                </button>
                <button 
                    onClick={() => setActiveTab('analysis')}
                    className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'analysis' ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                >
                    <Sparkles size={14} /> {t('doc.tab_analysis')}
                </button>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#fdfbf7]">
                {activeTab === 'metadata' ? (
                    <div className="space-y-6 animate-fade-in">
                         <div>
                            <h3 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-3 border-b border-gray-200 pb-1">{t('doc.general_info')}</h3>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm space-y-3">
                                <div className="flex items-start gap-3">
                                    <Book className="w-4 h-4 text-amber-600 mt-1" />
                                    <div>
                                        <span className="block text-[10px] uppercase text-gray-400 font-bold">{t('doc.publisher')}</span>
                                        <span className="text-gray-900 font-medium text-sm">{magazine.publisher}</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-amber-600 mt-1" />
                                    <div>
                                        <span className="block text-[10px] uppercase text-gray-400 font-bold">{t('doc.place')}</span>
                                        <span className="text-gray-900 font-medium text-sm">{magazine.city}, {magazine.country}</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-4 h-4 text-amber-600 mt-1" />
                                    <div>
                                        <span className="block text-[10px] uppercase text-gray-400 font-bold">{t('doc.date')}</span>
                                        <span className="text-gray-900 font-medium text-sm">{magazine.year} - {magazine.yearEnd || '...'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <h3 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2 border-b border-gray-200 pb-1">{t('doc.description')}</h3>
                            <p className="text-sm text-gray-700 leading-relaxed font-serif text-justify">
                                {magazine.description[language]}
                            </p>
                        </div>

                        <div className="pt-2">
                            <h3 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2 border-b border-gray-200 pb-1">{t('doc.topics')}</h3>
                            <div className="flex flex-wrap gap-2">
                                {magazine.topics.map(topic => (
                                    <span key={topic} className="px-2.5 py-1 bg-white text-gray-600 text-xs font-medium rounded-full border border-gray-200 shadow-sm hover:border-amber-300 hover:text-amber-700 transition-colors cursor-default">
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col animate-fade-in">
                        {!analysis && !loading && (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                                <div className="bg-gradient-to-br from-purple-100 to-indigo-50 p-6 rounded-full mb-6 shadow-inner">
                                    <Sparkles className="w-10 h-10 text-purple-600" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2 text-lg">{t('doc.ai_title')}</h3>
                                <p className="text-sm text-gray-500 mb-8 leading-relaxed max-w-xs">
                                    {t('doc.ai_desc')}
                                </p>
                                <button 
                                    onClick={handleAIAnalysis}
                                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-0.5 flex items-center gap-2"
                                >
                                    <Sparkles size={16} /> {t('doc.ai_btn')}
                                </button>
                            </div>
                        )}

                        {loading && (
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-6"></div>
                                <p className="text-sm text-purple-800 font-medium animate-pulse">{t('doc.ai_analyzing')}</p>
                                <p className="text-xs text-gray-400 mt-2">Esto puede tomar unos segundos...</p>
                            </div>
                        )}

                        {analysis && (
                            <div className="prose prose-sm prose-purple">
                                <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 mb-4 text-xs text-purple-800 flex items-center gap-2">
                                    <Sparkles size={12} /> Análisis generado por IA
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <ReactMarkdown>{analysis}</ReactMarkdown>
                                </div>
                                <div className="mt-8 pt-4 border-t border-gray-200 text-[10px] text-gray-400 italic text-center">
                                    {t('doc.ai_disclaimer')}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;