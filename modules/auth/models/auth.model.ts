export interface AuthCredentials {
  email: string;
  password: string;
  name?: string;
  role?: string;
}

export interface AuthResponse {
  role: string;
  id: string;
}
