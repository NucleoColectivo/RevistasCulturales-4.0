import React, { useState, useMemo } from 'react';
import { MOCK_MAGAZINES } from '../constants';
import { Link } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Catalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<[number, number]>([1900, 1950]);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const { t } = useLanguage();

  // Extract unique countries
  const allCountries = Array.from(new Set(MOCK_MAGAZINES.map(m => m.country)));

  // Filter Logic
  const filteredMagazines = useMemo(() => {
    return MOCK_MAGAZINES.filter(mag => {
      const matchesSearch = mag.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            mag.topics.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCountry = selectedCountries.length === 0 || selectedCountries.includes(mag.country);
      const matchesYear = mag.year >= yearRange[0] && mag.year <= yearRange[1];

      return matchesSearch && matchesCountry && matchesYear;
    });
  }, [searchTerm, selectedCountries, yearRange]);

  const toggleCountry = (country: string) => {
    setSelectedCountries(prev => 
      prev.includes(country) ? prev.filter(c => c !== country) : [...prev, country]
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      
      {/* Mobile Filter Toggle */}
      <div className="md:hidden p-4 bg-white border-b flex justify-between items-center">
        <span className="font-serif font-bold text-gray-800">{t('catalog.results')}: {filteredMagazines.length}</span>
        <button 
          onClick={() => setShowFiltersMobile(!showFiltersMobile)}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-100 px-3 py-2 rounded"
        >
          <Filter size={16} /> {t('catalog.filters')}
        </button>
      </div>

      {/* Sidebar Filters */}
      <aside className={`
        fixed inset-0 z-40 bg-white transform transition-transform duration-300 md:relative md:translate-x-0 md:w-72 md:block md:min-h-screen border-r border-gray-200
        ${showFiltersMobile ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-6 md:hidden">
                <h3 className="font-bold text-lg">{t('catalog.filters')}</h3>
                <button onClick={() => setShowFiltersMobile(false)}><X /></button>
            </div>

            <div className="mb-8">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">{t('catalog.search')}</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <input 
                        type="text" 
                        placeholder={t('catalog.keyword')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-accent"
                    />
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">{t('catalog.country')}</h3>
                <ul className="space-y-2">
                    {allCountries.map(country => (
                        <li key={country} className="flex items-center">
                            <label className="flex items-center cursor-pointer hover:text-accent transition-colors">
                                <input 
                                    type="checkbox" 
                                    checked={selectedCountries.includes(country)}
                                    onChange={() => toggleCountry(country)}
                                    className="mr-3 h-4 w-4 text-accent border-gray-300 rounded focus:ring-accent"
                                />
                                <span className="text-sm text-gray-700">{country}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-8">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">{t('catalog.period')} ({yearRange[0]} - {yearRange[1]})</h3>
                <input 
                    type="range" 
                    min="1900" 
                    max="1950" 
                    value={yearRange[1]}
                    onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
                    <span>1900</span>
                    <span>1950</span>
                </div>
            </div>
        </div>
      </aside>

      {/* Results Grid */}
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
            <div className="mb-6 hidden md:block">
                <h2 className="text-2xl font-serif font-bold text-gray-900">{t('catalog.general_title')}</h2>
                <p className="text-gray-500 text-sm mt-1">{t('catalog.showing')} {filteredMagazines.length} {t('catalog.found')}</p>
            </div>

            {filteredMagazines.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
                    <Search className="w-12 h-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">{t('catalog.no_results')}</h3>
                    <p className="text-gray-500">{t('catalog.try_adjust')}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredMagazines.map((mag) => (
                        <div key={mag.id} className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                            <div className="h-56 bg-gray-100 relative overflow-hidden">
                                <img 
                                    src={mag.coverUrl} 
                                    alt={mag.title}
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                                />
                                <span className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded">
                                    {mag.year}
                                </span>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="mb-2 text-xs uppercase tracking-wide text-gray-500 font-semibold">{mag.country}</div>
                                <h3 className="font-serif font-bold text-lg text-gray-900 leading-tight mb-2 group-hover:text-accent transition-colors">
                                    {mag.title}
                                </h3>
                                
                                <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                                    {mag.topics.slice(0, 3).map(topic => (
                                        <span key={topic} className="px-2 py-0.5 bg-gray-50 text-gray-600 text-[10px] rounded-full border border-gray-200">
                                            {topic}
                                        </span>
                                    ))}
                                </div>

                                <Link 
                                    to={`/documento/${mag.id}`}
                                    className="w-full text-center text-sm font-semibold text-accent border border-accent rounded py-2 hover:bg-amber-50 transition-colors mt-auto block"
                                >
                                    {t('catalog.view_doc')}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default Catalog;