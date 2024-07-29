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
 * @returns A promise that resolves to the JSON response from the API.
 *
 * @template T - The type of the data payload for requests with a body. This allows
 *               the function to handle different types of request data.
 *
 * @example
 * ```
 * // Example of fetching data
 * const users = await fetchApi('/users');
 *
 * // Example of posting data
 * const newUser = await fetchApi('/users', 'POST', null, { name: 'John Doe' });
 * ```
 */
export const fetchApi = async <T>(
  path: string,
  method: string = 'GET',
  id?: string | null,
  data?: T,
): Promise<unknown> => {
  const apiBaseUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const accessToken = localStorage.getItem('access_token');

  // console.log('API BASE URL', apiBaseUrl);
  // console.log('API KEY', apiKey);
  // console.log('ACCESS TOKEN', accessToken);

  try {
    if (!accessToken) {
      throw new Error(`Access token is missing. Please authenticate to get a valid token`);
    }

    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${apiKey}`,
        Authorization: `Bearer ${accessToken}`,
      },
      ...(data ? { body: JSON.stringify(data) } : null),
    };

    const response = await fetch(`${apiBaseUrl}${path}/${id ? id : ''}`, fetchOptions);

    if (!response.ok) {
      throw new Error(
        `
        Response: ${response.ok}
        Headers: ${response.headers}
        Type: ${response.type}
        Status: ${response.status}
        `,
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error('THROW ERROR', error.message);
    }
  }
};
