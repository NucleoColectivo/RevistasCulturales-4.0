import React from 'react';
import HeroSection from './HeroSection';
import { MOCK_BLOG_POSTS, MOCK_MAGAZINES, MOCK_VIDEOS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight, BookOpen, Clock, Calendar, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { t } = useLanguage();

  // Featured magazines for carousel
  const featuredMagazines = MOCK_MAGAZINES.slice(0, 4);

  return (
    <div className="bg-paper min-h-screen font-sans">
      <HeroSection />
      
      {/* Featured Magazines Section - Elegant Strip */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-2 block">{t('catalog.general_title')}</span>
                    <h2 className="text-3xl font-serif font-bold text-gray-900">{t('home.about_title')}</h2>
                </div>
                <Link to="/catalogo" className="text-sm font-semibold text-gray-500 hover:text-accent flex items-center gap-2 transition-colors">
                    Ver todos <ArrowRight size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {featuredMagazines.map((mag) => (
                    <div key={mag.id} className="group cursor-pointer">
                        <div className="relative aspect-[3/4] overflow-hidden rounded shadow-sm mb-4 bg-gray-100">
                            <img 
                                src={mag.coverUrl} 
                                alt={mag.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                        </div>
                        <h3 className="font-serif font-bold text-lg leading-tight text-gray-900 group-hover:text-accent transition-colors">
                            {mag.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">{mag.country}, {mag.year}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* About / Mission Section */}
      <section className="py-20 bg-[#fdfbf7]">
          <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto text-center">
                  <BookOpen className="w-10 h-10 text-accent mx-auto mb-6" />
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8 leading-tight">
                    {t('home.about_subtitle')}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light mb-8">
                    {t('home.about_text_1')}
                  </p>
                  <p className="text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
                    {t('home.about_text_2')}
                  </p>
              </div>
          </div>
      </section>

      {/* Multimedia Curada Section (NEW) */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
            <div className="flex flex-col items-center mb-16 text-center">
                <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-2 block">Selección Especial</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold">Curaduría Multimedia</h2>
                <p className="text-slate-400 mt-4 max-w-2xl font-light">
                    Una selección de contenidos audiovisuales esenciales para comprender el contexto de las vanguardias y las humanidades digitales.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {MOCK_VIDEOS.map((video) => (
                    <div key={video.id} className="group">
                        <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl mb-4 border border-white/10 group-hover:border-amber-500/50 transition-colors">
                            <iframe 
                                src={video.videoUrl} 
                                title={video.title}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="flex items-start gap-3">
                            <PlayCircle size={20} className="text-amber-500 mt-1 shrink-0" />
                            <div>
                                <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-amber-400 transition-colors">{video.title}</h3>
                                <p className="text-xs text-slate-500 uppercase tracking-wider">{video.author}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Latest Research / Blog Grid - The "Professional" Look */}
      <section className="py-20 bg-white border-t border-gray-200">
          <div className="container mx-auto px-6">
              <div className="flex justify-between items-end mb-16">
                  <div>
                      <span className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2 block">{t('sidebar.recent_content')}</span>
                      <h2 className="text-3xl font-serif font-bold text-gray-900">Investigación & Noticias</h2>
                  </div>
                  <Link to="/blog" className="text-sm font-semibold text-gray-500 hover:text-accent flex items-center gap-2 transition-colors">
                        Ver todos <ArrowRight size={16} />
                  </Link>
              </div>

              {/* Increased grid display to show new entries */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {MOCK_BLOG_POSTS.slice(0, 9).map((post) => (
                      <article key={post.id} className="flex flex-col group h-full">
                          <div className="relative h-64 overflow-hidden rounded-lg mb-6 shadow-sm">
                              <img 
                                src={post.imageUrl} 
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                              />
                              <div className="absolute top-4 left-4">
                                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                                      {post.tags[0]}
                                  </span>
                              </div>
                          </div>
                          <div className="flex-1 flex flex-col">
                              <div className="flex items-center gap-4 text-xs text-gray-400 mb-3 uppercase tracking-wider font-medium">
                                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                                  <span className="text-accent">●</span>
                                  <span>{post.author}</span>
                              </div>
                              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 leading-snug group-hover:text-accent transition-colors">
                                  {post.title}
                              </h3>
                              <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                                  {post.excerpt}
                              </p>
                              <Link to="/blog" className="inline-flex items-center text-sm font-bold text-accent hover:text-amber-800 transition-colors mt-auto">
                                  {t('home.read_more')} <ArrowRight size={14} className="ml-2" />
                              </Link>
                          </div>
                      </article>
                  ))}
              </div>
          </div>
      </section>
    </div>
  );
};

export default HomePage;