import type { Product, Order, Settings, User } from './types';

const API_BASE = '/api/proxy';

function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const authToken = getAuthToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  
  if (options?.headers) {
    Object.assign(headers, options.headers);
  }
  
  // Add path query param for proxy
  const proxyUrl = url.startsWith('/') ? `${API_BASE}?path=${url.substring(1)}` : `${API_BASE}?path=${url}`;
  
  const response = await fetch(proxyUrl, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const status = response.status;
    const errorText = await response.text().catch(() => '');
    console.error(`API Error ${status}: ${url}`, errorText);
    throw new Error(`API Error: ${status}`);
  }

  const text = await response.text();
  if (!text) return undefined as T;
  return JSON.parse(text);
}

export const authApi = {
  login: async (email: string, password: string) => {
    const data = await fetchApi<{ access_token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.access_token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin_token', data.access_token);
        localStorage.setItem('admin_user', JSON.stringify(data.user));
      }
    }
    return data;
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
    }
  },
  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('admin_user');
    return user ? JSON.parse(user) : null;
  },
  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('admin_token');
  },
};

export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const data = await fetchApi<Product[]>('/products');
    return Array.isArray(data) ? data : [];
  },
  getById: async (id: string): Promise<Product> => {
    return fetchApi<Product>(`/products/${id}`);
  },
  getBySlug: async (slug: string): Promise<Product> => {
    return fetchApi<Product>(`/products/slug/${slug}`);
  },
  create: async (product: Partial<Product>): Promise<Product> => {
    return fetchApi<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  },
  update: async (id: string, product: Partial<Product>): Promise<Product> => {
    return fetchApi<Product>(`/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(product),
    });
  },
  delete: async (id: string): Promise<void> => {
    await fetchApi(`/products/${id}`, { method: 'DELETE' });
  },
};

export const ordersApi = {
  getAll: async (): Promise<Order[]> => {
    const data = await fetchApi<Order[]>('/orders');
    return Array.isArray(data) ? data : [];
  },
  getById: async (id: string): Promise<Order> => {
    return fetchApi<Order>(`/orders/${id}`);
  },
  track: async (orderNumber: string): Promise<Order> => {
    return fetchApi<Order>(`/orders/track/${orderNumber}`);
  },
  create: async (order: Partial<Order>): Promise<Order> => {
    return fetchApi<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  },
  updateStatus: async (id: string, status: string): Promise<Order> => {
    return fetchApi<Order>(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};

export const paymentsApi = {
  getConfig: async (): Promise<Settings> => {
    return fetchApi<Settings>('/payments/config');
  },
  createIntent: async (amount: number, email: string) => {
    return fetchApi<{ clientSecret: string }>('/payments/create-intent', {
      method: 'POST',
      body: JSON.stringify({ amount, email }),
    });
  },
};

export const settingsApi = {
  get: async (): Promise<Settings> => {
    return fetchApi<Settings>('/settings');
  },
  update: async (settings: Partial<Settings>): Promise<Settings> => {
    return fetchApi<Settings>('/settings', {
      method: 'PATCH',
      body: JSON.stringify(settings),
    });
  },
};

export const healthApi = {
  check: async () => {
    return fetchApi<{ status: string; services?: { mongodb: string } }>('/health');
  },
};

export { Product, Order, Settings, User };