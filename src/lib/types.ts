// src/lib/types.ts

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'superadmin' | 'writer' | 'user';
  avatar: string | null;
  bio: string | null;
  is_active?: boolean;
  posts_count?: number;
  created_at?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  color: string;
  posts_count?: number;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  posts_count?: number;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content?: string;
  featured_image: string | null;
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  reading_time: number;
  views_count: number;
  meta?: Record<string, any>;
  user: User;
  category: Category;
  tags: Tag[];
  comments?: Comment[];
  comments_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: number;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  user: User;
  replies?: Comment[];
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
  links: PaginationLinks;
}

export interface AuthResponse {
  user: User;
  token: string;
  token_type: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface CreatePostData {
  title: string;
  excerpt?: string;
  content: string;
  category_id: number;
  tags?: number[];
  featured_image?: File;
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
}

export interface CreateCommentData {
  content: string;
  parent_id?: number;
}