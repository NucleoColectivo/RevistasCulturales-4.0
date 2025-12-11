import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MOCK_BLOG_POSTS } from '../constants';
import { Calendar, User, Search, Tag, ArrowRight } from 'lucide-react';

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { t } = useLanguage();

  // Get all unique tags
  const allTags = Array.from(new Set(MOCK_BLOG_POSTS.flatMap(post => post.tags)));

  const filteredPosts = MOCK_BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-paper pb-20">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800"></div>
        <div className="container mx-auto px-6 relative z-10">
            <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-2 block animate-fade-in-up">
                Revistas Culturales 4.0
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 animate-fade-in-up delay-100">
                {t('nav.blog')}
            </h1>
            <p className="text-gray-300 max-w-2xl text-lg font-light animate-fade-in-up delay-200">
                Noticias, actualizaciones del proyecto y artículos de investigación sobre humanidades digitales y revistas históricas.
            </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar / Filters */}
            <aside className="w-full lg:w-72 shrink-0 space-y-8">
                {/* Search */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Buscar</h3>
                    <div className="relative">
                        <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                        <input 
                            type="text" 
                            placeholder="Buscar en el blog..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                    </div>
                </div>

                {/* Tags */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Etiquetas</h3>
                        {selectedTag && (
                            <button 
                                onClick={() => setSelectedTag(null)}
                                className="text-xs text-red-500 hover:text-red-700 font-medium"
                            >
                                Limpiar
                            </button>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${selectedTag === tag ? 'bg-amber-100 border-amber-200 text-amber-800 font-bold' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-amber-300 hover:text-amber-700'}`}
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Posts Grid */}
            <main className="flex-1">
                <div className="mb-6 text-sm text-gray-500">
                    Mostrando {filteredPosts.length} entradas
                </div>

                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredPosts.map((post) => (
                            <article key={post.id} className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src={post.imageUrl} 
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide shadow-sm">
                                            {post.lang === 'es' ? 'Español' : post.lang === 'en' ? 'English' : 'Deutsch'}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3 uppercase tracking-wider font-medium">
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                                        <span className="text-amber-300">●</span>
                                        <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                                    </div>
                                    <h2 className="text-xl font-serif font-bold text-gray-900 mb-3 leading-snug group-hover:text-amber-600 transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                        <div className="flex gap-2 overflow-hidden">
                                            {post.tags.slice(0, 2).map(tag => (
                                                <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                        <button className="text-sm font-bold text-amber-600 hover:text-amber-800 flex items-center gap-1 transition-colors">
                                            Leer más <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
                        <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No se encontraron entradas</h3>
                        <p className="text-gray-500">Intenta ajustar los términos de búsqueda.</p>
                    </div>
                )}
            </main>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;