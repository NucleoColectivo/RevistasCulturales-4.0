import { Magazine, GraphData, BlogPost, BibliographyItem, ProjectPublication } from './types';

// ... (Previous MOCK_BLOG_POSTS and MOCK_MAGAZINES remain the same, adding new data below)

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Postdoc (m/f/d) en el Proyecto DFG "Visiones de la heterogeneidad cultural"',
    date: '16 December 2024',
    author: 'hanno.ehrlicher',
    excerpt: 'En el marco de la Unidad de Investigación de la DFG FOR 5700/1 "TransExilio", 6 subproyectos examinan las redes entre exiliados de diversos orígenes y artistas mexicanos.',
    tags: ['Postdoc', 'DFG', 'México'],
    lang: 'es',
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'post-2',
    title: 'Convocatoria: Estudios Revisteriles en Red',
    date: '26 February 2024',
    author: 'hanno.ehrlicher',
    excerpt: 'Los grupos de trabajo de Colombia y Revistas Culturales 2.0 invitan a los estudiosos de las revistas literarias y culturales a participar en el coloquio internacional.',
    tags: ['Colombia', 'Convocatoria', 'Redes'],
    lang: 'es',
    imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'post-3',
    title: 'Mujer y prensa en la Modernidad',
    date: '8 June 2021',
    author: 'hanno.ehrlicher',
    excerpt: 'Publicación del volumen colectivo sobre dinámicas de género e identidades públicas en revistas culturales de España e Hispanoamérica.',
    tags: ['Género', 'Prensa', 'Modernidad'],
    lang: 'es',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'post-4',
    title: 'Dataset: Foreign authors in "Nosotros" (1908-1919)',
    date: '15 August 2020',
    author: 'ventsislav.ikoff',
    excerpt: 'New dataset recording works in translation and reviews of foreign authors published in the Argentinean magazine Nosotros (Buenos Aires).',
    tags: ['Dataset', 'Data Science', 'Argentina'],
    lang: 'en',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'post-5',
    title: 'Call for Papers: Revista de Humanidades Digitales 2020',
    date: '27 November 2019',
    author: 'jörg.lehmann',
    excerpt: 'La Revista de Humanidades Digitales abre su Call for Papers para su número 5. Las fechas de recepción de trabajos son del 25 de noviembre de 2019 al 1 de junio.',
    tags: ['CfP', 'RHD', 'Open Access'],
    lang: 'es',
    imageUrl: 'https://images.unsplash.com/photo-1456324504439-367cee101252?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'post-6',
    title: 'CfP: "Future States - Modernity and national identity"',
    date: '16 October 2019',
    author: 'jörg.lehmann',
    excerpt: 'Modernity and national identity in popular magazines, 1890-1945. A nearly carbon-neutral conference Hosted by the Centre for Design History.',
    tags: ['Conference', 'Modernity', 'Identity'],
    lang: 'en',
    imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'post-8',
    title: 'Revistas Culturales 2.0 auf der DHd2019',
    date: '26 March 2019',
    author: 'nanette',
    excerpt: 'Im Rahmen der neuen AG "Zeitungen & Zeitschriften" des dhd-Verbands werden die Plattform Revistas Culturales 2.0 im Panel der DHd2019 präsentiert.',
    tags: ['DHd2019', 'Konferenz', 'Digital'],
    lang: 'de',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop'
  }
];

export const MOCK_PROJECT_PUBLICATIONS: ProjectPublication[] = [
  {
    id: 'pp-1',
    title: 'Cultural Magazines from "Modernismo" to Avant-Garde: Processes of Modernization',
    date: '12 August 2020',
    author: 'hanno.ehrlicher',
    abstract: 'Research project funded by the DFG (Project number 327964298). The following series of articles give insides as well as exemplary outcommings of this project.',
    tags: ['Avant-Garde', 'Modernismo', 'DFG'],
    type: 'Article'
  },
  {
    id: 'pp-2',
    title: 'Atlas.ti: un primer acercamiento para el análisis cualitativo y cuantitativo',
    date: '23 November 2018',
    author: 'Claudia Cedeño',
    abstract: 'El software ATLAS.ti resulta de gran utilidad para el análisis de grandes conjuntos de información, su versatilidad permite trabajar con diversos materiales.',
    tags: ['Atlas.ti', 'Tutorial', 'Análisis'],
    type: 'Tutorial'
  },
  {
    id: 'pp-3',
    title: 'Voices from a Lost World: When rare oriental texts are dusted off',
    date: '13 August 2018',
    author: 'hanno.ehrlicher',
    abstract: 'Few Hispanic scholars think to include the Sephardic Jewish diaspora as part of the Hispanosphere, despite the fact that their abandonment of Spanish territory after 1492 did not mean that they abandoned their hispanidad.',
    tags: ['Sephardi', 'Journalism', 'Ladino'],
    type: 'Article'
  },
  {
    id: 'pp-4',
    title: 'Medir la vanguardia desmedida: conflictos de localización',
    date: '6 February 2018',
    author: 'hanno.ehrlicher',
    abstract: 'Sobre el editorial anónimo de Guillermo de Torre en Gaceta Literaria (1927) y el giro geopolítico hacia Madrid.',
    tags: ['Geopolítica', 'Vanguardia', 'Madrid'],
    type: 'Article'
  },
  {
    id: 'pp-5',
    title: 'Herramientas digitales para la visualización de redes (tutorial)',
    date: '26 April 2016',
    author: 'teresa.herzgsell',
    abstract: 'Guía práctica para el uso de herramientas de análisis de redes en el estudio de revistas culturales.',
    tags: ['Tutorial', 'Redes', 'Visualización'],
    type: 'Tutorial'
  },
  {
    id: 'pp-6',
    title: 'Zeitschriften als Netzwerke und ihre digitale Visualisierung',
    date: '11 March 2016',
    author: 'teresa.herzgsell',
    abstract: 'The way we read reviews and little magazines in the humanities is changing, due to new methods of quantitative data analysis.',
    tags: ['Network', 'Methodology', 'German'],
    type: 'Article'
  },
  {
    id: 'pp-7',
    title: 'Almacenes de un tiempo en fuga: Revistas culturales en la modernidad hispánica',
    date: '12 March 2014',
    author: 'administrator',
    abstract: 'Libro en línea resultado del coloquio internacional en Augsburg (2013). Inaugura la red colaborativa Revistas 2.0.',
    tags: ['Book', 'Coloquio', 'Modernidad'],
    type: 'Book'
  }
];

export const MOCK_BIBLIOGRAPHY: BibliographyItem[] = [
  { id: 'b1', type: 'Sekundärliteratur', title: 'Estrategias vanguardistas: para un estudio de la literatura nueva en Aragón, 1925-1945', year: '1990', author: 'Serrano Asenjo, José Enrique', culturalArea: 'Península ibérica' },
  { id: 'b2', type: 'Sekundärliteratur', title: 'La revue chilienne Mandrágora, 1938-1943: naissance d’une polémique autour de “manifestes”', year: '1998', author: 'Lalisse-Delcourt, Nathalie', culturalArea: 'Hispanoamérica' },
  { id: 'b3', type: 'Sekundärliteratur', title: '"La República de las Letras" (1905 y 1907): un ejemplo de recepción, afinidad estética y deserción traductora', year: '2001', author: 'Ruiz Casanova, José Francisco', editor: 'Luis Pegenaute', culturalArea: 'Hispanoamérica', place: 'Barcelona' },
  { id: 'b4', type: 'Sekundärliteratur', title: '"Las revistas culturales como documentos de la historia latinoamericana"', year: '2003', author: 'Beigel, Fernanda', culturalArea: 'Hispanoamérica', place: 'Maracaibo' },
  { id: 'b5', type: 'Sekundärliteratur', title: '1616 English and Spanish Poetry. Una revista de Manuel Altaguirre y Concha Méndez', year: '2005', author: 'Osuna, Rafael', editor: 'Ramos Ortega, Manuel', culturalArea: 'Iberische Halbinsel' },
  { id: 'b6', type: 'Sekundärliteratur', title: '1927. Revista de Avance', year: '1973', author: 'Marinello Vidaurreta, Juan', culturalArea: 'Karibik' },
  { id: 'b7', type: 'Sekundärliteratur', title: '24 años', year: '1935', author: 'Vasconcelos, Ramón', culturalArea: 'Karibik' },
  { id: 'b8', type: 'Sekundärliteratur', title: '50 años de la Revista de Avance', year: '1978', author: 'Museo Nacional', culturalArea: 'Hispanoamérica', place: 'La Habana' },
  { id: 'b9', type: 'Zeitschrift', title: 'A la Nueva Ventura', year: '1934', author: 'Francisco Pino, José María Luelmo (funds.)', culturalArea: 'Península ibérica', place: 'Valladolid' },
  { id: 'b10', type: 'Sekundärliteratur', title: 'A manera de prólogo', year: '1966', author: 'Sariol, Juan Francisco', culturalArea: 'Karibik', place: 'Manzanillo' },
  { id: 'b11', type: 'Zeitschrift', title: 'A patir de cero', year: '1951-1953; 1956', author: 'Enrique Molina', culturalArea: 'Hispanoamérica', place: 'Buenos Aires' },
  { id: 'b12', type: 'Zeitschrift', title: 'ABC. Revista semanal de literatura amena y variada', year: '1914-', author: 'Edmundo Montagne', culturalArea: 'Hispanoamérica', place: 'Buenos Aires' },
  { id: 'b13', type: 'Zeitschrift', title: 'ABCDario. Hojas de letra, arte, crítica', year: '1929-1930', author: 'José Varallanos', culturalArea: 'Hispanoamérica', place: 'Lima' },
  { id: 'b14', type: 'Zeitschrift', title: 'Abside. Revista de cultura mexicana', year: '1937-1979', author: 'Gabriel Méndez Plancarte', culturalArea: 'Hispanoamérica', place: 'México' },
  { id: 'b15', type: 'Zeitschrift', title: 'Acción. Diario de Purificación Nacional', year: '1925', author: 'Vicente García-Huidobro', culturalArea: 'Hispanoamérica', place: 'Santiago de Chile' },
  { id: 'b16', type: 'Zeitschrift', title: 'Acronal', year: '1929-1930', author: 'Pablo Garrido', culturalArea: 'Hispanoamérica', place: 'Antofagasta' },
  { id: 'b17', type: 'Zeitschrift', title: 'Amauta', year: '1926-1930', author: 'José Carlos Mariátegui', culturalArea: 'Hispanoamérica', place: 'Lima' },
  { id: 'b18', type: 'Zeitschrift', title: 'Alfar', year: '1923-1955', author: 'Julio C. Casal', culturalArea: 'Transatlántico', place: 'La Coruña / Montevideo' }
];

export const MOCK_MAGAZINES: Magazine[] = [
  {
    id: '1',
    title: 'Revista de Avance',
    country: 'Cuba',
    city: 'La Habana',
    year: 1927,
    yearEnd: 1930,
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Revista_de_avance.jpg/400px-Revista_de_avance.jpg',
    description: {
      es: 'Órgano de la vanguardia literaria cubana, clave en la definición del modernismo en el Caribe y la identidad afrocubana. Publicada por el Grupo Minorista.',
      en: 'Organ of the Cuban literary vanguard, key in defining modernism in the Caribbean and Afro-Cuban identity. Published by the Grupo Minorista.',
      de: 'Organ der kubanischen literarischen Avantgarde, schlüssig für die Definition des Modernismus in der Karibik und der afrokubanischen Identität. Herausgegeben von der Grupo Minorista.'
    },
    topics: ['Vanguardia', 'Literatura', 'Política', 'Afrocubanismo'],
    publisher: 'Grupo Minorista',
    pageCount: 34
  },
  {
    id: '2',
    title: 'Amauta',
    country: 'Perú',
    city: 'Lima',
    year: 1926,
    yearEnd: 1930,
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Amauta_revista.jpg',
    description: {
      es: 'Fundada por José Carlos Mariátegui. "Doctrina, arte, literatura, polémica". Analizó la realidad peruana desde el indigenismo y el socialismo. Una red continental.',
      en: 'Founded by José Carlos Mariátegui. "Doctrine, art, literature, polemics". Analyzed Peruvian reality from the perspectives of Indigenismo and socialism. A continental network.',
      de: 'Gegründet von José Carlos Mariátegui. "Doktrin, Kunst, Literatur, Polemik". Analysierte die peruanische Realität aus Sicht des Indigenismus und Sozialismus. Ein kontinentales Netzwerk.'
    },
    topics: ['Indigenismo', 'Socialismo', 'Arte', 'Política'],
    publisher: 'Sociedad Editora Amauta',
    pageCount: 42
  },
  {
    id: '3',
    title: 'Sur',
    country: 'Argentina',
    city: 'Buenos Aires',
    year: 1931,
    yearEnd: 1970, 
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Revista_Sur_1.jpg',
    description: {
      es: 'Fundada por Victoria Ocampo. Fue el puente cultural fundamental entre América y Europa durante décadas, introduciendo autores como Camus, Nabokov y Sartre.',
      en: 'Founded by Victoria Ocampo. It was the fundamental cultural bridge between America and Europe for decades, introducing authors like Camus, Nabokov, and Sartre.',
      de: 'Gegründet von Victoria Ocampo. Sie war über Jahrzehnte die grundlegende kulturelle Brücke zwischen Amerika und Europa und führte Autoren wie Camus, Nabokov und Sartre ein.'
    },
    topics: ['Literatura', 'Ensayo', 'Traducción', 'Filosofía'],
    publisher: 'Editorial Sur',
    pageCount: 80
  },
  {
    id: '4',
    title: 'Klaxon',
    country: 'Brasil',
    city: 'São Paulo',
    year: 1922,
    yearEnd: 1923,
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Klaxon_1.jpg/400px-Klaxon_1.jpg',
    description: {
      es: 'Mensario de Arte Moderna. Primera revista del modernismo brasileño, nacida tras la Semana de Arte Moderna. Rompió radicalmente con el parnasianismo.',
      en: 'Monthly of Modern Art. First magazine of Brazilian modernism, born after the Week of Modern Art. Radically broke with Parnassianism.',
      de: 'Monatsheft für Moderne Kunst. Erste Zeitschrift des brasilianischen Modernismus, entstanden nach der Woche der Modernen Kunst. Brach radikal mit dem Parnassiens.'
    },
    topics: ['Modernismo', 'Poesía', 'Artes Visuales', 'Antropofagia'],
    publisher: 'Grupo Klaxon',
    pageCount: 28
  },
  {
    id: '5',
    title: 'Martín Fierro',
    country: 'Argentina',
    city: 'Buenos Aires',
    year: 1924,
    yearEnd: 1927,
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Mart%C3%ADn_Fierro_%28revista%29.jpg',
    description: {
      es: 'Periódico quincenal de arte y crítica libre. La voz de la vanguardia argentina y el grupo Florida. Introdujo el ultraísmo y polemizó con el grupo de Boedo.',
      en: 'Fortnightly newspaper of free art and criticism. The voice of the Argentine avant-garde and the Florida group. Introduced Ultraism and polemicized with the Boedo group.',
      de: 'Vierzehntägige Zeitung für freie Kunst und Kritik. Die Stimme der argentinischen Avantgarde und der Florida-Gruppe. Führte den Ultraismus ein und polemisierte mit der Boedo-Gruppe.'
    },
    topics: ['Vanguardia', 'Crítica', 'Poesía', 'Ultraísmo'],
    publisher: 'Evar Méndez',
    pageCount: 16
  },
  {
    id: '6',
    title: 'Contemporáneos',
    country: 'México',
    city: 'Ciudad de México',
    year: 1928,
    yearEnd: 1931,
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Contemporaneos_Revista.jpg',
    description: {
      es: 'Revista mexicana de cultura, expresión de un grupo de jóvenes intelectuales cosmopolitas ("Los Contemporáneos") que modernizaron la literatura nacional.',
      en: 'Mexican culture magazine, expression of a group of young cosmopolitan intellectuals ("Los Contemporáneos") who modernized national literature.',
      de: 'Mexikanische Kulturzeitschrift, Ausdruck einer Gruppe junger kosmopolitischer Intellektueller ("Los Contemporáneos"), die die nationale Literatur modernisierten.'
    },
    topics: ['Teatro', 'Poesía', 'Cine', 'Traducción'],
    publisher: 'Jaime Torres Bodet',
    pageCount: 48
  },
  {
    id: '7',
    title: 'Repertorio Americano',
    country: 'Costa Rica',
    city: 'San José',
    year: 1919,
    yearEnd: 1958,
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Repertorio_Americano.jpg/300px-Repertorio_Americano.jpg',
    description: {
      es: 'Fundada por Joaquín García Monge. Un foro continental de debate político y literario. Publicó a Gabriela Mistral, Haya de la Torre y Pablo Neruda.',
      en: 'Founded by Joaquín García Monge. A continental forum for political and literary debate. Published Gabriela Mistral, Haya de la Torre, and Pablo Neruda.',
      de: 'Gegründet von Joaquín García Monge. Ein kontinentales Forum für politische und literarische Debatten. Veröffentlichte Gabriela Mistral, Haya de la Torre und Pablo Neruda.'
    },
    topics: ['Antiimperialismo', 'Educación', 'Política', 'Humanismo'],
    publisher: 'Joaquín García Monge',
    pageCount: 32
  },
  {
    id: '8',
    title: 'Proa',
    country: 'Argentina',
    city: 'Buenos Aires',
    year: 1924,
    yearEnd: 1926,
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Revista_Proa_1924.jpg',
    description: {
      es: 'Segunda época. Fundada por Ricardo Güiraldes, Jorge Luis Borges, Pablo Rojas Paz y Alfredo Brandán Caraffa. Foco en la renovación literaria.',
      en: 'Second epoch. Founded by Ricardo Güiraldes, Jorge Luis Borges, Pablo Rojas Paz, and Alfredo Brandán Caraffa. Focus on literary renewal.',
      de: 'Zweite Epoche. Gegründet von Ricardo Güiraldes, Jorge Luis Borges, Pablo Rojas Paz und Alfredo Brandán Caraffa. Fokus auf literarische Erneuerung.'
    },
    topics: ['Ultraísmo', 'Literatura', 'Argentina'],
    publisher: 'Editorial Proa',
    pageCount: 24
  },
  {
    id: '9',
    title: 'Ulises',
    country: 'México',
    city: 'Ciudad de México',
    year: 1927,
    yearEnd: 1928,
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Ulises_Revista_de_Curiosidad_y_Cr%C3%ADtica.jpg',
    description: {
      es: 'Revista de curiosidad y crítica. Precursora del grupo Contemporáneos, dirigida por Salvador Novo y Xavier Villaurrutia.',
      en: 'Magazine of curiosity and criticism. Precursor to the Contemporáneos group, directed by Salvador Novo and Xavier Villaurrutia.',
      de: 'Zeitschrift für Neugier und Kritik. Vorläufer der Gruppe Contemporáneos, geleitet von Salvador Novo und Xavier Villaurrutia.'
    },
    topics: ['Vanguardia', 'Teatro', 'Ensayo'],
    publisher: 'Ediciones Ulises',
    pageCount: 20
  },
  {
    id: '10',
    title: 'Boletín Titikaka',
    country: 'Perú',
    city: 'Puno',
    year: 1926,
    yearEnd: 1930,
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Boletin_titikaka.jpg',
    description: {
      es: 'La voz del indigenismo desde el altiplano. Dirigida por Gamaliel Churata, conectó la vanguardia estética con la reivindicación de la cultura andina.',
      en: 'The voice of Indigenismo from the Altiplano. Directed by Gamaliel Churata, it connected aesthetic avant-garde with the vindication of Andean culture.',
      de: 'Die Stimme des Indigenismus aus dem Altiplano. Geleitet von Gamaliel Churata, verband sie ästhetische Avantgarde mit der Verteidigung der andinen Kultur.'
    },
    topics: ['Indigenismo', 'Vanguardia Andina', 'Pedagogía'],
    publisher: 'Grupo Orkopata',
    pageCount: 12
  },
  {
    id: '11',
    title: 'Revista de Occidente',
    country: 'España',
    city: 'Madrid',
    year: 1923,
    yearEnd: 1936,
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Revista_de_Occidente_%281923%29.jpg',
    description: {
      es: 'Fundada por José Ortega y Gasset. Principal vehículo de la modernidad filosófica y científica europea en el mundo hispano.',
      en: 'Founded by José Ortega y Gasset. Main vehicle for European philosophical and scientific modernity in the Hispanic world.',
      de: 'Gegründet von José Ortega y Gasset. Hauptvehikel der europäischen philosophischen und wissenschaftlichen Moderne in der spanischsprachigen Welt.'
    },
    topics: ['Filosofía', 'Ciencia', 'Ensayo', 'Europeísmo'],
    publisher: 'Ortega y Gasset',
    pageCount: 120
  },
  {
    id: '12',
    title: 'Gaceta de Arte',
    country: 'España',
    city: 'Tenerife',
    year: 1932,
    yearEnd: 1936,
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Gaceta_de_Arte.jpg',
    description: {
      es: 'Una de las revistas más importantes de la vanguardia internacional, editada en Canarias. Conectó el surrealismo francés con España.',
      en: 'One of the most important magazines of the international avant-garde, edited in the Canary Islands. Connected French Surrealism with Spain.',
      de: 'Eine der wichtigsten Zeitschriften der internationalen Avantgarde, herausgegeben auf den Kanaren. Verband den französischen Surrealismus mit Spanien.'
    },
    topics: ['Surrealismo', 'Arquitectura', 'Cine', 'Vanguardia'],
    publisher: 'Eduardo Westerdahl',
    pageCount: 40
  },
  {
    id: '13',
    title: 'Válvula',
    country: 'Venezuela',
    city: 'Caracas',
    year: 1928,
    yearEnd: 1928,
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Valvula_revista.jpg',
    description: {
      es: 'Revista única que marcó la entrada de la vanguardia en Venezuela. Solo tuvo un número, pero su manifiesto "Somos" definió una generación.',
      en: 'Unique magazine that marked the entry of the avant-garde in Venezuela. Only had one issue, but its manifesto "Somos" defined a generation.',
      de: 'Einzigartige Zeitschrift, die den Einzug der Avantgarde in Venezuela markierte. Hatte nur eine Ausgabe, aber ihr Manifest "Somos" definierte eine Generation.'
    },
    topics: ['Vanguardia', 'Manifiesto', 'Poesía'],
    publisher: 'Arturo Uslar Pietri',
    pageCount: 36
  },
  {
    id: '14',
    title: 'Alfar',
    country: 'Uruguay',
    city: 'Montevideo',
    year: 1923,
    yearEnd: 1955,
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Alfar_revista.jpg',
    description: {
      es: 'Revista transatlántica iniciada en España (A Coruña) y continuada en Montevideo. Puente vital entre el ultraísmo gallego y la vanguardia del Río de la Plata.',
      en: 'Transatlantic magazine started in Spain (A Coruña) and continued in Montevideo. Vital bridge between Galician Ultraism and the Rio de la Plata avant-garde.',
      de: 'Transatlantische Zeitschrift, begonnen in Spanien (A Coruña) und fortgesetzt in Montevideo. Wichtige Brücke zwischen dem galizischen Ultraismus und der Avantgarde am Rio de la Plata.'
    },
    topics: ['Transatlántico', 'Ultraísmo', 'Poesía'],
    publisher: 'Julio J. Casal',
    pageCount: 64
  },
  {
    id: '15',
    title: 'Horizonte',
    country: 'México',
    city: 'Xalapa',
    year: 1926,
    yearEnd: 1927,
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Horizonte_revista_mexicana.jpg',
    description: {
      es: 'Revista estridentista dirigida por Germán List Arzubide. Combinó la vanguardia estética con el compromiso social de la Revolución Mexicana.',
      en: 'Estridentista magazine directed by Germán List Arzubide. Combined aesthetic avant-garde with the social commitment of the Mexican Revolution.',
      de: 'Estridentistische Zeitschrift unter der Leitung von Germán List Arzubide. Verband ästhetische Avantgarde mit dem sozialen Engagement der Mexikanischen Revolution.'
    },
    topics: ['Estridentismo', 'Revolución', 'Vanguardia'],
    publisher: 'Germán List Arzubide',
    pageCount: 24
  },
  {
    id: '16',
    title: 'Orígenes',
    country: 'Cuba',
    city: 'La Habana',
    year: 1944,
    yearEnd: 1956,
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Revista_Origenes.jpg/300px-Revista_Origenes.jpg',
    description: {
      es: 'Dirigida por José Lezama Lima y José Rodríguez Feo. Cima de la poesía trascendentalista y la resistencia cultural cubana.',
      en: 'Directed by José Lezama Lima and José Rodríguez Feo. Pinnacle of transcendentalist poetry and Cuban cultural resistance.',
      de: 'Geleitet von José Lezama Lima und José Rodríguez Feo. Gipfel der transzendentalistischen Poesie und des kubanischen kulturellen Widerstands.'
    },
    topics: ['Poesía', 'Estética', 'Catolicismo', 'Barroco'],
    publisher: 'José Lezama Lima',
    pageCount: 60
  },
  {
    id: '17',
    title: 'Mito',
    country: 'Colombia',
    city: 'Bogotá',
    year: 1955,
    yearEnd: 1962,
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Revista_Mito.jpg',
    description: {
      es: 'Fundada por Jorge Gaitán Durán. Modernizó la cultura colombiana tratando temas tabú como el erotismo y la crítica política radical.',
      en: 'Founded by Jorge Gaitán Durán. Modernized Colombian culture by addressing taboo subjects such as eroticism and radical political criticism.',
      de: 'Gegründet von Jorge Gaitán Durán. Modernisierte die kolumbianische Kultur, indem sie Tabuthemen wie Erotik und radikale politische Kritik behandelte.'
    },
    topics: ['Política', 'Erotismo', 'Modernidad', 'Crítica'],
    publisher: 'Jorge Gaitán Durán',
    pageCount: 55
  },
  {
    id: '18',
    title: 'Claridad',
    country: 'Argentina',
    city: 'Buenos Aires',
    year: 1926,
    yearEnd: 1941,
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Revista_Claridad_tapa.jpg',
    description: {
      es: 'Órgano del Grupo de Boedo. Revista de arte y crítica social, orientada a la clase trabajadora y al realismo literario.',
      en: 'Organ of the Boedo Group. Art and social criticism magazine, oriented towards the working class and literary realism.',
      de: 'Organ der Boedo-Gruppe. Zeitschrift für Kunst und Sozialkritik, orientiert an der Arbeiterklasse und dem literarischen Realismus.'
    },
    topics: ['Realismo Social', 'Izquierda', 'Boedo', 'Literatura'],
    publisher: 'Antonio Zamora',
    pageCount: 32
  },
  {
    id: '19',
    title: 'El Hijo Pródigo',
    country: 'México',
    city: 'Ciudad de México',
    year: 1943,
    yearEnd: 1946,
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/El_Hijo_Prodigo_Revista.jpg',
    description: {
      es: 'Fundada por Octavio Paz y Xavier Villaurrutia. Puente entre el surrealismo y la literatura mexicana de medio siglo.',
      en: 'Founded by Octavio Paz and Xavier Villaurrutia. Bridge between Surrealism and mid-century Mexican literature.',
      de: 'Gegründet von Octavio Paz und Xavier Villaurrutia. Brücke zwischen Surrealismus und der mexikanischen Literatur der Jahrhundertmitte.'
    },
    topics: ['Surrealismo', 'Literatura', 'Ensayo'],
    publisher: 'Octavio Paz',
    pageCount: 45
  },
  {
    id: '20',
    title: 'Caballo de Fuego',
    country: 'Chile',
    city: 'Santiago',
    year: 1945,
    yearEnd: 1950,
    coverUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Caballo_de_Fuego_Revista.jpg',
    description: {
      es: 'Revista de poesía dirigida por el poeta chileno Antonio de Undurraga. Importante por sus conexiones con la vanguardia hispanoamericana tardía.',
      en: 'Poetry magazine directed by Chilean poet Antonio de Undurraga. Important for its connections with the late Hispanic American avant-garde.',
      de: 'Poesiezeitschrift unter der Leitung des chilenischen Dichters Antonio de Undurraga. Wichtig für ihre Verbindungen zur späten hispanoamerikanischen Avantgarde.'
    },
    topics: ['Poesía', 'Vanguardia Tardía', 'Chile'],
    publisher: 'Antonio de Undurraga',
    pageCount: 28
  }
];

export const MOCK_GRAPH_DATA: GraphData = {
  nodes: [
    { id: 'Avance', group: 1, label: 'Revista de Avance' },
    { id: 'Amauta', group: 1, label: 'Amauta' },
    { id: 'Sur', group: 1, label: 'Sur' },
    { id: 'Klaxon', group: 1, label: 'Klaxon' },
    { id: 'MF', group: 1, label: 'Martín Fierro' },
    { id: 'Contemporaneos', group: 1, label: 'Contemporáneos' },
    { id: 'Titikaka', group: 1, label: 'Boletín Titikaka' },
    { id: 'Repertorio', group: 1, label: 'Repertorio Americano' },
    { id: 'Occidente', group: 1, label: 'Revista de Occidente' },
    { id: 'Gaceta', group: 1, label: 'Gaceta de Arte' },
    { id: 'Alfar', group: 1, label: 'Alfar' },
    { id: 'Origenes', group: 1, label: 'Orígenes' },
    { id: 'Mito', group: 1, label: 'Mito' },
    { id: 'Claridad', group: 1, label: 'Claridad' },
    { id: 'HijoProdigo', group: 1, label: 'El Hijo Pródigo' },
    
    { id: 'Mariategui', group: 2, label: 'J.C. Mariátegui' },
    { id: 'Ocampo', group: 2, label: 'Victoria Ocampo' },
    { id: 'Borges', group: 2, label: 'J.L. Borges' },
    { id: 'Carpentier', group: 2, label: 'Alejo Carpentier' },
    { id: 'Churata', group: 2, label: 'Gamaliel Churata' },
    { id: 'Ortega', group: 2, label: 'Ortega y Gasset' },
    { id: 'Westerdahl', group: 2, label: 'Eduardo Westerdahl' },
    { id: 'Casal', group: 2, label: 'Julio J. Casal' },
    { id: 'GarciaMonge', group: 2, label: 'García Monge' },
    { id: 'Lezama', group: 2, label: 'Lezama Lima' },
    { id: 'Paz', group: 2, label: 'Octavio Paz' },
    { id: 'Gaitan', group: 2, label: 'Gaitán Durán' },
    
    { id: 'Vanguardia', group: 3, label: 'Vanguardia' },
    { id: 'Indigenismo', group: 3, label: 'Indigenismo' },
    { id: 'Surrealismo', group: 3, label: 'Surrealismo' },
    { id: 'Filosofia', group: 3, label: 'Filosofía' },
    { id: 'Realismo', group: 3, label: 'Realismo Social' },
    { id: 'Barroco', group: 3, label: 'Neobarroco' }
  ],
  links: [
    { source: 'Amauta', target: 'Mariategui', value: 5 },
    { source: 'Amauta', target: 'Indigenismo', value: 5 },
    { source: 'Amauta', target: 'Titikaka', value: 3 }, 
    { source: 'Amauta', target: 'Repertorio', value: 2 },
    { source: 'Titikaka', target: 'Churata', value: 5 },
    { source: 'Titikaka', target: 'Indigenismo', value: 4 },
    
    { source: 'Sur', target: 'Ocampo', value: 5 },
    { source: 'Sur', target: 'Borges', value: 4 },
    { source: 'Sur', target: 'Occidente', value: 3 },
    { source: 'Sur', target: 'Origenes', value: 2 }, // Connection between Ocampo and Lezama circles
    
    { source: 'MF', target: 'Borges', value: 3 },
    { source: 'MF', target: 'Vanguardia', value: 3 },
    
    { source: 'Avance', target: 'Carpentier', value: 4 },
    { source: 'Avance', target: 'Vanguardia', value: 3 },
    
    { source: 'Occidente', target: 'Ortega', value: 5 },
    { source: 'Occidente', target: 'Filosofia', value: 4 },
    
    { source: 'Gaceta', target: 'Westerdahl', value: 5 },
    { source: 'Gaceta', target: 'Surrealismo', value: 5 },
    
    { source: 'Alfar', target: 'Casal', value: 5 },
    { source: 'Alfar', target: 'Vanguardia', value: 3 },
    { source: 'Alfar', target: 'MF', value: 2 },
    
    { source: 'Origenes', target: 'Lezama', value: 5 },
    { source: 'Origenes', target: 'Barroco', value: 4 },
    
    { source: 'Mito', target: 'Gaitan', value: 5 },
    { source: 'Mito', target: 'Filosofia', value: 3 },
    
    { source: 'Claridad', target: 'Realismo', value: 5 },
    { source: 'Claridad', target: 'MF', value: 1 }, // Rivalry link
    
    { source: 'HijoProdigo', target: 'Paz', value: 5 },
    { source: 'HijoProdigo', target: 'Surrealismo', value: 3 },
    { source: 'HijoProdigo', target: 'Contemporaneos', value: 3 }
  ]
};