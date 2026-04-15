export interface University {
  id: string;
  name: string;
  country: string;
  location: string;
  programs: number;
  rating: number;
  image: string;
  description: string;
  logo?: string;
  website?: string;
  established?: number;
  students?: number;
  faculty?: string[];
  keyPersons?: KeyPerson[];
  gallery?: string[];
  details?: string;
  category?: 'skill' | 'overseas' | 'both';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Program {
  id: string;
  universityId: string;
  universityName?: string;
  title: string;
  degree: string;
  duration: string;
  language: string;
  description: string;
  category: 'skill' | 'overseas' | 'both' | 'recruitment';
  tuitionFee?: string;
  intake?: string;
  // Extended fields
  requirements?: string;
  applicationDeadline?: string;
  scholarships?: string;
  // Recruitment-specific
  countryId?: string;
  countryName?: string;
  salary?: string;
  jobType?: string; // Full-time, Part-time, Contract
  sector?: string;
  visaSponsorship?: boolean;
  createdAt?: Date;
}

export interface Country {
  id: string;
  name: string;
  flag: string;       // emoji flag
  continent: string;
  description: string;
  category: 'overseas' | 'recruitment' | 'both';
  highlights?: string[];  // key facts / selling points
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface KeyPerson {
  id: string;
  name: string;
  position: string;
  image: string;
  bio?: string;
}

export interface Director {
  id: string;
  name: string;
  position: string;
  image: string;
  bio?: string;
  linkedin?: string;
  order: number;
}

export interface PageGallery {
  id: string;
  page: 'universities' | 'programs' | 'about' | 'contact';
  title: string;
  description?: string;
  image: string;
  order: number;
}

export interface Enquiry {
  id: string;
  type: 'partnership' | 'general';
  universityName?: string;
  contactPerson: string;
  email: string;
  phone?: string;
  country?: string;
  message: string;
  status: 'new' | 'in-progress' | 'completed';
  createdAt: Date;
}

export interface AdminUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'editor';
}

export interface Testimonial {
  id: string;
  name: string;
  result: string;   // e.g. "University of Edinburgh — Business"
  quote: string;
  image: string;
  order: number;
  createdAt?: Date;
}

export interface SiteSettings {
  id?: string;
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp?: string;
  address: string;
  city: string;
  country: string;
  logoUrl?: string;
  footerText: string;
  socialLinkedin?: string;
  socialInstagram?: string;
  socialFacebook?: string;
  socialTwitter?: string;
  updatedAt?: Date;
}
