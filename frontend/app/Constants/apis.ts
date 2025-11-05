const baseURL = import.meta.env.VITE_BACKEND_URL;

export const guitarListURL = baseURL + '/guitar/list';

export const registerURL = baseURL + '/auth/register';
export const loginURL = baseURL + '/auth/login';
export const refreshTokenURL = baseURL + '/auth/refresh-token';

export const getUserURL = baseURL + `/user`;
export const updateUserURL = baseURL + `/user/update`;
