class APIClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    const envUrl =
      (globalThis as { process?: { env?: { NEXT_PUBLIC_API_URL?: string } } })
        .process?.env?.NEXT_PUBLIC_API_URL;
    
    // Default to localhost:3000 for development/port-forwarding
    this.baseUrl = envUrl || 'http://localhost:3000';
  }

  setToken(token: string) {
    this.token = token;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  }

  createEventSource(path: string): EventSource {
    const url = new URL(path, this.baseUrl);
    if (this.token) {
      url.searchParams.set('token', this.token);
    }
    return new EventSource(url.toString());
  }
}

export const apiClient = new APIClient();
