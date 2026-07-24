import axios from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dummyjson.com';

const REQUEST_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 15000;

const TOKEN_KEY = 'token';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function normalizeAxiosError(error) {
  const hasResponse = Boolean(error.response);
  const isTimeout = error.code === 'ECONNABORTED';

  return {
    message: hasResponse
      ? error.response.data?.message || error.message || 'Request failed'
      : 'Network error. Check your internet connection.',
    status: error.response?.status ?? null,
    data: error.response?.data ?? null,
    url: error.config?.url ?? null,
    method: error.config?.method ?? null,
    isNetworkError: !hasResponse,
    isTimeout,
    originalError: error,
  };
}

// Attach token before every request
api.interceptors.request.use(
  (config) => {
    // Only attach token when a request explicitly opts in.
    const shouldAttachAuth = config.withAuth === true;
    if (!shouldAttachAuth) {
      return config;
    }

    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Normalize all errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = normalizeAxiosError(error);
    const shouldShowToast = error.config?.showErrorToast !== false;

    if (import.meta.env.DEV) {
      console.error('[API Error]', normalizedError);
    }

    if (shouldShowToast) {
      toast.error(normalizedError.message || 'Error while fetching data');
    }

    return Promise.reject(normalizedError);
  }
);

export async function apiRequest(config) {
  const { data } = await api(config);
  return data;
}

export function apiGet(url, config = {}) {
  return apiRequest({
    method: 'get',
    url,
    ...config,
  });
}

export function apiPost(url, data = {}, config = {}) {
  return apiRequest({
    method: 'post',
    url,
    data,
    ...config,
  });
}

export function apiPut(url, data = {}, config = {}) {
  return apiRequest({
    method: 'put',
    url,
    data,
    ...config,
  });
}

export function apiPatch(url, data = {}, config = {}) {
  return apiRequest({
    method: 'patch',
    url,
    data,
    ...config,
  });
}

export function apiDelete(url, config = {}) {
  return apiRequest({
    method: 'delete',
    url,
    ...config,
  });
}

export default api;
