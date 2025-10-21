// src/lib/api.ts

import axios, { AxiosError } from 'axios';
import type {
  ApiResponse,
  PaginatedResponse,
  Post,
  Category,
  Tag,
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
  CreatePostData,
  CreateCommentData,
  Comment,
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Créer une instance Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Intercepteur pour ajouter le token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token invalide ou expiré
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== AUTHENTICATION ====================

export const authApi = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/register', data);
    return response.data.data;
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/login', credentials);
    return response.data.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/logout');
  },

  getUser: async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>('/user');
    return response.data.data;
  },
};

// ==================== POSTS ====================

export const postsApi = {
  getAll: async (params?: {
    page?: number;
    per_page?: number;
    search?: string;
    category?: string;
    tag?: string;
  }): Promise<PaginatedResponse<Post>> => {
    const response = await api.get<PaginatedResponse<Post>>('/posts', { params });
    return response.data;
  },

  getBySlug: async (slug: string): Promise<Post> => {
    const response = await api.get<ApiResponse<Post>>(`/posts/${slug}`);
    return response.data.data;
  },
};

// ==================== CATEGORIES ====================

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get<ApiResponse<Category[]>>('/categories');
    return response.data.data;
  },
};

// ==================== TAGS ====================

export const tagsApi = {
  getAll: async (): Promise<Tag[]> => {
    const response = await api.get<ApiResponse<Tag[]>>('/tags');
    return response.data.data;
  },
};

// ==================== COMMENTS ====================

export const commentsApi = {
  create: async (postId: number, data: CreateCommentData): Promise<Comment> => {
    const response = await api.post<ApiResponse<Comment>>(
      `/posts/${postId}/comments`,
      data
    );
    return response.data.data;
  },
};

// ==================== ADMIN - POSTS ====================

export const adminPostsApi = {
  getAll: async (params?: {
    page?: number;
    per_page?: number;
    status?: 'draft' | 'published' | 'archived';
  }): Promise<PaginatedResponse<Post>> => {
    const response = await api.get<PaginatedResponse<Post>>('/admin/posts', { params });
    return response.data;
  },

  getById: async (id: number): Promise<Post> => {
    const response = await api.get<ApiResponse<Post>>(`/admin/posts/${id}`);
    return response.data.data;
  },

  create: async (data: CreatePostData): Promise<Post> => {
    const formData = new FormData();
    
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('category_id', data.category_id.toString());
    formData.append('status', data.status);
    
    if (data.excerpt) formData.append('excerpt', data.excerpt);
    if (data.published_at) formData.append('published_at', data.published_at);
    if (data.featured_image) formData.append('featured_image', data.featured_image);
    
    if (data.tags) {
      data.tags.forEach((tagId) => {
        formData.append('tags[]', tagId.toString());
      });
    }

    const response = await api.post<ApiResponse<Post>>('/admin/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  update: async (id: number, data: Partial<CreatePostData>): Promise<Post> => {
    const formData = new FormData();
    
    if (data.title) formData.append('title', data.title);
    if (data.content) formData.append('content', data.content);
    if (data.category_id) formData.append('category_id', data.category_id.toString());
    if (data.status) formData.append('status', data.status);
    if (data.excerpt) formData.append('excerpt', data.excerpt);
    if (data.published_at) formData.append('published_at', data.published_at);
    if (data.featured_image) formData.append('featured_image', data.featured_image);
    
    if (data.tags) {
      data.tags.forEach((tagId) => {
        formData.append('tags[]', tagId.toString());
      });
    }

    const response = await api.post<ApiResponse<Post>>(
      `/admin/posts/${id}?_method=PUT`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/admin/posts/${id}`);
  },
};

// ==================== ADMIN - COMMENTS ====================

export const adminCommentsApi = {
  getAll: async (params?: {
    page?: number;
    per_page?: number;
    status?: 'pending' | 'approved' | 'rejected';
  }): Promise<PaginatedResponse<Comment>> => {
    const response = await api.get<PaginatedResponse<Comment>>('/admin/comments', {
      params,
    });
    return response.data;
  },

  approve: async (id: number): Promise<Comment> => {
    const response = await api.put<ApiResponse<Comment>>(
      `/admin/comments/${id}/approve`
    );
    return response.data.data;
  },

  reject: async (id: number): Promise<Comment> => {
    const response = await api.put<ApiResponse<Comment>>(
      `/admin/comments/${id}/reject`
    );
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/admin/comments/${id}`);
  },
};

export default api;