const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface User {
  _id: string;
  username: string;
  role: 'admin' | 'staff';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserPayload {
  username: string;
  password: string;
  role?: 'admin' | 'staff';
}

export interface UpdateUserPayload {
  role?: 'admin' | 'staff';
  isActive?: boolean;
}

export interface ResetPasswordPayload {
  newPassword: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const token = getAuthToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers,
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Request failed',
        error: data.error,
      };
    }

    return {
      success: true,
      ...data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'Network error',
      error: error.message,
    };
  }
}

export const userApi = {
  // Get all users
  getAll: (): Promise<ApiResponse<User[]>> => {
    return request<User[]>('/users');
  },

  // Create a new user
  create: (userData: CreateUserPayload): Promise<ApiResponse<User>> => {
    return request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Update a user
  update: (userId: string, userData: UpdateUserPayload): Promise<ApiResponse<User>> => {
    return request<User>(`/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(userData),
    });
  },

  // Reset user password (admin only)
  resetPassword: (userId: string, passwordData: ResetPasswordPayload): Promise<ApiResponse<void>> => {
    return request<void>(`/users/${userId}/reset-password`, {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  },
};

