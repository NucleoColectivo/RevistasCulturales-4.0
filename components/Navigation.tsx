import React from 'react';
import { BookOpen, Map, Home, Network } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const isActive = (path: string) => {
    // Check if path matches exactly or if it's a sub-route (for lab)
    if (path === '/lab' && location.pathname.includes('/lab')) return "bg-amber-600 text-white";
    return location.pathname === path ? "bg-amber-600 text-white" : "text-white hover:text-amber-200 transition-colors";
  };

  return (
    <div className="flex flex-col sticky top-0 z-50">
        {/* Top Bar for University Branding */}
        <div className="bg-[#4a4a49] text-white py-1.5 px-6 text-[10px] md:text-xs font-medium tracking-wider flex justify-end items-center uppercase border-b border-gray-600">
            {/* Language Switcher */}
            <div className="flex items-center gap-3">
                {(['es', 'de', 'en'] as Language[]).map((lang) => (
                <button 
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`hover:text-amber-400 transition-colors ${language === lang ? 'text-amber-400 font-bold' : 'text-gray-300'}`}
                >
                    {lang === 'es' ? 'Español' : lang === 'de' ? 'Deutsch' : 'English'}
                </button>
                ))}
            </div>
        </div>

        {/* Banner Area */}
        <div className="bg-[#e9a144] py-4 px-6 shadow-sm">
            <div className="container mx-auto flex flex-col md:flex-row items-center gap-6">
                <div className="flex items-center">
                    {/* University Logo */}
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Eberhard_Karls_Universit%C3%A4t_T%C3%BCbingen_Logo.svg/800px-Eberhard_Karls_Universit%C3%A4t_T%C3%BCbingen_Logo.svg.png"
                        alt="Eberhard Karls Universität Tübingen"
                        className="h-16 md:h-20 object-contain mix-blend-multiply opacity-90"
                    />
                </div>
                
                <div className="hidden md:block h-12 w-px bg-slate-800 mx-4 opacity-20"></div>
                
                <div className="">
                    <h1 className="font-sans font-bold text-xl md:text-2xl text-slate-900 tracking-tight uppercase">
                        {t('nav.title')}
                    </h1>
                </div>
            </div>
        </div>

        {/* Navigation Menu - Glassmorphism Sticky */}
        <div className="bg-[#e9a144]/95 backdrop-blur-md border-t border-amber-600/30 shadow-md">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap gap-1 text-sm font-medium">
                    <Link to="/" className={`px-4 py-3 ${isActive('/')}`}>
                        {t('nav.home')}
                    </Link>
                    <Link to="/" className={`px-4 py-3 ${isActive('/blog')}`}>
                        {t('nav.blog')}
                    </Link>
                    <Link to="/catalogo" className={`px-4 py-3 ${isActive('/catalogo')}`}>
                        {t('nav.library')}
                    </Link>
                    <Link to="/tutorials" className={`px-4 py-3 ${isActive('/tutorials')}`}>
                        {t('nav.tutorials')}
                    </Link>
                    <Link to="/lab" className={`px-4 py-3 ${isActive('/lab')}`}>
                        {t('nav.network')}
                    </Link>
                    <Link to="/catalogo" className={`px-4 py-3 ${isActive('/publicaciones')}`}>
                        {t('nav.publications')}
                    </Link>
                    <Link to="/catalogo" className={`px-4 py-3 ${isActive('/bibliografia')}`}>
                        {t('nav.bibliography')}
                    </Link>
                    <Link to="/" className={`px-4 py-3 ${isActive('/enlaces')}`}>
                        {t('nav.links')}
                    </Link>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Navigation;