export type Language = 'es' | 'en' | 'de';

export interface Magazine {
  id: string;
  title: string;
  country: string;
  city: string;
  year: number; // Start year
  yearEnd?: number; // End year (if applicable)
  coverUrl: string;
  description: Record<Language, string>;
  topics: string[];
  publisher: string;
  pageCount: number;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  lang: 'es' | 'en' | 'de' | 'mixed';
  imageUrl?: string;
}

export interface BibliographyItem {
  id: string;
  type: 'Sekundärliteratur' | 'Zeitschrift';
  title: string;
  year: string;
  author: string;
  editor?: string;
  culturalArea: string;
  place?: string;
}

export interface ProjectPublication {
  id: string;
  title: string;
  date: string;
  author: string;
  abstract: string;
  tags: string[];
  type: 'Article' | 'Book' | 'Tutorial';
}

export interface FilterState {
  search: string;
  countries: string[];
  yearRange: [number, number];
  topics: string[];
}

export interface Node {
  id: string;
  group: number;
  label: string;
}

export interface Link {
  source: string;
  target: string;
  value: number;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}