import apiClient from '@/lib/axios';
import type { AuthUser } from '@/store/slices/authSlice';

interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

interface ApiResponse<T> {
  status: string;
  statusCode: number;
  data: T;
}

export async function loginApi(email: string, password: string): Promise<AuthResponse> {
  const res = await apiClient.post<ApiResponse<AuthResponse>>('/web/auth/login', {
    email,
    password,
  });
  return res.data.data ?? (res.data as unknown as AuthResponse);
}

export async function registerApi(
  name: string,
  email: string,
  password: string,
  phone?: string,
): Promise<AuthResponse> {
  const res = await apiClient.post<ApiResponse<AuthResponse>>('/web/auth/register', {
    name,
    email,
    password,
    phone,
  });
  return res.data.data ?? (res.data as unknown as AuthResponse);
}
