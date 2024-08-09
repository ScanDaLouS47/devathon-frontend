import XsrfCookie from './XsrfCookie';

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

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

class User {
  // Properties
  private apiBaseUrl: string = import.meta.env.VITE_API_URL;
  private cookie: XsrfCookie | Error | undefined;
  private isRequiredToken: boolean = false;
  private isWithCredentials: boolean = false;

  // Constructor
  constructor() {
    // Acá en todo caso podría hacer la conexión a la DB
  }

  // Getters & Setters
  protected getApiBaseUrl = (): string => this.apiBaseUrl;
  protected getCookie = (): XsrfCookie | Error | undefined => this.cookie;
  protected getIsRequiredToken = (): boolean => this.isRequiredToken;
  protected getIsWithCredentials = (): boolean => this.isWithCredentials;

  protected setApiBaseUrl = (baseUrl: string): void => {
    this.apiBaseUrl = baseUrl;
  };
  protected setCookie = (cookie: XsrfCookie | Error | undefined): void => {
    this.cookie = cookie;
  };
  protected setIsRequiredToken = (option: boolean): void => {
    this.isRequiredToken = option;
  };
  protected setIsWithCredentials = (option: boolean): void => {
    this.isWithCredentials = option;
  };

  // Methods
  private async fetchApi(path: string, method: HttpMethod = 'GET', id?: string, data?: SendPost) {
    try {
      const accessToken = localStorage.getItem('access_token_api');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        credentials: 'include',
      };

      if (this.getIsWithCredentials() && this.getCookie()) {
        headers['XSRF-TOKEN'] = `${this.getCookie()}`;
      }

      if (this.getIsRequiredToken() && accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      const fetchOptions: RequestInit = {
        method,
        headers,
        ...(data ? { body: JSON.stringify(data) } : null),
      };

      const response = await fetch(`${this.apiBaseUrl}${path}${id ? '/' + id : ''}`, fetchOptions);

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
  }

  public async createUser(data: SendPost) {
    return await this.fetchApi('/api/v1/auth/create', 'POST', undefined, data);
  }

  public async loginUser(data: SendPost) {
    this.setIsWithCredentials(true);
    const cookie = await XsrfCookie.initializeXSRFToken()
      .catch((e) => {
        if (e instanceof Error) {
          console.error(e);
          return e;
        }
      })
      .finally(() => this.setIsWithCredentials(false));
    this.setCookie(cookie);

    return await this.fetchApi('/api/v1/login', 'POST', undefined, data);
  }

  public async getUserProfile() {
    this.setIsRequiredToken(true);
    return await this.fetchApi('/api/v1/user/profile', 'GET');
  }

  public async getAllUsers() {
    this.setIsRequiredToken(true);
    return await this.fetchApi('/api/v1/user', 'GET');
  }

  public async getUserById(id: string) {
    this.setIsRequiredToken(true);
    return await this.fetchApi(`/api/v1/user/show`, 'GET', `${id}`);
  }

  public async logoutUser() {
    this.setIsRequiredToken(true);
    return await this.fetchApi('/api/v1/logout', 'GET');
  }

  public async updateUser(data: SendPost) {
    this.setIsRequiredToken(true);
    return await this.fetchApi('/api/v1/user/update', 'PUT', undefined, data);
  }

  // Static Methods
}

export default User;
