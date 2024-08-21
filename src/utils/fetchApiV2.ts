import { ApiError } from './apiError';
import { getCookie } from './getCookie';

type SendPost = {
  _method?: string;
  id?: number;
  email: string | undefined;
  role?: string;
  name?: string;
  lName?: string;
  phone?: string;
  password?: string;
  image_url?: string | null | File;
};

type HttpMethod = 'GET' | 'POST' | 'DELETE';

export const fetchApiV2 = async <T>(
  path: string,
  method: HttpMethod = 'GET',
  data?: SendPost | FormData | null,
  isRequiredToken: boolean = false,
  isWithCredentials: boolean = false,
): Promise<T> => {
  const apiBaseUrl = import.meta.env.VITE_API_URL;

  try {
    // xsrf token
    const xsrfResponse = await fetch(`${apiBaseUrl}/sanctum/csrf-cookie`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!xsrfResponse.ok) {
      throw new ApiError(`Error with credentials`);
    }

    const headers: HeadersInit = {
      credentials: 'include',
    };

    if (!(data instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    if (isWithCredentials) {
      const xsrfCookie = getCookie('XSRF-TOKEN');
      headers['XSRF-TOKEN'] = `${xsrfCookie}`;
    }

    if (isRequiredToken) {
      const accessToken = localStorage.getItem('access_token_api');
      headers['Authorization'] = 'Bearer' + ' ' + accessToken;
    }

    const fetchOptions: RequestInit = {
      method: method,
      headers: headers,
      ...(data ? { body: data instanceof FormData ? data : JSON.stringify(data) } : null),
    };

    const response = await fetch(`${apiBaseUrl}${path}`, fetchOptions);

    if (!response.ok) {
      throw new ApiError(`Error to connect`);
    }

    const responseData: T = await response.json();
    return responseData;
  } catch (error) {
    return { data: null, msg: (error as ApiError).message, ok: false } as T;
  }
};
