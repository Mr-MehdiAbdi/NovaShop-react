import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dummyjson.com';
const REQUEST_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 15000;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

function getAccessToken() {
  return localStorage.getItem('token');
}

function normalizeAxiosError(error) {
  const isTimeout = error.code === 'ECONNABORTED';
  const hasResponse = Boolean(error.response);

  return {
    message: hasResponse
      ? error.response.data?.message || error.message || 'Request failed'
      : 'Network error. Check your internet connection.',
    status: error.response?.status || null,
    data: error.response?.data || null,
    url: error.config?.url || null,
    method: error.config?.method || null,
    isNetworkError: !hasResponse,
    isTimeout,
    originalError: error,
  };
}

// Request interceptor: inject auth token and keep one place for future headers.
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: return response as-is, but normalize errors once.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = normalizeAxiosError(error);

    if (import.meta.env.DEV) {
      console.error('[API Error]', normalizedError);
    }

    return Promise.reject(normalizedError);
  }
);

export async function apiRequest(config) {
  const response = await api(config);
  return response.data;
}

export function apiGet(url, config = {}) {
  return apiRequest({ method: 'get', url, ...config });
}

export function apiPost(url, data = {}, config = {}) {
  return apiRequest({ method: 'post', url, data, ...config });
}

export function apiPut(url, data = {}, config = {}) {
  return apiRequest({ method: 'put', url, data, ...config });
}

export function apiPatch(url, data = {}, config = {}) {
  return apiRequest({ method: 'patch', url, data, ...config });
}

export function apiDelete(url, config = {}) {
  return apiRequest({ method: 'delete', url, ...config });
}

export default api;
