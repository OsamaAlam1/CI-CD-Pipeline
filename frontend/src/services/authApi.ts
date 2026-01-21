const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    token: string;
    user: {
      id: string;
      username: string;
      role: string;
    };
  };
  error?: string;
}

export interface VerifyResponse {
  success: boolean;
  data?: {
    user: {
      id: string;
      username: string;
      role: string;
    };
  };
  error?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

// Store token in localStorage
export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

// Get token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Remove token from localStorage
export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('username');
};

// Login user
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Login failed',
        error: data.error,
      };
    }

    // Store token and user info
    if (data.data?.token) {
      setAuthToken(data.data.token);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', data.data.user.username);
      if (data.data.user.role) {
        localStorage.setItem('role', data.data.user.role);
        localStorage.setItem('userRole', data.data.user.role); // Also store as userRole for consistency
      }
    }

    return {
      success: true,
      message: data.message || 'Login successful',
      data: data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'Network error',
      error: error.message,
    };
  }
};

// Verify token
export const verifyToken = async (): Promise<VerifyResponse> => {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        error: 'No token found',
      };
    }

    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      // Token is invalid, remove it
      removeAuthToken();
      return {
        success: false,
        error: data.message || 'Token verification failed',
      };
    }

    // Update localStorage with user role if available
    if (data.data?.user?.role) {
      localStorage.setItem('role', data.data.user.role);
      localStorage.setItem('userRole', data.data.user.role);
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

// Change password for the currently authenticated user
export const changePassword = async (
  payload: ChangePasswordPayload
): Promise<{ success: boolean; message?: string; error?: string }> => {
  try {
    const token = getAuthToken();

    if (!token) {
      return {
        success: false,
        message: 'Not authenticated',
      };
    }

    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Failed to change password',
        error: data.error,
      };
    }

    return {
      success: true,
      message: data.message || 'Password changed successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'Network error',
      error: error.message,
    };
  }
};

