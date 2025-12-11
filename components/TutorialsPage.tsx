import React, { useState } from 'react';
import { BookOpen, Database, Users, FileDown, FileUp, Search, Anchor, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const tutorialSections = [
  {
    id: 'collecting-data',
    title: 'Collecting Data',
    icon: <Database size={18} />,
    content: (
      <>
        <p className="mb-4 text-sm bg-amber-50 p-4 border-l-4 border-amber-500 text-amber-900">
          <strong>Note:</strong> Please be aware that all data collected in the portal are not the intellectual property of the researcher who collected them, but that they are available for all users authenticated in this portal under the licence CC-BY-3.0. Appropriate credit to Revistas Culturales 4.0 has to be given.
        </p>
        <p className="mb-4">
          These tutorials describe functions available only for authenticated users.
        </p>
        <h4 className="font-bold text-gray-900 mt-6 mb-2">Step-by-Step Guide</h4>
        <ol className="list-decimal pl-5 space-y-3 text-gray-700">
          <li>Navigate to the <strong>"Collections"</strong> page.</li>
          <li>Choose the cultural magazine and the specific issue you want to work on.</li>
          <li>Select the magazine page thumbnail. <em>Tip: Use two screens or side-by-side browser tabs—one for the image, one for data collection.</em></li>
          <li>Click the <strong>"Add"</strong> button in the "Metadata Page" section ABOVE the image.</li>
        </ol>

        <h4 className="font-bold text-gray-900 mt-6 mb-2">Filling the Metadata Fields</h4>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li><strong>Item title:</strong> Usually the header of the article or image.</li>
          <li><strong>Contributor:</strong> Start typing the last name. If it exists, select it. If not, click the green "+" button to create a new one. Use "Anónimo", "Redacción", or "Dirección" if applicable.</li>
          <li><strong>Multiple Authors:</strong> Select the first author, type a comma, and start typing the second author's name.</li>
          <li><strong>Contents of this page:</strong> Fill if description is available.</li>
          <li><strong>Page number(s):</strong> Use formats like "IV", "68", or "167–168".</li>
          <li><strong>Rubric:</strong> The section under which the item is filed (e.g., "reseña", "bibliografía").</li>
          <li><strong>Language:</strong> Start typing to select languages. Multiple languages are allowed.</li>
          <li><strong>Genre:</strong>
            <ul className="list-circle pl-5 mt-1 text-sm text-gray-600">
                <li><em>Genre comparable:</em> General classification (Non-Fictional Prose, Image, Lyricism, etc.)</li>
                <li><em>Genre exact:</em> Precise classification (Interview, Drawing, Poem, Letter, etc.)</li>
            </ul>
          </li>
        </ul>
        <p className="mt-4 text-gray-700">
          <strong>Important:</strong> If articles span several pages, fill the same information on following pages and append "continuación" to the title.
          <br/>
          <strong>Don't forget:</strong> Add your username at the bottom of the page to track your contributions in "My edited articles".
        </p>
      </>
    )
  },
  {
    id: 'add-contributor',
    title: 'Add or Edit Contributor',
    icon: <Users size={18} />,
    content: (
      <>
        <p className="mb-4">In the right sidebar, click <strong>"Add content"</strong> and select <strong>"Personen Zeitschrift"</strong> (Contributor magazine).</p>
        
        <h4 className="font-bold text-gray-900 mt-6 mb-2">Required Fields</h4>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li><strong>Anzeigename (Displayed Name):</strong> The real name as it should be displayed.</li>
          <li><strong>Pseudonym:</strong> Note any pseudonyms here.</li>
          <li><strong>Family Name vs. Given Name:</strong> 
            <br/><span className="text-sm text-gray-500">Example: "Bustamante y Ballivian" (Family) vs. "Enrique" (Given). For "Miguel de Unamuno", write "Unamuno" (Family) and "Miguel de" (Given).</span>
          </li>
          <li><strong>Sex:</strong> diverse/female/male/unknown.</li>
          <li><strong>Dates:</strong> Must use <code>MM/DD/YYYY</code> format. If unknown, leave blank and use the Year fields.</li>
        </ul>

        <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-200">
            <h5 className="font-bold text-gray-800 text-sm uppercase mb-2">Research Status</h5>
            <p className="text-sm text-gray-600">
                Please indicate by clicking <strong>"First search unsuccessful"</strong> if you have tried to find information but failed. This helps other researchers avoid redundant work.
            </p>
        </div>
      </>
    )
  },
  {
    id: 'export-data',
    title: 'Export Data',
    icon: <FileDown size={18} />,
    content: (
      <>
        <p className="mb-4">Navigate to the main page of a magazine collection to find export options.</p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="border border-gray-200 rounded p-4">
                <h4 className="font-bold text-amber-700 mb-2">Export Item List</h4>
                <p className="text-sm text-gray-600 mb-3">Click <strong>"Artikelliste exportieren"</strong>.</p>
                <p className="text-xs text-gray-500">
                    Returns a CSV file (ISO-8859-1) containing all issues and page identifiers. Includes existing collected data.
                </p>
            </div>
            <div className="border border-gray-200 rounded p-4">
                <h4 className="font-bold text-amber-700 mb-2">Export Person List</h4>
                <p className="text-sm text-gray-600 mb-3">Click <strong>"Personenliste exportieren"</strong>.</p>
                <p className="text-xs text-gray-500">
                    Returns a CSV file with all contributors linked to the magazine.
                </p>
            </div>
        </div>
        <p className="mt-4 text-sm text-red-600 font-medium">
            Warning: Do not change the CSV delimiter (semicolon) or character encoding (ISO-8859-1).
        </p>
      </>
    )
  },
  {
    id: 'import-data',
    title: 'Import Data',
    icon: <FileUp size={18} />,
    content: (
      <>
        <h4 className="font-bold text-gray-900 mb-2">Step 1: Persons (Contributors)</h4>
        <p className="mb-4 text-gray-700">Always update the person list first.</p>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700 mb-6">
            <li>Export the person list CSV.</li>
            <li>Fill empty fields (<code>sex_edit</code>, <code>date_birth_edit</code>, etc.).</li>
            <li><strong>Important:</strong> Use your username in <code>username_maintainer_edit</code>.</li>
            <li>Save as CSV (ISO-8859-1) and upload via <strong>"Personen importieren"</strong>.</li>
        </ol>

        <h4 className="font-bold text-gray-900 mb-2">Step 2: Items (Articles)</h4>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>Export the item list CSV.</li>
            <li><strong>Mandatory:</strong> Fill <code>article_nr_edit</code>. Create unique IDs by appending numbers to the <code>id_non</code> (e.g., <code>..._0001</code> becomes <code>..._0001_1</code>).</li>
            <li>If a page has multiple items, duplicate the row and increment your unique ID.</li>
            <li>Fill metadata fields (Author, Title, etc.).</li>
            <li><code>type_comp_edit</code> values must be exact (e.g., "Non-Fictional Prose", "Image").</li>
            <li>Upload via <strong>"Artikel importieren"</strong>.</li>
        </ol>
      </>
    )
  },
  {
    id: 'merge-persons',
    title: 'Merge Persons (Admin)',
    icon: <Users size={18} />,
    content: (
      <>
        <p className="mb-4 text-gray-700">
            If two database entries refer to the same person, administrators can merge them.
        </p>
        <ol className="list-decimal pl-5 space-y-3 text-gray-700">
            <li>Go to the <strong>"Merge persons"</strong> page.</li>
            <li>Search for the two entries (correct and incorrect/duplicate forms).</li>
            <li>Select <strong>"Merge entities"</strong> and click Execute.</li>
            <li>Select the correct name form in the top bar (dark background).</li>
            <li>Click "Next".</li>
            <li>Check if the incorrectly written contributor is still connected to any items. If not, delete the incorrect entry.</li>
        </ol>
      </>
    )
  },
  {
    id: 'research',
    title: 'Research Possibilities',
    icon: <Search size={18} />,
    content: (
      <>
        <p className="mb-4">Beyond the standard search, we facilitate "speaking links" for exploration:</p>
        <div className="space-y-4">
            <div className="bg-white p-3 border border-gray-200 rounded shadow-sm">
                <h5 className="font-bold text-sm text-amber-700">By Section Type</h5>
                <code className="text-xs bg-gray-100 p-1 block mt-1">.../sektionsart/musicalnotation</code>
                <code className="text-xs bg-gray-100 p-1 block mt-1">.../sektionsart/map</code>
            </div>
            <div className="bg-white p-3 border border-gray-200 rounded shadow-sm">
                <h5 className="font-bold text-sm text-amber-700">By Country of Origin</h5>
                <code className="text-xs bg-gray-100 p-1 block mt-1">.../land/brazil</code>
                <code className="text-xs bg-gray-100 p-1 block mt-1">.../land/argentina</code>
            </div>
            <div className="bg-white p-3 border border-gray-200 rounded shadow-sm">
                <h5 className="font-bold text-sm text-amber-700">By Topic</h5>
                <code className="text-xs bg-gray-100 p-1 block mt-1">.../themen/modernismo</code>
                <code className="text-xs bg-gray-100 p-1 block mt-1">.../themen/sport</code>
            </div>
        </div>
      </>
    )
  }
];

const TutorialsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState(tutorialSections[0].id);
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-paper pb-20">
      {/* Hero Header */}
      <div className="bg-slate-900 text-white py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1456324504439-367cee101252?q=80&w=2070&auto=format&fit=crop')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-6 relative z-10">
            <div className="flex items-center gap-3 text-amber-500 mb-4 font-mono text-sm tracking-widest uppercase animate-fade-in-up">
                <BookOpen size={18} />
                <span>Knowledge Base</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 animate-fade-in-up delay-100">
                "How To": Our Tutorials
            </h1>
            <p className="text-gray-300 max-w-2xl text-lg font-light animate-fade-in-up delay-200">
                Comprehensive guides on data collection, enrichment, and platform usage for researchers and collaborators.
            </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-10">
            
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-72 shrink-0">
                <div className="sticky top-24 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                        <h3 className="font-bold text-gray-800 uppercase tracking-wide text-xs">Table of Contents</h3>
                    </div>
                    <nav className="flex flex-col p-2">
                        {tutorialSections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left ${activeSection === section.id ? 'bg-amber-50 text-amber-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                            >
                                <span className={`${activeSection === section.id ? 'text-amber-600' : 'text-gray-400'}`}>
                                    {section.icon}
                                </span>
                                {section.title}
                                {activeSection === section.id && <ChevronRight size={14} className="ml-auto opacity-50" />}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 space-y-12">
                {tutorialSections.map((section) => (
                    <section 
                        key={section.id} 
                        id={section.id}
                        className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 scroll-mt-24 animate-fade-in"
                    >
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                            <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
                                {section.icon}
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-gray-900">{section.title}</h2>
                        </div>
                        <div className="prose prose-slate prose-amber max-w-none">
                            {section.content}
                        </div>
                    </section>
                ))}
            </main>

        </div>
      </div>
    </div>
  );
};

export default TutorialsPage;
