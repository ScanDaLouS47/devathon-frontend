type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
/**
 * Function to perform an API request to a specified HTTP endpoint.
 *
 * @param path - The endpoint path of the API request.
 *               For example, to request data from 'https://example.com/api/users',
 *               pass 'users' as the path.
 * @param method - The HTTP method for the request. It can be one of the following:
 *                 'GET', 'POST', 'PUT', 'PATCH', or 'DELETE'. Defaults to 'GET'.
 * @param id - An optional identifier to be appended to the endpoint URL.
 *             If provided, it will be added as a path parameter.
 *             For example, 'users/123'.
 * @param data - The data payload to send with the request. This is used only
 *               for methods like 'POST', 'PUT', and 'PATCH' that require a request body.
 *               It will be converted to a JSON string and included in the request body.
 * @param requireToken - A boolean indicating whether an access token is required for the request.
 * @returns A promise that resolves to the JSON response from the API.
 *
 * @template T - The type of the data payload for requests with a body. This allows
 *               the function to handle different types of request data.
 *
 * @example
 * ```
 * // Example of fetching data
 * const getUsers = await fetchApi('/users');
 *
 * // Example of posting data
 * const login = await fetchApi('/login', 'POST', null, { name: 'John Doe' });
 *
 * // Example of posting data without token on register
 * const newUser = await fetchApi('/api/v1/auth/create', 'POST', null, { email: 'user@example.com' }, false);
 * ```
 */
export const fetchApi = async <T>(
  path: string,
  method: HttpMethod = 'GET',
  id?: string,
  data?: T,
  requireToken: boolean = true,
): Promise<unknown> => {
  const apiBaseUrl = import.meta.env.VITE_API_URL;
  const accessToken = requireToken ? localStorage.getItem('access_token') : null;

  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (requireToken && accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const fetchOptions: RequestInit = {
      method,
      headers,
      ...(data ? { body: JSON.stringify(data) } : null),
    };

    const response = await fetch(`${apiBaseUrl}${path}${id ? '/' + id : ''}`, fetchOptions);
    // const response = await fetch('http://127.0.0.1:8000/api/v1/create', fetchOptions);

    if (!response.ok) {
      throw new Error(
        `ON FETCHING API: ${response.status} ${response.statusText} (${response.type.toLocaleUpperCase()})`,
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error('THROW ERROR', error.message);
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
