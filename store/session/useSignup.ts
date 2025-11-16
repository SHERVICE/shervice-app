import { ProviderSession } from '@/schemas/signin';
import api from '@/services/api';
import { useMutation } from '@tanstack/react-query';

interface Address {
  city: string;
  street: string;
  neighborhood?: string;
  zipcode: string;
  latitude?: number;
  longitude?: number;
}

export interface User {
  name: string;
  email: string;
  password: string | null;
  phone: string;
  photo?: string | null;
  token?: string | null;
  provider?: ProviderSession;
  providerAccountId: string | null;
  serviceProvider: boolean;
  cpfCnpj: string;
}

interface ProviderProfile {
  id: string;
  userId: string;
  cpfCnpj: string;
  coverImage: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string | null;
  customer: null;
  providerProfile: null | ProviderProfile;
}

export function useSignupMutation() {
  const mutationFn = async (userData: User) => {
    const { data } = await api.post<UserResponse>('/session/signup', userData);

    return data;
  };

  return useMutation({
    mutationFn,
  });
}
