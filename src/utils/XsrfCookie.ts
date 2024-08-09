class XsrfCookie {
  // Properties
  private static xsrfCookie: XsrfCookie | Error | undefined;

  // Constructor
  constructor() {}

  // Getters & Setters

  // Methods

  // Static Methods
  public static async initializeXSRFToken(): Promise<XsrfCookie | Error | undefined> {
    try {
      const resp = await fetch('http://localhost:8000/sanctum/csrf-cookie', {
        method: 'GET',
        credentials: 'include',
      });

      if (!resp.ok) {
        throw new Error(
          `Failed to fetch: ${resp.status} ${resp.statusText} (${resp.type.toLocaleUpperCase()})`,
        );
      }

      const cookieString = document.cookie.split('; ').find((cookie) => cookie.startsWith(`XSRF-TOKEN=`)); // resp.data.cookieName
      if (cookieString) {
        const cookie: XsrfCookie = decodeURIComponent(cookieString.split('=')[1]);
        return cookie;
      } else {
        throw new Error('Cookie not found');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error initializing CSRF token:', error);
        return error;
      }
    }
  }

  public static showCookie(): XsrfCookie | Error | undefined {
    console.log('CSRF Token:', XsrfCookie.xsrfCookie);
    return XsrfCookie.xsrfCookie;
  }
}

export default XsrfCookie;
