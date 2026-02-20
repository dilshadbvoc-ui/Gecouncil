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
