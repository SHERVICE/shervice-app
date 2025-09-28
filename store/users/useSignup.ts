import { ProviderSession } from '@/schemas/signup';
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
  password?: string;
  phone: string;
  photo?: string | null;
  accessToken?: string | null;
  provider?: ProviderSession;
  providerAccountId: string | null;
  serviceProvider: boolean;
  cpfCnpj: string;
  address: Address;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string | null;
  address: Address;
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
