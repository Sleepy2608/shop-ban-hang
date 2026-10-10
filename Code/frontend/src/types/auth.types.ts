export interface User {
  id?: number;
  email: string;
  fullName: string;
  role: 'USER' | 'ADMIN' | string;
  phone?: string;
  address?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string | null;
  email: string;
  fullName: string;
  role: string;
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string>;
}

export interface CurrentUserPrincipal {
  username?: string;
  authorities?: Array<{ authority: string }>;
  [key: string]: unknown;
}

