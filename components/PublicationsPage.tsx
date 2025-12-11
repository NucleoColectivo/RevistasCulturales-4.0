import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MOCK_BIBLIOGRAPHY, MOCK_PROJECT_PUBLICATIONS } from '../constants';
import { BookOpen, FileText, Filter, Search, Book, User, Calendar, MapPin, Tag } from 'lucide-react';

const PublicationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'project' | 'bibliography'>('project');
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useLanguage();

  const filteredProjectPubs = MOCK_PROJECT_PUBLICATIONS.filter(pub => 
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredBiblio = MOCK_BIBLIOGRAPHY.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.culturalArea.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-paper pb-20">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 animate-fade-in-up">
                {t('nav.publications')}
            </h1>
            <p className="text-gray-300 max-w-2xl text-lg font-light animate-fade-in-up delay-100">
                A comprehensive archive of project outputs and secondary literature related to cultural magazines.
            </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        
        {/* Tab Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
            <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                <button
                    onClick={() => setActiveTab('project')}
                    className={`px-6 py-2.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'project' ? 'bg-amber-100 text-amber-800 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    <FileText size={16} /> Project Output
                </button>
                <button
                    onClick={() => setActiveTab('bibliography')}
                    className={`px-6 py-2.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'bibliography' ? 'bg-amber-100 text-amber-800 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    <Book size={16} /> Secondary Bibliography
                </button>
            </div>

            <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                <input 
                    type="text" 
                    placeholder="Search title, author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-amber-500 shadow-sm"
                />
            </div>
        </div>

        {/* Content Area */}
        <div className="animate-fade-in">
            {activeTab === 'project' ? (
                <div className="grid gap-6">
                    {filteredProjectPubs.map(pub => (
                        <div key={pub.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="flex flex-col md:flex-row justify-between gap-4 mb-3">
                                <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wide">
                                    <span className="bg-amber-50 px-2 py-1 rounded">{pub.type}</span>
                                    <span>•</span>
                                    <span>{pub.date}</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                                {pub.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 font-medium">
                                <User size={14} /> {pub.author}
                            </div>
                            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                                {pub.abstract}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {pub.tags.map(tag => (
                                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full border border-gray-200">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 font-medium uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4 tracking-wider">Type</th>
                                    <th className="px-6 py-4 tracking-wider">Title / Year</th>
                                    <th className="px-6 py-4 tracking-wider">Author / Editor</th>
                                    <th className="px-6 py-4 tracking-wider">Cultural Area</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredBiblio.map(item => (
                                    <tr key={item.id} className="hover:bg-amber-50/30 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${item.type === 'Zeitschrift' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {item.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900 mb-0.5">{item.title}</div>
                                            <div className="text-xs text-gray-500 font-mono">{item.year} {item.place ? `• ${item.place}` : ''}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">
                                            <div>{item.author}</div>
                                            {item.editor && <div className="text-xs text-gray-400 mt-1">Ed: {item.editor}</div>}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-600 text-xs">
                                                <MapPin size={10} /> {item.culturalArea}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredBiblio.length === 0 && (
                        <div className="p-10 text-center text-gray-400">
                            No bibliography items found matching your search.
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default PublicationsPage;