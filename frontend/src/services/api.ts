const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export type TicketData = {
  patientName: string;
  phoneNumber: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  doctorName?: string;
  fees?: number;
  reasonForVisit?: string;
  appointmentType?: 'walk-in' | 'scheduled' | 'emergency' | 'follow-up';
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  dateOfBirth?: string;
  email?: string;
  address?: string;
  previousVisit?: boolean;
  insuranceProvider?: string;
  insuranceNumber?: string;
  notes?: string;
  medicines?: string;
};

export type Ticket = TicketData & {
  _id: string;
  ticketNumber: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
};

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

    // Add authorization header if token exists
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

export const ticketApi = {
  create: (ticketData: TicketData): Promise<ApiResponse<Ticket>> => {
    return request<Ticket>('/tickets', {
      method: 'POST',
      body: JSON.stringify(ticketData),
    });
  },

  getAll: (params?: {
    status?: string;
    date?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<{ data: Ticket[]; pagination: any }>> => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.date) queryParams.append('date', params.date);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const query = queryParams.toString();
    return request(`/tickets${query ? `?${query}` : ''}`);
  },

  getById: (id: string): Promise<ApiResponse<Ticket>> => {
    return request<Ticket>(`/tickets/${id}`);
  },

  updateStatus: (
    id: string,
    status: Ticket['status']
  ): Promise<ApiResponse<Ticket>> => {
    return request<Ticket>(`/tickets/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};

