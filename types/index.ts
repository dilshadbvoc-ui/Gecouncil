// Common types for the application

export interface Program {
  id: number;
  name: string;
  university: string;
  country: string;
  duration: string;
  tuition: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
