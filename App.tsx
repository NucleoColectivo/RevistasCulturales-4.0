import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import Catalog from './components/Catalog';
import { DocumentViewer } from './components/DocumentViewer';
import VisualizationLab from './components/VisualizationLab';
import TutorialsPage from './components/TutorialsPage';
import PublicationsPage from './components/PublicationsPage';
import ChatBot from './components/ChatBot';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-[#4a5568] text-white py-12 border-t-4 border-amber-600">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8 text-sm">
        
        {/* Enlaces */}
        <div className="col-span-1">
           <h4 className="font-bold text-white mb-4 uppercase tracking-wide border-b border-gray-500 pb-2">{t('footer.links')}</h4>
           <ul className="space-y-2 text-gray-200">
               <li className="hover:text-amber-400 cursor-pointer flex items-center gap-2">
                   <span className="w-1 h-1 bg-gray-300 rounded-full"></span> Romanisches Seminar der Universität Tübingen
               </li>
               <li className="hover:text-amber-400 cursor-pointer flex items-center gap-2">
                   <span className="w-1 h-1 bg-gray-300 rounded-full"></span> Eberhard Karls Universität Tübingen
               </li>
           </ul>
        </div>

        {/* Informaciones */}
        <div className="col-span-1">
            <h4 className="font-bold text-white mb-4 uppercase tracking-wide border-b border-gray-500 pb-2">{t('footer.info')}</h4>
            <ul className="space-y-2 text-gray-200">
                <li className="hover:text-amber-400 cursor-pointer flex items-center gap-2">
                   <span className="w-1 h-1 bg-gray-300 rounded-full"></span> {t('footer.legal')}
                </li>
            </ul>
        </div>

        {/* Cooperaciones */}
        <div className="col-span-2">
            <h4 className="font-bold text-white mb-4 uppercase tracking-wide border-b border-gray-500 pb-2">{t('footer.coop')}</h4>
            <ul className="space-y-2 text-gray-200 mb-6">
                <li className="hover:text-amber-400 cursor-pointer flex items-center gap-2">
                   <span className="w-1 h-1 bg-gray-300 rounded-full"></span> Ibero-Amerikanisches Institut - Preußischer Kulturbesitz, Berlin
                </li>
                <li className="hover:text-amber-400 cursor-pointer flex items-center gap-2">
                   <span className="w-1 h-1 bg-gray-300 rounded-full"></span> Universitat Oberta de Catalunya
                </li>
            </ul>
            
            <div className="flex flex-wrap gap-4 items-center mt-6">
                {/* IAI - SPK Logo */}
                <div className="bg-white p-3 rounded shadow-sm h-14 md:h-16 flex items-center justify-center min-w-[140px]">
                     <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Stiftung_Preu%C3%9Fischer_Kulturbesitz_Logo.svg/320px-Stiftung_Preu%C3%9Fischer_Kulturbesitz_Logo.svg.png" 
                        alt="Ibero-Amerikanisches Institut" 
                        className="h-full w-auto object-contain"
                    />
                    <div className="ml-2 border-l border-gray-300 pl-2 text-black text-[9px] font-bold leading-tight font-sans">
                        Ibero-Amerikanisches<br/>Institut
                    </div>
                </div>

                {/* UOC Logo */}
                <div className="bg-white p-3 rounded shadow-sm h-14 md:h-16 flex items-center justify-center w-auto">
                     <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Logo_UOC.svg/320px-Logo_UOC.svg.png" 
                        alt="Universitat Oberta de Catalunya" 
                        className="h-full w-auto object-contain"
                    />
                </div>

                {/* Tübingen Logo */}
                <div className="bg-white p-3 rounded shadow-sm h-14 md:h-16 flex items-center justify-center w-auto">
                     <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Eberhard_Karls_Universit%C3%A4t_T%C3%BCbingen_Logo.svg/320px-Eberhard_Karls_Universit%C3%A4t_T%C3%BCbingen_Logo.svg.png" 
                        alt="Eberhard Karls Universität Tübingen" 
                        className="h-full w-auto object-contain"
                    />
                </div>
            </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 mt-12 pt-4 border-t border-gray-500 text-xs text-center text-gray-400">
          <p>&copy; 2025, Romanisches Seminar der Universität Tübingen</p>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen font-sans text-ink bg-paper">
          <Navigation />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalogo" element={<Catalog />} />
              <Route path="/tutorials" element={<TutorialsPage />} />
              <Route path="/publicaciones" element={<PublicationsPage />} />
              <Route path="/bibliografia" element={<PublicationsPage />} />
              <Route path="/documento/:id" element={<DocumentViewer />} />
              <Route path="/lab" element={<VisualizationLab />} />
              <Route path="/lab/timeline" element={<VisualizationLab />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          <ChatBot />
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;