import React from 'react';
import { Search, Map, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative bg-[#1e293b] text-white overflow-hidden min-h-[85vh] flex items-center">
      {/* Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}
      ></div>
      
      {/* Gradient Overlay - Darker for more elegance */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-amber-950/40"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <span className="inline-block py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-amber-300 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase mb-8 backdrop-blur-sm animate-fade-in-up">
          {t('hero.tag')}
        </span>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 leading-tight max-w-5xl animate-fade-in-up drop-shadow-xl">
          {t('hero.title_prefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 bg-[length:200%_auto] animate-shine">{t('hero.title_highlight')}</span><br/>
          {t('hero.title_suffix')}
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed animate-fade-in-up delay-100 antialiased">
          {t('hero.description')}
        </p>

        {/* Search Box */}
        <div className="w-full max-w-3xl mx-auto bg-white/5 backdrop-blur-md p-1.5 rounded-2xl shadow-2xl border border-white/10 animate-fade-in-up delay-200 hover:bg-white/10 transition-colors">
           <div className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-inner">
                <div className="flex-1 flex items-center px-4 py-4 md:py-5">
                    <Search className="text-slate-400 w-5 h-5 md:w-6 md:h-6 mr-3" />
                    <input 
                        type="text" 
                        placeholder={t('hero.search_placeholder')} 
                        className="w-full text-slate-800 outline-none text-base md:text-lg placeholder-slate-400 font-sans"
                    />
                </div>
                <Link to="/catalogo" className="bg-[#d97706] hover:bg-[#b45309] text-white px-10 py-4 md:py-5 font-bold tracking-wide transition-colors flex items-center justify-center gap-2 text-sm uppercase">
                    {t('hero.explore_btn')} <ChevronRight size={18} />
                </Link>
           </div>
        </div>

        {/* Stats - Elegant Thin Lines */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 mt-20 md:mt-28 text-slate-400 font-mono border-t border-white/10 pt-10 w-full max-w-5xl animate-fade-in-up delay-300">
          <div className="flex flex-col items-center group">
            <span className="text-4xl font-serif font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">1,250+</span>
            <span className="text-[10px] uppercase tracking-[0.2em]">{t('hero.stats_docs')}</span>
          </div>
          <div className="flex flex-col items-center group">
            <span className="text-4xl font-serif font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">12</span>
            <span className="text-[10px] uppercase tracking-[0.2em]">{t('hero.stats_countries')}</span>
          </div>
          <div className="flex flex-col items-center group">
            <span className="text-4xl font-serif font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">1900-1950</span>
            <span className="text-[10px] uppercase tracking-[0.2em]">Periodo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;