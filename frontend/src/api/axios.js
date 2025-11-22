import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
});

// Access token interceptor
export const attachTokenInterceptor = (getToken, refreshToken) => {
  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    async (err) => {
      const original = err.config;
      if (err.response?.status === 401 && !original._retry) {
        original._retry = true;
        try {
          const { data } = await api.get('/auth/refresh');
          await refreshToken(data.accessToken);
          original.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(original);
        } catch (_) {
          return Promise.reject(err);
        }
      }
      return Promise.reject(err);
    }
  );
};
