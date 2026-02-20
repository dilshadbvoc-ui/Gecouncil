import { University, Director, PageGallery, Enquiry } from '@/types/admin';

// In-memory data store (in production, use a real database)
let universities: University[] = [
  {
    id: '1',
    name: 'University of Amsterdam',
    country: 'Netherlands',
    location: 'Amsterdam',
    programs: 120,
    rating: 4.8,
    image: '🇳🇱',
    description: 'Leading research university with strong international focus',
    established: 1632,
    students: 31000,
    website: 'https://www.uva.nl',
    details: 'The University of Amsterdam is a public research university located in Amsterdam, Netherlands.',
    keyPersons: [],
    gallery: []
  },
  {
    id: '2',
    name: 'Technical University of Munich',
    country: 'Germany',
    location: 'Munich',
    programs: 95,
    rating: 4.9,
    image: '🇩🇪',
    description: 'Top-ranked technical university in Europe',
    established: 1868,
    students: 45000,
    website: 'https://www.tum.de',
    details: 'TUM is one of Europe\'s leading universities, focusing on engineering, technology, medicine, and applied sciences.',
    keyPersons: [],
    gallery: []
  },
  {
    id: '3',
    name: 'University of Edinburgh',
    country: 'UK',
    location: 'Edinburgh',
    programs: 150,
    rating: 4.7,
    image: '🇬🇧',
    description: 'Historic university with world-class research facilities',
    established: 1583,
    students: 35000,
    website: 'https://www.ed.ac.uk',
    details: 'The University of Edinburgh is one of the world\'s top universities, consistently ranked in the world top 50.',
    keyPersons: [],
    gallery: []
  }
];

let directors: Director[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    position: 'Chairman & CEO',
    image: '/images/directors/director1.jpg',
    bio: 'Leading education expert with 25+ years of experience',
    order: 1
  },
  {
    id: '2',
    name: 'Prof. Sarah Williams',
    position: 'Director of International Relations',
    image: '/images/directors/director2.jpg',
    bio: 'Former university administrator with global partnerships expertise',
    order: 2
  },
  {
    id: '3',
    name: 'Dr. Amit Patel',
    position: 'Chief Academic Officer',
    image: '/images/directors/director3.jpg',
    bio: 'PhD in Education Policy, 20+ years in academic leadership',
    order: 3
  },
  {
    id: '4',
    name: 'Ms. Priya Sharma',
    position: 'Director of Operations',
    image: '/images/directors/director4.jpg',
    bio: 'MBA from Harvard, expert in educational operations',
    order: 4
  },
  {
    id: '5',
    name: 'Dr. Michael Chen',
    position: 'Director of Quality Assurance',
    image: '/images/directors/director5.jpg',
    bio: 'International education quality standards specialist',
    order: 5
  },
  {
    id: '6',
    name: 'Prof. Anita Desai',
    position: 'Director of Student Services',
    image: '/images/directors/director6.jpg',
    bio: 'Dedicated to student success and welfare',
    order: 6
  }
];

// Universities CRUD
export const getUniversities = (): University[] => universities;

export const getUniversityById = (id: string): University | undefined => {
  return universities.find(u => u.id === id);
};

export const createUniversity = (university: Omit<University, 'id'>): University => {
  const newUniversity: University = {
    ...university,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  universities.push(newUniversity);
  return newUniversity;
};

export const updateUniversity = (id: string, data: Partial<University>): University | null => {
  const index = universities.findIndex(u => u.id === id);
  if (index === -1) return null;
  
  universities[index] = {
    ...universities[index],
    ...data,
    updatedAt: new Date()
  };
  return universities[index];
};

export const deleteUniversity = (id: string): boolean => {
  const index = universities.findIndex(u => u.id === id);
  if (index === -1) return false;
  
  universities.splice(index, 1);
  return true;
};

// Directors CRUD
export const getDirectors = (): Director[] => directors.sort((a, b) => a.order - b.order);

export const getDirectorById = (id: string): Director | undefined => {
  return directors.find(d => d.id === id);
};

export const createDirector = (director: Omit<Director, 'id'>): Director => {
  const newDirector: Director = {
    ...director,
    id: Date.now().toString()
  };
  directors.push(newDirector);
  return newDirector;
};

export const updateDirector = (id: string, data: Partial<Director>): Director | null => {
  const index = directors.findIndex(d => d.id === id);
  if (index === -1) return null;
  
  directors[index] = {
    ...directors[index],
    ...data
  };
  return directors[index];
};

export const deleteDirector = (id: string): boolean => {
  const index = directors.findIndex(d => d.id === id);
  if (index === -1) return false;
  
  directors.splice(index, 1);
  return true;
};


// Page Galleries
let pageGalleries: PageGallery[] = [
  {
    id: '1',
    page: 'universities',
    title: 'Campus Life',
    description: 'Experience world-class campus facilities',
    image: '/images/hero_campus.jpg',
    order: 1
  },
  {
    id: '2',
    page: 'programs',
    title: 'Academic Excellence',
    description: 'Diverse programs across all disciplines',
    image: '/images/feature_planning_student.jpg',
    order: 1
  },
  {
    id: '3',
    page: 'about',
    title: 'Our Community',
    description: 'Building bridges between cultures',
    image: '/images/feature_community_group.jpg',
    order: 1
  },
  {
    id: '4',
    page: 'contact',
    title: 'Get Support',
    description: 'We are here to help you succeed',
    image: '/images/feature_counseling_student.jpg',
    order: 1
  }
];

// Page Galleries CRUD
export const getPageGalleries = (page?: string): PageGallery[] => {
  if (page) {
    return pageGalleries.filter(g => g.page === page).sort((a, b) => a.order - b.order);
  }
  return pageGalleries.sort((a, b) => a.order - b.order);
};

export const getPageGalleryById = (id: string): PageGallery | undefined => {
  return pageGalleries.find(g => g.id === id);
};

export const createPageGallery = (gallery: Omit<PageGallery, 'id'>): PageGallery => {
  const newGallery: PageGallery = {
    ...gallery,
    id: Date.now().toString()
  };
  pageGalleries.push(newGallery);
  return newGallery;
};

export const updatePageGallery = (id: string, data: Partial<PageGallery>): PageGallery | null => {
  const index = pageGalleries.findIndex(g => g.id === id);
  if (index === -1) return null;
  
  pageGalleries[index] = {
    ...pageGalleries[index],
    ...data
  };
  return pageGalleries[index];
};

export const deletePageGallery = (id: string): boolean => {
  const index = pageGalleries.findIndex(g => g.id === id);
  if (index === -1) return false;
  
  pageGalleries.splice(index, 1);
  return true;
};


// Enquiries
let enquiries: Enquiry[] = [];

// Enquiries CRUD
export const getEnquiries = (): Enquiry[] => {
  return enquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getEnquiryById = (id: string): Enquiry | undefined => {
  return enquiries.find(e => e.id === id);
};

export const createEnquiry = (enquiry: Omit<Enquiry, 'id' | 'createdAt'>): Enquiry => {
  const newEnquiry: Enquiry = {
    ...enquiry,
    id: Date.now().toString(),
    createdAt: new Date()
  };
  enquiries.push(newEnquiry);
  return newEnquiry;
};

export const updateEnquiry = (id: string, data: Partial<Enquiry>): Enquiry | null => {
  const index = enquiries.findIndex(e => e.id === id);
  if (index === -1) return null;
  
  enquiries[index] = {
    ...enquiries[index],
    ...data
  };
  return enquiries[index];
};

export const deleteEnquiry = (id: string): boolean => {
  const index = enquiries.findIndex(e => e.id === id);
  if (index === -1) return false;
  
  enquiries.splice(index, 1);
  return true;
};
