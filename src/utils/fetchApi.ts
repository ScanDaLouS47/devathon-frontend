import { ApiError } from './apiError';

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
/**
 * Function to perform an API request to a specified HTTP endpoint.
 *
 * @param path - The endpoint path of the API request.
 *               For example, to request data from 'https://example.com/api/users',
 *               pass 'users' as the path.
 * @param method - The HTTP method for the request. It can be one of the following:
 *                 'GET', 'POST', or 'DELETE'. Defaults to 'GET'.
 * @param id - An optional identifier to be appended to the endpoint URL.
 *             If provided, it will be added as a path parameter.
 *             For example, 'users/123'.
 * @param data - The data payload to send with the request. This is used only
 *               for methods like 'POST' that require a request body.
 *               It will be converted to a JSON string and included in the request body.
 * @param isRequiredToken - A boolean indicating whether an access token is required for the request.
 *
 * @param isWithCredentials - A Boolean value indicating whether credentials are required for the request.
 *                            May not be necessary with Login and Register.
 *
 * @returns A promise that resolves to the JSON response from the API.
 *
 * @template SendPost - The type of the data payload for requests with a body. This allows
 *               the function to handle different types of request data. If you need, also work with `FormData`.
 *
 * @example
 *
 * ```
 * // Example of posting data without token and credentials on register
 * const newUser = await fetchApi('/create', 'POST', '', { name: 'John Doe', email: 'user@example.com', ... }, false, false);
 *
 * // Example of posting data with credentials only on login
 * const login = await fetchApi('/login', 'POST', '', { email: 'user@example.com' }, false, true);
 *
 * // Example of uploading data with token and credentials
 * const upload = await fetchApi('/upload', 'POST', '', formData, true, true);
 *
 * // Example of fetching user profile data
 * const getUserProfile = await fetchApi('/profile', 'GET', '', null, true, true);
 *
 * // Example of fetching user logout
 * const logout = await fetchApi('/logout', 'GET', '', null, true, true);
 * ```
 */
export const fetchApi = async <T>(
  path: string,
  method: HttpMethod = 'GET',
  id: string = '',
  data: SendPost | FormData | null,
  isRequiredToken: boolean = false,
  isWithCredentials: boolean = false,
): Promise<T> => {
  const getCookie = (name: string) => {
    const cookieString = document.cookie.split('; ').find((row) => row.startsWith(`${name}=`));
    return cookieString ? decodeURIComponent(cookieString.split('=')[1]) : null;
  };

  const apiBaseUrl = import.meta.env.VITE_API_URL;

  try {
    // XSRF-TOKEN
    const xsrfResponse = await fetch(`${apiBaseUrl}/sanctum/csrf-cookie`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!xsrfResponse.ok) {
      throw new Error(`Failed to fetch XSRF token: ${xsrfResponse.status} ${xsrfResponse.statusText}`);
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

    const response = await fetch(`${apiBaseUrl}${path}${id ? id : ''}`, fetchOptions);

    if (!response.ok) {
      throw new ApiError(`${response.status} ${response.statusText}`);
    }

    const responseData: T = await response.json();
    return responseData;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error('THROW ERROR', error);
      throw error;
    }
    return { data: null, msg: (error as ApiError).message, ok: false } as T;
  }
};
