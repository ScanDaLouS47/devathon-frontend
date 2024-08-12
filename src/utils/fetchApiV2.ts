import { ApiError } from './apiError';
import { getCookie } from './getCookie';

type SendPost = {
  id?: number;
  email: string;
  role?: string;
  name?: string;
  lName?: string;
  phone?: string;
  password?: string;
  image_url?: string | null;
};

type HttpMethod = 'GET' | 'POST' | 'DELETE';

export const fetchApiV2 = async (
  path: string,
  method: HttpMethod = 'GET',
  data?: SendPost,
  withCredentials: boolean = false,
) => {
  const apiBaseUrl = import.meta.env.VITE_API_URL;

  try {
    // xsrf token
    const csrfResponse = await fetch(`${apiBaseUrl}/sanctum/csrf-cookie`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!csrfResponse.ok) {
      throw new ApiError(`Error to conect BD`);
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      credentials: 'include',
    };

    if (withCredentials) {
      const xcsrfCookie = getCookie('XSRF-TOKEN');
      headers['XSRF-TOKEN'] = `${xcsrfCookie}`;
    }

    const fetchOptions: RequestInit = {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    };

    const response = await fetch(`${apiBaseUrl}${path}`, fetchOptions);

    console.log(response);

    if (!response.ok) {
      throw new ApiError(`Error to conect BD`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      return { error: true, message: error.message };
    }
  }
};

/**
 *
 * VITE_API_URL + /api/v1/create => POST
 * VITE_API_URL + /api/v1/login => POST
 * VITE_API_URL + /api/v1/user/profile => GET (only for user)
 * VITE_API_URL + /api/v1/user => GET (all users)
 * VITE_API_URL + /api/v1/user/show/{id} => GET (only for admin betById)
 * VITE_API_URL + /api/v1/logout => GET
 * VITE_API_URL + /api/v1/user/update => PUT
 *
 */
